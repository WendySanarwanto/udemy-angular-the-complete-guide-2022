import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

const forbiddenEmailDomains: string[] = ['@test.com', 'gmail.com', 'yahoo.com'];

@Injectable({ providedIn: 'root' })
export class ForbiddenEmailAsyncValidator implements AsyncValidator {
    validate(control: AbstractControl): Promise<ValidationErrors|null> | Observable<ValidationErrors|null> {
        const promise = new Promise<any>((resolve, reject) => {
            setTimeout(() => {
              if (control.value && forbiddenEmailDomains.findIndex(value => control.value.includes(value)) !== -1 ) {
                resolve({'emailIsForbidden': true});
              } else {
                resolve(null);
              }
            }, 1500)
          });
        return promise;
    }

    registerOnValidatorChange?(fn: () => void): void {
        throw new Error("Method not implemented.");
    }

}