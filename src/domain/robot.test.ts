import Robot from "./robot"
import {RobotDirection} from "./direction";

describe("Robot domain object", () => {
    let testRobot : Robot;

    beforeEach(() =>{
        testRobot = new Robot(4, 4);
    })

    describe("is not placed", () => {
        test("left() has no effect", () => {
            expect(testRobot.left()).toBe(testRobot);
        })
        test("right() has no effect", () => {
            expect(testRobot.left()).toBe(testRobot);
        })
        test("move() has no effect", () => {
            expect(testRobot.move()).toBe(testRobot);
        })
    })

    describe("is placed", () => {
        beforeEach(() =>{
            testRobot = testRobot.place(1, 1, RobotDirection.NORTH);
        })

        describe("and is immutable", () => {
            test("left()", () => {
                const robotBefore = testRobot.place(0,0, RobotDirection.NORTH);
                const robotAfter = robotBefore.left();
                expect(robotBefore).not.toBe(robotAfter);
            })

            test("right()", () => {
                const robotBefore = testRobot.place(0,0, RobotDirection.NORTH);
                const robotAfter = robotBefore.right();
                expect(robotBefore).not.toBe(robotAfter);
            })
        })

        describe("left()", () => {
           function testLeft(initialDirection : RobotDirection, expectedDirection : RobotDirection) {
                testRobot = testRobot.place(0,0, initialDirection).left();
                expect(testRobot.direction).toBe(expectedDirection);
                expect(testRobot.x).toBe(0);
                expect(testRobot.y).toBe(0);
            }

            test("North returns West", () => {
                testLeft(RobotDirection.NORTH, RobotDirection.WEST);
            })

            test("East returns North", () => {
                testLeft(RobotDirection.EAST, RobotDirection.NORTH);
            })

            test("South returns East", () => {
                testLeft(RobotDirection.SOUTH, RobotDirection.EAST);
            })

            test("West returns South", () => {
                testLeft(RobotDirection.WEST, RobotDirection.SOUTH);
            })
        })

        describe("right()", () => {
            function testRight(initialDirection : RobotDirection, expectedDirection : RobotDirection) {
                const testRobot = new Robot(0, 0).place(0,0, initialDirection).right();
                expect(testRobot.direction).toBe(expectedDirection);
                expect(testRobot.x).toBe(0);
                expect(testRobot.y).toBe(0);
            }

            test("North returns East", () => {
                testRight(RobotDirection.NORTH, RobotDirection.EAST);
            })

            test("East returns South", () => {
                testRight(RobotDirection.EAST, RobotDirection.SOUTH);
            })

            test("South returns West", () => {
                testRight(RobotDirection.SOUTH, RobotDirection.WEST);
            })

            test("West returns North", () => {
                testRight(RobotDirection.WEST, RobotDirection.NORTH);
            })
        })

        describe("move()", () => {
            describe("Facing east", () => {
                let newRobot;
                beforeEach(() => {
                    testRobot = testRobot.place(1,1,RobotDirection.EAST)
                    newRobot = testRobot.move()
                })

                test("Moves x + 1", () => {
                    expect(newRobot.x).toBe(testRobot.x + 1);
                })

                test("Y unaffected", () => {
                    expect(newRobot.y).toBe(testRobot.y);
                })

                test("direction unaffected", () => {
                    expect(newRobot.direction).toBe(testRobot.direction);
                })
            })

            describe("Facing south", () => {
                let newRobot;
                beforeEach(() => {
                    testRobot = testRobot.place(1,1,RobotDirection.SOUTH)
                    newRobot = testRobot.move()
                })

                test("Moves y - 1", () => {
                    expect(newRobot.y).toBe(testRobot.y - 1);
                })

                test("X unaffected", () => {
                    expect(newRobot.x).toBe(testRobot.x);
                })

                test("direction unaffected", () => {
                    expect(newRobot.direction).toBe(testRobot.direction);
                })
            })

            describe("Facing west", () => {
                let newRobot;
                beforeEach(() => {
                    testRobot = testRobot.place(1,1,RobotDirection.WEST)
                    newRobot = testRobot.move()
                })

                test("Moves x - 1", () => {
                    expect(newRobot.x).toBe(testRobot.x - 1);
                })

                test("Y unaffected", () => {
                    expect(newRobot.y).toBe(testRobot.y);
                })

                test("direction unaffected", () => {
                    expect(newRobot.direction).toBe(testRobot.direction);
                })
            })

            describe("Facing North", () => {
                let newRobot;
                beforeEach(() => {
                    testRobot = testRobot.place(1,1,RobotDirection.NORTH)
                    newRobot = testRobot.move()
                })

                test("Moves y + 1", () => {
                    expect(newRobot.y).toBe(testRobot.y + 1);
                })

                test("X unaffected", () => {
                    expect(newRobot.x).toBe(testRobot.x);
                })

                test("direction unaffected", () => {
                    expect(newRobot.direction).toBe(testRobot.direction);
                })
            })
        })
    })

})