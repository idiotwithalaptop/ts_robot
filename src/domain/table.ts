export default class Table {
    private readonly _width : number;
    private readonly _length : number;

    constructor(width : number, length : number) {
        this._width = width;
        this._length = length;
    }

    get width() : number {
        return this._width;
    }

    get length() : number {
        return this._length;
    }


}