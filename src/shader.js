import * as THREE from 'three';
import { Functions as func } from './shader-funcs.js';

const Shader = {
    uniforms: {
        "u_time": {
            value: 0.0
        },
        "u_resolution": {
            value: new THREE.Vector2()
        },
        "amp": {
            value : 0.0
        }
    },

    defines: {
        PI: Math.PI
    },

    wireframe: false,

    vertexShader: `
uniform float u_time;
varying vec2 vUv;
uniform float amp;

${func.noise}

void main(){
    vUv = uv;
    vec3 directionVec = normalize(position);
    vec3 newPosition  = directionVec;

    vec3 nice_time = vec3(u_time*0.1);

    newPosition.x = sin( noise(directionVec + nice_time) * 02.5 ) * sin(u_time) * amp;
    newPosition.y = sin( noise(directionVec + nice_time) * 01.0 ) * sin(u_time) * amp;
    newPosition.z = sin( noise(directionVec + nice_time) * 0.50 ) * sin(u_time) * amp;

    gl_Position = projectionMatrix
                * modelViewMatrix
                * vec4(newPosition+position, 1.0);
}
`,
    fragmentShader: `
    uniform vec2 u_resolution;
    uniform float u_time;
    varying vec2 vUv;

    vec3 red    = vec3(1.0,0.0,0.0);
    vec3 orange = vec3(1.0,0.5,0.0);
    vec3 yellow = vec3(1.0,1.0,0.0);
    vec3 green  = vec3(0.0,1.0,0.0);
    vec3 blue   = vec3(0.0,0.0,1.0);
    vec3 indigo = vec3(0.5,0.0,1.0);
    
    void main() {
    //   vec2 st = gl_FragCoord.xy/u_resolution;
      vec2 st = vUv;
    
      vec3 color = vec3(0.);
    
      gl_FragColor = vec4(
          sin(st.x+u_time*0.5),
          sin(st.y*3.5),
          cos(st.y*2.0),
          0.1
      );
    // gl_FragColor = vec4(1.0);
    }
`,
    fragmentShader_Lines: `
    uniform vec2 u_resolution;
    uniform float u_time;

    varying vec2 vUv;

    void main() {
    //   vec2 st = gl_FragCoord.xy/u_resolution;

    vec2 st = vUv;
    float pos = fract(st.y * 60.0);

    vec3 color = vec3(pos);

    gl_FragColor = vec4(color, 1.0);

    // gl_FragColor = vec4(1.0);
    }
    `
};

export { Shader };