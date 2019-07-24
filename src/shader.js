var Shader = {
    uniforms: {
        "u_time": {
            value: 0.0
        },
        "u_resolution": {
            type: "v2v", value: []
        }
    },

    vertexShader: `
uniform float u_time;
varying vec2 vUv;

#define PI 3.14159265359

void main(){
    vUv = uv;
    vec3 directionVec = normalize(position);
    vec3 newPosition  = directionVec;

    newPosition.x = sin(directionVec.x + u_time * 0.1)
                    + cos( u_time * 0.5 + PI);

    newPosition.y = cos( (directionVec.y * 10.0) + u_time )
                    + sin( u_time * 0.2 ) * 4.0
                    + cos( u_time * 0.9 + PI) * 2.0;

    newPosition.z = cos(directionVec.z * 10. + u_time);

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
          abs(sin(u_time*0.01)),
          sin(st.x),
          st.y,
          0.1
      );
    // gl_FragColor = vec4(1.0);
    }
`
};

export { Shader };