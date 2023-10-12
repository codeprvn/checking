import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { useParams } from 'react-router-dom';
import http from '../utilities/api'
import SuccessDialog from '../shared component/SuccessDialog';
import InvalidDialog from '../shared component/InvalidDialog';

const EditTable = () => {

  const { id } = useParams();

  const [formData, setFormData] = useState({
    channelName: '',
    channelVariation: '',
    channelId: '',
    isPotLimit: '',
    smallBlind: '',
    bigBlind: '',
    maxPlayers: '',
    minBuyIn: '',
    maxBuyIn: '',
    isStraddleEnable: '',
    turnTime: '',
    ctEnabledBufferTime: '',
    ctEnabledBufferHand: '',
    isRunItTwiceTable: ''
  })

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
    setErrorDia(false);
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validateOnMount: true,
    validationSchema: Yup.object({
      channelName: Yup.string().required('Table name required'),
      channelVariation: Yup.string().required('GameVariation required'),
      isPotLimit: Yup.string().required('Stakes required'),
      smallBlind: Yup.number().required('Small blind required').min(1, 'Minimum value should be ').lessThan(Yup.ref('bigBlind'), 'Should be smaller then Big Blind'),
      bigBlind: Yup.number().required('Big blind required').moreThan(Yup.ref('smallBlind'), 'Should be more then small blind'),
      maxPlayers: Yup.number().required('Max player required').min(2, 'Minimum 2 player').max(9, 'Max player should be 9'),
      minBuyIn: Yup.number().required('Min buy-in player required').min(10, 'Min buy-in should be 10').lessThan(Yup.ref('maxBuyIn'), 'Should be smaller then Max BuyIn'),
      maxBuyIn: Yup.number().required('Max buy-in player required').moreThan(Yup.ref('minBuyIn'), 'Should be more then minBuyIn'),
      isStraddleEnable: Yup.string().required('Select Straddle'),
      turnTime: Yup.number().required('Turn time required').min(1, 'Minimum turn time should be 1').max(100, 'Max turn time should be 100'),
      ctEnabledBufferTime: Yup.number().required('Buffer time required'),
      ctEnabledBufferHand: Yup.number().required('Buffer hand required').min(1, 'Minimum buffer hand should be 1').max(10, 'Max buffer hand should be 10'),
      isRunItTwiceTable: Yup.string().required('Rit required'),
    }),
    onSubmit: async (values) => {
      try {
        const formData = { ...values }
        formData.isStraddleEnable = formData.isStraddleEnable === 'true' || formData.isStraddleEnable === true ? true : false
        formData.isRunItTwiceTable = formData.isRunItTwiceTable === 'true' || formData.isRunItTwiceTable === true ? true : false
        const resp = await http.put(`game-management/updateTable/${id}`, formData)
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

  const formReset = () => {
    formik.resetForm()
    fetchMyAPI()
  }

  // this function is used for initial table data
  async function fetchMyAPI() {
    try {
      const resp = await http.get(`game-management/table/${id}`)
      if (resp?.data?.success === true) {
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
  useEffect(() => {
    fetchMyAPI()
  }, [])



  return (
    <div className="container-fluid">
      <form onSubmit={formik.handleSubmit}>
        <div className='row g-3 mb-5 align-items-center'>
          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Table Name</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <input className='form-control' name='channelName' type='text' value={formik.values.channelName} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Enter Table Name' readOnly />
            {formik.touched.channelName && formik.errors.channelName ? (
              <small className="error-msg">{formik.errors.channelName}</small>
            ) : null}
          </div>

          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>GameVariation</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <select className='form-control form-select' name='channelVariation' value={formik.values.channelVariation} onBlur={formik.handleBlur} onChange={formik.handleChange}>
              <option defaultValue hidden>Select Player Type</option>
              <option value='Texas Hold’em' >Texas Hold'em</option>
              <option value='Omaha' >Omaha</option>
              <option value='Six Plus Hold’em' >Six Plus Hold'em</option>
              <option value='Omaha hi-lo' >Omaha hi-lo</option>
              <option value='Five Card Omaha' >Five Card Omaha</option>
              <option value='ROE' >ROE</option>
            </select>
            {formik.touched.channelVariation && formik.errors.channelVariation ? (
              <small className="error-msg">{formik.errors.channelVariation}</small>
            ) : null}
          </div>

          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Channel Id</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <input className='form-control' name='channelId' type='text' value={formik.values.channelId} onChange={formik.handleChange} readOnly placeholder='Enter channel id' />
          </div>

          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Stakes</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <select className='form-control form-select' name='isPotLimit' onBlur={formik.handleBlur} value={formik.values.isPotLimit} onChange={formik.handleChange} >
              <option defaultValue hidden>Select Player Type</option>
              <option value='Pot Limit' >Pot Limit</option>
              <option value='No Limit' >No Limit</option>
            </select>
            {formik.touched.isPotLimit && formik.errors.isPotLimit ? (
              <small className="error-msg">{formik.errors.isPotLimit}</small>
            ) : null}
          </div>

          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Small Blind</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <input className='form-control' name='smallBlind' type='number' onBlur={formik.handleBlur} value={formik.values.smallBlind} onChange={formik.handleChange} placeholder='Enter Small Blind' />
            {formik.touched.smallBlind && formik.errors.smallBlind ? (
              <small className="error-msg">{formik.errors.smallBlind}</small>
            ) : null}
          </div>

          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Big Blind</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <input className='form-control' name='bigBlind' type='number' onBlur={formik.handleBlur} value={formik.values.bigBlind} onChange={formik.handleChange} placeholder='Enter Big Blind' />
            {formik.touched.bigBlind && formik.errors.bigBlind ? (
              <small className="error-msg">{formik.errors.bigBlind}</small>
            ) : null}
          </div>

          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Players on table</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <input className='form-control' name='maxPlayers' type='number' onBlur={formik.handleBlur} value={formik.values.maxPlayers} onChange={formik.handleChange} placeholder='Enter Player on Table' />
            {formik.touched.maxPlayers && formik.errors.maxPlayers ? (
              <small className="error-msg">{formik.errors.maxPlayers}</small>
            ) : null}
          </div>

          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Min Buy-In</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <input className='form-control' name='minBuyIn' type='number' onBlur={formik.handleBlur} value={formik.values.minBuyIn} onChange={formik.handleChange} placeholder='Enter Min Buy-In' />
            {formik.touched.minBuyIn && formik.errors.minBuyIn ? (
              <small className="error-msg">{formik.errors.minBuyIn}</small>
            ) : null}
          </div>

          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Max Buy-In</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <input className='form-control' name='maxBuyIn' type='number' onBlur={formik.handleBlur} value={formik.values.maxBuyIn} onChange={formik.handleChange} placeholder='Enter Max Buy-In' />
            {formik.touched.maxBuyIn && formik.errors.maxBuyIn ? (
              <small className="error-msg">{formik.errors.maxBuyIn}</small>
            ) : null}
          </div>

          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Straddle</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <select className='form-control form-select' name='isStraddleEnable' onBlur={formik.handleBlur} value={formik.values.isStraddleEnable} onChange={formik.handleChange} >
              <option defaultValue hidden>Select Player Type</option>
              <option value='true' >Straddle Mandatory</option>
              <option value='false' >Straddle Optional</option>
            </select>
            {formik.touched.isStraddleEnable && formik.errors.isStraddleEnable ? (
              <small className="error-msg">{formik.errors.isStraddleEnable}</small>
            ) : null}
          </div>

          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Turn Time</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <input className='form-control' name='turnTime' type='number' onBlur={formik.handleBlur} value={formik.values.turnTime} onChange={formik.handleChange} placeholder='Enter Turn time' />
            {formik.touched.turnTime && formik.errors.turnTime ? (
              <small className="error-msg">{formik.errors.turnTime}</small>
            ) : null}
          </div>

          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Buffer Time</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <input className='form-control' name='ctEnabledBufferTime' type='number' onBlur={formik.handleBlur} value={formik.values.ctEnabledBufferTime} onChange={formik.handleChange} placeholder='Enter Bufer time' />
            {formik.touched.ctEnabledBufferTime && formik.errors.ctEnabledBufferTime ? (
              <small className="error-msg">{formik.errors.ctEnabledBufferTime}</small>
            ) : null}
          </div>

          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Buffer Hand</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <input className='form-control' name='ctEnabledBufferHand' type='number' onBlur={formik.handleBlur} value={formik.values.ctEnabledBufferHand} onChange={formik.handleChange} placeholder='Enter Buffer Hand' />
            {formik.touched.ctEnabledBufferHand && formik.errors.ctEnabledBufferHand ? (
              <small className="error-msg">{formik.errors.ctEnabledBufferHand}</small>
            ) : null}
          </div>

          <div className='col-lg-3 col-md-3 text-center'>
            <label className='col-form-label'>Run It Twice</label>
          </div>
          <div className='col-lg-3 col-md-3 text-center'>
            <select className='form-control form-select' name='isRunItTwiceTable' onBlur={formik.handleBlur} value={formik.values.isRunItTwiceTable} onChange={formik.handleChange} >
              <option defaultValue hidden>Select a Value</option>
              <option value='true' >Yes</option>
              <option value='false' >No</option>
            </select>
            {formik.touched.isRunItTwiceTable && formik.errors.isRunItTwiceTable ? (
              <small className="error-msg">{formik.errors.isRunItTwiceTable}</small>
            ) : null}
          </div>
        </div>

        <div className="d-flex g-2 flex-row align-items-center justify-content-evenly text-center">
          <span className="button-wrapper"><button type="submit" className="button-37" >Submit</button></span>
          <span className="button-wrapper"><button type="reset" onClick={formReset} className="button-37-cancel">Reset</button></span>
        </div>

      </form>
      <SuccessDialog opendia={openDia} DiaMsg={diaMsg} closedia={closeDia} />
      <InvalidDialog opendia={errorDia} DiaMsg={errorDiaMsg} closedia={closeErrorDia} />
    </div>
  )
}

export default EditTable