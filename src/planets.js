import * as THREE from 'three';
import * as Promise from 'bluebird';

let Sun,
  Mercury, // 水星
  Venus,  // 金星
  Earth,  // 地球
  Mars,   // 火星
  Jupiter,  // 木星
  Saturn, // 土星
  Uranus,  // 天王星
  Nepture,  // 海王星
  stars = [];

let metadata = {
  sun: {
    surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/sunSurfaceMaterial.jpg',
    atmosphereMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/sunAtmosphereMaterial.png'
  },
  mercury: {
    surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/mercurySurfaceMaterial.jpg'
  },
  venus: {
    surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/venusSurfaceMaterial.jpg'
  },
  earth: {
    normalMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/earthSurfaceNormal.jpg',
    surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/earthSurface.jpg',
    specularMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/earthSurfaceSpecular.jpg',
    cloudsMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/earthAtmosphere.png'
  },
  moon: {
    surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/moon.jpg'
  },
  mars: {
    surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/marsSurfaceMaterial.png'
  },
  jupiter: {
    surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/jupiterSurfaceMaterial.jpg'
  },
  saturn: {
    surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/saturnSurface.jpg',
    ringsMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/saturnRings.png'
  },
  uranus: {
    surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/uranusSurfaceMaterial.jpg'
  },
  neptune: {
    surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/neptuneSurfaceMaterial.jpg'
  }
}

let textureLoader = new THREE.TextureLoader();
textureLoader.crossOrigin = 'https://s3-us-west-2.amazonaws.com/';

export var Planets = {
  loaderTexture: (url) => {
    return new Promise(function(resolve) {
      textureLoader.load(url, function(texture) {
        resolve(texture);
      })
    });
  },

  createPlanet: (opts) => {
    let planetName = opts.name;
    let geometry = new THREE.SphereGeometry(opts.raidus, opts.widthSegments, opts.heightSegments);
    let textures = [];

    for (let url in metadata[planetName]) {
      textures.push(Planets.loaderTexture(metadata[planetName][url]));
    }

    return Promise.all(textures).then(function(ts) {
      let materials = [];
      for (let i = 0; i < ts.length; i++) {
        materials.push(new THREE.MeshLambertMaterial({
          map: ts[0]
        }));
      }
      Sun = THREE.SceneUtils.createMultiMaterialObject(geometry, materials);
      return Sun;
    });
  }
}