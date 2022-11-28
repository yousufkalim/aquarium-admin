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
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
import { genMediaUrl } from '../../../../config';
import edit from '../../../../assets/images/Edit.svg';
import deleteIcon from '../../../../assets/images/Delete.svg';
import AddTechnician from './AddTechnician';
import DeletePopup from '../../../../components/DeletePopup';

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

export default function TechnicianTable({
  technicians,
  getTechnicians,
}) {
  const [del, setDel] = useState(false);
  const [editing, setEditing] = useState(false);
  const [technician, setTechnician] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    getTechnicians();
  }, []);
  return (
    <div className="bg">
      <TableContainer
        component={Paper}
        style={{
          borderRadius: '20px',
          maxHeight: '100%',
          overflowX: 'hidden',
        }}
      >
        <h1 className="thead">List of Technicians</h1>
        <Table
          sx={{
            minWidth: 700,
            [`& .${tableCellClasses.root}`]: {
              borderBottom: 'none',
            },
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow sx={{ background: '#d9f4ff' }}>
              <StyledTableCell />
              <StyledTableCell
                sx={{
                  fontSize: '16px',
                  fontFamily: 'HelveticaBold',
                }}
                align="left"
              >
                Name
              </StyledTableCell>
              <StyledTableCell />
              <StyledTableCell />

              <StyledTableCell className="spaceCol" />
              <StyledTableCell
                sx={{
                  fontSize: '16px',
                  fontFamily: 'HelveticaBold',
                }}
                align="center"
              >
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {technicians?.map((row, i) => (
              <StyledTableRow key={row.first_name}>
                <StyledTableCell
                  align="right"
                  className="safariMarginClass"
                  sx={{
                    width: '9%',
                  }}
                >
                  {' '}
                  {row.technician?.profile_pic ? (
                    <img
                      src={
                        // eslint-disable-next-line operator-linebreak
                        genMediaUrl(row?.profile_pic)
                      }
                      alt=""
                      onError={
                        () =>
                          // eslint-disable-next-line implicit-arrow-linebreak
                          setTechnician((prev) => {
                            // eslint-disable-next-line no-param-reassign, operator-linebreak
                            prev[i].row.profile_pic = undefined;
                            return [...prev];
                          })
                        // eslint-disable-next-line react/jsx-curly-newline
                      }
                    />
                  ) : (
                    <Avatar
                      name={row?.first_name}
                      style={{
                        width: 'fit-content',
                        height: '100%',
                        border: '3px solid #28CDFF',
                        borderRadius: '50%',
                      }}
                      round
                      size="50"
                      alt="profile_pic"
                    />
                  )}
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  className="technicianName"
                >
                  {`${row.first_name} ${row.last_name}`}
                </StyledTableCell>
                <StyledTableCell />
                <StyledTableCell />
                <StyledTableCell />
                <StyledTableCell
                  align="right"
                  sx={{
                    paddingLeft: '2%',
                    paddingRight: '2%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      padding: '5px',
                      alignItems: 'center',
                    }}
                  >
                    <div className="flexitem">
                      <Button
                        variant="outlined"
                        className="scheduleBtn flexitem"
                        id="flexitem"
                        onClick={() => {
                          navigate(`/admin/technicians/${row._id}`);
                        }}
                      >
                        See Schedule
                      </Button>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      <img
                        src={edit}
                        alt=""
                        className="editIcon flexitem"
                        onClick={() => {
                          setEditing(true);
                          setTechnician(row);
                        }}
                        role="presentation"
                      />

                      <img
                        src={deleteIcon}
                        className="deleteIcon flexitem"
                        onClick={() => {
                          setDel(true);
                          setTechnician(row);
                        }}
                        alt=""
                        role="presentation"
                      />
                    </div>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editing && (
        <AddTechnician
          open={editing}
          setOpen={setEditing}
          editing={editing}
          technician={technician}
          getTechnicians={getTechnicians}
        />
      )}
      {del && (
        <DeletePopup
          open={del}
          setOpen={setDel}
          item={technician}
          txt="users"
          getData={getTechnicians}
        />
      )}
    </div>
  );
}
