import { ShaderStruct } from '../Types';

export const BasicShader : ShaderStruct = {
    vertexShader: `
        precision mediump float;

        attribute vec2 aPosition;
        attribute vec4 aTexUVs;
        attribute vec2 aTexCoords;

        uniform mat4 uMVP;

        varying vec4 vTexUVs;
        varying vec2 vTexCoords;

        void main() {
            vec4 position = vec4(aPosition.x, aPosition.y, 0.0, 1.0);

            gl_Position = uMVP * position;

            vTexUVs = aTexUVs;
            vTexCoords = aTexCoords;
        }
    `,

    fragmentShader: `
        precision mediump float;

        uniform sampler2D uTexture;

        varying vec4 vTexUVs;
        varying vec2 vTexCoords;

        void main() {
            vec2 coords = mod(vTexCoords, 1.0) * vTexUVs.zw + vTexUVs.xy;

            gl_FragColor = texture2D(uTexture, coords);
        }
    `
};