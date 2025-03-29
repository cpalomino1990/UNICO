import { Role } from '../common/enums/rol.enum';
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(["email"])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ nullable: false })
    email: string;

    @Column({type: 'enum' , default:Role.USER , enum:Role})
    role : string;

    @Column({ nullable: true, select:false })
    password: string
}

