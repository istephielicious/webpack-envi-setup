import {Employee} from "./Employee";
import {Model} from "./Model";
import {Event} from "./Event";
//Logger
import { PrintLogger, printLog } from "./Logger";


export class View implements PrintLogger{
    log: string;
    private model : Model = null;
    private elements :any = {};

    //Events.
    public empModified : Event = new Event(this);
    public addEmpButtonClicked :Event = new Event(this);
    public updateEmpButtonClicked :Event = new Event(this);
    public searchEmpKeypressed :Event = new Event(this);
    public resetButtonClicked :Event = new Event(this);

    constructor(mdel: Model, elements: any) {
        printLog(this, "View::Create");
        this.model = mdel;
        this.elements = elements;
    
        var _this = this;
        // Attach model listeners.
        this.model.newEmpadded.attach(function() {
            
            _this.updateEmpTable();
        });
        this.elements.empTbl.puidatatable({
            caption: "Employee List",
            columns: [
                {field: 'fName', headerText: 'First Name'},
                {field: 'lName', headerText: 'Last Name'},
                {field: 'email', headerText: 'Email'}
            ],
            selectionMode: 'single',
            datasource: _this.model.getEmployees(),
            rowSelect: 
            function(event:any, personalInfo:any) {
                var currIndx = personalInfo.empIndex;
                if(currIndx == undefined) {
                    currIndx = -1;
                    _this.empModified.notify({event, currIndx});
                }
                else{
                    _this.displayEmpSelected(personalInfo);
                    _this.empModified.notify({event, currIndx});
                } 
                
            },
            rowUnselect:
            function(event:any, personalInfo:any) {
                var currIndx = -1;
                _this.removeEmpUnselected();
                _this.empModified.notify({event, currIndx});
            }
        });
    }
    public display() {
        printLog(this, "View::display");
        this.updateEmpTable();
    }

    public updateEmpTable() {
        printLog(this, "View::updateEmpTable");
        var table :any = this.elements.empTbl;
        table.puidatatable('option','datasource', this.model.getEmployees());
        table.puidatatable('reload');
    }
    public displayEmpSelected(personalInfo: Employee) {
        printLog(this, "View::displayEmpSelected");
        //Display Selected Employee info.
        this.elements.btnEmpEdit.attr("disabled", false);
        this.elements.btnAddEmp.attr("disabled", true); 
        this.elements.txtFname.val(personalInfo.getFname());
        this.elements.txtLname.val(personalInfo.getLname());
        this.elements.txtEmail.val(personalInfo.getEmail());
    }
    public removeEmpUnselected() {
        printLog(this, "View::removeEmpUnselected");
        this.resetFields();     
    }
    public resetFields () {
        this.elements.btnEmpEdit.attr("disabled", true);
        this.elements.btnAddEmp.attr("disabled", false); 
        this.elements.txtFname.val("");
        this.elements.txtLname.val("");
        this.elements.txtEmail.val("");
    }


}