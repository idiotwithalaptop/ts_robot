import React from "react";
import styled from "styled-components";

const TextBox = styled.div`
    margin: 0.5em;
    padding: 0.5em;
    position: absolute;
    background: white;
    border: solid 1px black;
    border-radius: 0.5em;
    top: 25%;
    right: 110%;
    font-family: 'Courier New', serif;
    white-space: nowrap;
    z-index: 100;
}
&:before {
    content: "";
    position: absolute;
    left: 100%;
    top: 0.5em;
    border-left: 0.5em solid;
    border-left-color: inherit; 
    border-top: 0.5em solid transparent;
    border-bottom: 0.5em solid transparent; 
}
&:after {
    content: "";
    position: absolute;
    left: 100%;
    top: 0.5em;
    border-left: 0.4em solid;
    border-left-color: white; 
    border-top: 0.5em solid transparent;
    border-bottom: 0.5em solid transparent; 
}`;

type SpeechBubbleProps = {
  text: string;
};

export default class SpeechBubble extends React.Component<SpeechBubbleProps> {
  constructor(props: SpeechBubbleProps) {
    super(props);
  }

  render(): JSX.Element {
    return <TextBox>{this.props.text}</TextBox>;
  }
}
