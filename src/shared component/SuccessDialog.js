import React from 'react'
import Dialog from '@mui/material/Dialog';

const SuccessDialog = ({ opendia, DiaMsg, closedia }) => {
    return (
        <Dialog
            open={opendia}
            onClose={closedia}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description" >
            <div className='p-3'>
                <h6>{DiaMsg}</h6>
                <button className="button-37-cancel mt-2" onClick={closedia}>Close</button>
            </div>
        </Dialog>
    )
}

export default SuccessDialog