import Context from "./context";
import {RobotDirection} from "./direction";

describe("Context", () => {
    describe("AddRobot()", () => {
        test("Newly added robot fetchable", () => {
            const testContext = new Context(4,4);
            const addedRobot = testContext.addRobot();
            expect(testContext.robot).toBe(addedRobot);
        })

        test("Added robot placement maintained in context", () => {
            const testContext = new Context(4,4);
            const robot = testContext.addRobot().place(1,1,RobotDirection.NORTH);

            expect(robot.x).toBe(testContext.robot.x);
            expect(robot.y).toBe(testContext.robot.y);
            expect(robot.direction).toBe(testContext.robot.direction);
        })
    })
})