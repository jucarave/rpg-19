export type ShaderStruct = {
    vertexShader: string;
    fragmentShader: string;
}

export type ShaderCollection = {
    Basic: WebGLProgram;
    BasicSeeThrough: WebGLProgram;
};

export type SpriteOptions = {
    v2Pivot?: Array<number>,
    v4UVs?: Array<number>
};