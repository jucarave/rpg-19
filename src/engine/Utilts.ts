export function ceilToPowerOf2(value: number): number {
    let ret = 2;

    while (ret < value) {
        ret *= 2;
    }

    return ret;
}