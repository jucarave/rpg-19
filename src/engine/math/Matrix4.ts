class Matrix4 {
    public data             : Array<number>;

    constructor(...values: Array<number>) {
        this.data = new Array(16);
        
        values.forEach((value, index) => {
            this.data[index] = value;
        });
    }

    public set(...values: Array<number>): void {
        values.forEach((value, index) => {
            this.data[index] = value;
        });
    }

    public copy(matrix: Matrix4): void {
        matrix.data.forEach((value, index) => {
            this.data[index] = value;
        })
    }

    public translate(x: number, y: number, z: number, relative: boolean = false): void {
        if (relative) {
            this.data[12] += x;
            this.data[13] += y;
            this.data[14] += z;
        } else {
            this.data[12] = x;
            this.data[13] = y;
            this.data[14] = z;
        }
    }

    public setIdentity(): void {
        this.set(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
    }

    // Multiply matrices column row
    private MCR(matrix: Matrix4, column: number, row: number): number {
        const C = matrix.data;
        const R = this.data;

        const CI = column;
        const RI = 4 * row;

        return C[0 + CI] * R[0 + RI] + C[4 + CI] * R[1 + RI] + C[8 + CI] * R[2 + RI] + C[12 + CI] * R[3 + RI];
    }

    public multiply(matrix: Matrix4): void {
        const T = matrix;

        this.set(
            this.MCR(T, 0, 0), this.MCR(T, 1, 0), this.MCR(T, 2, 0), this.MCR(T, 3, 0),
            this.MCR(T, 0, 1), this.MCR(T, 1, 1), this.MCR(T, 2, 1), this.MCR(T, 3, 1),
            this.MCR(T, 0, 2), this.MCR(T, 1, 2), this.MCR(T, 2, 2), this.MCR(T, 3, 2),
            this.MCR(T, 0, 3), this.MCR(T, 1, 3), this.MCR(T, 2, 3), this.MCR(T, 3, 3),
        );
    }

    public static identity(): Matrix4 {
        return new Matrix4(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
    }

    public static createOrtho(width: number, height: number, znear: number, zfar: number): Matrix4 {
        const l = -width / 2.0;
        const r = width / 2.0;
        const b = -height / 2.0;
        const t = height / 2.0;

        const A = 2.0 / (r - l);
        const B = 2.0 / (t - b);
        const C = -2.0 / (zfar - znear);

        const X = -(r + l) / (r - l);
        const Y = -(t + b) / (t - b);
        const Z = -(zfar + znear) / (zfar - znear);

        return new Matrix4(
            A, 0, 0, 0,
            0, B, 0, 0,
            0, 0, C, 0,
            X, Y, Z, 1
        );
    }
}

export default Matrix4;