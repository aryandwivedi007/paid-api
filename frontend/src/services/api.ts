import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { setTokens, resetTokens } from "../store/reducer/AuthReducer";



// ✅ Base Query with Authentication
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Token expired, attempt to refresh
    const refreshToken = (api.getState() as RootState).auth.refreshToken;
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/users/refreshToken",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const { accessToken, refreshToken } = refreshResult.data as {
          accessToken: string;
          refreshToken: string;
        };
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        api.dispatch(setTokens({ accessToken, refreshToken }));

        // Retry original request with new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(resetTokens());
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // 🔹 Get Current User
    me: builder.query<ApiResponse<User>, void>({
      query: () => "/users/me",
    }),

    // 🔹 Authentication Mutations
    login: builder.mutation<
      ApiResponse<{ accessToken: string; refreshToken: string }>,
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<
      ApiResponse<User>,
      Omit<User, "_id" | "active" | "role"> & { confirmPassword: string }
    >({
      query: (body) => ({
        url: "/users/register",
        method: "POST",
        body,
      }),
    }),
    updateUser: builder.mutation<ApiResponse<User>, User>({
      query: (body) => ({
        url: `/users/${body._id}`,
        method: "PUT",
        body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
    }),
    refreshToken: builder.mutation<
      { accessToken: string; refreshToken: string },
      { refreshToken: string }
    >({
      query: (body) => ({
        url: "/users/refresh-token",
        method: "POST",
        body,
      }),
    }),

    // 🔹 API Module Endpoints
    createApiModule: builder.mutation<ApiResponse<ApiModule>, ApiModule>({
      query: (newModule) => ({
        url: "/api-modules",
        method: "POST",
        body: newModule,
      }),
    }),
    getAllApiModules: builder.query<ApiResponse<ApiModule[]>, void>({
      query: () => "/api-modules",
    }),
    getApiModuleById: builder.query<ApiResponse<ApiModule>, string>({
      query: (id) => `/api-modules/${id}`,
    }),
    updateApiModule: builder.mutation<ApiResponse<ApiModule>, ApiModule>({
      query: (module) => ({
        url: `/api-modules/${module.id}`,
        method: "PATCH",
        body: module,
      }),
    }),
    deleteApiModule: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api-modules/${id}`,
        method: "DELETE",
      }),
    }),

    getApiAnalytics: builder.query<ApiResponse<ApiAnalytics>, void>({
      query: () => "/api-usage/analytics",
    }),

    testApiUsage: builder.mutation<ApiUsageQueryResponse, string>({
      query: (apiModuleId) => ({
        url: `/api-usage/${encodeURIComponent(apiModuleId)}`,
        method: "POST",
      }),
    }),
    addBalance: builder.mutation<AddBalanceResponse, AddBalancePayload>({
      query: (payload) => ({
        url: "/payment",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

// ✅ Export Hooks
export const {
  useMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useRefreshTokenMutation,
  useCreateApiModuleMutation,
  useGetAllApiModulesQuery,
  useGetApiModuleByIdQuery,
  useUpdateApiModuleMutation,
  useDeleteApiModuleMutation,
  useGetApiAnalyticsQuery,
  useTestApiUsageMutation,
  useAddBalanceMutation,
} = api;
