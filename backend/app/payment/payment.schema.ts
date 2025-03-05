import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user.schema';

@Entity('payment')
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.payments, { onDelete: 'CASCADE' })
    user: User;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'varchar', length: 255, default: 'COMPLETED' })
    status: 'PENDING' | 'COMPLETED' | 'FAILED';

    @CreateDateColumn({ type: 'timestamp', precision: 3, default: () => 'CURRENT_TIMESTAMP(3)' })
        createdAt: Date;
    
       
}
