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

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
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

export default function AdminTable({ admins, getAdmins }) {
  const [del, setDel] = useState(false);
  const [editing, setEditing] = useState(false);
  const [admin, setAdmin] = useState('');

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
          overflow: 'hidden',
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
            {admins.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell
                  align="right"
                  className="safariMarginClass"
                  sx={{
                    width: '1%',
                  }}
                >
                  <img
                    src={profileDummy}
                    className="imgNameCombo"
                    alt=""
                  />
                </StyledTableCell>
                <StyledTableCell align="left" className="admintxt">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="admintxt"
                  sx={{
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
                    onClick={() => {
                      setEditing(true);
                      setAdmin(row);
                    }}
                    role="presentation"
                  />

                  <img
                    src={deleteIcon}
                    className="deleteIcon"
                    onClick={() => {
                      setDel(true);
                      setAdmin(row);
                    }}
                    alt=""
                    role="presentation"
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editing && (
        <AddAdmin
          open={editing}
          setOpen={setEditing}
          editing={editing}
          admin={admin}
          getAdmins={getAdmins}
        />
      )}
      {del && (
        <DeletePopup
          open={del}
          setOpen={setDel}
          item={admin}
          txt="admins"
          getData={getAdmins}
        />
      )}
    </div>
  );
}
