import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import profileDummy from '../assets/images/profileDummy.svg';
import edit from '../assets/images/Edit.svg';
import deleteIcon from '../assets/images/Delete.svg';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#F3FDFF',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    borderBottom: '1px solid transparent',
  },
}));

export default function TableList() {
  function createData(name, email) {
    return {
      name,
      email,
    };
  }
  const rows = [
    createData('Rabiya', 'r@gmail.com'),
    createData('Hamza', 'h@g.com'),
    createData('Aqsa', 'aq@g.com'),
    createData('Jeena', 'j@g.com'),
    createData('Jeena', 'j@g.com'),
    createData('Rabiya', 'r@gmail.com'),
    createData('Hamza', 'h@g.com'),
    createData('Aqsa', 'aq@g.com'),
    createData('Jeena', 'j@g.com'),
    createData('Jeena', 'j@g.com'),
    createData('Rabiya', 'r@gmail.com'),
    createData('Hamza', 'h@g.com'),
    createData('Aqsa', 'aq@g.com'),
    createData('Jeena', 'j@g.com'),
    createData('Jeena', 'j@g.com'),
    createData('Rabiya', 'r@gmail.com'),
    createData('Hamza', 'h@g.com'),
    createData('Aqsa', 'aq@g.com'),
    createData('Jeena', 'j@g.com'),
    createData('Jeena', 'j@g.com'),
    createData('Rabiya', 'r@gmail.com'),
    createData('Hamza', 'h@g.com'),
    createData('Aqsa', 'aq@g.com'),
    createData('Jeena', 'j@g.com'),
    createData('Jeena', 'j@g.com'),
    createData('Rabiya', 'r@gmail.com'),
    createData('Hamza', 'h@g.com'),
    createData('Aqsa', 'aq@g.com'),
    createData('Jeena', 'j@g.com'),
    createData('Jeena', 'j@g.com'),
  ];
  return (
    <div className="bg">
      <TableContainer
        component={Paper}
        style={{ borderRadius: '20px', maxHeight: '100%', overflow: 'scroll' }}
      >
        <h1 className="thead">List of Admins</h1>
        <Table
          sx={{
            minWidth: 700,
            [`& .${tableCellClasses.root}`]: {
              borderBottom: 'none',
            },
          }}
          aria-label="customized table"
        >
          <TableBody>
            {/* <h1>List of Admins</h1> */}
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell
                  align="right"
                  sx={{ width: '1%', paddingLeft: '2%', paddingRight: '2%' }}
                >
                  {' '}
                  <img src={profileDummy} alt="" />
                </StyledTableCell>
                <StyledTableCell align={window.innerWidth > 1600 ? 'left' : 'center'}>
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align={window.innerWidth > 1600 ? 'right' : 'center'}>
                  {row.email}
                </StyledTableCell>

                <StyledTableCell
                  align="right"
                  sx={{
                    paddingLeft: '2%',
                    paddingRight: '2%',
                  }}
                >
                  <span className="t-icon">
                    <img src={edit} alt="" className="editIcon" id="t" />
                  </span>
                  <span className="t-icon">
                    <img src={deleteIcon} className="deleteIcon" alt="" />
                  </span>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
