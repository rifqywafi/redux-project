import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { confirmDelete } from '../functions/formHandler';
import { FaSearch } from 'react-icons/fa';
import  dateFormat  from 'dateformat';
import { getPegawai, pegawaiSelectors, deletePegawai } from '../features/pegawai/pegawaiSlice';
import { Link } from 'react-router-dom';


const ShowPegawai = () => {
  const dispatch = useDispatch();
  const pegawai = useSelector(pegawaiSelectors.selectAll);

  const getFilteredItems = (query, items) => {
    if (!query) {
      return items;
    }
    else { 
      const keys = ["nama", "id", "provinsi", "alamat", "tempat_lahir", "tanggal_lahir", "nomor_telp"]
      return items.filter(
        (item) => 
        keys.some(
          (key) =>
          item[key].toLowerCase().includes(query))
        )
    }
  }

  const [search, setSearch] = useState("");
  const filteredItems = getFilteredItems(search, pegawai)

  // const formattedTanggalLahir = dateFormat(tanggal_lahir, "dd-mm-yyyy")

  useEffect(() => {
    dispatch(getPegawai())
  }, [dispatch]);
  // console.log(pegawai) 
  return (
    <div>
      <div className='container align-center mt-3'>
        <div className="row">
          <div className='col-md-4'>
            <input id="search-input" type="text"
              onChange={(e) => setSearch(e.target.value)}
              className='form-control' placeholder='Search...'></input>
          </div>
          <Link to="addpegawai" className='btn btn-success offset-md-7 col-md-1'>Add New</Link>
        </div>
        <div className="row">
        <table className='table table-striped table-responsive mt-3'>
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
            {
              filteredItems && filteredItems.length > 0 ?
              filteredItems.map((dataPegawai, index) => (
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
                    <Link to={`editpegawai/${dataPegawai.id}`} className='btn btn-sm btn-primary mx-1'>Edit</Link>
                    <button onClick={() => confirmDelete(dispatch, deletePegawai, dataPegawai.id)} className='btn btn-sm btn-danger mx-1  '>Delete</button>
                </td>
              </tr>
            )
            )
            : <tr><td className="text-center" colSpan="9"> --- No Data Available ---</td></tr>
            }

          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}

export default ShowPegawai