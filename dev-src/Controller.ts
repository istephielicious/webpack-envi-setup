import { Model } from "./Model";
import { View } from "./View";

export class Controller {
    private model : any;
    private view : any;

    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;

        var _this = this;
        this.view.empModified.attach(function (sender, args) {
            setCurrentIndex(args.currIndx);
        }); 
    }
}
    function setCurrentIndex(ndx: number) {
        this.model.setEmpSelectedIndx(ndx);
    }
