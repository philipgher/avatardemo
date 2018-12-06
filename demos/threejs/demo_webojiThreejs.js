"use strict";

//entry point :
function main(){
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
} //end main()
