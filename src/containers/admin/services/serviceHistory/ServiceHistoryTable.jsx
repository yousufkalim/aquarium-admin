import { React, useState, useEffect } from 'react';
import { styled } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import profileDummy from '../../../../assets/images/profileDummy.svg';
import MultipleSelect from './FiltersMultiselect';
import { genMediaUrl } from '../../../../config';
import ServiceHistoryPopup from '../../../../components/ServiceHistoryPopup';

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

export default function ServiceHistoryTable({ serviceHistory }) {
  // eslint-disable-next-line no-unused-vars, operator-linebreak
  const [serviceHistories, setServiceHistories] = useState([]);
  const [service, setService] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setServiceHistories(serviceHistory);
  }, [serviceHistory]);

  const options = {
    weekday: 'short',
    year: 'numeric',
    day: 'numeric',
    month: 'short',
  };
  const t_options = {
    hour: '2-digit',
    minute: '2-digit',
  };

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
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h1 className="thead">Service History</h1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <MultipleSelect
              text="Tank Size"
              style={{
                border: '1px solid #28CDFF ',
                borderRadius: '17px',
                color: '#28CDFF',
                textAlign: 'left',
                paddingRight: '4%',
              }}
              sx={{ m: 1, width: 300, mt: 3 }}
            />
            <MultipleSelect
              text="Filter"
              style={{
                borderRadius: '17px',
                border: '1px solid #8C8C8C',
                color: '#8C8C8C',
              }}
              sx={{ m: 1, minWidth: 80, mt: 3 }}
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
                sx={{ fontSize: '16px', fontFamily: 'HelveticaBold' }}
                align="center"
              >
                Client Name
              </StyledTableCell>
              <StyledTableCell
                sx={{ fontSize: '16px', fontFamily: 'HelveticaBold' }}
                align="center"
              >
                Date
              </StyledTableCell>
              <StyledTableCell
                sx={{ fontSize: '16px', fontFamily: 'HelveticaBold' }}
                align="center"
              >
                Service Start Time - End Time
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  fontSize: '16px',
                  fontFamily: 'HelveticaBold',
                  width: '20%',
                }}
                align="center"
              >
                Technician
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  fontSize: '16px',
                  fontFamily: 'HelveticaBold',
                  width: '20%',
                }}
                align="center"
              >
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {serviceHistories?.map((row, i) => (
              <StyledTableRow>
                <StyledTableCell
                  align="center"
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <div
                    style={{ textAlign: 'left', marginTop: '20px' }}
                  >
                    <p className="placename">{`${row.aquarium?.client?.first_name} ${row.aquarium?.client?.last_name}`}</p>

                    <p className="tankname">
                      {row.aquarium?.tank_details?.size}
                    </p>
                  </div>
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="serviceTableTxt"
                >
                  {new Date(row.date).toLocaleDateString(
                    'en-BA',
                    options,
                  )}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="serviceTableTxt"
                >
                  {`${new Date(row.start_time).toLocaleTimeString(
                    'en',
                    t_options,
                  )} -  ${new Date(row.end_time).toLocaleTimeString(
                    'en',
                    t_options,
                  )} `}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <div className="technicianCol">
                    <div style={{ height: '56px' }}>
                      <img
                        src={
                          // eslint-disable-next-line operator-linebreak
                          genMediaUrl(row.technician?.profile_pic) ||
                          profileDummy
                        }
                        style={{
                          width: '100%',
                          height: '100%',
                          border: '3px solid #28CDFF',
                          borderRadius: '50px',
                        }}
                        onError={
                          () =>
                            // eslint-disable-next-line implicit-arrow-linebreak
                            setServiceHistories((prev) => {
                              // eslint-disable-next-line no-param-reassign, operator-linebreak
                              prev[i].technician.profile_pic =
                                undefined;
                              return [...prev];
                            })
                          // eslint-disable-next-line react/jsx-curly-newline
                        }
                        alt=""
                      />
                    </div>
                    <span
                      style={{ margin: 'auto' }}
                      className="serviceTableTxt"
                    >
                      {`${row.technician?.first_name} ${row.technician?.last_name}`}
                    </span>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    className="serviceDetailBtn"
                    onClick={() => {
                      setOpen(true);
                      setService(row);
                    }}
                    onKeyDown={() => setOpen(true)}
                    variant="outlined"
                  >
                    Details
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {open && (
        <ServiceHistoryPopup
          open={open}
          setOpen={setOpen}
          service={service}
        />
      )}
    </div>
  );
}
