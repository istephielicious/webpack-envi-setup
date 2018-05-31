import {Employee} from "./Employee";

class Message {
    private subject : string;
    private body : string;
    private from : Employee;
    private to_employees : Employee[];
    private date : Date;
    
    constructor() {
        this.subject = "";
        this.body = "";
        this. date = new Date();
    }

    //setters.
    setSubj(subj:string) {
        this.subject = subj;
    }
    setBody(body:string) {
        this.body = body;
    }
    setDate(dt:Date) {
        this.date = dt;
    }
    //getters.
    getSubj() :string {
        return this.subject;
    }
    getBody() :string {
        return this.body;
    }
    getDate() :Date {
        return this.date;
    }

}