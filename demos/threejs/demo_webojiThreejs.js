"use strict";

//entry point :
function main() {
	THREE.JeelizHelper.init({
		canvasThreeId: 'webojiCanvas',
		canvasId: 'jeefacetransferCanvas',

		assetsParentPath: '../../assets/3D/',
    NNCpath: '../../dist/',

    // HUMAN CREEPY FACE :
    meshURL: 'meshes/faceCustom11_v0.json',
	  matParameters: {
	      //diffuseMapURL: 'textures/base_wireframe.png'
	  },
	  position: [0, 0, 0],
    scale: 0.8
	});


	var slider = document.getElementById("pitchSlider");
	var output = document.getElementById("valueSlider");
	output.innerHTML = slider.value / 100; // Display the default slider value

	// Update the current slider value (each time you drag the slider handle)
	slider.oninput = function() {
		pitchRatio = output.innerHTML = this.value / 100;
	}


	document.getElementById('currentAudioSource').addEventListener('click', switchAudioInput);

  function switchAudioInput() {
    if (audioSources[audioSourceIndex]) {
      audioSources[audioSourceIndex].disconnect();
    }

    if (audioSourceIndex == 0) {
      audioSourceIndex = 1;
			document.getElementById("currentAudioSource").innerHTML = "Microphone";
    }
    else {
      audioSourceIndex = 0;
			document.getElementById("currentAudioSource").innerHTML = "MP3";
    }

    if (audioSources[audioSourceIndex]) {
      audioSources[audioSourceIndex].connect(pitchShifterProcessor);
    }
  }
} //end main()
