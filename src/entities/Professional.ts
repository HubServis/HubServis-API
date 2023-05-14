import {v4 as uuid} from 'uuid'

export class Professional{
    public id: string;
    public name?: string;
    public cpfcnpj?: string;
    public isRegistred: boolean;

    constructor (props: Omit<Professional, "id">, id: string = null){
        Object.assign(this, props);
        if(!id){
            this.id = uuid();
        }else{ 
            this.id = id;
        }
    }
}
