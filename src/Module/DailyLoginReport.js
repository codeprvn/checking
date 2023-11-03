import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import SharedTable from '../shared component/SharedTable';
import http from '../utilities/api';
import InvalidDialog from '../shared component/InvalidDialog';

const DailyLoginReport = () => {

  // list player state variable
  const [formdata, setFormData] = useState({ userName: '', start: '', end: '' })

  // Share Table state variable 
  const [rows, setRows] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);
  const [isfilter, setIsFilter] = useState('');
  const [forFilter, setForFilter] = useState('');

  // Dailog variable

  const [errorDia, setErrorDia] = useState(false)
  const [errorDiaMsg, setErrorDiaMsg] = useState('')

  // Close Dialog function
  const closeErrorDia = () => {
    setErrorDia(false);
  }

  // handle pagination event 
  const handleChangePage = async (event, newPage) => {
    setPage(newPage)
    let skip = newPage * 20;
    if (isfilter === 'YES') {
      const resp = await http.get('user-management/dailyLoginReport', { params: { ...forFilter, skip: skip, limit: 20 } })
      setRows([...resp.data.data]);
      setTotalPage(resp.data.totalData);
    }
    else {
      const data = await http.get('user-management/dailyLoginReport', { params: { skip: skip, limit: 20 } })
      setRows([...data.data.data]);
      setTotalPage(data.data.totalData);
    }

  }
  // Tabel bydefault data
  const apiData = async () => {
    try {
      const data = await http.get('user-management/dailyLoginReport', { params: { skip: 0, limit: 20 } })
      if (data?.data?.success === true) {
        setRows([...data.data.data]);
        setTotalPage(data.data.totalData);
        setIsFilter(data.data.isFiltered);
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

  // Table header
  const columns = [{ id: 'position', label: 'Serial no' },
  { id: 'fullName', label: 'Full Name' },
  { id: 'userName', label: 'Username', },
  { id: 'device', label: 'Device' },
  { id: 'ipAddress', label: 'IP Address' },
  { id: 'contact', label: 'Mobile', format: (value) => value.slice(-4).padStart(value.length, '*')  },
  { id: 'emailId', label: 'Email' },
  {
    id: 'loginTime', label: 'Login Time', format: (value) => {
      const d = new Date(value);
      return `${(d.getMonth() + 1)}/${d.getDate()}/${String(d.getFullYear()).slice(-2)}, ${d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
    }
  },
  ];

  const formik = useFormik({
    initialValues: formdata,
    validateOnMount: true,
    validationSchema: Yup.object({
      userName: Yup.string().required('User Name is required'),
      start: Yup.date().required('Start date required').max(Yup.ref('end'), "Can't be Greater than End Date"),
      end: Yup.date().required('End date required').min(Yup.ref('start'), 'Greater than Start Date'),
    }),
    onSubmit: async values => {
      try {
        let submitData = { ...values }
        submitData.start = new Date(submitData.start).getTime();
        submitData.end = new Date(submitData.end).getTime();

        const resp = await http.get('user-management/dailyLoginReport', { params: { ...submitData, skip: 0, limit: 20 } })
        setPage(0);
        if (resp?.data?.success === true) {
          setForFilter({ ...submitData })
          setRows([...resp.data.data]);
          setTotalPage(resp.data.totalData);
          setIsFilter(resp.data.isFiltered);
        }
        else if (resp?.data?.success === false) {
          setErrorDiaMsg(resp.data.message);
          setErrorDia(true)
        }
      } catch (error) {
        setErrorDiaMsg(error?.response?.data?.message);
        setErrorDia(true);
      }
    }
  })

  // Download Csv function
  const downloadCsv = async (e) => {
    e.preventDefault();
    try {
      let resp = await http.get('user-management/exportCSVdailyLoginReport', { params: forFilter ? forFilter : null })
      const a = document.createElement("a");
      a.href = "data:text/csv," + encodeURI(resp.data);
      let filename = "Daily login report";
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
    formik.resetForm();
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
            <div className='col-lg-3 col-md-3 text-center'>
              <label className='col-form-label'>Username:</label>
            </div>
            <div className='col-lg-3 col-md-3 text-center'>
              <input type='text' name='userName' className='form-control' value={formik.values.userName} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Enter User Name' />
              {formik.touched.userName && formik.errors.userName ? (
                <small className="error-msg">{formik.errors.userName}</small>) : null}
            </div>

            <div className='col-lg-3 col-md-3 text-center'>
              <label className='col-form-label'>Start Date:</label>
            </div>
            <div className='col-lg-3 col-md-3 text-center'>
              <input type="date" className='form-control' name="start" value={formik.values.start} onBlur={formik.handleBlur} onChange={formik.handleChange} />
              {formik.touched.start && formik.errors.start ? (
                <small className="error-msg">{formik.errors.start}</small>) : null}
            </div>

            <div className='col-lg-3 col-md-3 text-center'>
              <label className='col-form-label'>End Date:</label>
            </div>
            <div className='col-lg-3 col-md-3 text-center'>
              <input type="date" className='form-control' name="end" value={formik.values.end} onBlur={formik.handleBlur} onChange={formik.handleChange} />
              {formik.touched.end && formik.errors.end ? (
                <small className="error-msg">{formik.errors.end}</small>) : null}
            </div>

          </div>

          <div className="d-flex g-2 flex-row align-items-center justify-content-evenly text-center">
            <span className="button-wrapper"><button type="submit" className="button-37" disabled={!formik.isValid} >Submit</button></span>
            <span className="button-wrapper"><button type="reset" onClick={resetForm} className="button-37-cancel">Reset</button></span>
            <span className="button-wrapper"><button className="button-37-csv" role="button" onClick={e => downloadCsv(e)}>CSV</button></span>
          </div>
        </form>
      </div>
      <SharedTable columns={columns} rows={rows} page={page}
        handleChangePage={handleChangePage} totalPage={totalPage}
      />
      <InvalidDialog opendia={errorDia} DiaMsg={errorDiaMsg} closedia={closeErrorDia} />
    </div>
  )
}

export default DailyLoginReport