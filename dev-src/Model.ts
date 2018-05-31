import {Employee} from "./Employee";
import {Event} from "./Event";

export class Model {
     employee :Employee[];
     selectedIndx : number = -1;

    //Events.
    public newEmpadded :Event = new Event(this);
    public empEdited :Event = new Event(this);
    public empSearched :Event = new Event(this);

    constructor (emp:Employee) {
        this.employee.push(emp);
    }
    
    getEmployees() : Employee[] {
        return this.employee;
    }
    addEmployee (emp: Employee) {
        this.employee.push(emp);
    }
    setEmpSelectedIndx (ndx: number) {
        this.selectedIndx = ndx;
    }
    // getEmpSelectedIndx : () => number = function() :number{
    getEmpSelectedIndx () :number{
        
        return this.selectedIndx;
    }
    editEmployee (emp: Employee) {
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
        var srchResult : Employee[];
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