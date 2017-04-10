import * as THREE from 'three';
import { Planets } from './planets';
import {
  Detector,
  Helper
} from './util/';
import {
  dat,
  Stats
} from './lib/';
require('./index.css');

(function(app) {
  let scene, camera, renderer;
  let camera_near = 0.1, camera_far = 1000;
  let rendererColor = 0x000000;
  let controlObj = {
    camera_z: 200,
  }

  let keyRangeObj = {
    camera_z: [10, 200]
  }

  let init = () => {
    // 场景初始化
    scene = sceneInit();
    renderer = rendererInit(rendererColor, 1);
    camera = cameraInit(camera_near, camera_far, controlObj.camera_z);
    scene.add(camera);
    spotLightInit(scene);
    var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );
    Planets.createPlanet({
      name: 'sun',
      widthSegments: 30,
      heightSegments: 30
    }).then(function(sun) {
      scene.add(sun);
    });
    // 业务逻辑 S
    // 业务逻辑 E
    let stats = statsInit();
    let dat = datInit(controlObj, keyRangeObj);
    let render = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    
    render();

    console.log('scene');
  }

  let sceneInit = () => {
    return new THREE.Scene();
  }

  let spotLightInit = (scene) => {
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(10, 20, 100);
    spotLight.castShadow = true;
    scene.add(spotLight);
    return spotLight;
  }

  let cameraInit = (near, far, zIndex) => {
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, near, far);
    camera.position.z = zIndex;
    return camera;
  }

  let rendererInit = (color, alpha) => {
    var renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(color, alpha);
    document.body.appendChild(renderer.domElement);
    return renderer;
  }

  let resize = (camera, renderer) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  let statsInit = () => {
    var stats = new Stats();
    // 0: fps, 1: ms, 2: mb, 3+: custom
    stats.showPanel(0);
    document.body.appendChild(stats.dom);
    return stats;
  }

  let datInit = (controlObj, keyRangeObj) => {
    var gui = new dat.GUI();
    for (var key in keyRangeObj) {
      gui.add(controlObj, key, keyRangeObj[key][0], keyRangeObj[key][1]);
    }
    return gui;
  }

  // 入口初始化
  window.onload = init();
  window.addEventListener('resize', Helper.throttle(() => {
    resize(camera, renderer)
  }, 500), false);
})(window.app = window.app || {})