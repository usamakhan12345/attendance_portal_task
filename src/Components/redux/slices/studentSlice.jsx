import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    students  : []
}


const studentsData = createSlice({
    name : "studentsData",
    initialState,
    reducers : {
        students : (state ,action) =>{
                return {
                    ...state , 
                    students : [action.payload]
                }
        }
    }
})

export const {students} = studentsData.actions
export default studentsData.reducer