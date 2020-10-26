import { createInterface } from "readline";
import {processCommand} from "./command/commandProcessor";
import Context from "./domain/context";
import {EventBus} from "./events/eventBus";
import {ROBOT_REPORTED_EVENT} from "./domain/robot";

const stdin = createInterface(process.stdin);

const context = new Context(5,5)
context.addRobot();
stdin.on("line", (line : string) => {
  processCommand(line, context);
});

EventBus.getInstance().register(ROBOT_REPORTED_EVENT, (result : string) => {
  console.log(result);
});