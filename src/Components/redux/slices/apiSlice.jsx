import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const StudentDataApi = createApi({
  reducerPath: "studentDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  endpoints: (builder) => ({
    getStudentData: builder.query({
      query: (type) => `students/${type}`,
    }),
    getStudentAttendance: builder.query({
      query: (id) => `/attendance/getStudentAttendance/${id}`
    }),
    addStudent: builder.mutation({
      query: ({ ...studentsDetails }) => ({
        url: "/students/signup",
        method: "POST",
        body: studentsDetails
      })
    }),
    getSingleStudent: builder.query({
      query: (id) => `/students/getstudent/${id}`
    }),
    updateStudentData: builder.mutation({
      query: ({id , ...stdDetails}) => ({
        url: `/students/updatestudent/${id}`,
        method: "PUT",
        body: stdDetails


      })
    })
  }),
});

export const { useGetStudentDataQuery, useAddStudentMutation, useGetStudentAttendanceQuery, useGetSingleStudentQuery , useUpdateStudentDataMutation } = StudentDataApi;
