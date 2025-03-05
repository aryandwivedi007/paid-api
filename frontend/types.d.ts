declare module "*.svg" {
    import React from "react";
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }
  
  interface User {
    _id: string;
    name: string;
    email: string;
    active: boolean;
    role: "USER" | "ADMIN";
  }

  // Define Weather Data Structure
interface CurrentWeatherUnits {
  time: string;
  interval: string;
  temperature: string;
  windspeed: string;
  winddirection: string;
  is_day: string;
  weathercode: string;
}

interface CurrentWeather {
  time: string;
  interval: number;
  temperature: number;
  windspeed: number;
  winddirection: number;
  is_day: number;
  weathercode: number;
}

interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather_units: CurrentWeatherUnits;
  current_weather: CurrentWeather;
}

// Define API Response
interface ApiUsageResponse {
  message: string;
  cost: number;
  data: WeatherData;
}

interface AddBalancePayload {
  amount: number;
}

interface AddBalanceResponse {
  data: {
    message: string;
    newBalance: string; // Comes as a string like "200.00"
  };
  message: string;
  success: boolean;
}

// Define Complete Response
interface ApiUsageQueryResponse {
  data: ApiUsageResponse;
  message: string;
  success: boolean;
}

  interface ApiModule {
    id: string;
    name: string;
    isFree: boolean;
    _pricePerRequest: string;
    createdAt: string;
    updatedAt: string;
  }
  interface ApiResponse<T> {
    data: T;
    message: string;
    sucess: boolean
  }

  // Define API response structure
interface ApiUsageStats {
  name: string;
  email: string;
  apiRequests: number;
  totalSpent: number;
}

interface MostUsedApi {
  name: string;
  requestCount: number;
}

interface ApiAnalyticsResponse {
  data: {
    totalRevenue: string;
    mostUsedApis: MostUsedApi[];
    userStats: ApiUsageStats[];
  };
  message: string;
  success: boolean;
}

// ✅ Define API Module Type
 interface ApiModule {
 
  name: string;
  description: string;
  pricePerRequest: number;
  isFree: boolean;
}

// ✅ Define API Analytics Type
 interface ApiUsageStats {
  name: string;
  email: string;
  apiRequests: number;
  totalSpent: number;
}

 interface MostUsedApi {
  name: string;
  requestCount: number;
}

 interface ApiAnalytics {
  totalRevenue: string;
  mostUsedApis: MostUsedApi[];
  userStats: ApiUsageStats[];
}

// ✅ API Response Type
 interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
