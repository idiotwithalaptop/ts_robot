import Context from "../domain/context";
import {RobotDirection} from "../domain/direction";

export type Command = {
    isValid(args : string) : boolean;
    run(args : string, context : Context) : void;
}

export const LeftCommand : Command = {
    isValid(args: string): boolean {
        return args === null || args === undefined || args.trim().length === 0;
    },
    run(args: string, context: Context) : void {
        if(context) {
            context.robot.left()
        }
    }
}

export const RightCommand : Command = {
    isValid(args: string): boolean {
        return args === null || args === undefined || args.trim().length === 0;
    },
    run(args: string, context: Context) : void {
        if (context) {
            context.robot.right()
        }
    }
}

export const MoveCommand : Command = {
    isValid(args: string): boolean {
        return args === null || args === undefined || args.trim().length === 0;
    },
    run(args: string, context: Context) : void {
        if(context) {
            context.robot.move()
        }
    }
}

const ARG_REGEX = new RegExp(/^([0-9]+),([0-9]+),(NORTH|EAST|SOUTH|WEST)$/);
type DirectionMap = {
    [key in string]: RobotDirection;
};
const DIRECTION_LOOKUP : DirectionMap = {
    "NORTH": RobotDirection.NORTH,
    "EAST": RobotDirection.EAST,
    "WEST": RobotDirection.WEST,
    "SOUTH": RobotDirection.SOUTH
}
export const PlaceCommand : Command = {
    isValid(args: string): boolean {
        return ARG_REGEX.test(args);
    },
    run(args: string, context: Context) : void {
        if(args && context) {
            const result = ARG_REGEX.exec(args);
            if(result.length === 4) {
                const x = Number.parseInt(result[1]);
                const y = Number.parseInt(result[2]);
                const direction = DIRECTION_LOOKUP[result[3]];
                context.robot.place(x, y, direction);
            }
        }
    }
}