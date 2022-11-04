import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { getAllJobs, hideLoading, showLoading } from "../allJobs/allJobsSlice";
import { logoutUser } from "../user/userSlice";
import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk";

// createJobThunk, deleteJobThunk, editJobThunk


// export const createJob = createAsyncThunk('job/createjob', async( job, thunkApi)=> {
//     try {
//         const resp = await customFetch.post('/jobs', job, {
//             headers: {
//                 authorization: ` Bearer ${thunkApi.getState().user.user.token}`,
//             }
//         });
//         thunkApi.dispatch(clearValues())
//         return resp.data
        
//     } catch (error) {
        
//         if(error.response.status === 401){
//             thunkApi.dispatch(logoutUser())
//             return thunkApi.rejectWithValue('Unauthorized ! Logging out ...')
//         }

//         return thunkApi.rejectWithValue(error.response.data.msg)
        
//     }
// })



// export const deleteJob = createAsyncThunk("job/deleteJob", async(jobId,thunkApi) => {
//     thunkApi.dispatch(showLoading())
//     try {
//         const resp = await customFetch.delete(`/jobs/${jobId}`, {
//             headers: {
//                 authorization: `Bearer ${thunkApi.getState().user.user.token}`,
//             },
//         })

//         thunkApi.dispatch(getAllJobs())
//         return resp.data.msg
//     } catch (error) {
//         thunkApi.dispatch(hideLoading())
//         return thunkApi.rejectWithValue(error.response.data.msg)
        
//     }
// })



// export const editJob = createAsyncThunk('job/editJob', async( { jobId, job}, thunkAPI) => {
//     try {
//         const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
//             headers: {
//                 authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
//             },
//         })
//         thunkAPI.dispatch(clearValues())
//         return resp.data
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.response.data.msg)
//     }

// })

export const createJob = createAsyncThunk("job/createJob", createJobThunk);

export const deleteJob = createAsyncThunk("job/deleteJob", deleteJobThunk);

export const editJob = createAsyncThunk("job/editJob", editJobThunk);

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

        setEditJob:(state, {payload}) => {
            return { ...state, isEditing: true, ...payload}
        }
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
        [deleteJob.rejected] : ( state, { payload}) => {
            toast.error(payload)
        },
         [deleteJob.fulfilled] : ( state, { payload}) => {
            toast.success(payload)
        },
        [editJob.pending]: (state) => {
            state.isLoading = true
        },

        [editJob.fulfilled] : ( state, action) => {
            state.isLoading = false;
            toast.success('Job Modified')
        },
        [editJob.rejected] : ( state, { payload}) => {
            state.isLoading = false;
            toast.error(payload)
        },
    }
})


export const { handleChange, clearValues, setEditJob } = jobSlice.actions

export default jobSlice.reducer