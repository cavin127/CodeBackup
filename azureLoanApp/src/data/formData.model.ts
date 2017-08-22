export class FormData {
    stateList: string = '';
    work : string = '';
    sal: number;
    loanamt: number;
    street: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';
    

    
    clear() {
        this.stateList = '';
        this.work = '';
        this.sal;
        this.loanamt;
       
    }
}

export class Personal {
    stateList: string = '';
    work : string = '';
    sal: number;
    loanamt: number;
}

export class Address {
    street: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';
}