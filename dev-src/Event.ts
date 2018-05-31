export class Event {
    private _sender : any;
    private _listeners : any[] = [];

    constructor(sender : any) {
        this._sender = sender;
    }
    attach (listeners:any) {
        this._listeners.push(listeners);            
    }
    notify (args:any) {
        let ndx : number;
        for(ndx = 0; ndx < this._listeners.length; ndx++) {
            this._listeners[ndx](this._sender, args);
        }
    }
}