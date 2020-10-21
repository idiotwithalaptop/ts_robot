import Robot, {ROBOT_CHANGED_EVENT} from "./robot"
import {RobotDirection} from "./direction";

describe("Robot domain object", () => {
    let testRobot: Robot;

    beforeEach(() => {
        testRobot = new Robot(4, 4);
    })

    describe("is not placed", () => {
        test("left() has no effect", () => {
            expect(testRobot.left()).toBe(testRobot);
        })

        test("right() has no effect", () => {
            expect(testRobot.right()).toBe(testRobot);
        })

        test("move() has no effect", () => {
            expect(testRobot.move()).toBe(testRobot);
        })

        describe("place()", () => {
            test("places the robot correctly", () => {
                const result = testRobot.place(1, 3, RobotDirection.WEST)
                expect(result.x).toBe(1);
                expect(result.y).toBe(3);
                expect(result.direction).toBe(RobotDirection.WEST);
            })

            test("emits robot changed event", () => {
                const callback = jest.fn();
                testRobot.addListener(ROBOT_CHANGED_EVENT, callback);

                const result = testRobot.place(1, 2, RobotDirection.EAST);

                expect(callback).toHaveBeenCalledTimes(1);
                expect(callback).toHaveBeenCalledWith(result);
            })
        })
    })

    describe("is placed", () => {
        beforeEach(() => {
            testRobot = testRobot.place(1, 1, RobotDirection.NORTH);
        })

        describe("and is immutable", () => {
            test("left()", () => {
                const robotBefore = testRobot.place(0, 0, RobotDirection.NORTH);
                const robotAfter = robotBefore.left();
                expect(robotBefore).not.toBe(robotAfter);
            })

            test("right()", () => {
                const robotBefore = testRobot.place(0, 0, RobotDirection.NORTH);
                const robotAfter = robotBefore.right();
                expect(robotBefore).not.toBe(robotAfter);
            })
        })

        describe("place()", () => {
            test("places the robot correctly", () => {
                const result = testRobot.place(1, 3, RobotDirection.WEST)
                expect(result.x).toBe(1);
                expect(result.y).toBe(3);
                expect(result.direction).toBe(RobotDirection.WEST);
            })

            test("emits robot changed event", () => {
                const callback = jest.fn();
                testRobot.addListener(ROBOT_CHANGED_EVENT, callback);

                const result = testRobot.place(1, 2, RobotDirection.EAST);

                expect(callback).toHaveBeenCalledTimes(1);
                expect(callback).toHaveBeenCalledWith(result);
            })
        })

        describe("left()", () => {
            function testLeft(initialDirection: RobotDirection, expectedDirection: RobotDirection) {
                testRobot = testRobot.place(0, 0, initialDirection).left();
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

            test("emits robot changed event", () => {
                const callback = jest.fn();
                testRobot.addListener(ROBOT_CHANGED_EVENT, callback);

                const result = testRobot.left();

                expect(callback).toHaveBeenCalledTimes(1);
                expect(callback).toHaveBeenCalledWith(result);
            })
        })

        describe("right()", () => {
            function testRight(initialDirection: RobotDirection, expectedDirection: RobotDirection) {
                const testRobot = new Robot(0, 0).place(0, 0, initialDirection).right();
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

            test("emits robot changed event", () => {
                const callback = jest.fn();
                testRobot.addListener(ROBOT_CHANGED_EVENT, callback);

                const result = testRobot.right();

                expect(callback).toHaveBeenCalledTimes(1);
                expect(callback).toHaveBeenCalledWith(result);
            })
        })

        describe("move()", () => {
            test("emits robot changed event", () => {
                const callback = jest.fn();
                testRobot.addListener(ROBOT_CHANGED_EVENT, callback);

                const result = testRobot.move();

                expect(callback).toHaveBeenCalledTimes(1);
                expect(callback).toHaveBeenCalledWith(result);
            })

            describe("Facing east", () => {
                let newRobot;
                beforeEach(() => {
                    testRobot = testRobot.place(1, 1, RobotDirection.EAST)
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
                    testRobot = testRobot.place(1, 1, RobotDirection.SOUTH)
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
                    testRobot = testRobot.place(1, 1, RobotDirection.WEST)
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
                    testRobot = testRobot.place(1, 1, RobotDirection.NORTH)
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

            describe("Boundary Tests", () => {
                test("On top boundary facing north, has no effect", () => {
                    testRobot = testRobot.place(3, 4, RobotDirection.NORTH);
                    expect(testRobot.move()).toBe(testRobot)
                })

                test("On left boundary facing west, has no effect", () => {
                    testRobot = testRobot.place(0, 3, RobotDirection.WEST);
                    expect(testRobot.move()).toBe(testRobot)
                })

                test("On right boundary facing east, has no effect", () => {
                    testRobot = testRobot.place(4, 3, RobotDirection.EAST);
                    expect(testRobot.move()).toBe(testRobot)
                })

                test("On bottom boundary facing south, has no effect", () => {
                    testRobot = testRobot.place(3, 0, RobotDirection.SOUTH);
                    expect(testRobot.move()).toBe(testRobot)
                })

                test("Placing outside of x boundary, has no effect", () => {
                    const result = testRobot.place(5, 4, RobotDirection.NORTH);
                    expect(result).toBe(testRobot);
                })

                test("Placing outside of y boundary, has no effect", () => {
                    const result = testRobot.place(4, 5, RobotDirection.NORTH);
                    expect(result).toBe(testRobot);
                })
            })
        })
    })

})