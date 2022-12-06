import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { confirmDelete } from '../functions/formHandler';
import { getPegawai, pegawaiSelectors, deletePegawai } from '../features/pegawai/pegawaiSlice';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

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

  const caseInsensitiveSort = (rowA, rowB) => {
    const a = rowA.nama.toLowerCase();
    const b = rowB.nama.toLowerCase();

    if (a > b) {
        return 1;
    }

    if (b > a) {
        return -1;
    }

    return 0;
  }

  const columns = [
    {
      name: 'NIP',
      selector: row => row.id,
      sortable: true 
    },
    {
      name: 'Nama',
      selector: row => row.nama,
      sortable: true,
      sortFunction: caseInsensitiveSort
    },
    {
      name: 'Provinsi',
      selector: row => row.provinsi
    },
    {
      name: 'Alamat',
      selector: row => row.alamat
    },
    {
      name: 'Tempat Lahir',
      selector: row => row.tempat_lahir
    },
    {
      name: 'Tanggal Lahir',
      selector: row => row.tanggal_lahir
    },
    {
      name: 'Nomor Telp.',
      selector: row => row.nomor_telp
    },
    {
      name: 'Action',
      selector: function (row) {
        return (
          <>
            <Link to={`editpegawai/${row.id}`} className='btn btn-sm btn-primary mx-1'>Edit</Link>
            <button onClick={() => confirmDelete(dispatch, deletePegawai, row.id)} className='btn btn-sm btn-danger mx-1'>Delete</button>
          </>
        )
      }
    }
  ]

  const [search, setSearch] = useState("");
  const filteredPegawai = getFilteredItems(search, pegawai)


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
        <DataTable className='mt-3'
          columns={columns}
          data={filteredPegawai}
          pagination
          responsive
          striped
        />
        </div>
      </div>
    </div>
  )
}

export default ShowPegawai