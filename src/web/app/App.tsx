import React from "react";
import Console from "./components/Console";
import Context from "../../domain/context";
import {processCommand} from "../../command/commandProcessor";
import styled from "styled-components";
import Table from "./components/Table";

const AppWrapper = styled.div({
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
})

const AppSection = styled.div({
    width: "46%",
    padding: "2%"
})

type AppState = {
    context: Context
}

class App extends React.Component<unknown, AppState> {
    constructor() {
        super({});
        const context = new Context(5,5);
        context.addRobot();
        this.state = {
            context: context
        }
        this.handleCommand = this.handleCommand.bind(this);
    }

    handleCommand(val : string): void {
        const context = this.state.context;
        processCommand(val, context);
        this.setState({
            context
        });
    }

    render(): JSX.Element {
        return <AppWrapper>
            <AppSection>
                <Console onCommandSubmitted={this.handleCommand} noOfLines={25} />
            </AppSection>
            <AppSection>
                <Table height={5} width={5} context={this.state.context} />
            </AppSection>
        </AppWrapper>
    }
}

export default App;