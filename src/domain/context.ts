import Table from "./table";
import Robot, {ROBOT_CHANGED_EVENT} from "./robot";

export default class Context {
    private _table : Table;
    private _robot : Robot;

    constructor(width : number, length : number) {
        this._table = new Table(width, length);
    }

    get robot() : Robot {
        return this._robot;
    }

    addRobot() : Robot {
        this._robot = new Robot(this._table.width - 1, this._table.length - 1);
        this._robot.addListener(ROBOT_CHANGED_EVENT, (robot : Robot ) => {
            this._robot = robot;
        })
        return this._robot;
    }
}