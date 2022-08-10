import Robot, { ROBOT_REPORTED_EVENT } from "../../../domain/robot";
import React from "react";
import styled from "styled-components";
import { EventBus } from "../../../events/eventBus";
import SpeechBubble from "./SpeechBubble";

type WrapperProps = {
  rotate: number;
};

const RobotWrapper = styled.div`
  position: relative;
`;

const RobotElement = styled.div<WrapperProps>`
  font-size: 5vw;
  transform: ${(props) => "rotate(" + props.rotate + "deg)"};
  cursor: pointer;
`;

type RobotProps = {
  robot: Robot;
};

type RobotState = {
  text: string;
  clickMessage: number;
};

const clickMessages = [
  "Hello!",
  "What?",
  "What is it?",
  "Stop!",
  "Stop Pokinng Me!",
  "Why are you still poking me!?",
];

export default class RobotComponent extends React.Component<
  RobotProps,
  RobotState
> {
  constructor(props: RobotProps) {
    super(props);
    this.state = { text: "", clickMessage: 0 };
    this.handleReport = this.handleReport.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(): void {
    EventBus.getInstance().register(ROBOT_REPORTED_EVENT, this.handleReport);
  }

  componentWillUnmount(): void {
    EventBus.getInstance().deregister(ROBOT_REPORTED_EVENT, this.handleReport);
  }

  handleClick(): void {
    if (!window.speechSynthesis.speaking) {
      window.speechSynthesis.speak(
        new SpeechSynthesisUtterance(clickMessages[this.state.clickMessage])
      );
      this.setState({
        clickMessage: (this.state.clickMessage + 1) % clickMessages.length,
      });
    }
  }

  render(): JSX.Element {
    return (
      <RobotWrapper>
        {this.state.text && this.state.text.length > 0 ? (
          <SpeechBubble text={this.state.text}></SpeechBubble>
        ) : null}
        <RobotElement
          rotate={this.props.robot.direction * 90}
          onClick={this.handleClick}
        >
          🤖
        </RobotElement>
      </RobotWrapper>
    );
  }

  handleReport(text: string): void {
    console.log("HANDLE REPORT CALLED");
    const message = "I am at " + text;
    this.setState({ text: message });
    const speech = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(speech);
  }
}
