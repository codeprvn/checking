import React, { useEffect, useState } from 'react'
import http from '../utilities/api';
import InvalidDialog from '../shared component/InvalidDialog';

const Insights = () => { 

  const [accountData, setAccountData] = useState({
    totalFreeChips: '',
    totalRegisteredUser: '',
    totalActiveUsers: '',
    yearlySignUpUsers: '',
    monthlySignUpUsers: '',
    todaySignUpUsers: ''
  })

  // Dailog variable
  const [errorDia, setErrorDia] = useState(false);
  const [errorDiaMsg, setErrorDiaMsg] = useState('');

  // Close Dialog function

  const closeErrorDia = () => {
    setErrorDia(false);
  }

  const intialData = async () => {
    try {
      const resp = await http.get('insight/getInsightDetails')

      setAccountData({ ...resp.data });

      if (resp?.data?.success === false) {
        setErrorDiaMsg(resp.data.message);
        setErrorDia(true)
      }
    } catch (error) {
      setErrorDiaMsg(error?.response?.data?.message);
      setErrorDia(true);
    }
  }
  useEffect(() => { intialData() }, [])


  return (
    <div className="container-fluid p-0">
      <div className="row g-3 mb-3 text-center" >

        <div className="flex-sm-1 col-lg-3 col-md-6 col-sm-6">
          <div className="card">
            <p className="fs-4">{accountData.totalRegisteredUser || 0}</p>
            <h6 className="mb-2"><strong>Total Registered Users</strong></h6>
          </div>
        </div>

        <div className="flex-sm-1 col-lg-3 col-md-6 col-sm-6">
          <div className="card">
            <p className="fs-4">{accountData.totalFreeChips || 0}</p>
            <h6 className="mb-2"><strong>Total Free Chips(Points)</strong></h6>
          </div>
        </div>

        <div className="flex-sm-1 col-lg-3 col-md-6 col-sm-6">
          <div className="card" >
            <p className="fs-4">{accountData.totalActiveUsers || 0}</p>
            <h6 className="mb-2"><strong>Total Active Users</strong></h6>
          </div>
        </div>

        <div className="flex-sm-1 col-lg-3 col-md-6 col-sm-6">
          <div className="card">
            <p className="fs-4">{accountData.todaySignUpUsers || 0}</p>
            <h6 className="mb-2"><strong>Total Signup today</strong></h6>
          </div>
        </div>

        <div className="flex-sm-1 col-lg-3 col-md-6 col-sm-6">
          <div className="card">
            <p className="fs-4">{accountData.monthlySignUpUsers || 0}</p>
            <h6 className="mb-2"><strong>Total Signup this month</strong></h6>
          </div>
        </div>

        <div className="flex-sm-1 col-lg-3 col-md-6 col-sm-6">
          <div className="card">
            <p className="fs-4">{accountData.yearlySignUpUsers || 0}</p>
            <h6 className="mb-2"><strong>Total Signup this year</strong></h6>
          </div>
        </div>
      </div>

      <InvalidDialog opendia={errorDia} DiaMsg={errorDiaMsg} closedia={closeErrorDia} />
    </div>
  )
}

export default Insights