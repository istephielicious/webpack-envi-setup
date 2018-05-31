import {Employee} from "./Employee";
import {printLog} from "./Logger";
import { Model } from "./Model";
import { Controller } from "./Controller";
import { View } from "./View";

var emp1: Employee = new Employee("Marie Stephanie", "Alesna", "s.alesna@netsystem.cz");

 var model :Model = new Model(emp1),
    view = new View(model, {
            'empTbl': $('#displayEmp')
    }),
     controller = new Controller(model,view);
view.display();

// console.log(emp1.printInfo());