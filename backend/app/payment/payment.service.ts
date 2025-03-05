import { PaymentRepository } from "./payment.repository";
import { UserRepository } from "../user/user.repository";
import createHttpError from "http-errors";


export const addBalance = async (userId: string, amount: number) => {
  if (amount <= 0)
    throw createHttpError(400, "Amount must be greater than zero.");

  const user = await UserRepository.findOne({ where: { _id: userId } });
  if (!user) throw createHttpError(404, "User not found");

  const currentBalance = Number(user.balance);
  console.log(currentBalance, "Current User Balance");
  const payment = PaymentRepository.create({
    user,
    amount,
    status: "COMPLETED",
  });
  await PaymentRepository.save(payment);

  
  const newBalance = currentBalance + amount;
  await UserRepository.update(user._id, { balance: newBalance });

  
  const updatedUser = await UserRepository.findOne({ where: { _id: userId } });
  if (!updatedUser) throw createHttpError(500, "Failed to fetch updated user");

  

  return {
    message: "Balance added successfully",
    newBalance: updatedUser.balance,
  };
};
