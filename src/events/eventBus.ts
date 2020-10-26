import { EventEmitter } from 'events'
import {Event} from "./event";

export class EventBus {
    private static INSTANCE: EventBus;
    private readonly _eventEmitter: EventEmitter;
    private constructor() {
        this._eventEmitter = new EventEmitter();
    }

    public static getInstance(): EventBus {
        if(!EventBus.INSTANCE) {
            EventBus.INSTANCE = new EventBus();
        }
        return EventBus.INSTANCE;
    }

    public register<T>(event : Event<T>, callback : (payload : T) => void ): void {
        this._eventEmitter.addListener(event.name, callback)
    }

    public emit<T>(event : Event<T>, payload : T): void {
        this._eventEmitter.emit(event.name, payload);
    }
}