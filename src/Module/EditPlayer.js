import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { useParams, useNavigate } from 'react-router-dom';
import http from '../utilities/api'
import SuccessDialog from '../shared component/SuccessDialog';
import InvalidDialog from '../shared component/InvalidDialog';

const EditPlayer = () => {
  const { id } = useParams();
  const route = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    emailId: '',
    mobileNumber: '',
    isBlocked: ''
  })

  // Dailog variable
  const [openDia, setOpenDia] = useState(false);
  const [diaMsg, setDiaMsg] = useState('');
  const [errorDia, setErrorDia] = useState(false)
  const [errorDiaMsg, setErrorDiaMsg] = useState('')

  // Close Dialog function
  const closeDia = () => {
    setOpenDia(false);
    route('/usermanagement/list-player');
  }
  const closeErrorDia = () => {
    setErrorDia(false);
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validateOnMount: true,
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name name required'),
      lastName: Yup.string().required('Last Name required'),
      userName: Yup.string().required('User Name required'),
      emailId: Yup.string().required('Email required').email('Invalid Email type'),
      mobileNumber: Yup.string().required('Mobile No required').max(10, 'Max 10 digit required').min(10, 'Min 10 digit required'),
      isBlocked: Yup.string().required('Status required'),
    }),
    onSubmit: async (values) => {
      try {
        const formData = {
          firstName: values.firstName,
          lastName: values.lastName,
          userName: values.userName,
          emailId: values.emailId,
          mobileNumber: values.mobileNumber,
          isBlocked: values.isBlocked === 'true' || values.isRunItTwiceTable === true ? true : false
        }

        const resp = await http.put(`user-management/updatePlayer/${id}`, formData)
        if (resp?.data?.success === true) {
          setDiaMsg(resp.data.message);
          setOpenDia(true);
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
  });

  // this function will used for intital player data 
  async function fetchMyAPI() {
    try {
      const resp = await http.get(`user-management/viewPlayer/${id}`)
      if(resp?.data?.success === true){
      setFormData({ ...resp.data.data })
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

  // for form reset
  const resetForm = (event) => {
    event.preventDefault();
    formik.resetForm()
    fetchMyAPI();
  }

  useEffect(() => {
    fetchMyAPI()
  }, [])



  return (
    <div className="container-fluid">
      <form onSubmit={formik.handleSubmit}>
        <div className='row g-3 mb-5 align-items-center'>
          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>First Name:</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <input className='form-control' name='firstName' type='text' value={formik.values.firstName} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Enter First Name' />
            {formik.touched.firstName && formik.errors.firstName ? (
              <small className="error-msg">{formik.errors.firstName}</small>
            ) : null}
          </div>

          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Last Name:</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <input className='form-control' name='lastName' type='text' value={formik.values.lastName} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Enter Last Name' />
            {formik.touched.lastName && formik.errors.lastName ? (
              <small className="error-msg">{formik.errors.lastName}</small>
            ) : null}
          </div>

          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Username:</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <input className='form-control' name='userName' type='text' onBlur={formik.handleBlur} value={formik.values.userName} onChange={formik.handleChange} placeholder='Enter User Name' readOnly />
            {formik.touched.userName && formik.errors.userName ? (
              <small className="error-msg">{formik.errors.userName}</small>
            ) : null}
          </div>

          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Email:</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <input className='form-control' type='email' name='emailId' value={formik.values.emailId} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Enter User Email' />
            {formik.touched.emailId && formik.errors.emailId ? (
              <small className="error-msg">{formik.errors.emailId}</small>
            ) : null}
          </div>

          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Phone:</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <input className='form-control' type='number' name='mobileNumber' value={formik.values.mobileNumber} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Enter User Phone No' />
            {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
              <small className="error-msg">{formik.errors.mobileNumber}</small>
            ) : null}
          </div>

          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Status:</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <select className='form-control form-select' name='isBlocked' onBlur={formik.handleBlur} value={formik.values.isBlocked} onChange={formik.handleChange} >
              <option defaultValue hidden>Select a Value</option>
              <option value='false' >Active</option>
              <option value='true' >Block</option>
            </select>
            {formik.touched.isBlocked && formik.errors.isBlocked ? (
              <small className="error-msg">{formik.errors.isBlocked}</small>
            ) : null}
          </div>
        </div>

        <div className="d-flex g-2 flex-row align-items-center justify-content-evenly text-center">
          <span className="button-wrapper"><button type="submit" className="button-37" >Submit</button></span>
          <span className="button-wrapper"><button onClick={resetForm} className="button-37-cancel">Reset</button></span>
        </div>

      </form>
      <SuccessDialog opendia={openDia} DiaMsg={diaMsg} closedia={closeDia} />
      <InvalidDialog opendia={errorDia} DiaMsg={errorDiaMsg} closedia={closeErrorDia} />
    </div>
  )
}

export default EditPlayer