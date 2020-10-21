import {processCommand} from "./commandProcessor";
import Context from "../domain/context";
import {LeftCommand, MoveCommand, PlaceCommand, ReportCommand, RightCommand} from "./command";
import {mocked} from "ts-jest/utils";
jest.mock("./command")

describe("CommandProcessorTests", () => {
    const testContext = new Context(4,4);
    const placeCommandMock = mocked(PlaceCommand, true);
    const moveCommandMock = mocked(MoveCommand, true);
    const leftCommandMock = mocked(LeftCommand, true);
    const rightCommandMock = mocked(RightCommand, true);
    const reportCommandMock = mocked(ReportCommand, true);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("processCommand()", () => {
        test("Valid PLACE command correctly parsed", () => {
            placeCommandMock.isValid.mockReturnValue(true);

            processCommand("PLACE 4,3,WEST", testContext);

            expect(moveCommandMock.run).toHaveBeenCalledTimes(0);
            expect(leftCommandMock.run).toHaveBeenCalledTimes(0);
            expect(rightCommandMock.run).toHaveBeenCalledTimes(0);
            expect(reportCommandMock.run).toHaveBeenCalledTimes(0);
            expect(placeCommandMock.run).toHaveBeenCalledTimes(1);
            expect(placeCommandMock.run).toHaveBeenCalledWith("4,3,WEST", testContext);
        });
        test("Valid PLACE command with extra whitespaces correctly parsed", () => {
            placeCommandMock.isValid.mockReturnValue(true);

            processCommand("        \tPLACE    4    ,   3   ,    WEST        ", testContext);

            expect(moveCommandMock.run).toHaveBeenCalledTimes(0);
            expect(leftCommandMock.run).toHaveBeenCalledTimes(0);
            expect(rightCommandMock.run).toHaveBeenCalledTimes(0);
            expect(reportCommandMock.run).toHaveBeenCalledTimes(0);
            expect(placeCommandMock.run).toHaveBeenCalledTimes(1);
            expect(placeCommandMock.run).toHaveBeenCalledWith("4,3,WEST", testContext);
        });

        test("Valid MOVE command correctly parsed", () => {
            moveCommandMock.isValid.mockReturnValue(true);

            processCommand("MOVE", testContext);

            expect(placeCommandMock.run).toHaveBeenCalledTimes(0);
            expect(leftCommandMock.run).toHaveBeenCalledTimes(0);
            expect(rightCommandMock.run).toHaveBeenCalledTimes(0);
            expect(reportCommandMock.run).toHaveBeenCalledTimes(0);
            expect(moveCommandMock.run).toHaveBeenCalledTimes(1);
            expect(moveCommandMock.run).toHaveBeenCalledWith("", testContext);
        });

        test("Valid MOVE command with extra whitespaces correctly parsed", () => {
            moveCommandMock.isValid.mockReturnValue(true);

            processCommand("        \tMOVE        ", testContext);

            expect(placeCommandMock.run).toHaveBeenCalledTimes(0);
            expect(leftCommandMock.run).toHaveBeenCalledTimes(0);
            expect(rightCommandMock.run).toHaveBeenCalledTimes(0);
            expect(reportCommandMock.run).toHaveBeenCalledTimes(0);
            expect(moveCommandMock.run).toHaveBeenCalledTimes(1);
            expect(moveCommandMock.run).toHaveBeenCalledWith("", testContext);
        });

        test("Valid LEFT command correctly parsed", () => {
            leftCommandMock.isValid.mockReturnValue(true);

            processCommand("LEFT", testContext);

            expect(moveCommandMock.run).toHaveBeenCalledTimes(0);
            expect(placeCommandMock.run).toHaveBeenCalledTimes(0);
            expect(rightCommandMock.run).toHaveBeenCalledTimes(0);
            expect(reportCommandMock.run).toHaveBeenCalledTimes(0);
            expect(leftCommandMock.run).toHaveBeenCalledTimes(1);
            expect(leftCommandMock.run).toHaveBeenCalledWith("", testContext);
        });

        test("Valid LEFT command with extra whitespaces correctly parsed", () => {
            leftCommandMock.isValid.mockReturnValue(true);

            processCommand("        \tLEFT        ", testContext);

            expect(moveCommandMock.run).toHaveBeenCalledTimes(0);
            expect(placeCommandMock.run).toHaveBeenCalledTimes(0);
            expect(rightCommandMock.run).toHaveBeenCalledTimes(0);
            expect(reportCommandMock.run).toHaveBeenCalledTimes(0);
            expect(leftCommandMock.run).toHaveBeenCalledTimes(1);
            expect(leftCommandMock.run).toHaveBeenCalledWith("", testContext);
        });

        test("Valid RIGHT command correctly parsed", () => {
            rightCommandMock.isValid.mockReturnValue(true);

            processCommand("RIGHT", testContext);

            expect(moveCommandMock.run).toHaveBeenCalledTimes(0);
            expect(placeCommandMock.run).toHaveBeenCalledTimes(0);
            expect(leftCommandMock.run).toHaveBeenCalledTimes(0);
            expect(reportCommandMock.run).toHaveBeenCalledTimes(0);
            expect(rightCommandMock.run).toHaveBeenCalledTimes(1);
            expect(rightCommandMock.run).toHaveBeenCalledWith("", testContext);
        });

        test("Valid RIGHT command with extra whitespaces correctly parsed", () => {
            rightCommandMock.isValid.mockReturnValue(true);

            processCommand("        \tRIGHT        ", testContext);

            expect(moveCommandMock.run).toHaveBeenCalledTimes(0);
            expect(placeCommandMock.run).toHaveBeenCalledTimes(0);
            expect(leftCommandMock.run).toHaveBeenCalledTimes(0);
            expect(reportCommandMock.run).toHaveBeenCalledTimes(0);
            expect(rightCommandMock.run).toHaveBeenCalledTimes(1);
            expect(rightCommandMock.run).toHaveBeenCalledWith("", testContext);
        });

        test("Valid REPORT command correctly parsed", () => {
            reportCommandMock.isValid.mockReturnValue(true);

            processCommand("REPORT", testContext);

            expect(moveCommandMock.run).toHaveBeenCalledTimes(0);
            expect(placeCommandMock.run).toHaveBeenCalledTimes(0);
            expect(rightCommandMock.run).toHaveBeenCalledTimes(0);
            expect(leftCommandMock.run).toHaveBeenCalledTimes(0);
            expect(reportCommandMock.run).toHaveBeenCalledTimes(1);
            expect(reportCommandMock.run).toHaveBeenCalledWith("", testContext);
        });

        test("Valid REPORT command with extra whitespaces correctly parsed", () => {
            reportCommandMock.isValid.mockReturnValue(true);

            processCommand("        \tREPORT        ", testContext);

            expect(moveCommandMock.run).toHaveBeenCalledTimes(0);
            expect(placeCommandMock.run).toHaveBeenCalledTimes(0);
            expect(rightCommandMock.run).toHaveBeenCalledTimes(0);
            expect(leftCommandMock.run).toHaveBeenCalledTimes(0);
            expect(reportCommandMock.run).toHaveBeenCalledTimes(1);
            expect(reportCommandMock.run).toHaveBeenCalledWith("", testContext);
        });
    })
});