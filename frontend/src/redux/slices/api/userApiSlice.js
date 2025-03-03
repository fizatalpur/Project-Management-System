import { apiSlice } from "../apiSlice"
const USER_URL = "/user"
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({

        getDashboardEmployees : builder.query({
            query: () => ({
                url: `${USER_URL}/dashboard`,
                method: "GET",
                credentials: "include",
            }),
        }),

        updateUser : builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/update`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: (result, error, data) => [{ type: "User", id: data._id }],
        }),

        getAllUsers : builder.query({
            query: () => ({
                url: `${USER_URL}/get-all`,
                method: "GET",
                credentials: "include",
            }),

            providesTags: (result, error, arg) =>
                result && Array.isArray(result)
                  ? [
                      ...result.map((user) => ({ type: "User", id: user._id })),
                      { type: "User", id: "LIST" },
                    ]
                  : [{ type: "User", id: "LIST" }],
        }),

        deleteUser : builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
                credentials: "include",
            }),

            invalidatesTags: (result, error, id) => [
                { type: "User", id },
                { type: "User", id: "LIST" },
              ],
        }),

        userAction : builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data.id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: (result, error, data) => [{ type: "User", id: data.id }],
        }),
       
    }),
    tagTypes: ["User"],
});

export const { useGetDashboardEmployeesQuery,useUpdateUserMutation, useGetAllUsersQuery, useDeleteUserMutation, useUserActionMutation, }= userApiSlice;