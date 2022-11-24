import React, {useEffect} from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { provinsiSelectors, getProvinsi } from './features/pegawai/provinsiSlice';
import logo from './logo.svg';
import axios from 'axios';
import {Routes, Route} from 'react-router-dom';
import AddPegawai from './components/addPegawai';
import ShowPegawai from './components/showPegawai';
import EditPegawai from './components/editPegawai';

function App() {
  const provinsiList  = useSelector(provinsiSelectors.selectAll);
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(getProvinsi())
    if(provinsiList.length !== 0){
      localStorage.setItem("list_provinsi", JSON.stringify(provinsiList));
    }
}, [dispatch]); 

  // console.log("provinsi", provinsiList);
  return (
    <div className="App">
      <Routes>
        <Route path="addpegawai" element={<AddPegawai />}/>
        <Route exact path="/" element={<ShowPegawai />}/>
        <Route path = "editpegawai/:id" element = {<EditPegawai />} />
      </Routes>
    </div>
  );
}

export default App;
