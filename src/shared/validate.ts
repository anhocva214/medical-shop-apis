import { User } from '@models/user.model';


interface IErrorForm {
    [key: string]: string[]
}

const addErrorForm = (errors: IErrorForm, newError: { [key: string]: string }) => {
    let newKey: string = Object.keys(newError)[0]
    if (!!errors[newKey]) {
        errors[newKey].push(newError[newKey])
    }
    else {
        errors[newKey] = [newError[newKey]]
    }
    return errors
}

export const formValidate = (form: any): IErrorForm => {
    const user = new User(form);
    var errors: IErrorForm = {}

    if (!user.email) {
        errors = addErrorForm(errors, { email: "Email is required" })
    }

    if (!user.password) {
        errors = addErrorForm(errors, { password: "Password is required" })
    }
    else if (user.password.length <= 4) {
        errors = addErrorForm(errors, { password: "Minimum password length is 4" })
    }

    return errors
}


export class FormValidate{
    private form: any;

    constructor(form: any){
        this.form = form
    }

    
}