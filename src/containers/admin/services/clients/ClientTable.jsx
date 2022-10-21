/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import edit from '../../../../assets/images/Edit.svg';
import deleteIcon from '../../../../assets/images/Delete.svg';
import AddClient from './AddClient';
import DeletePopup from '../../../../components/DeletePopup';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
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

export default function ClientsTable({ clients, getClients }) {
  const [del, setDel] = useState(false);
  const [editing, setEditing] = useState(false);
  const [client, setClient] = useState('');

  useEffect(() => {
    getClients();
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
        <h1 className="thead">List of Clients</h1>
        <Table
          sx={{
            minWidth: 700,
            [`& .${tableCellClasses.root}`]: {
              borderBottom: 'none',
            },
          }}
          aria-label="customized table"
        >
          {' '}
          <TableHead>
            <TableRow sx={{ background: '#d9f4ff' }}>
              <StyledTableCell
                sx={{
                  fontSize: '16px',
                  fontWeight: '700',
                  width: '20%',
                }}
                align="center"
              >
                Name
              </StyledTableCell>

              <StyledTableCell
                sx={{
                  fontSize: '16px',
                  fontWeight: '700',
                }}
                align="center"
              >
                Phone Number
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  fontSize: '16px',
                  fontWeight: '700',
                  width: '25%',
                }}
                align="center"
              >
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients?.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell
                  align="center"
                  className="technicianName"
                >
                  {`${row.first_name} ${row.last_name}`}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="admintxt"
                  sx={{
                    color: '#8C8C8C',
                  }}
                >
                  {row.phone_number}
                </StyledTableCell>

                <StyledTableCell
                  align="center"
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
                      setClient(row);
                    }}
                    role="presentation"
                  />

                  <img
                    src={deleteIcon}
                    className="deleteIcon"
                    style={{ marginLeft: '3%' }}
                    onClick={() => {
                      setDel(true);
                      setClient(row);
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
        <AddClient
          open={editing}
          setOpen={setEditing}
          editing={editing}
          client={client}
          getClients={getClients}
        />
      )}
      {del && (
        <DeletePopup
          open={del}
          setOpen={setDel}
          item={client}
          txt="clients"
          getData={getClients}
        />
      )}
    </div>
  );
}
