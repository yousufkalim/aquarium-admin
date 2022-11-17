/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import edit from '../../../../assets/images/Edit.svg';
import deleteIcon from '../../../../assets/images/Delete.svg';
import AddTask from './AddTask';
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

export default function ScheduleTable({
  taskList,
  getTasks,
  aquariums,
}) {
  const [del, setDel] = useState(false);
  const [editing, setEditing] = useState(false);
  const [task, setTask] = useState({});
  const [date, setDate] = useState();
  const t_options = {
    hour: '2-digit',
    minute: '2-digit',
  };
  const dateChange = (e) => {
    setDate(e);
    getTasks(moment(e).format('DD/MM/YYYY'));
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
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <h1 className="thead">List of Technicians</h1>

          <div className="date-div">
            <DatePicker
              showPopperArrow
              dateFormat="dd/MMMM/yyyy"
              name="date"
              placeholderText="DD/MM/YYYY"
              value={date}
              selected={date}
              popperPlacement="bottom-start"
              showYearDropdown
              onChange={dateChange}
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
                  fontFamily: 'HelveticaBold',
                }}
                align="left"
              >
                Name
              </StyledTableCell>

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
            {taskList.tasks
              ? taskList.tasks?.map((row) => (
                  <StyledTableRow>
                    <StyledTableCell
                      align="left"
                      className="technicianName"
                    >
                      {row.type}
                      <p>
                        {' '}
                        {`${new Date(
                          row.start_time,
                        ).toLocaleTimeString(
                          'en',
                          t_options,
                        )} -  ${new Date(
                          row.end_time,
                        ).toLocaleTimeString('en', t_options)} `}
                      </p>
                    </StyledTableCell>

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
                        }}
                      >
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
                              setTask(row);
                            }}
                            role="presentation"
                          />

                          <img
                            src={deleteIcon}
                            className="deleteIcon flexitem"
                            onClick={() => {
                              setDel(true);
                              setTask(row);
                            }}
                            alt=""
                            role="presentation"
                          />
                        </div>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : 'NOTHING FOUND'}
          </TableBody>
        </Table>
      </TableContainer>

      {editing && (
        <AddTask
          open={editing}
          setOpen={setEditing}
          editing={editing}
          task={task}
          selectedDate={date}
          aquariums={aquariums}
          getTasks={getTasks}
        />
      )}
      {del && (
        <DeletePopup
          open={del}
          setOpen={setDel}
          item={task}
          txt="schedule/tasks"
          getData={getTasks}
          selectedDate={date}
        />
      )}
    </div>
  );
}
