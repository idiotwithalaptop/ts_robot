import { left as directionLeft, right as directionRight, RobotDirection } from "./direction"
import {EventBus} from "../events/eventBus";
import {Event} from "../events/event";

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

export const ROBOT_CHANGED_EVENT : Event<Robot>  = {
    name: "robot.changed"
};

export const ROBOT_REPORTED_EVENT : Event<string>  = {
    name: "robot.reported"
};

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
            const newRobot = this.copy(x, y, direction);
            EventBus.getInstance().emit(ROBOT_CHANGED_EVENT, newRobot);
            return newRobot;
        }
        // Invalid, ignore
        return this;
    }

    left() : Robot {
        if(this.isPlaced()) {
            const newRobot = this.copy(this._x, this._y, directionLeft(this._direction));
            EventBus.getInstance().emit(ROBOT_CHANGED_EVENT, newRobot);
            return newRobot;
        }
        // Not placed, ignore.
        return this;
    }

    right() : Robot {
        if(this.isPlaced()) {
            const newRobot = this.copy(this._x, this._y, directionRight(this._direction));
            EventBus.getInstance().emit(ROBOT_CHANGED_EVENT, newRobot);
            return newRobot;
        }
        // Not placed, ignore.
        return this;
    }

    move() : Robot {
        if(!this.isPlaced()) {
            // Not placed, ignore.
            return this;
        }

        const movement = MOVEMENT_MAP[this._direction];
        const newX = this._x + movement.xDelta;
        const newY = this._y + movement.yDelta;
        if(this.isValid(newX, newY, this._direction)) {
            const newRobot = this.copy(newX, newY, this._direction);
            EventBus.getInstance().emit(ROBOT_CHANGED_EVENT, newRobot);
            return newRobot;
        }
        // Invalid placement, ignore.
        return this;
    }

    report() : Robot {
        if(this.isPlaced()) {
            EventBus.getInstance().emit(ROBOT_REPORTED_EVENT, `${this._x},${this._y},${RobotDirection[this._direction]}`)
        }
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