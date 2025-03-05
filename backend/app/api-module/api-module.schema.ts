
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiUsage } from "../api-usage/api-usage.schema";

@Entity("api_module")
export class ApiModule {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "boolean", default: false })
  isFree: boolean;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  private _pricePerRequest: number | string;

  get pricePerRequest(): number {
    return typeof this._pricePerRequest === "string"
      ? parseFloat(this._pricePerRequest)
      : this._pricePerRequest;
  }

  set pricePerRequest(value: number) {
    this._pricePerRequest = value;
  }

  @OneToMany(() => ApiUsage, (apiUsage) => apiUsage.apiModule)
  apiUsage: ApiUsage[];

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
