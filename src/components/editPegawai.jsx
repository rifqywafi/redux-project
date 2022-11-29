import React, { useState, useEffect } from "react";
import { getProvinsi, provinsiSelectors } from "../features/pegawai/provinsiSlice"
import { useNavigate, useParams } from "react-router-dom";
import ReactSelect from "react-select";
import { handleInput, handleChangeWithError } from "../functions/formHandler";
import { noHpValidator, provinsiListStorage, pegawaiIdStorage } from "../consts/pegawai";
import { getPegawai, updatePegawai, pegawaiSelectors } from "../features/pegawai/pegawaiSlice";
import { useDispatch, useSelector } from 'react-redux';

const EditPegawai = () => {
  const [provinsiOpt, setProvinsiOpt] = useState('');
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [tempat_lahir, setTempatLahir] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState("");
  const [nomor_telp, setNomorTelp] = useState("");
  const [errNoHp, setErrNoHp] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const provinsiList = useSelector(provinsiSelectors.selectAll);
  const pegawai = useSelector((state) => pegawaiSelectors.selectById(state, id));

  let provinsiArray = [];
  if (provinsiList.length === 0) {
    provinsiListStorage.forEach((e) => {
      provinsiArray.push({ label: `${e.name}`, value: `${e.name}` })
    })
  }
  else if (provinsiList.length !== 0) {
    provinsiList.forEach((e) => {
      provinsiArray.push({ label: `${e.name}`, value: `${e.name}` })
    })
  }

  const buttonDisabled = [
    id.length < 1,
    nama.length < 1,
    provinsiOpt.length < 1,
    alamat.length < 1,
    tempat_lahir.length < 1,
    tanggal_lahir.length < 1,
    nomor_telp.length < 1,
    errNoHp === true,
  ]

  useEffect(() => {
    dispatch(getPegawai(), getProvinsi());
  }, [dispatch]);

  useEffect(() => {
    if (pegawai) {
      setNama(pegawai.nama);
      setProvinsiOpt(pegawai.provinsi);
      setAlamat(pegawai.alamat);
      setTempatLahir(pegawai.tempat_lahir);
      setTanggalLahir(pegawai.tanggal_lahir);
      setNomorTelp(pegawai.nomor_telp);
    }
  }, [pegawai]);
  // console.log(provinsiArray)
  // console.log(alamat)
  const handleUpdate = async (e) => {
    e.preventDefault();
    const provinsi = provinsiOpt.value;
    await dispatch(updatePegawai({ nama, provinsi, alamat, tempat_lahir, tanggal_lahir, nomor_telp, id }));
    alert("Edit Berhasil")
    navigate('/');
  }

  return (
    <div>
      <form onSubmit={handleUpdate} className="container col-md-4 mt-5">
        <div className="form-row">
          <label className="form-label">Nama</label>
          <div className="control">
            <input type="text" className="form-control input"
              placeholder="Nama"
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
              value={provinsiArray.find(function (provinsiArray) {
                return provinsiArray.value === provinsiOpt;
              })}
              options={provinsiArray}
              onChange={(e) =>
                setProvinsiOpt(e)}
            />
          </div>
          {/* {console.log(provinsiOpt)} */}
        </div>
        <div className="form-row">
          <label className="form-label">Alamat</label>
          <div className="control">
            <input type="text" className="form-control input"
              placeholder="Isi Alamat Anda"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <label className="form-label">Tempat Lahir</label>
          <div className="control">
            <input type="text" className="form-control input"
              placeholder="Isi Tempat Lahir Anda"
              value={tempat_lahir}
              onChange={(e) => setTempatLahir(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <label className="form-label">Tanggal Lahir</label>
          <div className="control">
            <input type="date" className="form-control input"
              placeholder="Isi Tanggal Lahir Anda"
              value={tanggal_lahir}
              onChange={(e) => setTanggalLahir(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <label className="form-label">Nomor Telepon</label>
          <div className="control">
            <input type="text" className="form-control input"
              placeholder="Isi Nomor Telepon Anda dengan Format Angka"
              value={nomor_telp}
              onChange={(e) => handleChangeWithError(e, setNomorTelp, nomor_telp, noHpValidator, setErrNoHp)}
             />
            {errNoHp && <p className="text-danger">Masukkan Format No.Hp Dengan Benar </p>}
          </div>
        </div>
        <div className="field">
          <button
            type="submit"
            disabled={buttonDisabled.includes(true)}
            className="btn btn-primary mt-3">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditPegawai; 
