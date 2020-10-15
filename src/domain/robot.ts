import { left as directionLeft, right as directionRight, RobotDirection } from "./direction"

export default class Robot {
    readonly maxX: number;
    readonly maxY: number;
    private _x?: number;
    private _y?: number;
    private _direction?: RobotDirection;

    public constructor(maxX : number, maxY : number) {
        this.maxX = maxX;
        this.maxY = maxY;
    }

    get x() : number {
        return this._x;
    }

    get y() : number {
        return this._y;
    }

    get direction() : RobotDirection {
        return this._direction;
    }

    place(x : number, y : number, direction : RobotDirection) : Robot {
        if(this.isValid(x, y ,direction)) {
            return this.copy(x, y, direction)
        }
        // Invalid, ignore
        return this;
    }

    left() : Robot {
        if(this.isPlaced()) {
            return this.copy(this._x, this._y, directionLeft(this._direction));
        }
        // Not placed, ignore.
        return this;
    }

    right() : Robot {
        if(this.isPlaced()) {
            return this.copy(this._x, this._y, directionRight(this._direction));
        }
        // Not placed, ignore.
        return this;
    }

    private isPlaced() : boolean {
        return this._x !== undefined && this._y !== undefined && this.direction !== undefined;
    }

    private isValid(x : number, y : number, direction : RobotDirection) {
        return x !== undefined && x >= 0 && x <= this.maxY && y !== undefined && y >= 0 && y <= this.maxY && direction !== undefined
    }

    private copy(x : number, y : number, direction : RobotDirection) : Robot {
        const robot = new Robot(this.maxX, this.maxY);
        robot._x = x;
        robot._y = y;
        robot._direction = direction;
        return robot
    }
}