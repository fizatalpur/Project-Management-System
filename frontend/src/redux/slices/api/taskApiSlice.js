import { apiSlice } from "../apiSlice";
const TASK_URL = "/project";

export const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getDashboardStats : builder.query({
            query: () => ({
                url: `${TASK_URL}/dashboard`,
                method: "GET",
                credentials: "include",
            }),
          
        }),

        getTask : builder.query({
            query: (id) => ({
                url: `${TASK_URL}/${id}`,
                method: "GET",
                credentials: "include",
            }),    

            providesTags: (result, error, id) => [{ type: "Task", id }],

        }),

        getTasks : builder.query({
            query: ({ strQuery}) => ({
                url: `${TASK_URL}?stage=${strQuery}`,
                method: "GET",
                credentials: "include",
            }),

            providesTags: (result, error, arg) => {
            
                const tasks = Array.isArray(result)
                  ? result
                  : result?.tasks || [];
                return tasks.length > 0
                  ? [
                      ...tasks.map(({ _id }) => ({ type: "Task", id: _id })),
                      { type: "Task", id: "LIST" },
                    ]
                  : [{ type: "Task", id: "LIST" }];
              },

        }),

        createTask : builder.mutation({
            query: (data) => ({
                url: `${TASK_URL}/create`,
                method: "POST",
                body: data,
                credentials: "include",
            }),

            invalidatesTags: [{ type: "Task", id: "LIST" }],
        }),

        updateTask : builder.mutation({
            query: (data) => ({
                url: `${TASK_URL}/update/${data._id  }`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),

            invalidatesTags: (result, error, data) => [{ type: "Task", id: data._id }],
        }),

        deleteTask : builder.mutation({
            query: ({id}) => ({
                url: `${TASK_URL}/${id}`,
                method: "DELETE",
                credentials: "include",
            }),

            invalidatesTags: (result, error, { id }) => [
                { type: "Task", id },
                { type: "Task", id: "LIST" },
              ],
        }),
    }),
    tagTypes: ["Task"],
})

export const { useGetDashboardStatsQuery, useGetTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useGetTaskQuery,
 } = taskApiSlice