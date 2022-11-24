export const handleChange = (e, setValue) => {
    setValue(e.target.value)
}
export const handleChangeWithError = ( e, setValue, value, validator, setErrValue) => {
    handleChange(e, setValue)
    if(!validator.test(value)){
      setErrValue(true)
    }else if(validator.test(value)){
      setErrValue(false)
    }
}
export const handleInputError = (e, value, validator, setErrValue) => {
    if(!validator.test(value)){
      setErrValue(true)
    }else if(validator.test(value)){
      setErrValue(false)
    }
}
export const confirmDelete = (dispatchData, deleteAct, data) => {
  if(window.confirm("hapus?") === true){
    dispatchData(deleteAct(data))
    window.alert("data berhasil dihapus")
  }else {
    window.alert("data tidak jadi dihapus")
  }
}