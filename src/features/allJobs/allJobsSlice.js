import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";

const initialFitersState = {
    search: "",
    seachStatus: "all",
    searchType: "all",
    sort: "latest",
    sortOptions: ["latest", "oldest", "a-z", 'z-a']

}
const initialState = {
    isLoading: false,
    jobs: [],
    totalJobs: 0,
    numOfPages:1,
    page:1,
    stats: {},
    monthlyApplications: [],
    ...initialFitersState,

}
const allJobsSlice = createSlice({
    name: "allJobs",
    initialState
})


export default allJobsSlice.reducer;