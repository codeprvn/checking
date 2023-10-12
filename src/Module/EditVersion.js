import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import http from '../utilities/api';
import { useParams } from 'react-router-dom';

const EditVersion = () => {
  const [formData, setFormData] = useState({
    appVersion: '',
    deviceType: '',
    status: '',
    maintenanceState: ''
  })

  const { id } = useParams();

  const formik = useFormik({
    initialValues: formData,
    validateOnMount: true,
    validationSchema: Yup.object({
      appVersion: Yup.string().required('App version required'),
      deviceType: Yup.string().required('Device Type required'),
      status: Yup.string().required('Status Type required'),
      maintenanceState: Yup.string().required('Maintenance Status Type required')
    }),
    onSubmit: async value => {
      try {
        const resp = await http.post('version-and-maintenance/updateGameVersion', value)

      } catch (error) {
      }
    }
  })

  // this function will used for intital player data 
  async function fetchMyAPI() {
    try {
      const resp = await http.get(`version-and-maintenance/listGameVersions/${id}`)
      setFormData({ ...resp.data.data })
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchMyAPI()
  }, [])


  return (
    <div className='container-fluid'>
      <form onSubmit={formik.handleSubmit}>
        <div className='row g-3 mb-5 align-items-center'>
          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Version</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <input type='text' name='appVersion' className='form-control' value={formik.values.appVersion} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Enter Version' />
            {formik.touched.appVersion && formik.errors.appVersion ?
              (<small className="error-msg">{formik.errors.appVersion}</small>) : null}
          </div>

          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Device Type</label>
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
            <label className='col-form-label'>Status</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <select className='form-control form-select' name='status' value={formik.values.status} onBlur={formik.handleBlur} onChange={formik.handleChange}>
              <option defaultValue hidden>Select Player Type</option>
              <option value='Active' >Active</option>
              <option value='Inactive' >In-Active</option>
            </select>
            {formik.touched.status && formik.errors.status ?
              (<small className="error-msg">{formik.errors.status}</small>) : null}
          </div>

          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Maintenance Status</label>
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
          <span className="button-wrapper"><button type="submit" className="button-37" >Submit</button></span>
          <span className="button-wrapper"><button type="reset" className="button-37-cancel">Reset</button></span>
        </div>
      </form>
    </div>
  )
}

export default EditVersion