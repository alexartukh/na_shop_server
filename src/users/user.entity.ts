import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    first_name!: string;

    @Column()
    last_name!: string;

    @Column()
    email!: string;

    @Column({ select: false })
    encrypted_password!: string;

    @Column()
    role!: string;

    @Column({ select: false })
    jti!: string;
}
