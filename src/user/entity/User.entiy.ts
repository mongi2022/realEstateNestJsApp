import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'users'})
export class User{
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number
    @Column({length:50})
    fullname:string
    @Column({length:50,unique:true})
    email:string
    @Column({length:100})
    password:string

} 