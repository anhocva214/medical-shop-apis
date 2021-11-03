import { Form } from '@models/form.model';
import { User } from '@models/user.model';


interface IErrorForm {
    [key: string]: string[]
}




export class ValidateService{
    private form: any;
    public errors: IErrorForm

    constructor(form: any){
        this.form = form;
        this.errors = {}
    }

    private addErrorForm = (newError: { [key: string]: string }) => {
        let newKey: string = Object.keys(newError)[0]
        if (!!this.errors[newKey]) {
            this.errors[newKey].push(newError[newKey])
        }
        else {
            this.errors[newKey] = [newError[newKey]]
        }
        return this.errors
    }

    private validateEmail(){
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!this.form.email) {
            this.errors = this.addErrorForm({ email: "Email is required" })
        }
        else if (!re.test(String(this.form.email).toLowerCase())){
            this.errors = this.addErrorForm({email: "Email invalid"})
        }
    }

    private validatePassword(){
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/;
        const pw = this.form.password;

        if (!this.form.password){
            this.errors = this.addErrorForm({password: "Password is required"})
        }
        if (!/^.{5,}$/.test(pw)){
            this.errors = this.addErrorForm({password: "Password needs to be longer than 4 characters"})
        }
        if (!/^(?=.*[a-z])/.test(pw)){
            this.errors = this.addErrorForm({password: "Password contains lowercase letters"})
        }
        if (!/^(?=.*[A-Z])/.test(pw)){
            this.errors =this.addErrorForm({password: "Passwords contains uppercase letters"})
        }
        if (!/^(?=.*\d)/.test(pw)){
            this.errors = this.addErrorForm({password: "Password contains digits"})
        }
        if (!/^(?=.*(\W|_))/.test(pw)){
            this.errors = this.addErrorForm({password: "Password contains special characters"})
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

    invalid(keys: string[]){
        keys.forEach(key => {
            if (!this.form[key]) 
                this.errors = this.addErrorForm({[key]: ":key invalid".replace(":key", key[0].toUpperCase()+key.slice(1, key.length))})
        })
    }

    hasError(): boolean{
        if (Object.keys(this.errors).length > 0) return true;
        else return false
    }

}