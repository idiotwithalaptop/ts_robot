import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose as farWindowClose } from '@fortawesome/free-regular-svg-icons';
import { faWindowClose as fasWindowClose } from '@fortawesome/free-solid-svg-icons';
import CSS from "csstype";
import {EventBus} from "../../../events/eventBus";
import {ROBOT_REPORTED_EVENT} from "../../../domain/robot";

const History = styled.ol({
    paddingInlineStart: 0,
    marginBlockEnd: 0,
    marginBlockStart: 0
});

const HistoryItem = styled.ul({
    listStyleType: "none",
    margin: 0,
    padding: "0.1em 0",
    height: "1em",
    whiteSpace: "pre"
});

const ConsoleWrapper = styled.div({
    background: "black",
    color: "white",
    padding: 0,
    fontFamily: "monospace, serif;",
    input: {
        fontSize: "1em",
        fontFamily: "monospace, serif;"
    },
    border: "0.2em solid #081BCB",
    borderRadius: "5px",
    paddingBottom: "0.2em"
})

const ConsoleBar = styled.div({
    backgroundColor: "#081BCB",
    width: "100%",
    textAlign: "center",
    padding: "0.2em 0"
})

const ConsoleButtons = styled.div({
    display: "inline-block",
    float: "right"
})

const ConsoleInput = styled.input({
    background: "transparent",
    border: "none",
    color: "white",
    marginLeft: "0.5em",
    ":focus": {
        outline: "none"
    },
    width: "calc(100% - 2em)"
})

type ConsoleProps = {
    onCommandSubmitted: (command: string) => void,
    noOfLines: number
}

type ConsoleState = {
    currentCommand: string,
    commandHistory: string[]
}

export default class Console extends React.Component<ConsoleProps, ConsoleState> {
    constructor(props : ConsoleProps) {
        super(props);
        this.state = {
            currentCommand: "",
            commandHistory: []
        };
        this.handleCommandChange = this.handleCommandChange.bind(this);
        this.handleCommandSubmitted = this.handleCommandSubmitted.bind(this);
        this.handleReport = this.handleReport.bind(this);
        EventBus.getInstance().register(ROBOT_REPORTED_EVENT, this.handleReport)
    }

    handleCommandChange(event : React.ChangeEvent<HTMLInputElement>) : void {
        this.setState({
            currentCommand: event.target.value
        });
    }

    handleCommandSubmitted(event: React.KeyboardEvent) : void {
        if(event.key.toUpperCase() === "ENTER") {
            const submittedCommand = this.state.currentCommand;

            this.setState({
                currentCommand: "",
                commandHistory: this.appendCommand(submittedCommand,  this.state.commandHistory, this.props.noOfLines)
            });
            setTimeout(() => {
                this.props.onCommandSubmitted(submittedCommand)
            })
        }
    }

    handleReport(report : string): void {
        this.setState({
            commandHistory: this.appendCommand("   " + report, this.state.commandHistory, this.props.noOfLines)
        })
    }

    private appendCommand(command: string, commands : string[], maxCommands : number) : string[] {
        let commandsClone = [...commands];
        if(commandsClone.length == maxCommands) {
            commandsClone = commandsClone.slice(1);
        }
        commandsClone.push(command);
        return commandsClone;
    }

    render(): JSX.Element {
        const id = "console_input";
        const historyRender =  this.padArray(this.state.commandHistory, this.props.noOfLines, "").map((data) => {
            return <HistoryItem>{data}</HistoryItem>
        });
        const test : CSS.Properties = {
            backgroundColor: "red",
            border: "white 1px solid",
            borderRadius: "3px"
        }
        return <ConsoleWrapper>
            <ConsoleBar>
                Robot Console
                <ConsoleButtons>
                    <FontAwesomeIcon icon={fasWindowClose} mask={farWindowClose} style={test}  />
                </ConsoleButtons>
            </ConsoleBar>
            <History>
                {historyRender}
            </History>
            <label htmlFor={id}>
                &gt;
                <ConsoleInput id={id} value={this.state.currentCommand} onChange={this.handleCommandChange} onKeyUp={this.handleCommandSubmitted}/>
            </label>
        </ConsoleWrapper>;
    }

    private padArray<T>(array: Array<T>, length: number, fill: T) {
        if(array.length >= length) {
            return array;
        }
        return Array(length - array.length).fill(fill).concat(array);
    }
}