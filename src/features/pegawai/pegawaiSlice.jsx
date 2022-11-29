import {createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit"; 
import axios from "axios"; 

export const getPegawai = createAsyncThunk("pegawai/getPegawai", async() => { 
    const response = await axios.get('http://localhost:5000/pegawai'); 
    return response.data; 
});

export const savePegawai = createAsyncThunk("pegawai/savePegawai", async({nama, provinsi, alamat, tempat_lahir, tanggal_lahir,nomor_telp, id}) => { 
    const response = await axios.post('http://localhost:5000/pegawai',{
        nama, 
        provinsi, 
        alamat, 
        tempat_lahir, 
        tanggal_lahir, 
        nomor_telp,
        id
    }); 
    return response.data; 
}); 

export const updatePegawai = createAsyncThunk("pegawai/updatePegawai", async({nama, provinsi, alamat, tempat_lahir, tanggal_lahir,nomor_telp, id}) => { 
    const response = await axios.patch(`http://localhost:5000/pegawai/${id}`, {
        nama, 
        provinsi, 
        alamat, 
        tempat_lahir, 
        tanggal_lahir,
        nomor_telp
    }); 
    return response.data; 
}); 

export const deletePegawai = createAsyncThunk("pegawai/deletePegawai", async(id) => { 
    await axios.delete(`http://localhost:5000/pegawai/${id}`); 
    return id; 
}); 

const pegawaiEntity = createEntityAdapter ({ 
    selectId: (pegawai) => pegawai.id 
}); 


const pegawaiSlice = createSlice ({ 
    name: "pegawai", 
    initialState: pegawaiEntity.getInitialState(), 
    extraReducers : { 
        [getPegawai.fulfilled] : (state, action) => { 
            pegawaiEntity.setAll(state, action.payload); 
        },
        [savePegawai.fulfilled] : (state, action) => { 
            pegawaiEntity.addOne(state, action.payload); 
        }, 
        [deletePegawai.fulfilled] : (state, action) => { 
            pegawaiEntity.removeOne(state, action.payload); 
        },
        [updatePegawai.fulfilled] : (state, action) => { 
            pegawaiEntity.updateOne(state, {id : action.payload.id, updates : action.payload}); 
        }
    }
}); 

export const pegawaiSelectors = pegawaiEntity.getSelectors (state => state.pegawai); 
export default pegawaiSlice.reducer; 