import Context from "../domain/context";
import {Command, LeftCommand, MoveCommand, PlaceCommand, RightCommand} from "./command";

type CommandMap = {
    [key in string]: Command;
};

const COMMAND_LOOKUP : CommandMap = {
    "LEFT": LeftCommand,
    "RIGHT": RightCommand,
    "MOVE": MoveCommand,
    "PLACE": PlaceCommand
}

const COMMAND_REGEX = new RegExp(/^\s*(\S+)(.*)/);
export function processCommand(fullCommandStr : string, context : Context) : void {
    const parsedCommand = COMMAND_REGEX.exec(fullCommandStr);
    const commandName = parsedCommand[1];
    const args = sanitiseArgs(parsedCommand[2]);
    const command = COMMAND_LOOKUP[commandName];
    if (command && command.isValid(args)) {
        command.run(args, context);
    }
}

function sanitiseArgs(args : string) : string {
    if(args) {
        return args.replace(/\s/g,"");
    }
    return args;
}