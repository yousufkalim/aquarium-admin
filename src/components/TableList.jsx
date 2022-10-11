import { React, useState } from 'react';

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
import AddAdmin from '../containers/superadmin/AddAdmin';
import DeletePopup from './DeletePopup';

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
  const [del, setDel] = useState(false);
  const [editing, setEditing] = useState(false);

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
                  <img
                    src={edit}
                    alt=""
                    className="editIcon"
                    onClick={() => setEditing(true)}
                    role="presentation"
                  />

                  <img
                    src={deleteIcon}
                    className="deleteIcon"
                    onClick={() => setDel(true)}
                    alt=""
                    role="presentation"
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editing && <AddAdmin open={editing} setOpen={setEditing} />}
      {del && <DeletePopup open={del} setOpen={setDel} />}
    </div>
  );
}
