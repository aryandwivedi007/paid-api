import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../user/user.schema";
import { ApiModule } from "../api-module/api-module.schema";

@Entity("api_usage")
export class ApiUsage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.apiUsage)
  user: User;

  @ManyToOne(() => ApiModule, (apiModule) => apiModule.apiUsage)
  apiModule: ApiModule;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  totalCost: number;

  @CreateDateColumn({
    type: "timestamp",
    precision: 3,
    default: () => "CURRENT_TIMESTAMP(3)",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    precision: 3,
    default: () => "CURRENT_TIMESTAMP(3)",
    onUpdate: "CURRENT_TIMESTAMP(3)",
  })
  updatedAt: Date;
}
