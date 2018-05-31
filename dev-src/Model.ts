import {Employee} from "./Employee";
import {Event} from "./Event";
//Logger
import { PrintLogger, printLog } from "./Logger";

export class Model implements PrintLogger{
    log: string;
    private employee :Employee[] = [];
    private selectedIndx : number = -1;

    constructor (emp?:Employee) {
        printLog(this, "Model::Create");
        this.employee.push(emp);
    }

    //Events.
    public newEmpadded :Event = new Event(this);
    public empEdited :Event = new Event(this);
    public empSearched :Event = new Event(this);

    getEmployees() : Employee[] {
        printLog(this, "Model:getEmployees()");
        return this.employee;
    }
    addEmployee (emp: Employee) {
        printLog(this, "Model:addEmployee()");
        this.employee.push(emp);
    }
    setEmpSelectedIndx (ndx: number) {
        printLog(this, "Model:setEmpSelectedIndx()");
        this.selectedIndx = ndx;
    }
    // getEmpSelectedIndx : () => number = function() :number{
    getEmpSelectedIndx () :number{
        printLog(this, "Model:getEmpSelectedIndx()");
        return this.selectedIndx;
    }
    editEmployee (emp: Employee) {
        printLog(this, "Model:editEmployee()");
        // editEmployee : (emp: Employee) => void = function (emp: Employee) {
        let ndx = this.getEmpSelectedIndx();
        this.employee[ndx].setFname(emp.getFname());
        this.employee[ndx].setLname(emp.getLname());
        this.employee[ndx].setEmail(emp.getEmail());
        this.setEmpSelectedIndx(-1);

        //notify event.
        this.empEdited.notify({empIndex: ndx, result: true});
    }
    searchEmployee (searchTxt: string) {
        // searchEmployee : (searchTxt: string) => void = function(searchTxt: string) {
        var srchResult : Employee[] =[];
        let itr : number = 0;
        for(;itr< this.employee.length;itr++){
            let fName = this.employee[itr].getFname();
            let lName = this.employee[itr].getLname();
            let email = this.employee[itr].getEmail();
            if(fName.toLowerCase().indexOf(searchTxt) >= 0 ||
                lName.toLowerCase().indexOf(searchTxt) >= 0 ||
                email.toLowerCase().indexOf(searchTxt) >= 0) {
                    // var p = new Employee(fName, lName, email, id);
                    srchResult.push(new Employee(fName, lName, email));
                }

        }
        this.setEmpSelectedIndx(-1);
        //notify event.
        this.empSearched.notify(srchResult);
    }

}