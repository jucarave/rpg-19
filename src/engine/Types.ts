import Vector2 from "./math/Vector2";

export type ShaderStruct = {
    vertexShader: string;
    fragmentShader: string;
}

export type ShaderCollection = {
    Basic: WebGLProgram;
};

export type SpriteOptions = {
    pivot?: Vector2
};