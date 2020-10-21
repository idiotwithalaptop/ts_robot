import {Command, LeftCommand, MoveCommand, PlaceCommand, ReportCommand, RightCommand} from "./command";
import {mocked} from "ts-jest/utils";
import Robot from "../domain/robot";
import Context from "../domain/context";
import {RobotDirection} from "../domain/direction";
jest.mock("../domain/robot");

describe("CommandTests", () => {
    let testCommand : Command;
    const describeZeroArgsValidityTests = () => {
        test("test empty args return true", () => {
            expect(testCommand.isValid("")).toBe(true);
        });

        test("whitespace args return true", () => {
            expect(testCommand.isValid("\t\n ")).toBe(true);
        });

        test("non-whitespace args return false", () => {
            expect(testCommand.isValid("abc")).toBe(false);
        });

        test("null args return true", () => {
            expect(testCommand.isValid(null)).toBe(true);
        });

        test("undefined args return true", () => {
            expect(testCommand.isValid(undefined)).toBe(true);
        });
    }
    describe("LeftCommand", () => {
        beforeEach(() => {
            testCommand = LeftCommand;
        });

        describe("isValid", describeZeroArgsValidityTests);

        describe("run()", () => {
            test("calls left on robot", () => {
                const testContext = new Context(4,4);
                const mockRobot = mocked(new Robot(4,4), true);
                jest.spyOn(testContext, "robot", "get").mockReturnValue(mockRobot);

                testCommand.run("", testContext);

                expect(mockRobot.left).toHaveBeenCalledTimes(1);
            });
        })
    });

    describe("RightCommand", () => {
        beforeEach(() => {
            testCommand = RightCommand;
        });

        describe("isValid", describeZeroArgsValidityTests);

        describe("run()", () => {
            test("calls right on robot", () => {
                const testContext = new Context(4,4);
                const mockRobot = mocked(new Robot(4,4), true);
                jest.spyOn(testContext, "robot", "get").mockReturnValue(mockRobot);

                testCommand.run("", testContext);

                expect(mockRobot.right).toHaveBeenCalledTimes(1);
            });
        })
    });

    describe("MoveCommand", () => {
        beforeEach(() => {
            testCommand = MoveCommand;
        });

        describe("isValid", describeZeroArgsValidityTests);

        describe("run()", () => {
            test("calls move on robot", () => {
                const testContext = new Context(4,4);
                const mockRobot = mocked(new Robot(4,4), true);
                jest.spyOn(testContext, "robot", "get").mockReturnValue(mockRobot);

                testCommand.run("", testContext);

                expect(mockRobot.move).toHaveBeenCalledTimes(1);
            });
        })
    });

    describe("ReportCommand", () => {
        beforeEach(() => {
            testCommand = ReportCommand;
        });

        describe("isValid", describeZeroArgsValidityTests);

        describe("run()", () => {
            test("calls report on robot", () => {
                const testContext = new Context(4,4);
                const mockRobot = mocked(new Robot(4,4), true);
                jest.spyOn(testContext, "robot", "get").mockReturnValue(mockRobot);

                testCommand.run("", testContext);

                expect(mockRobot.report).toHaveBeenCalledTimes(1);
            });
        })
    });

    describe("PlaceCommand", () => {
        beforeEach(() => {
            testCommand = PlaceCommand;
        });

        describe("isValid", () => {
            test("null args invalid", () => {
                expect(testCommand.isValid(null)).toBe(false);
            })

            test("undefined args invalid", () => {
                expect(testCommand.isValid(undefined)).toBe(false);
            })

            test("empty args invalid", () => {
                expect(testCommand.isValid("")).toBe(false);
            })

            test("whitespace args invalid", () => {
                expect(testCommand.isValid("\t\n ")).toBe(false);
            })

            test("Missing X invalid", () => {
                expect(testCommand.isValid(",2,NORTH")).toBe(false);
            })

            test("Missing Y invalid", () => {
                expect(testCommand.isValid("1,,NORTH")).toBe(false);
            })

            test("Missing Direction invalid", () => {
                expect(testCommand.isValid("1,2,")).toBe(false);
                expect(testCommand.isValid("1,2")).toBe(false);
            })

            test("Non numeric X invalid", () => {
                expect(testCommand.isValid("X,2,NORTH")).toBe(false);
            })

            test("Non numeric Y invalid", () => {
                expect(testCommand.isValid("1,Y,NORTH")).toBe(false);
            })

            test("Random direction invalid", () => {
                expect(testCommand.isValid("A,2,WACCA")).toBe(false);
            })

            test("Decimal X, Integer Y and valid direction is invalid", () => {
                expect(testCommand.isValid("1.3,2,NORTH")).toBe(false);
            })

            test("Integer X, Decimal Y and valid direction is invalid", () => {
                expect(testCommand.isValid("1,2.07,NORTH")).toBe(false);
            })

            test("Integer X, Integer Y and valid direction is valid", () => {
                expect(testCommand.isValid("1,2,NORTH")).toBe(true);
                expect(testCommand.isValid("1,2,EAST")).toBe(true);
                expect(testCommand.isValid("1,2,SOUTH")).toBe(true);
                expect(testCommand.isValid("1,2,WEST")).toBe(true);
            })
        });

        describe("run()", () => {
            test("calls place on robot with correct args", () => {
                const testContext = new Context(4,4);
                const mockRobot = mocked(new Robot(4,4), true);
                jest.spyOn(testContext, "robot", "get").mockReturnValue(mockRobot);

                testCommand.run("1,2,NORTH", testContext);

                expect(mockRobot.place).toHaveBeenCalledTimes(1);
                expect(mockRobot.place).toHaveBeenCalledWith(1, 2, RobotDirection.NORTH);
            });
        })
    });
});