
import { AppDataSource } from "../common/services/database.service";
import { Payment } from "./payment.schema";

export const PaymentRepository= AppDataSource.getRepository(Payment);
