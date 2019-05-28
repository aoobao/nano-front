export const vertexShader = `
    precision mediump float;
    precision mediump int;
    uniform mat4 modelViewMatrix; // optional
    uniform mat4 projectionMatrix; // optional
    attribute vec3 position;
    attribute vec4 color;
    varying vec4 vColor;
    void main()	{
      vColor = color;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`

export const fragmentShader = `
    precision mediump float;
    precision mediump int;
    varying vec4 vColor;
    void main()	{
      vec4 color = vec4( vColor );
      gl_FragColor = color;
    }
`
