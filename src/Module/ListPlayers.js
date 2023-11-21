import React, { useState, useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import SharedTable from '../shared component/SharedTable';
import { useNavigate } from 'react-router-dom';
import http from '../utilities/api';
import InvalidDialog from '../shared component/InvalidDialog';
import { removeEmpty, emailMask } from '../utilities/sharedMethod';

const ListPlayers = () => {

  // list player state variable
  const formdata = { userName: '', email: '', mobileNo: '' }

  // Share Table state variable 
  const [rows, setRows] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);
  const isfilter = useRef('');
  const forFilter = useRef('')
  // const [isfilter, setIsFilter ] = useState('');
  // const [forFilter, setForFilter] = useState('');

  // Dailog variable
  const [errorDia, setErrorDia] = useState(false)
  const [errorDiaMsg, setErrorDiaMsg] = useState('')

  // Close Dialog function
  const closeErrorDia = () => {
    setErrorDia(false);
  }

  const navigate = useNavigate()

  // handle pagination event 
  const handleChangePage = async (event, newPage) => {
    setPage(newPage)
    let skip = newPage * 20;
    if (isfilter.current === 'YES') {
      const resp = await http.get('user-management/searchPlayer', { params: { ...forFilter.current, skip: skip, limit: 20 } })
      setRows([...resp.data.data]);
      setTotalPage(resp.data.totalData);
    }
    else {
      const data = await http.get('user-management/searchPlayer', { params: { skip: skip, limit: 20 } })
      setRows([...data.data.data]);
      setTotalPage(data.data.totalData);
    }

  }
  // Tabel bydefault data
  const apiData = async () => {
    try {
      const data = await http.get('user-management/searchPlayer', { params: { skip: 0, limit: 20 } })
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
      navigate(`/usermanagement/edit-player/${paramId}`);
    }

  }


  const actionButton = [{ name: 'Edit' }]

  // Table header
  const columns = [{ id: 'position', label: 'Serial no' },
  { id: 'userName', label: 'Username' },
  { id: 'firstName', label: 'Full Name', },
  { id: 'emailId', label: 'Email Id', format:(value)=>emailMask(value) },
  { id: 'mobileNumber', label: 'Phone no', format: (value) => typeof value === 'string' ? value.slice(-4).padStart(value.length, '*') : value },
  { id: 'points', label: 'Points', format: (value) => value[1].totalBalance },
  {
    id: 'lastLogin', label: 'Last Login', format: (value) => {
      const d = new Date(value);
      return `${(d.getMonth() + 1)}/${d.getDate()}/${String(d.getFullYear()).slice(-2)}, ${d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
    }
  },
  {
    id: 'createdAt', label: 'DOR', format: (value) => {
      const d = new Date(value);
      return `${(d.getMonth() + 1)}/${d.getDate()}/${String(d.getFullYear()).slice(-2)}, ${d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
    }
  },
  ];


  const formik = useFormik({
    initialValues: formdata,
    validateOnMount: true,
    validationSchema: Yup.object({
      userName: Yup.string(),
      email: Yup.string().email('Invalid Email type'),
      mobileNo: Yup.string().max(10, 'Max 10 digit required').min(10, 'Min 10 digit required')
    }),
    onSubmit: async (values) => {
      try {
        const formdata = removeEmpty(values)
        const resp = await http.get('user-management/searchPlayer', { params: { ...formdata, skip: 0, limit: 20 } })
        setPage(0);
        if (resp?.data?.success === true) {
          forFilter.current = { ...formdata }
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

  // Download Csv function
  const downloadCsv = async (e) => {
    e.preventDefault();
    try {
      let resp = await http.get('user-management/exportListPlayerCSV', { params: forFilter.current ? forFilter.current : null })
      const a = document.createElement("a");
      a.href = "data:text/csv," + encodeURI(resp.data);
      let filename = "List Users";
      a.setAttribute("download", filename + ".csv");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      setErrorDiaMsg(error?.response?.data?.message);
      setErrorDia(true);
    }
  }

  //form reset 
  const resetForm = (e) => {
    formik.resetForm()
    setPage(0);
    apiData()
  }

  useEffect(() => {
    apiData()
  }, [])
  return (
    <div>
      <div className='container-fluid'>
        <form onSubmit={formik.handleSubmit}>
          <div className='row g-3 mb-5 align-items-center'>
            <div className='col-lg-3 text-center'>
              <label className='col-form-label'>Username:</label>
            </div>
            <div className='col-lg-3 text-center'>
              <input className={'form-control '+ (formik.errors.userName ? 'shadow border border-danger' : 'shadow border border-success')} type='text' name='userName' value={formik.values.userName} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Enter User Name' />
              {formik.touched.userName && formik.errors.userName ? (
                <small className="error-msg">{formik.errors.userName}</small>
              ) : null}
            </div>

            <div className='col-lg-3 text-center'>
              <label className='col-form-label'>Email:</label>
            </div>
            <div className='col-lg-3 text-center'>
              <input className={'form-control ' + (formik.errors.email ? 'shadow border border-danger' : 'shadow border border-success')} type='email' name='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Enter User Email' />
              {formik.touched.email && formik.errors.email ? (
                <small className="error-msg">{formik.errors.email}</small>
              ) : null}
            </div>

            <div className='col-lg-3 text-center'>
              <label className='col-form-label'>Phone:</label>
            </div>
            <div className='col-lg-3 text-center'>
              <input className={'form-control ' + (formik.errors.mobileNo ? 'shadow border border-danger' : 'shadow border border-success')} type='number' name='mobileNo' value={formik.values.mobileNo} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Enter User Phone no' />
              {formik.touched.mobileNo && formik.errors.mobileNo ? (
                <small className="error-msg">{formik.errors.mobileNo}</small>
              ) : null}
            </div>
          </div>
          <div className="d-flex g-2 flex-row align-items-center justify-content-evenly text-center">
            <span className="button-wrapper"><button type="submit" className="button-37" disabled={!formik.values.mobileNo && !formik.values.email && !formik.values.userName}>Submit</button></span>
            <span className="button-wrapper"><button type="reset" onClick={resetForm} className="button-37-cancel">Reset</button></span>
            <span className="button-wrapper"><button className="button-37-csv" onClick={e => downloadCsv(e)}>CSV</button></span>
          </div>
        </form>
      </div>

      <SharedTable columns={columns} rows={rows} isAction={true} actionButton={actionButton} page={page}
        handleChangePage={handleChangePage} totalPage={totalPage} actionHandler={actionHandler}
      />
      <InvalidDialog opendia={errorDia} DiaMsg={errorDiaMsg} closedia={closeErrorDia} />
    </div>
  )
}

export default ListPlayers