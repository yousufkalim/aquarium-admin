/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import profileDummy from '../../../assets/images/profileDummy.svg';
import edit from '../../../assets/images/Edit.svg';
import deleteIcon from '../../../assets/images/Delete.svg';
import AddAdmin from './AddAdmin';
import DeletePopup from '../../../components/DeletePopup';
import api from '../../../api/index';

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

export default function AdminTable() {
  const [del, setDel] = useState(false);
  const [editing, setEditing] = useState(false);
  const [admins, setAdmins] = useState([]);

  const getAdmins = async () => {
    const { data } = await api('get', '/admins');
    if (data) {
      setAdmins(data?.results);
    }
    console.log('admins', data.results);
  };

  useEffect(() => {
    getAdmins();
  }, []);

  return (
    <div className="bg">
      <TableContainer
        component={Paper}
        style={{
          borderRadius: '20px',
          maxHeight: '100%',
          overflow: 'scroll',
        }}
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
            {admins.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell
                  align="right"
                  sx={{
                    width: '1%',
                    paddingLeft: '2%',
                    paddingRight: '2%',
                  }}
                >
                  {' '}
                  <img
                    src={profileDummy}
                    className="imgNameCombo"
                    alt=""
                  />
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  sx={{ fontSize: '22px', fontWeight: '700' }}
                >
                  {row.name}
                </StyledTableCell>
                <StyledTableCell
                  align={
                    window.innerWidth > 1600 ? 'right' : 'center'
                  }
                  sx={{
                    fontSize: '22px',
                    fontWeight: '700',
                    color: '#8C8C8C',
                  }}
                >
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
