import {processCommand} from "./commandProcessor";
import Context from "../domain/context";
import {ROBOT_REPORTED_EVENT} from "../domain/robot";
import {EventBus} from "../events/eventBus";

describe("Command Processor Integration", () => {
    function runCommands(commands : string[], context : Context) {
        commands.forEach(command => {
            processCommand(command, context);
        })
    }

    let callback : (report : string) => void;
    let testContext : Context;

    beforeEach(() => {
        callback = jest.fn();
        testContext = new Context(5, 5);
        testContext.addRobot();
        EventBus.getInstance().register(ROBOT_REPORTED_EVENT, callback);
    })

    test("Moving to each corner", () => {
        const commands = [
            "PLACE 0,0,NORTH",
            "MOVE",
            "MOVE",
            "MOVE",
            "MOVE",
            "REPORT",
            "RIGHT",
            "MOVE",
            "MOVE",
            "MOVE",
            "MOVE",
            "REPORT",
            "RIGHT",
            "MOVE",
            "MOVE",
            "MOVE",
            "MOVE",
            "REPORT",
            "RIGHT",
            "MOVE",
            "MOVE",
            "MOVE",
            "MOVE",
            "REPORT"
        ]

        runCommands(commands, testContext);

        expect(callback).toHaveBeenCalledTimes(4);
        expect(callback).toHaveBeenNthCalledWith(1, "0,4,NORTH");
        expect(callback).toHaveBeenNthCalledWith(2, "4,4,EAST");
        expect(callback).toHaveBeenNthCalledWith(3, "4,0,SOUTH");
        expect(callback).toHaveBeenNthCalledWith(4, "0,0,WEST");
    });

    test("More movement tests", () => {
        const commands = [
            "PLACE 1,2,NORTH",
            "MOVE",
            "MOVE",
            "LEFT",
            "MOVE",
            "REPORT",
            "RIGHT",
            "RIGHT",
            "MOVE",
            "MOVE",
            "MOVE",
            "MOVE",
            "MOVE",
            "MOVE",
            "MOVE",
            "REPORT",
            "RIGHT",
            "MOVE",
            "MOVE",
            "MOVE",
            "MOVE",
            "MOVE",
            "MOVE",
            "REPORT"
        ]

        runCommands(commands, testContext);

        expect(callback).toHaveBeenCalledTimes(3);
        expect(callback).toHaveBeenNthCalledWith(1, "0,4,WEST");
        expect(callback).toHaveBeenNthCalledWith(2, "4,4,EAST");
        expect(callback).toHaveBeenNthCalledWith(3, "4,0,SOUTH");
    })
})