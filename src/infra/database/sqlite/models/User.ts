import { v4 as uuid } from "uuid";

import {
    Entity,
    Column,
    PrimaryColumn,
} from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    constructor(){
        if(!this.id) { // caso esteja criando um usuário
            this.id = uuid(); // gera um uuid
        }
    }
};