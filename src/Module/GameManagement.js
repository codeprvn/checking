import React, { useState, useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import SharedTable from '../shared component/SharedTable';
import { Link, useNavigate } from 'react-router-dom';
import http from '../utilities/api';
import SuccessDialog from '../shared component/SuccessDialog';
import InvalidDialog from '../shared component/InvalidDialog';
import { removeEmpty } from '../utilities/sharedMethod';

const GameManagement = () => {

  // Game management state variable
  const [formdata, setFormData] = useState({ tableName: '', isActive: '' })

  // Share Table state variable 
  const [rows, setRows] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);
  const isfilter = useRef('');
  const forFilter = useRef('')
  // const [isfilter, setIsFilter ] = useState('');
  // const [forFilter, setForFilter] = useState('');

  // Dailog variable
  const [openDia, setOpenDia] = useState(false);
  const [diaMsg, setDiaMsg] = useState('');
  const [errorDia, setErrorDia] = useState(false)
  const [errorDiaMsg, setErrorDiaMsg] = useState('')

  // Close Dialog function
  const closeDia = () => {
    setOpenDia(false);
  }

  const closeErrorDia = () => {
    setErrorDia(false)
  }

  const navigate = useNavigate()
  // This function will handle function
  const handleChangePage = async (event, newPage) => {
    setPage(newPage)
    let skip = newPage * 20;
    if (isfilter.current === 'YES') {
      const resp = await http.get('game-management/listTables', { params: { ...forFilter.current, skip: skip, limit: 20 } })
      setRows([...resp.data.data]);
      setTotalPage(resp.data.totalData);
    }
    else {
      const data = await http.get('game-management/listTables', { params: { skip: skip, limit: 20 } })
      setRows([...data.data.data]);
      setTotalPage(data.data.totalData);
    }

  }
  // Tabel bydefault data
  const apiData = async () => {
    try {
      const data = await http.get('game-management/listTables', { params: { skip: 0, limit: 20 } })
      if (data?.data?.success === true) {
        setRows([...data.data.data]);
        setTotalPage(data.data.totalData);
        isfilter.current = data.data.isFiltered
        //  setIsFilter(data.data.isFiltered);
      }
      else if (data?.data?.success === false) {
        setErrorDiaMsg(data.data.message);
        setErrorDia(true)
      }
    } catch (error) {
      setErrorDiaMsg(error?.response?.data?.message);
      setErrorDia(true);
    }
  }

  // Action button Handler
  const actionHandler = (name, id) => {
    const paramId = id._id
    if (name === 'Edit') {
      navigate(`edit-table/${paramId}`);
    }
    if (name === 'Disable' || name === 'Enable') {
      (async () => {
        try {
          const resp = await http.patch(`game-management/disableTable/${paramId}`)
          if (resp?.data?.success === true) {
            setDiaMsg(resp.data.message);
            setOpenDia(true);
            apiData();
          }
          else if (resp?.data?.success === false) {
            setErrorDiaMsg(resp.data.message);
            setErrorDia(true)
          }
        } catch (error) {
          setErrorDiaMsg(error?.response?.data?.message);
          setErrorDia(true);
        }
      })()
    }
    // if(name === 'Enable'){
    //   (async () => {
    //     try {
    //       const resp = await http.patch(`game-management/disableTable/${paramId}`)
    //       if (resp?.data?.success === true) {
    //         setDiaMsg(resp.data.message);
    //         setOpenDia(true);
    //         apiData();
    //       }
    //       else if (resp?.data?.success === false) {
    //         setErrorDiaMsg(resp.data.message);
    //         setErrorDia(true)
    //       }
    //     } catch (error) {
    //       setErrorDiaMsg(error?.response?.data?.message);
    //       setErrorDia(true);
    //     }
    //   })()
    // }
  }



  const actionButton = [{ name: 'Edit' }, { name: 'Disable', format :(data, row)=>{return (<button className={row['isActive'] ?'actionButton danger' :'actionButton '} key={data} onClick={() => actionHandler(row['isActive'] ? data : 'Enable', row)}>{row['isActive'] ? data: 'Enable'}</button>)} }]

  // Table header
  const columns = [{ id: 'position', label: 'Serial no' },
  { id: 'channelName', label: 'Table Name' },
  { id: 'smallBigBlind', label: 'Small/Big Blind', },
  { id: 'minMaxBuyIn', label: 'Min/MaxBuyIn' },
  { id: 'maxPlayers', label: 'Players on Table' },
  { id: 'isActive', label: 'Status', format: (value) => value.toString() }];


  const formik = useFormik({
    initialValues: formdata,
    // validateOnMount:true,
    validationSchema: Yup.object({
      tableName: Yup.string(),
      isActive: Yup.string(),
    }),
    onSubmit: async (values) => {
      const params = removeEmpty(values)
      try {
        const resp = await http.get('game-management/listTables', { params: { ...params, skip: 0, limit: 20 } })
        setPage(0);
        if (resp?.data?.success === true) {
          forFilter.current = { ...params }
          // setForFilter({...values})
          setRows([...resp.data.data]);
          setTotalPage(resp.data.totalData);
          isfilter.current = resp.data.isFiltered
          // setIsFilter(resp.data.isFiltered);
        }
        else if (resp?.data?.success === false) {
          setErrorDiaMsg(resp.data.message);
          setErrorDia(true)
        }
      } catch (error) {
        setErrorDiaMsg(error?.response?.data?.message);
        setErrorDia(true);
      }
    },
  })

  //form reset 
  const resetForm = (e) => {
    formik.resetForm();
    setPage(0);
    apiData()
  }

  useEffect(() => {
    apiData()
  }, [])

  return (
    <div>
      <div className="navBar container-fluid mb-5">
        <p>Table List</p>
        <div className="button-wrapper"><Link to='create-table'>
          <button className="button-64" role="button"><span className="text">Create Table</span></button>
        </Link></div>
      </div>
      <div className='container-fluid'>
        <form onSubmit={formik.handleSubmit}>
          <div className='row g-3 mb-5 align-items-center'>
            <div className='col-lg-3 text-center'>
              <label className='col-form-label'>Table Name:</label>
            </div>
            <div className='col-lg-3 text-center'>
              <input className={'form-control ' + (formik.errors.tableName ? 'shadow border border-danger' : 'shadow border border-success')} type='text' name='tableName' value={formik.values.tableName} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Enter Table Name' />
              {formik.touched.tableName && formik.errors.tableName ? (
                <small className="error-msg">{formik.errors.tableName}</small>
              ) : null}
            </div>

            <div className='col-lg-3 text-center'>
              <label className='col-form-label'>Status:</label>
            </div>
            <div className='col-lg-3 text-center'>
              <select className={'form-control form-select ' + (formik.errors.isActive ? 'shadow border border-danger' : 'shadow border border-success')} type='text' name='isActive' value={formik.values.isActive} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Enter Status'>
                <option defaultValue hidden>Select Player Type</option>
                <option value='true' >Active</option>
                <option value='false' >Inactive</option>
              </select>
              {formik.touched.isActive && formik.errors.isActive ? (
                <small className="error-msg">{formik.errors.isActive}</small>
              ) : null}
            </div>
          </div>
          <div className="d-flex g-2 flex-row align-items-center justify-content-evenly text-center">
            <span className="button-wrapper"><button type="submit" className="button-37" disabled={!formik.values.isActive && !formik.values.tableName}>Submit</button></span>
            <span className="button-wrapper"><button type="reset" onClick={resetForm} className="button-37-cancel">Reset</button></span>
          </div>
        </form>
      </div>

      <SharedTable columns={columns} rows={rows} isAction={true} actionButton={actionButton} page={page}
        handleChangePage={handleChangePage} totalPage={totalPage} actionHandler={actionHandler}
      />
      <SuccessDialog opendia={openDia} DiaMsg={diaMsg} closedia={closeDia} />
      <InvalidDialog opendia={errorDia} DiaMsg={errorDiaMsg} closedia={closeErrorDia} />
    </div>

  )
}

export default GameManagement