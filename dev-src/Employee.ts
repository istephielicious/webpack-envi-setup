import { Logger } from "mongodb";
import { PrintLogger, printLog } from "./Logger";

 class Person {
    private _fName : string;
    private _lName : string;
    private _email : string;

    constructor(lName: string, fName: string, email: string) {
        this._fName = fName;
        this._lName = lName;
        this._email = email;
    }

    public getFullName () :string {
        // getFullName : () => string = function () {
        return this._fName + " " + this._lName;
    };
    public printInfo() :string {
        return "PERSONAL DETAILS \n" +
                "Name: "+this.getFullName() +"\n" +
                "Email: "+this._email;
    }
    

    //setters.
    public setFname (str: string) {
        this._fName = str;
    }
    public setLname (str: string) {
        this._lName = str;
    }
    public setEmail (str: string) {
        this._email = str;
    }

    //getters.
    public getFname () :string {
        return this._fName;
    }
    public getLname () :string {
        return this._lName;
    }
    public getEmail () :string {
        return this._email;
    }

 }



export class Employee extends Person implements PrintLogger{

    private _id: number;
    public log: string;

    private static _EMP_COUNTER : number = 0;

    constructor(fname: string, lname: string, email: string) {
        super(lname,fname,email);
        printLog(this, "Create Employee");
        this._id = Employee._EMP_COUNTER++;
    }

    //getter.
    public getID () : number {
        printLog(this, "Employee::getID()");
        return this._id;
    }

    public empCount () :number {

        return Employee._EMP_COUNTER;
    }

    public printInfo() :string {
        printLog(this, "Employee::printInfo()");
        return "EMPLOYEE DETAILS\n" +
                "Name: "+this.getFullName() +"\n" +
                "Email: "+this.getEmail() + "\n" +
                "ID: "+this._id;
    }
}


export class Customer extends Person {
    private _cust_id : number;
    private _cust_address : string;
    private _cust_contact : string;

    constructor(fname: string, lname: string, email: string, cust_id: number) {
        super(lname,fname,email);
        this._cust_id = cust_id;
    }
}

