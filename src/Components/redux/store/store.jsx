import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { StudentDataApi } from "../slices/apiSlice";
import studentDataReducer from "../slices/studentSlice"


const store = configureStore({
    reducer : {
        studentsData : studentDataReducer,
        [StudentDataApi.reducerPath]  : StudentDataApi.reducer,

    },
    middleware : (getDefaultMiddleware)=>
    getDefaultMiddleware().concat(StudentDataApi.middleware)

})

setupListeners(store.dispatch)


export default store 