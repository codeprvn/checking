import React from 'react'
import Dialog from '@mui/material/Dialog';

const InvalidDialog = ({ opendia, DiaMsg, closedia }) => {
  return (
    <Dialog
      open={opendia}
      onClose={closedia}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description" >
      <div className='p-3'>
        <h4>Error <span >😥</span></h4>
        <div style={{ height: 'auto', color: '#000' }}>{DiaMsg}</div>
        <button className="button-37-cancel mt-2" onClick={closedia}>Close</button>
      </div>
    </Dialog>
  )
}

export default InvalidDialog