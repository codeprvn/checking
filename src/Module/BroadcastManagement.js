import React, { useState, useEffect, useRef} from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import http from '../utilities/api';
import SuccessDialog from '../shared component/SuccessDialog';
import InvalidDialog from '../shared component/InvalidDialog';

const BroadcastManagement = () => {
  const [tableList, setTableList] = useState([]);

  // Dailog variable
  const [openDia, setOpenDia] = useState(false);
  const [diaMsg, setDiaMsg] = useState('');
  const [errorDia, setErrorDia] = useState(false);
  const [errorDiaMsg, setErrorDiaMsg] = useState('');
  const allTable = useRef('');

  // Close Dialog function
  const closeDia = () => {
    setOpenDia(false);
  }
  const closeErrorDia = () => {
    setErrorDia(false);
  }

  const listTable = async () => {
    try {
      const resp = await http.get('game-management/listTables')
      if (resp?.data?.success === true) {
        setTableList([...resp.data.data]);
        allTable.current = [...resp.data.data]
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
  useEffect(() => { listTable() }, [])

  const formik = useFormik({
    initialValues: {
      broadCastTo: '',
      broadCastHeading: '',
      broadCastMessage: '',
      channelVariation: '',
      // chipsType: '',
      channelId: ''
    },
    validateOnMount: true,
    validationSchema: Yup.object({
      broadCastTo: Yup.string().required('Broadcast To required'),
      broadCastHeading: Yup.string().required('Broadcast Heading To required'),
      broadCastMessage: Yup.string().required('Broadcast Message required'),
      channelVariation: Yup.string().when('broadCastTo', (broadCastTo, schema) => {
        return broadCastTo[0] === 'TABLE' ? schema.required() : schema
      }),
      // chipsType: Yup.string().when('broadCastTo', (broadCastTo, schema) => {
      //   return broadCastTo[0] === 'TABLE' ? schema.required() : schema
      // }),
      channelId: Yup.string().when('broadCastTo', (broadCastTo, schema) => {
        return broadCastTo[0] === 'TABLE' ? schema.required() : schema
      })
    }),
    onSubmit: async (value) => {
      try {
        const resp = await http.post('broadcast-management/broadcastToGame', value);
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
    listTable();
  }

  // to filter table list
  const customHandleChange = (e, formik) =>{
    formik.handleChange(e);
    setTableList(allTable.current.filter((table)=> table.channelVariation===e.target.value))
  }

  return (
    <div className='container-fluid'>
      <form onSubmit={formik.handleSubmit}>
        <div className='row g-3 mb-5 align-items-center'>
          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Broadcast To:</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <select name='broadCastTo' className={'form-control form-select '+ (formik.errors.broadCastTo ? 'shadow border border-danger' : 'shadow border border-success')} value={formik.values.broadCastTo} onChange={formik.handleChange} onBlur={formik.handleBlur} >
              <option defaultValue hidden>Select Broadcast To</option>
              <option value='ALL_PLAYERS' >All Players</option>
              <option value='TABLE' >Table</option>
            </select>
            {formik.touched.broadCastTo && formik.errors.broadCastTo ?
              (<small className="error-msg">{formik.errors.broadCastTo}</small>) : null}
          </div>

          {
            formik.values.broadCastTo === 'TABLE' &&
            <><div className='col-lg-3 col-md-3 text-center'>
              <label className='col-form-label'>Game Variation:</label>
            </div>
              <div className='col-lg-3 col-md-3 text-center'>
                <select className={'form-control form-select '+ (formik.errors.channelVariation ? 'shadow border border-danger' : 'shadow border border-success')} name='channelVariation' value={formik.values.channelVariation} onChange={(e) => customHandleChange(e, formik)} onBlur={formik.handleBlur}>
                  <option defaultValue hidden>Select Game Variation</option>
                  <option value='Texas Hold’em' >Texas Hold'em</option>
                  <option value='Omaha' >Omaha</option>
                  <option value='Six Plus Hold’em' >Six Plus Hold'em</option>
                  <option value='Omaha hi-lo' >Omaha hi-lo</option>
                  <option value='Five Card Omaha' >Five Card Omaha</option>
                  <option value='ROE' >ROE</option>
                </select>
                {formik.touched.channelVariation && formik.errors.channelVariation ?
                  (<small className="error-msg">{formik.errors.channelVariation}</small>) : null}
              </div>

              {/* <div className='col-lg-3 col-md-3 text-center'>
                <label className='col-form-label'>Chips Type:</label>
              </div>
              <div className='col-lg-3 col-md-3 text-center'>
                <select className={'form-control form-select '+ (formik.errors.chipsType ? 'shadow border border-danger' : 'shadow border border-success')} name='chipsType' value={formik.values.chipsType} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                  <option defaultValue hidden>Select Chips Type</option>
                  <option value='ALL' >All</option>
                  <option value='REAL_MONEY' >Real Money</option>
                  <option value='PLAY_MONEY' >Play Money</option>
                </select>
                {formik.touched.chipsType && formik.errors.chipsType ?
                  (<small className="error-msg">{formik.errors.chipsType}</small>) : null}
              </div> */}

              <div className='col-lg-3 col-md-3 text-center'>
                <label className='col-form-label'>Table:</label>
              </div>
              <div className='col-lg-3 col-md-3 text-center'>
                <select className={'form-control form-select '+ (formik.errors.channelId ? 'shadow border border-danger' : 'shadow border border-success')} name='channelId' value={formik.values.channelId} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                  <option defaultValue hidden>Select a Table</option>
                  {tableList && tableList.map((table) => (
                    <option key={table._id} value={table.channelId}>{table.channelName}</option>
                  ))}
                </select>
                {formik.touched.channelId && formik.errors.channelId ?
                  (<small className="error-msg">{formik.errors.channelId}</small>) : null}
              </div></>
          }
          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Broadcast Heading:</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <input type='text' name='broadCastHeading' className={'form-control '+ (formik.errors.broadCastHeading ? 'shadow border border-danger' : 'shadow border border-success')} value={formik.values.broadCastHeading} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.broadCastHeading && formik.errors.broadCastHeading ?
              (<small className="error-msg">{formik.errors.broadCastHeading}</small>) : null}
          </div>

          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Broadcast Message:</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <textarea name='broadCastMessage' className={'form-control ' + (formik.errors.broadCastMessage ? 'shadow border border-danger' : 'shadow border border-success')} value={formik.values.broadCastMessage} onChange={formik.handleChange} onBlur={formik.handleBlur} ></textarea>
            {formik.touched.broadCastMessage && formik.errors.broadCastMessage ?
              (<small className="error-msg">{formik.errors.broadCastMessage}</small>) : null}
          </div>
        </div>

        <div className="d-flex g-2 flex-row align-items-center justify-content-evenly text-center">
          <span className="button-wrapper"><button type="submit" className="button-37" disabled={!formik.isValid}>Submit</button></span>
          <span className="button-wrapper"><button type="reset" className="button-37-cancel" onClick={formReset} >Reset</button></span>
        </div>
      </form>
      <SuccessDialog opendia={openDia} DiaMsg={diaMsg} closedia={closeDia} />
      <InvalidDialog opendia={errorDia} DiaMsg={errorDiaMsg} closedia={closeErrorDia} />
    </div>
  )
}

export default BroadcastManagement