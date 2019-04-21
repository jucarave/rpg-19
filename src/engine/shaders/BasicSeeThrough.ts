import { ShaderStruct } from '../Types';

export const BasicSeeThroughShader : ShaderStruct = {
    vertexShader: `
        precision mediump float;

        attribute vec2 aPosition;
        attribute vec4 aTexUVs;
        attribute vec2 aTexCoords;

        uniform mat4 uMVP;
        uniform vec2 uScreenResolution;

        varying vec4 vTexUVs;
        varying vec2 vTexCoords;
        varying vec2 vScreenCoords;

        void main() {
            vec4 position = uMVP * vec4(aPosition.x, aPosition.y, 0.0, 1.0);
            gl_Position = position;

            vTexUVs = aTexUVs;
            vTexCoords = aTexCoords;
            vScreenCoords = ((position.xy / position.w) + 1.0) / 2.0;
            vScreenCoords.y *= uScreenResolution.y / uScreenResolution.x;
        }
    `,

    fragmentShader: `
        precision mediump float;

        uniform sampler2D uTexture;
        uniform sampler2D uEntitiesTexture;

        uniform vec3 uShadowColor;
        
        varying vec4 vTexUVs;
        varying vec2 vTexCoords;
        varying vec2 vScreenCoords;

        void main() {
            vec2 coords = mod(vTexCoords, 1.0) * vTexUVs.zw + vTexUVs.xy;

            gl_FragColor = texture2D(uTexture, coords);

            vec4 entitiesColor = texture2D(uEntitiesTexture, vScreenCoords);
            if (entitiesColor.a > 0.0) {
                //gl_FragColor.rgb = gl_FragColor.rgb * 0.7 + entitiesColor.rgb * 0.3;
                gl_FragColor.rgb = uShadowColor;
            }
        }
    `
};