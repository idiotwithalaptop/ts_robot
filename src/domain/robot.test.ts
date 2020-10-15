import Robot from "./robot"
import {RobotDirection} from "./direction";

describe("Robot domain object", () => {
    describe("isImmutable", () => {
        test("left()", () => {
            const robotBefore = new Robot(0, 0, RobotDirection.NORTH);
            const robotAfter = robotBefore.left();
            expect(robotBefore).not.toBe(robotAfter)
        })
        test("right()", () => {
            const robotBefore = new Robot(0, 0, RobotDirection.NORTH);
            const robotAfter = robotBefore.right();
            expect(robotBefore).not.toBe(robotAfter)
        })
    })
    describe("left()", () => {
        function testLeft(initialDirection : RobotDirection, expectedDirection : RobotDirection) {
            const testRobot = new Robot(0, 0, initialDirection).left();
            expect(testRobot.direction).toBe(expectedDirection)
            expect(testRobot.x).toBe(0)
            expect(testRobot.y).toBe(0)
        }
        test("North returns West", () => {
            testLeft(RobotDirection.NORTH, RobotDirection.WEST)
        })
        test("East returns North", () => {
            testLeft(RobotDirection.EAST, RobotDirection.NORTH)
        })
        test("South returns East", () => {
            testLeft(RobotDirection.SOUTH, RobotDirection.EAST)
        })
        test("West returns South", () => {
            testLeft(RobotDirection.WEST, RobotDirection.SOUTH)
        })
    })
    describe("right()", () => {
        function testRight(initialDirection : RobotDirection, expectedDirection : RobotDirection) {
            const testRobot = new Robot(0, 0, initialDirection).right();
            expect(testRobot.direction).toBe(expectedDirection)
            expect(testRobot.x).toBe(0)
            expect(testRobot.y).toBe(0)
        }
        test("North returns East", () => {
            testRight(RobotDirection.NORTH, RobotDirection.EAST)
        })
        test("East returns South", () => {
            testRight(RobotDirection.EAST, RobotDirection.SOUTH)
        })
        test("South returns West", () => {
            testRight(RobotDirection.SOUTH, RobotDirection.WEST)
        })
        test("West returns North", () => {
            testRight(RobotDirection.WEST, RobotDirection.NORTH)
        })
    })
})