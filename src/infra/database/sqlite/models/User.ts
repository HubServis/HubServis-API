// import { v4 as uuid } from "uuid";

// import {
//     Entity,
//     Column,
//     PrimaryColumn,
// } from "typeorm";

// @Entity()
// export class User {
//     @PrimaryColumn()
//     readonly id: string;

//     @Column()
//     name: string

//     @Column()
//     email: string

//     @Column()
//     password: string

//     constructor(){
//         if(!this.id) { // caso esteja criando um usuário
//             this.id = uuid(); // gera um uuid
//         }
//     }
// };

import { Column, ManyToMany, JoinTable, Entity } from "typeorm";
import Role from "./Role";
import Permission from "./Permission";
import { BaseEntity } from "./BaseEntity";

@Entity("users")
export class User extends BaseEntity {
    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string

    @ManyToMany(() => Role)
    @JoinTable({
        name: "users_roles", //nome tabela pivo
        joinColumns: [{name: "user_id"}],
        inverseJoinColumns: [{name: "role_id"}]
    })
    roles: Role[];

    @ManyToMany(() => Permission)
    @JoinTable({
        name: "users_permissions", //nome tabela pivo
        joinColumns: [{name: "user_id"}],
        inverseJoinColumns: [{name: "permission_id"}]
    })
    permissions: Permission[];
}
