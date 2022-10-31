import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { logoutUser } from "../user/userSlice";


export const createJob = createAsyncThunk('job/createjob', async( job, thunkApi)=> {
    try {
        const resp = await customFetch.post('/jobs', job, {
            headers: {
                authorization: ` Bearer ${thunkApi.getState().user.user.token}`,
            }
        });
        thunkApi.dispatch(clearValues())
        return resp.data
        
    } catch (error) {
        
        if(error.response.status === 401){
            thunkApi.dispatch(logoutUser())
            return thunkApi.rejectWithValue('Unauthorized ! Logging out ...')
        }

        return thunkApi.rejectWithValue(error.response.data.msg)
        
    }
})

const initialState = {
    isLoading: false,
    position: "",
    company: "",
    jobLocation: "",
    jobTypeOptions: ["full-time", "part-time","remote","internship"],
    jobType:"full-time",
    statusOptions:["interview", "declined", "pending"],
    status: "pending",
    isEditing: false,
    editJobId: ""

}

const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        handleChange: (state, { payload: { name, value}}) => {
            state[name] = value
        },
        clearValues: () => {
            return  {
                ...initialState, jobLocation: getUserFromLocalStorage()?.location || '',
            }
        },
    },

    extraReducers: {
        [createJob.pending]: (state) => {
            state.isLoading = true
        },

        [createJob.fulfilled] : ( state, action) => {
            state.isLoading = false;
            toast.success('Job created')
        },
        [createJob.rejected] : ( state, { payload}) => {
            state.isLoading = false;
            toast.error(payload)
        },
    }
})


export const { handleChange, clearValues} = jobSlice.actions

export default jobSlice.reducer