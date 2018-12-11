var audioContext,
  audioSources = [],
  pitchShifterProcessor;

var audioSourcesNames = ['MP3 file', 'Microphone'],
  audioSourceIndex = 0,
  grainSize = 2048, // 2048 works well validGranSizes = [256, 512, 1024, 2048, 4096, 8192],
  pitchRatio = 0.91, // men: 1.12, women: 0.91
  overlapRatio = 0.50;

var pitchShifter = (function() {

    hannWindow = function(length) {

      var window = new Float32Array(length);
      for (var i = 0; i < length; i++) {
        window[i] = 0.5 * (1 - Math.cos(2 * Math.PI * i / (length - 1)));
      }
      return window;
    };

  linearInterpolation = function(a, b, t) {
    return a + (b - a) * t;
  };


  initAudio = function() {

    if (!navigator.getUserMedia) {
      alert('Your browser does not support the Media Stream API');
    } else {
      navigator.getUserMedia({
          audio: true,
          video: false
        },
        function(stream) {
          audioSources[1] = audioContext.createMediaStreamSource(stream);
        },
        function(error) {
          alert('Unable to get the user media');
        }
      );
    }

    var bufferLoader = new BufferLoader(
      audioContext, ['../../assets/sound/voice.mp3'],
      function(bufferList) {

        audioSources[0] = audioContext.createBufferSource();
        audioSources[0].buffer = bufferList[0];
        audioSources[0].loop = true;
        audioSources[0].connect(pitchShifterProcessor);
        audioSources[0].start(0);
      }
    );

    bufferLoader.load();
  };

  initProcessor = function() {

    if (pitchShifterProcessor) {
      pitchShifterProcessor.disconnect();
    }

    if (audioContext.createScriptProcessor) {
      pitchShifterProcessor = audioContext.createScriptProcessor(grainSize, 1, 1);
    } else if (audioContext.createJavaScriptNode) {
      pitchShifterProcessor = audioContext.createJavaScriptNode(grainSize, 1, 1);
    }

    pitchShifterProcessor.buffer = new Float32Array(grainSize * 2);
    pitchShifterProcessor.grainWindow = hannWindow(grainSize);
    pitchShifterProcessor.onaudioprocess = function(event) {

      var inputData = event.inputBuffer.getChannelData(0);
      var outputData = event.outputBuffer.getChannelData(0);

      for (i = 0; i < inputData.length; i++) {

        // Apply the window to the input buffer
        inputData[i] *= this.grainWindow[i];

        // Shift half of the buffer
        this.buffer[i] = this.buffer[i + grainSize];

        // Empty the buffer tail
        this.buffer[i + grainSize] = 0.0;
      }

      // Calculate the pitch shifted grain re-sampling and looping the input
      var grainData = new Float32Array(grainSize * 2);
      for (var i = 0, j = 0.0; i < grainSize; i++, j += pitchRatio) {

        var index = Math.floor(j) % grainSize;
        var a = inputData[index];
        var b = inputData[(index + 1) % grainSize];
        grainData[i] += linearInterpolation(a, b, j % 1.0) * this.grainWindow[i];
      }

      // Copy the grain multiple times overlapping it
      for (i = 0; i < grainSize; i += Math.round(grainSize * (1 - overlapRatio))) {
        for (j = 0; j <= grainSize; j++) {
          this.buffer[i + j] += grainData[j];
        }
      }

      // Output the first half of the buffer
      for (i = 0; i < grainSize; i++) {
        outputData[i] = this.buffer[i];
      }
    };

    pitchShifterProcessor.connect(audioContext.destination);
  };


  return {
    init: function() {
      if ('AudioContext' in window) {
        audioContext = new AudioContext();
      } else {
        alert('Your browser does not support the Web Audio API');
        return;
      }

      initAudio();
      initProcessor();
    }
  }

}());

window.addEventListener("DOMContentLoaded", pitchShifter.init, true);
