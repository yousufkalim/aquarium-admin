/* eslint-disable indent */
import { React, useState } from 'react';
import { styled } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import MultipleSelect from './FilterByClientName';
import edit from '../../../../assets/images/Edit.svg';
import deleteIcon from '../../../../assets/images/Delete.svg';
import AddAquarium from './AddAquarium';
import DeletePopup from '../../../../components/DeletePopup';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#F3FDFF!important',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    borderBottom: '1px solid transparent',
  },
}));

export default function AquariumTable({
  aquariums,
  getAquariums,
  clients,
  tanks,
}) {
  const [del, setDel] = useState(false);
  const [editing, setEditing] = useState(false);
  const [aquarium, setAquarium] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  //   useEffect(() => getAquariums(), []);

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
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h1 className="thead">List of Aquariums</h1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <MultipleSelect
              text="Client Name"
              style={{
                borderRadius: '17px',
                border: '1px solid #8C8C8C',
                color: '#8C8C8C',
                padding: '2%',
              }}
              clients={clients}
              sx={{ m: 1, mt: 3, mr: 8, minWidth: 200 }}
            />
          </div>
        </div>

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
              <StyledTableCell
                sx={{
                  fontSize: '16px',
                  fontWeight: '700',
                  width: '15%',
                }}
                align="center"
              >
                Name
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  fontSize: '16px',
                  fontWeight: '700',
                  width: '35%',
                }}
                align="center"
              >
                Address
              </StyledTableCell>
              <StyledTableCell
                sx={{ fontSize: '16px', fontWeight: '700' }}
                align="center"
              >
                Service Details
              </StyledTableCell>

              <StyledTableCell
                sx={{
                  fontSize: '16px',
                  fontWeight: '700',
                  width: '20%',
                }}
                align="center"
              >
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* <h1>List of Admins</h1> */}
            {aquariums?.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell
                  align="center"
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <div
                    style={{ textAlign: 'left', marginTop: '15px' }}
                  >
                    <p className="placename">
                      {' '}
                      {`${row.client?.first_name} ${row.client?.last_name}`}
                    </p>

                    <p className="tankname">
                      {row.tank_details.size}
                    </p>
                  </div>
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="serviceTableTxt"
                >
                  {`${row.address.name}`}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="serviceTableTxt"
                  sx={{
                    color: '#8c8c8c',
                    textAlign: 'justify',
                    letterSpacing: '0',
                    wordBreak: 'break-word',
                  }}
                >
                  {row.service_details.length < 135
                    ? row.service_details
                    : `${row.service_details.substring(
                        0,
                        135,
                      )}  ....`}
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
                      setAquarium(row);
                    }}
                    role="presentation"
                  />

                  <img
                    src={deleteIcon}
                    className="deleteIcon"
                    style={{ marginLeft: '3%' }}
                    onClick={() => {
                      setDel(true);
                      setAquarium(row);
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
        <AddAquarium
          open={editing}
          setOpen={setEditing}
          editing={editing}
          aquarium={aquarium}
          getAquariums={getAquariums}
          clients={clients}
          tanks={tanks}
        />
      )}
      {del && (
        <DeletePopup
          open={del}
          setOpen={setDel}
          item={aquarium}
          txt="clients/aquariums"
          getData={getAquariums}
        />
      )}
    </div>
  );
}
