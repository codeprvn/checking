import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import http from '../utilities/api';
import SuccessDialog from '../shared component/SuccessDialog';
import InvalidDialog from '../shared component/InvalidDialog';
import { useNavigate } from 'react-router-dom';


const CreateNewVerosion = () => {

  const route = useNavigate()
  const [openDia, setOpenDia] = useState(false);
  const [diaMsg, setDiaMsg] = useState('');
  const [errorDia, setErrorDia] = useState(false);
  const [errorDiaMsg, setErrorDiaMsg] = useState('');

  // Close Dialog function
  const closeDia = () => {
    setOpenDia(false);
    route('/version/list-version')
  }
  const closeErrorDia = () => {
    setErrorDia(false);
  }

  const formik = useFormik({
    initialValues: {
      appVersion: '',
      deviceType: '',
      state: '',
      maintenanceState: ''
    },
    validateOnMount: true,
    validationSchema: Yup.object({
      appVersion: Yup.string().required('App version required'),
      deviceType: Yup.string().required('Device Type required'),
      state: Yup.string().required('Status Type required'),
      maintenanceState: Yup.string().required('Maintenance Status Type required')
    }),
    onSubmit: async value => {
      try {
        const resp = await http.post('version-and-maintenance/createGameVersion', value)
        if (resp?.data?.success === true) {
          setDiaMsg(resp.data.message);
          setOpenDia(true);
        }
        else if (resp?.data?.success === false) {
          setErrorDiaMsg(resp.data.message);
          setErrorDia(true);
        }
      } catch (error) {
        setErrorDiaMsg(error?.response?.data?.message);
        setErrorDia(true);
      }
    }
  })


  // form reset
  const formReset = (event) => {
    event.preventDefault();
    formik.resetForm();
  }

  return (
    <div className='container-fluid'>
      <form onSubmit={formik.handleSubmit}>
        <div className='row g-3 mb-5 align-items-center'>
          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Version:</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <input type='text' name='appVersion' className='form-control' value={formik.values.appVersion} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Enter Version' />
            {formik.touched.appVersion && formik.errors.appVersion ?
              (<small className="error-msg">{formik.errors.appVersion}</small>) : null}
          </div>

          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Device Type:</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <select className='form-control form-select' name='deviceType' value={formik.values.deviceType} onBlur={formik.handleBlur} onChange={formik.handleChange}>
              <option defaultValue hidden>Select Player Type</option>
              <option value='androidApp' >Android</option>
              <option value='iosApp' >IOS</option>
              <option value='mac' >Mac OS</option>
              <option value='windows' >Windows</option>
              <option value='website' >Website</option>
              <option value='browser' >Browser</option>
            </select>
            {formik.touched.deviceType && formik.errors.deviceType ?
              (<small className="error-msg">{formik.errors.deviceType}</small>) : null}
          </div>

          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Status:</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <select className='form-control form-select' name='state' value={formik.values.state} onBlur={formik.handleBlur} onChange={formik.handleChange}>
              <option defaultValue hidden>Select Player Type</option>
              <option value='Active' >Active</option>
              <option value='Inactive' >In-Active</option>
            </select>
            {formik.touched.state && formik.errors.state ?
              (<small className="error-msg">{formik.errors.state}</small>) : null}
          </div>

          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Maintenance Status:</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <select className='form-control form-select' name='maintenanceState' value={formik.values.maintenanceState} onBlur={formik.handleBlur} onChange={formik.handleChange}>
              <option defaultValue hidden>Select Player Type</option>
              <option value='Active' >Active</option>
              <option value='Inactive' >In-Active</option>
            </select>
            {formik.touched.maintenanceState && formik.errors.maintenanceState ?
              (<small className="error-msg">{formik.errors.maintenanceState}</small>) : null}
          </div>

        </div>

        <div className="d-flex g-2 flex-row align-items-center justify-content-evenly text-center">
          <span className="button-wrapper"><button type="submit" className="button-37" disabled={!formik.isValid} >Submit</button></span>
          <span className="button-wrapper"><button className="button-37-cancel" onClick={formReset} >Reset</button></span>
        </div>
      </form>
      <SuccessDialog opendia={openDia} DiaMsg={diaMsg} closedia={closeDia} />
      <InvalidDialog opendia={errorDia} DiaMsg={errorDiaMsg} closedia={closeErrorDia} />
    </div>
  )
}

export default CreateNewVerosion;