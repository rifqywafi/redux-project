import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { pegawaiIdStorage, provinsiListStorage, noHpValidator, idValidator } from "../consts/pegawai";
import { handleChange, handleChangeWithError, handleInputError } from "../functions/formHandler";
import { savePegawai, pegawaiSelectors, getPegawai } from '../features/pegawai/pegawaiSlice';
import { getProvinsi, provinsiSelectors } from "../features/pegawai/provinsiSlice";
import { useNavigate } from 'react-router-dom';
import  dateFormat from 'dateformat';
import ReactSelect from "react-select";

const AddPegawai = () => {
  const [provinsiOpt, setProvinsiOpt] = useState('');
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [tempat_lahir, setTempatLahir] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState("");
  const [nomor_telp, setNomorTelp] = useState("");
  const [errNoHp, setErrNoHp] = useState(false);
  const [errId, setErrId] = useState(false);
  const [id, setId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pegawaiId = useSelector(pegawaiSelectors.selectIds);
  const provinsiList = useSelector(provinsiSelectors.selectAll);

  let provinsiArray = [];
  if (!provinsiList) {
    provinsiListStorage.forEach((e) => {
      provinsiArray.push({ label: `${e.name}`, value: `${e.name}` })
    })
  }
  else if (provinsiList) {
    provinsiList.forEach((e) => {
      provinsiArray.push({ label: `${e.name}`, value: `${e.name}` })
    })
  }

  const buttonDisabled = [
    id.length < 1,
    nama.length < 1,
    provinsiOpt === null,
    alamat.length < 1,
    tempat_lahir.length < 1,
    tanggal_lahir.length < 1,
    nomor_telp.length < 1,
    errNoHp === true,
  ]

  useEffect(() => {
    dispatch(getProvinsi())
    // if(provinsiList.length !== 0){
    //   localStorage.setItem("List Provinsi", JSON.stringify(provinsiList));
    // }
    if (pegawaiId.length !== 0) {
      localStorage.setItem("ID Pegawai", pegawaiId);
    }
  }, [dispatch]);
  // console.log(provinsiArray)
  // console.log(provinsi.value)
  // console.log(pegawaiId)

  // console.log(buttonDisabled);

  const createPegawai = async (e) => {
    e.preventDefault();
    const provinsi = provinsiOpt.value;
    await dispatch(savePegawai({ nama, provinsi, alamat, tempat_lahir, tanggal_lahir, nomor_telp, id }));
    if (pegawaiId.length === 0) {
      if (pegawaiIdStorage.includes(id)) {
        alert("ID sudah ada")
      } else {
        alert("Input Berhasil")
        navigate('/')
      }
    }
    else if (pegawaiId.length !== 0) {
      if (pegawaiId.includes(id)) {
        alert("ID sudah ada")
      } else {
        alert("Input Berhasil")
        navigate('/')
      }
    }else{
      alert("Terjadi Error!")
      return;
    }
  }

  return (
    <div>
      <form onSubmit={createPegawai} className="container col-md-4 mt-5">
        <div className="form-row">
          <label className="form-label">NIP</label>
          <div className="control">
            <input type="text" className="input form-control"
              placeholder="Isi NIP Anda dengan Format Angka"
              value={id}
              onChange={(e) => handleChangeWithError(e, setId, id, idValidator, setErrId)}
            />
            {errId && <p className="text-danger">Masukkan Format NIP Dengan Benar</p>}
          </div>
        </div>
        <div className="form-row">
          <label className="form-label">Nama</label>
          <div className="control">
            <input type="text" className="input form-control"
              placeholder="Isi Nama Anda"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <label className="form-label">Provinsi</label>
          <div className="control">
            <ReactSelect
              isClearable={true}
              className="select-input"
              placeholder="Pilih Provinsi Anda"
              options={provinsiArray}
              value={provinsiOpt}
              onChange={(e) =>
                setProvinsiOpt(e)}
            />
          </div>
        </div>
        <div className="form-row">
          <label className="form-label">Alamat</label>
          <div className="control">
            <input type="text" className="input form-control"
              placeholder="Isi Alamat Anda"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <label className="form-label">Tempat Lahir</label>
          <div className="control">
            <input type="text" className="input form-control"
              placeholder="Isi Tempat Lahir Anda"
              value={tempat_lahir}
              onChange={(e) => setTempatLahir(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <label className="form-label">Tanggal Lahir</label>
          <div className="control">
            <input type="date" className="input form-control"
              placeholder="Isi Tanggal Lahir Anda"
              value={tanggal_lahir}
              onChange={(e) => setTanggalLahir(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <label className="form-label">Nomor Telp</label>
          <div className="control">
            <input type="text" className="input form-control"
              placeholder="Isi Nomor Telepon Anda dengan Format Angka"
              value={nomor_telp}
              onChange = {(e) => handleChangeWithError(e, setNomorTelp, nomor_telp, noHpValidator, setErrNoHp)}
            />
            {/* {console.log(nomor_telp)} */}
            {errNoHp && <p className="text-danger">Masukkan Format No.Hp Dengan Benar</p>}
          </div>
        </div>
        <div className="field">
          <button
            type="submit"
            disabled={buttonDisabled.includes(true)}
            className="btn btn-primary mt-2">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddPegawai;
