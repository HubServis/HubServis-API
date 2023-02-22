import {randomUUID} from 'crypto'

export class User{
    public id: string;
    public name: string;
    public email: string;
    public password: string;

    constructor (props: Omit<User, "id">, id: string = null){
        Object.assign(this, props);
        if(!id){
            this.id = randomUUID();
        }else{
            this.id = id;
        }
    }
}