import {createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit"; 
import axios from "axios"; 

export const getProvinsi = createAsyncThunk("provinces", () => {
    return axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
    .then((response) => response.data);
})

const provinsiEntity = createEntityAdapter ({
    selectId: (provinces) => provinces.id
})

const provinsiSlice = createSlice ({ 
    name: "provinsi", 
    initialState: provinsiEntity.getInitialState(), 
    extraReducers : { 
        [getProvinsi.fulfilled] : (state, action) => {
            provinsiEntity.setAll(state, action.payload);
        },
    }
}); 

export const provinsiSelectors = provinsiEntity.getSelectors (state => state.provinsi); 
export default provinsiSlice.reducer; 