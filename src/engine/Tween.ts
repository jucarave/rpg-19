import Emitter from "./Emitter";

class Tween {
    private _obj             : any;
    private _to              : any;
    private _time            : number;
    private _duration        : number;
    private _prevUpdate      : number;
    private _running         : boolean;

    private static tweens      : Array<Tween> = [];

    public readonly onComplete  : Emitter;

    constructor(obj: any, to: any, duration: number, autoStart: boolean) {
        this._obj = obj;
        this._to = to;
        this._time = 0;
        this._duration = duration;
        this._prevUpdate = 0;
        this._running = false;
        this.onComplete = new Emitter();

        Tween.tweens.push(this);

        if (autoStart) {
            this.start();
        }
    }

    public start(): void {
        this._running = true;
        this._prevUpdate = (new Date()).getTime();
    }

    public update(): void {
        if (!this._running) { return; }

        const time = (new Date()).getTime();
        const dt = time - this._prevUpdate;

        this._time = Math.min(this._time + dt, this._duration);

        const f = this._time / this._duration;
        
        for (const i in this._to) {
            const size = this._to[i] - this._obj[i];
            this._obj[i] = this._obj[i] + size * f;
        }

        if (this._time >= this._duration) {
            this._time = this._duration;
            this.onComplete.dispatch();
            this.destroy();
        }
    }

    public destroy(): void {
        this._running = false;
        const ind = Tween.tweens.indexOf(this);

        Tween.tweens.splice(ind, 1);
    }

    public static updateTweens(): void {
        Tween.tweens.forEach((value: Tween) => {
            value.update();
        });
    }
}

export default Tween;