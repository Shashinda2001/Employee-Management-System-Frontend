import { AbstractControl,ValidationErrors } from "@angular/forms";

export class noSpace{
    static noSpaceValidations(Control :AbstractControl): ValidationErrors | null {
        let controlValue = Control.value as string;

        if(controlValue.indexOf(' ')>=0){
            return {noSpaceValidations:true}
        }
        else{
            return null
        }
    }
}