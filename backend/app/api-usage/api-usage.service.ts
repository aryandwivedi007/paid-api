import { ApiModuleRepository } from "../api-module/api-module.repository";
import { ApiUsageRepository } from "../api-usage/api-usage.repository";
import { UserRepository } from "../user/user.repository";
import { Request } from "express";
import axios from "axios";
import createHttpError from "http-errors";
import { User } from "../user/user.schema";
import { ApiUsage } from "./api-usage.schema";

// /**
//  * Handles API consumption by users.
//  */

// export const requestApi = async (id: string, user: User) => {
//   console.log("Received API Module ID:", id, "Type:", typeof id);

//   // Fetch the API module
//   const apiModule = await ApiModuleRepository.findOne({ where: { id: id } });
//   if (!apiModule) throw createHttpError(404, "API module not found");

//   console.log("API Module Found:", apiModule);

//   const userWithBalance = await UserRepository.findOne({
//     where: { _id: user._id },
//   });
//   if (!userWithBalance) throw createHttpError(404, "User not found");

//   // Check if pricePerRequest is valid (optional, since getter ensures it's a number)
//   if (
//     !apiModule.isFree &&
//     (isNaN(apiModule.pricePerRequest) || apiModule.pricePerRequest < 0)
//   ) {
//     throw createHttpError(500, "Invalid API price configuration.");
//   }

//   // Check if user has enough balance
//   if (
//     !apiModule.isFree &&
//     userWithBalance.balance < apiModule.pricePerRequest
//   ) {
//     throw createHttpError(403, "Insufficient balance, please recharge.");
//   }

//   // Call external API
//   let apiResponse;
//   // if (apiModule.name === "Weather API") {
//   //   apiResponse = await axios.get(
//   //     `https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current_weather=true`
//   //   );
//   //   console.log("External API Response:", apiResponse.data);
//   // } else {
//   //   throw createHttpError(400, "Invalid API request");
//   // }
//   apiResponse={
//     "data":"Dummy data"
//   }

//   console.log("User Balance Before Deduction:", userWithBalance.balance);

//   if (apiModule.pricePerRequest > 0) {
//     userWithBalance.balance = parseFloat(
//       (userWithBalance.balance - apiModule.pricePerRequest).toFixed(2)
//     );
//     await UserRepository.save(userWithBalance);
//   }
//   console.log("User Balance After Deduction:", userWithBalance.balance);

//   // Log API usage
//   const totalCost = apiModule.isFree
//     ? 0
//     : parseFloat(apiModule.pricePerRequest.toFixed(2));

//   const apiUsage = ApiUsageRepository.create({
//     user,
//     apiModule,
//     totalCost,
//   });
//   await ApiUsageRepository.save(apiUsage);

//   return {
//     message: "API request successful",
//     cost: totalCost,
//     data: apiResponse.data,
//   };
// };
export const requestApi = async (id: string, user: User) => {
  console.log("Received API Module ID:", id, "Type:", typeof id);

  // Fetch the API module
  const apiModule = await ApiModuleRepository.findOne({ where: { id } });
  if (!apiModule) throw createHttpError(404, "API module not found");

  console.log("API Module Found:", apiModule);

  const userWithBalance = await UserRepository.findOne({
    where: { _id: user._id },
  });
  if (!userWithBalance) throw createHttpError(404, "User not found");

  // Check if pricePerRequest is valid
  if (
    !apiModule.isFree &&
    (isNaN(apiModule.pricePerRequest) || apiModule.pricePerRequest < 0)
  ) {
    throw createHttpError(500, "Invalid API price configuration.");
  }

  // Check if user has enough balance
  if (
    !apiModule.isFree &&
    userWithBalance.balance < apiModule.pricePerRequest
  ) {
    throw createHttpError(403, "Insufficient balance, please recharge.");
  }

  // Dummy API response
  const apiResponse = { data: "Dummy data" };

  console.log("User Balance Before Deduction:", userWithBalance.balance);

  if (apiModule.pricePerRequest > 0) {
    userWithBalance.balance = parseFloat(
      (userWithBalance.balance - apiModule.pricePerRequest).toFixed(2)
    );
    await UserRepository.save(userWithBalance);
  }
  console.log("User Balance After Deduction:", userWithBalance.balance);

  // Log API usage
  const totalCost = apiModule.isFree
    ? 0
    : parseFloat(apiModule.pricePerRequest.toFixed(2));
  console.log("Calculated totalCost:", totalCost);

  const apiUsage = new ApiUsage(); // Create instance manually
  apiUsage.user = user;
  apiUsage.apiModule = apiModule;
  apiUsage.totalCost = totalCost; // Explicitly set totalCost

  console.log("apiUsage before save:", JSON.stringify(apiUsage, null, 2));
  const savedApiUsage = await ApiUsageRepository.save(apiUsage);
  console.log("apiUsage after save:", JSON.stringify(savedApiUsage, null, 2));

  return {
    message: "API request successful",
    cost: totalCost,
    data: apiResponse.data,
  };
};

export const getApiAnalytics = async () => {
  // 1️⃣ Total revenue from paid APIs
  const totalRevenue = await ApiUsageRepository.createQueryBuilder("usage")
    .select("SUM(usage.totalCost)", "totalRevenue")
    .getRawOne();

  // 2️⃣ Most requested APIs
  const mostUsedApis = await ApiUsageRepository.createQueryBuilder("usage")
    .leftJoinAndSelect("usage.apiModule", "apiModule")
    .select("apiModule.name, COUNT(*) AS requestCount")
    .groupBy("apiModule.id")
    .orderBy("requestCount", "DESC")
    .limit(5)
    .getRawMany();

  // 3️⃣ User-wise API usage stats
  const userStats = await ApiUsageRepository.createQueryBuilder("usage")
    .leftJoinAndSelect("usage.user", "user")
    .select(
      "user.name, user.email, COUNT(*) AS apiRequests, SUM(usage.totalCost) AS totalSpent"
    )
    .groupBy("user._id")
    .orderBy("apiRequests", "DESC")
    .getRawMany();

  return {
    totalRevenue: totalRevenue.totalRevenue || 0,
    mostUsedApis,
    userStats,
  };
};
