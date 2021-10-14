import { Form } from '@models/form.model';
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



export class ValidateService{
    private form: Form;
    private errors: IErrorForm

    constructor(form: any){
        this.form = new Form(form);
        this.errors = {}
    }

    private validateEmail(){
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!this.form.email) {
            this.errors = addErrorForm(this.errors, { email: "Email is required" })
        }
        else if (!re.test(String(this.form.email).toLowerCase())){
            this.errors = addErrorForm(this.errors, {email: "Email invalid"})
        }
    }

    private validatePassword(){
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/;
        const pw = this.form.password;

        if (!this.form.password){
            this.errors = addErrorForm(this.errors, {password: "Password is required"})
        }
        if (!/^.{5,}$/.test(pw)){
            this.errors = addErrorForm(this.errors, {password: "Password needs to be longer than 4 characters"})
        }
        if (!/^(?=.*[a-z])/.test(pw)){
            this.errors = addErrorForm(this.errors, {password: "Password contains lowercase letters"})
        }
        if (!/^(?=.*[A-Z])/.test(pw)){
            this.errors = addErrorForm(this.errors, {password: "Passwords contains uppercase letters"})
        }
        if (!/^(?=.*\d)/.test(pw)){
            this.errors = addErrorForm(this.errors, {password: "Password contains digits"})
        }
        if (!/^(?=.*(\W|_))/.test(pw)){
            this.errors = addErrorForm(this.errors, {password: "Password contains special characters"})
        }
    }

    formLogin(): IErrorForm{
        this.validateEmail()
        return this.errors
    }

    formRegister(): IErrorForm{
        this.validateEmail()
        this.validatePassword()
        return this.errors
    }

}