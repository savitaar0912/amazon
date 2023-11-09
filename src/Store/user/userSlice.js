import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    email: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUserLogin:(state,action) =>{
            state.email = action.payload.email;
        },
        setUserLogout:()=>{
            return null;
        }
    }
})

export const {setUserLogin , setUserLogout} = userSlice.actions;
export const selectUser = (state) => state.user
export const selectUserEmail = (state) => (state.user ? state.user.email : null);

export default userSlice.reducer