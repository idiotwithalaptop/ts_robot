import { left as directionLeft, right as directionRight, RobotDirection } from "./direction"

type Movement = {
    xDelta: number;
    yDelta: number;
}

type MovementMap = {
    [key in RobotDirection]: Movement;
};

const MOVEMENT_MAP : MovementMap = {
    [RobotDirection.EAST]: {xDelta: 1, yDelta: 0},
    [RobotDirection.SOUTH]: {xDelta: 0, yDelta: -1},
    [RobotDirection.WEST]: {xDelta: -1, yDelta: 0},
    [RobotDirection.NORTH]: {xDelta: 0, yDelta: 1}
}

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

    move() : Robot {
        const movement = MOVEMENT_MAP[this._direction];
        const newX = this._x + movement.xDelta;
        const newY = this._y + movement.yDelta;
        if(this.isPlaced() && this.isValid(newX, newY, this._direction)) {
            this.copy(this._x + movement.xDelta, this._y + movement.yDelta, this._direction);
        }
        // Not placed or invalid placement, ignore.
        return this;
    }

    private isPlaced() : boolean {
        return this._x !== undefined && this._y !== undefined && this._direction !== undefined;
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