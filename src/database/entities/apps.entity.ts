import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Apps {

    @PrimaryColumn()
    name: string;

    @Column()
    connections: number;
}