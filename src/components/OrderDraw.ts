import Component from "engine/world/Component";
import Camera from "engine/world/Camera";

interface DrawInstruction {
    position: Function;
    render: Function;
}

class OrderDraw extends Component {
    private _instructions              : Array<DrawInstruction>;
    private _imagesCount               : number;

    constructor() {
        super();

        this._instructions = new Array(30);
        this._imagesCount = 0;
    }

    public renderImage(positionCallback: Function, renderCallback: Function): void {
        if (this._imagesCount >= this._instructions.length) {
            throw new Error("Can't add any other instance to draw in order");
        }

        this._instructions.push({ position: positionCallback, render: renderCallback });
        this._imagesCount += 1;
    }

    public update(): void {
        this._imagesCount = 0;
    }

    public render(camera: Camera): void {
        this._instructions.sort((a: DrawInstruction, b: DrawInstruction) => {
            const y1 = a.position();
            const y2 = b.position();

            if (y1 < y2) { return -1; } else 
            if (y1 > y2) { return 1; } else 
            { return 0; }
        });

        this._instructions.forEach((instruction: DrawInstruction) => {
            instruction.render(camera);
        });
    }

    public get componentName(): string { return "OrderDraw"; }
}

export default OrderDraw;