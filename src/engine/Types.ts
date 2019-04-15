export type ShaderStruct = {
    vertexShader: string;
    fragmentShader: string;
}

export type ShaderCollection = {
    Basic: WebGLProgram;
};

export type SpriteOptions = {
    v2Pivot?: Array<number>,
    v4UVs?: Array<number>
};