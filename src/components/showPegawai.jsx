import React, {useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { confirmDelete } from '../functions/formHandler'; 
import {getPegawai, pegawaiSelectors, deletePegawai } from '../features/pegawai/pegawaiSlice';  
import { Link } from 'react-router-dom'; 

const ShowPegawai = () => {  

  const dispatch = useDispatch(); 
  const pegawai = useSelector(pegawaiSelectors.selectAll); 
  useEffect(() => { 
    dispatch (getPegawai()) 
  }, [dispatch]);
  // console.log(pegawai) 
  return (  
    <div> 
    <Link to ="addpegawai" className= 'btn btn-success'>Add New</Link>
    <table className='table table-responsive'>
      <thead>
        <tr>
          <th>No</th>
          <th>NIP</th> 
          <th>Nama</th>
          <th>Provinsi</th> 
          <th>Alamat</th> 
          <th>Tempat Lahir</th> 
          <th>Tanggal Lahir</th> 
          <th>Nomor Telp.</th> 
          <th>Actions</th> 
        </tr>
      </thead>
      <tbody>
        { pegawai.map ((dataPegawai, index) => ( 
          <tr key={dataPegawai.id}>
          <td>{index + 1} </td>
          <td>{dataPegawai.id}</td> 
          <td>{dataPegawai.nama}</td> 
          <td>{dataPegawai.provinsi} </td> 
          <td>{dataPegawai.alamat}</td> 
          <td>{dataPegawai.tempat_lahir}</td> 
          <td>{dataPegawai.tanggal_lahir}</td>
          <td>{dataPegawai.nomor_telp}</td>
          <td>
          <Link to = {`editpegawai/${dataPegawai.id}`} className='btn btn-sm btn-primary'>Edit</Link> 
          <button onClick = {() => confirmDelete(dispatch, deletePegawai, dataPegawai.id)} className='btn btn-sm btn-danger'>Delete</button> 
          </td>
        </tr>
        ))} 

      </tbody>
    </table> 
    </div>
  )
}

export default ShowPegawai