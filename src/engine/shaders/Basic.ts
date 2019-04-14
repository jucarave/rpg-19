import { ShaderStruct } from '../Types';

export const BasicShader : ShaderStruct = {
    vertexShader: `
        precision mediump float;

        attribute vec2 aPosition;

        void main() {
            gl_Position = vec4(aPosition.x, aPosition.y, 0.0, 1.0);
        }
    `,

    fragmentShader: `
        precision mediump float;

        void main() {
            gl_FragColor = vec4(1.0);
        }
    `
};