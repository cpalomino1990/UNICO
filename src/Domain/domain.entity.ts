import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Domain {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @CreateDateColumn()
    createdAt: Date;
}