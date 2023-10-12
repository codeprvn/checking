import React, { useState, useEffect } from 'react'
import http from '../utilities/api'
import SharedTable from '../shared component/SharedTable';
// import { useNavigate } from 'react-router-dom';

import InvalidDialog from '../shared component/InvalidDialog';

const ListVersion = () => {

  // Dailog variable
  const [errorDia, setErrorDia] = useState(false);
  const [errorDiaMsg, setErrorDiaMsg] = useState('');

  // Close Dialog function
  const closeErrorDia = () => {
    setErrorDia(false);
  }

  // Share Table state variable 
  const [rows, setRows] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);

  // const navigate = useNavigate()

  // handle pagination event 
  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
    let skip = newPage * 20;
    const data = await http.get('version-and-maintenance/listGameVersions', { params: { skip: skip, limit: 20 } })
    setRows([...data.data.data]);
  }

  // Action button Handler
  // const actionHandler =(name, id)=>{
  //   const paramId = id._id
  //   if(name === 'Edit'){
  //     navigate(`/version/edit-version/${paramId}`);
  //   }

  // }


  // const actionButton=[{name:'Edit'}]

  // Table header
  const columns = [{ id: 'position', label: 'Serial no' },
  { id: 'appVersion', label: 'Version' },
  { id: 'deviceType', label: 'Device Type', },
  { id: 'versionStatus', label: 'Status' },
  { id: 'maintenanceState', label: 'Maintenance Status' }
  ];

  const intialData = async () => {
    try {
      const resp = await http.get('version-and-maintenance/listGameVersions', { params: { skip: 0, limit: 20 } });
      if (resp?.data?.success === true) {
        setRows([...resp.data.data]);
        setTotalPage(resp.data.totalData);
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
    intialData();
  }, [])

  return (
    <>
      <SharedTable columns={columns} rows={rows} page={page}
        handleChangePage={handleChangePage} totalPage={totalPage}
      />

      <InvalidDialog opendia={errorDia} DiaMsg={errorDiaMsg} closedia={closeErrorDia} />
    </>
  )
}

export default ListVersion