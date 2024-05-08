import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
function createData(name, ) {
  return {
    name,
    history: [
      {
        vehNo: '2020-01-05',
        summary: '11091700',
        driverInfo: 3,
        currentStatus: 'Vee',
        requestStatus :"Delayed"
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
 const [isShow , setIsShow] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        {/* <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <Typography variant="h6" gutterBottom component="div">
                New Tyre -4
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  {/* <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow> */}
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.vehNo}>
                      <TableCell  component="th" scope="row">
                        {historyRow.summary}
                      </TableCell>
                      <TableCell >{historyRow.summary}</TableCell>
                      <TableCell >{historyRow.driverInfo}</TableCell>
                      <TableCell  className='relative'
                      onMouseEnter={()=>setIsShow(true)}
                      onMouseLeave={()=>setIsShow(false)} >
                      {
                          isShow && (
                              <div className='absolute'>
                                <ButtonTable/>
                              </div>
                          )
                      }
                        {historyRow.requestStatus}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
const rows = [
  createData('New Tyre -4'),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell >Vehicle Info.</TableCell>
            <TableCell >Summary</TableCell>
            <TableCell >Driver Info.</TableCell>
            <TableCell >Current Status</TableCell>
            <TableCell >Request Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row  key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
 function ButtonTable(){
    return(
        <div>
        <button className='bg-gray-100 border-2 border-blue-400 rounded-md p-1 shadow-slate-400'>Mark Resolved</button>
         </div>
    )
}