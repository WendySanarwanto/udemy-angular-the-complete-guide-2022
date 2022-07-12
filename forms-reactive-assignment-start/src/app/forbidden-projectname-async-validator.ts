import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ForbiddenProjectNameAsyncValidator implements AsyncValidator {
    validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        //Add your own Validator which doesn't allow "Test" as a Project Name
        const promise = new Promise<ValidationErrors|null>((resolve, reject)=>{
            setTimeout(() => {
                if (control.value?.includes('Test') ){
                    resolve({'projectnameTestIsForbidden': true});
                } else {
                    resolve(null);
                }
            }, 2000);
        });

        return promise;
    }
}