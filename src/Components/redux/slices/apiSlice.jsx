import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const StudentDataApi = createApi({
  reducerPath: "studentDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  endpoints: (builder) => ({
    getStudentData: builder.query({
      query: (type) => `students/${type}`,
    }),
    getStudentAttendance : builder.query({
      query : (id) => `/attendance/studentattendance/${id}`
    }),
    addStudent : builder.mutation({
        query : ({studentsDetails})=>({
            url : "/students/signup",
            method : "POST",
            body : studentsDetails
        })
    })
  }),
});

export const { useGetStudentDataQuery , useAddStudentMutation , useGetStudentAttendanceQuery} = StudentDataApi;
