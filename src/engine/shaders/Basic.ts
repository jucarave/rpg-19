import { ShaderStruct } from '../Types';

export const BasicShader : ShaderStruct = {
    vertexShader: `
        precision mediump float;

        attribute vec2 aPosition;

        uniform mat4 uMVP;

        void main() {
            vec4 position = vec4(aPosition.x, aPosition.y, 0.0, 1.0);

            gl_Position = uMVP * position;
        }
    `,

    fragmentShader: `
        precision mediump float;

        void main() {
            gl_FragColor = vec4(1.0);
        }
    `
};