import {left, right, RobotDirection} from "./direction";

describe ("Direction tests", () => {
    describe("left()", () => {
        test("North returns West", () => {
            expect(left(RobotDirection.NORTH)).toBe(RobotDirection.WEST)
        })
        test("East returns North", () => {
            expect(left(RobotDirection.EAST)).toBe(RobotDirection.NORTH)
        })
        test("South returns East", () => {
            expect(left(RobotDirection.SOUTH)).toBe(RobotDirection.EAST)
        })
        test("West returns South", () => {
            expect(left(RobotDirection.WEST)).toBe(RobotDirection.SOUTH)
        })
    })
    describe("right()", () => {
        test("North returns East", () => {
            expect(right(RobotDirection.NORTH)).toBe(RobotDirection.EAST)
        })
        test("East returns South", () => {
            expect(right(RobotDirection.EAST)).toBe(RobotDirection.SOUTH)
        })
        test("South returns West", () => {
            expect(right(RobotDirection.SOUTH)).toBe(RobotDirection.WEST)
        })
        test("West returns North", () => {
            expect(right(RobotDirection.WEST)).toBe(RobotDirection.NORTH)
        })
    })
})