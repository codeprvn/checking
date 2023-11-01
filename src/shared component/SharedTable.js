import React from 'react'
import "./sharedtable.css";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


const SharedTable = ({ columns, rows, page, handleChangePage, totalPage, isAction = false, actionButton, actionHandler }) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'auto', marginTop: '50px' }}>
      <TableContainer sx={{ maxHeight: 'auto' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className='headRow'>
              {columns && columns.map((column) => (
                <TableCell className='headColumn'
                  key={column.id}
                >
                  {column.label}
                </TableCell>
              ))}
              {isAction && <TableCell className='headColumn'>Action</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id} >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} className='bodyColumnfirst'>
                        {column.format
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                  {isAction && <TableCell className='bodyColumnfirst'>
                    <div className='actionGrid'>
                      
                      {/* below line is static for enable disable  */}
                      {/* {actionButton.map((btn) => btn.name==='Disable'? (<button className={row['isActive'] ?'actionButton danger' :'actionButton '} key={btn.name} onClick={() => actionHandler(row['isActive'] ? btn.name : 'Enable', row)}>{row['isActive'] ? btn.name : 'Enable'}</button>) :(<button className='actionButton' key={btn.name} onClick={() => actionHandler(btn.name, row)}>{btn.name}</button>))} */}

                  {/* by this we can create button accordingly */}
                      { actionButton.map(btn =>btn.format?btn.format(btn.name, row):(<button className='actionButton' key={btn.name} onClick={() => actionHandler(btn.name, row)}>{btn.name}</button>) )}
                      </div></TableCell>}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[-1]}
        component="div"
        count={totalPage}
        rowsPerPage={20}
        page={page}
        onPageChange={handleChangePage}
        showFirstButton={true}
        showLastButton={true}
      // labelDisplayedRows={({ from, to, count }) => `Items per page:20 ${from}-${to} of ${count}`}
      />
    </Paper>
  );

}

export default SharedTable