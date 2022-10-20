import { React } from 'react';
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
import MultipleSelect from '../../../../components/Multiselect';

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

export default function ServiceHistoryTable() {
  function createData(placeName, tank, date, time, technician) {
    return {
      placeName,
      tank,
      date,
      time,
      technician,
    };
  }
  const rows = [
    createData(
      'Dental Clinic',
      '100 gallon tank',
      'Mon, 4 Aug, 2022',
      '10:00 AM - 01:00 PM',
      'Mike Bay',
    ),
    createData(
      'Dental Clinic',
      '100 gallon tank',
      'Mon, 4 Aug, 2022',
      '10:00 AM - 01:00 PM',
      'Mike Bay',
    ),
    createData(
      'Dental Clinic',
      '100 gallon tank',
      'Mon, 4 Aug, 2022',
      '10:00 AM - 01:00 PM',
      'Mike Bay',
    ),
    createData(
      'Dental Clinic',
      '100 gallon tank',
      'Mon, 4 Aug, 2022',
      '10:00 AM - 01:00 PM',
      'Mike Bay',
    ),
    createData(
      'Dental Clinic',
      '100 gallon tank',
      'Mon, 4 Aug, 2022',
      '10:00 AM - 01:00 PM',
      'Mike Bay',
    ),
    createData(
      'Dental Clinic',
      '100 gallon tank',
      'Mon, 4 Aug, 2022',
      '10:00 AM - 01:00 PM',
      'Mike Bay',
    ),
    createData(
      'Dental Clinic',
      '100 gallon tank',
      'Mon, 4 Aug, 2022',
      '10:00 AM - 01:00 PM',
      'Mike Bay',
    ),
    createData(
      'Dental Clinic',
      '100 gallon tank',
      'Mon, 4 Aug, 2022',
      '10:00 AM - 01:00 PM',
      'Mike Bay',
    ),
    createData(
      'Dental Clinic',
      '100 gallon tank',
      'Mon, 4 Aug, 2022',
      '10:00 AM - 01:00 PM',
      'Mike Bay',
    ),
    createData(
      'Dental Clinic',
      '100 gallon tank',
      'Mon, 4 Aug, 2022',
      '10:00 AM - 01:00 PM',
      'Mike Bay',
    ),
    createData(
      'Dental Clinic',
      '100 gallon tank',
      'Mon, 4 Aug, 2022',
      '10:00 AM - 01:00 PM',
      'Mike Bay',
    ),
    createData(
      'Dental Clinic',
      '100 gallon tank',
      'Mon, 4 Aug, 2022',
      '10:00 AM - 01:00 PM',
      'Mike Bay',
    ),
    createData(
      'Dental Clinic',
      '100 gallon tank',
      'Mon, 4 Aug, 2022',
      '10:00 AM - 01:00 PM',
      'Mike Bay',
    ),
    createData(
      'Dental Clinic',
      '100 gallon tank',
      'Mon, 4 Aug, 2022',
      '10:00 AM - 01:00 PM',
      'Mike Bay',
    ),
    createData(
      'Dental Clinic',
      '100 gallon tank',
      'Mon, 4 Aug, 2022',
      '10:00 AM - 01:00 PM',
      'Mike Bay',
    ),
    createData(
      'Dental Clinic',
      '100 gallon tank',
      'Mon, 4 Aug, 2022',
      '10:00 AM - 01:00 PM',
      'Mike Bay',
    ),
    createData(
      'Dental Clinic',
      '100 gallon tank',
      'Mon, 4 Aug, 2022',
      '10:00 AM - 01:00 PM',
      'Mike Bay',
    ),
    createData(
      'Dental Clinic',
      '100 gallon tank',
      'Mon, 4 Aug, 2022',
      '10:00 AM - 01:00 PM',
      'Mike Bay',
    ),
    createData(
      'Dental Clinic',
      '100 gallon tank',
      'Mon, 4 Aug, 2022',
      '10:00 AM - 01:00 PM',
      'Mike Bay',
    ),
    createData(
      'Dental Clinic',
      '100 gallon tank',
      'Mon, 4 Aug, 2022',
      '10:00 AM - 01:00 PM',
      'Mike Bay',
    ),
  ];
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
                sx={{ fontSize: '16px', fontWeight: '700' }}
                align="center"
              >
                Client Name
              </StyledTableCell>
              <StyledTableCell
                sx={{ fontSize: '16px', fontWeight: '700' }}
                align="center"
              >
                Date
              </StyledTableCell>
              <StyledTableCell
                sx={{ fontSize: '16px', fontWeight: '700' }}
                align="center"
              >
                Service Start Time - End Time
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  fontSize: '16px',
                  fontWeight: '700',
                  width: '20%',
                }}
                align="center"
              >
                Technician
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
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell
                  align="center"
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <div
                    style={{ textAlign: 'left', marginTop: '20px' }}
                  >
                    <p className="placename">{row.placeName}</p>

                    <p className="tankname">{row.tank}</p>
                  </div>
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="serviceTableTxt"
                >
                  {row.date}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="serviceTableTxt"
                >
                  {row.time}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <div className="technicianCol">
                    <img
                      src={profileDummy}
                      style={{
                        border: '3px solid #28CDFF',
                        borderRadius: '50px',
                      }}
                      alt=""
                    />
                    <span
                      style={{ margin: 'auto' }}
                      className="serviceTableTxt"
                    >
                      {row.technician}
                    </span>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    className="serviceDetailBtn"
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
    </div>
  );
}
