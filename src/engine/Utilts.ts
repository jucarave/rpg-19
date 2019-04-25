export function ceilToPowerOf2(value: number): number {
    let ret = 2;

    while (ret < value) {
        ret *= 2;
    }

    return ret;
}

export function loadJSON(url: string, callback?: Function): void {
    let http = new XMLHttpRequest();

    http.open("get", url, true);
    http.onreadystatechange = () => {
        if (http.status == 200 && http.readyState == 4) {
            if (callback) {
                callback(JSON.parse(http.responseText));
            }
        }
    };

    http.send();
}