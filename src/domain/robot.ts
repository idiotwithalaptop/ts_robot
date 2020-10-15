import { RobotDirection, left as directionLeft, right as directionRight } from "./direction"
export default class Robot {
    readonly x: number;
    readonly y: number;
    readonly direction: RobotDirection;

    public constructor(x : number, y : number, direction : RobotDirection) {
        this.x = x;
        this.y = y;
        this.direction = direction;
    }

    left() : Robot {
        return new Robot(this.x, this.y, directionLeft(this.direction));
    }

    right() : Robot {
        return new Robot(this.x, this.y, directionRight(this.direction));
    }
}