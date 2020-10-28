import Robot from "../../../domain/robot";
import React from "react";
import styled from "styled-components";

type WrapperProps = {
    rotate: number
}

const RobotWrapper = styled.div<WrapperProps>`
    font-size: 5vw;
    transform: ${props => "rotate(" + props.rotate + "deg)"};
`

type RobotProps = {
    robot: Robot
}

export default class RobotComponent extends React.Component<RobotProps> {
    constructor(props : RobotProps) {
        super(props);
    }

    render(): JSX.Element {
        return <RobotWrapper rotate={this.props.robot.direction * 90}>🤖</RobotWrapper>
    }
}