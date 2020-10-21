export enum RobotDirection {
    NORTH,
    EAST,
    SOUTH,
    WEST
}

const LAST : RobotDirection = RobotDirection.WEST

export function left(direction : RobotDirection) : RobotDirection {
    return direction == 0 ? LAST : direction - 1;
}

export function right(direction : RobotDirection) : RobotDirection {
    return direction == LAST ? 0 : direction + 1;
}