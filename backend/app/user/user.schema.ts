import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    OneToMany
} from 'typeorm';
import bcrypt from 'bcrypt';
import { IUser } from './user.dto';
import { ApiUsage } from '../api-usage/api-usage.schema';
import { Payment } from '../payment/payment.schema';

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

@Entity('user')
export class User implements IUser {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    email: string;

    @Column({ type: 'boolean', default: true })
    active: boolean;

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'text', nullable: true })
    refreshToken?: string | null;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    balance: number; // NEW FIELD for wallet balance

    @OneToMany(() => ApiUsage, apiUsage => apiUsage.user, { cascade: true })
    apiUsage: ApiUsage[];

    @OneToMany(() => Payment, payment => payment.user, { cascade: true })
payments: Payment[];

    @CreateDateColumn({ type: 'timestamp', precision: 3, default: () => 'CURRENT_TIMESTAMP(3)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', precision: 3, default: () => 'CURRENT_TIMESTAMP(3)', onUpdate: 'CURRENT_TIMESTAMP(3)' })
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 12);
        }
    }
}
