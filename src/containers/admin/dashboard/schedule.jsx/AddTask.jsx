/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-underscore-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable no-constant-condition */
/* eslint-disable consistent-return */
import { React, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
// import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { FormControl } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useParams } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputBase from '@mui/material/InputBase';
import TimePicker from 'react-time-picker';
import moment from 'moment-timezone';
import api from '../../../../api/index';
import TaskCreatedDetail from './TaskCreatedDetail';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 20,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #CDEEFC',
    fontSize: 16,
    padding: '2% 3%',
    textAlign: 'left',

    transition: theme.transitions.create([
      'border-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 20,
      borderColor: '#28CDFF',
      // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));
const CustomSelect = styled(Select)(() => ({
  '&.MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#cdeefc',
    },
    '&:hover fieldset': {
      borderColor: '#cdeefc',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#cdeefc',
    },
  },
}));
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-root': {
    borderRadius: '25px',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(7),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    textAlign: 'center',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(7),
    margin: 'auto',
  },
}));
export default function AddTask({
  open,
  setOpen,
  editing,
  getTasks,
  selectedDate,
  task,
  aquariums,
  disable,
  setDisable,
  getDate,
}) {
  const { id } = useParams();

  const [schedule, setSchedule] = useState({
    technician: id,
    type: '',
    date: '',
    start_time: '',
    end_time: '',
    aquarium: '',
    repeat: '1',
  });

  // eslint-disable-next-line prefer-const
  let { type, date, start_time, end_time, aquarium, repeat } =
    schedule;

  const [checked, setChecked] = useState(true);
  const [created, setCreated] = useState(false);
  const [details, setDetails] = useState({});

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };
  const handleChange = (e) => {
    setSchedule({
      ...schedule,
      [e.target.name]: e.target.value,
    });
    if (editing) {
      setDisable(false);
    }
  };
  const dateChange = (e) => {
    setSchedule({
      ...schedule,
      date: e,
    });
    setDisable(false);
  };

  const startTimeChange = (e) => {
    setSchedule({
      ...schedule,
      start_time: e,
    });
    if (editing) {
      setDisable(false);
    }
  };
  const endTimeChange = (e) => {
    setSchedule({
      ...schedule,
      end_time: e,
    });
    if (editing) {
      setDisable(false);
    }
  };

  useEffect(() => {
    if (editing) {
      setSchedule({
        ...schedule,
        type: task.type,
        date: moment(task.date)._d,
        start_time: moment(task.start_time)
          .tz('America/Tijuana')
          .format('HH:mm'),
        end_time: moment(task.end_time)
          .tz('America/Tijuana')
          .format('HH:mm'),

        aquarium: task?.aquarium?._id,
      });
    }
    // setSchedule(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // eslint-disable-next-line no-unused-vars

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const updatedSchedule = {
      ...schedule,
      date: moment(date || selectedDate).format('MM-DD-YYYY'),
      start_time: moment(start_time, 'HH:mm').format('hh:mm a'),
      end_time: moment(end_time, 'HH:mm').format('hh:mm a'),
    };

    if (!checked) {
      delete updatedSchedule.repeat;
    }
    const obj = {};
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const property in updatedSchedule) {
      if (updatedSchedule[property]) {
        obj[property] = updatedSchedule[property];
      }
    }

    if (editing) {
      await api('put', `/schedule/tasks/${task._id}`, obj);
      toast.success('Task edited successfully');
      handleClose();
    } else {
      const { data } = await api('post', '/schedule/tasks', obj);
      setCreated(true);
      setDetails(data.results);
    }
    getTasks(moment(selectedDate).format('MM-DD-YYYY'));
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        setOpen={setOpen}
        fullWidth
        maxWidth="md"
        id="addtask"
        PaperProps={{
          style: {
            borderRadius: 25,

            background: '#F3FDFF',
          },
        }}
      >
        <DialogContent>
          <Typography gutterBottom>
            <h1 style={{ fontSize: '24px', color: '#28CDFF' }}>
              {editing ? 'Edit Task' : 'Add New Task'}
            </h1>
            <p
              className="enterEmailTxt"
              style={{ cursor: 'default' }}
            >
              The task will be added in Technician&apos;s schedule.
            </p>
            <div
              className="hl-del"
              style={{ width: '50%', marginBottom: '6%' }}
            />

            <div>
              <InputLabel
                sx={{
                  textAlign: 'left',
                  margin: '2% 0% 0% 12%',
                  color: '#8C8C8C',
                  fontSize: '16px',
                  fontFamily: 'HelveticaMedium',
                  fontWeight: 400,
                }}
              >
                Task
              </InputLabel>
              <div
                className="taskInfo"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0% 7% 0% 10%',
                }}
              >
                <Button
                  className={
                    type === 'service'
                      ? 'activeTaskBtn'
                      : 'taskOptionBtns'
                  }
                  variant="outlined"
                  name="type"
                  value="service"
                  onClick={handleChange}
                >
                  Service
                </Button>

                <Button
                  className={
                    type === 'loadup'
                      ? 'activeTaskBtn'
                      : 'taskOptionBtns'
                  }
                  variant="outlined"
                  name="type"
                  value="loadup"
                  onClick={handleChange}
                >
                  Vehicle Loadup
                </Button>
                <Button
                  className={
                    type === 'unload'
                      ? 'activeTaskBtn'
                      : 'taskOptionBtns'
                  }
                  variant="outlined"
                  name="type"
                  value="unload"
                  onClick={handleChange}
                >
                  Vehicle Unload
                </Button>

                <CustomSelect
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  displayEmpty
                  variant="outlined"
                  style={{ height: 51 }}
                  className={
                    [
                      'drive',
                      'lunch',
                      'break',
                      'outOfOffice',
                      'endOfShift',
                    ].includes(type)
                      ? 'activeOtherTaskBtn'
                      : 'otherTaskBtn'
                  }
                  sx={{
                    fontFamily: 'HelveticaMedium',
                  }}
                  inputProps={{ 'aria-label': 'Without label' }}
                  value={
                    [
                      'drive',
                      'lunch',
                      'break',
                      'outOfOffice',
                      'endOfShift',
                    ].includes(type)
                      ? type
                      : ''
                  }
                  name="type"
                  onChange={handleChange}
                >
                  <MenuItem disabled value="" name="type">
                    {' '}
                    Others
                  </MenuItem>
                  <MenuItem value="drive" name="type">
                    {' '}
                    Drive
                  </MenuItem>
                  <MenuItem value="lunch" name="type">
                    Lunch
                  </MenuItem>
                  <MenuItem value="break" name="type">
                    Break
                  </MenuItem>
                  <MenuItem value="outOfOffice" name="type">
                    Out of Office
                  </MenuItem>
                  <MenuItem value="endOfShift" name="type">
                    End of Shift
                  </MenuItem>
                </CustomSelect>
              </div>
            </div>

            {/* <FormControl
              // sx={{ mb: 3, mt: 6, width: '85%' }}
              variant="outlined"
            > */}
            {/* <div> */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '719px',
                margin: 'auto',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <InputLabel
                  sx={{
                    margin: '0% 0% -4% 14%',
                    display: 'flex',
                    fontFamily: 'HelveticaMedium',
                    fontWeight: 400,
                  }}
                >
                  Date
                </InputLabel>

                <div
                  className="parent-date-div"
                  style={{
                    marginLeft: '11%',
                  }}
                >
                  <DatePicker
                    showPopperArrow
                    dateFormat="MM-dd-yyyy"
                    name="date"
                    placeholderText="MMMM-dd-yyyy"
                    value={
                      date ||
                      moment(selectedDate).format('MM-DD-YYYY')
                    }
                    selected={date}
                    popperPlacement="bottom-start"
                    showYearDropdown
                    // minDate={addDays(new Date(), 1)}
                    onChange={dateChange}
                  />
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'self-start',
                }}
              >
                <InputLabel
                  sx={{
                    marginBottom: '-8%',
                    fontFamily: 'HelveticaMedium',
                    fontWeight: 400,
                  }}
                >
                  Start Time
                </InputLabel>

                <div className="parent-div">
                  <TimePicker
                    style={{
                      height: 'calc(1.5em + 1.25rem + 2px)',
                      fontWeight: '500',
                    }}
                    format="hh:mm a"
                    name="start_time"
                    className="timpicker_cst"
                    disableClock
                    hourPlaceholder="hh"
                    minutePlaceholder="mm"
                    locale="en-US"
                    clockIcon={null}
                    defaultValue={null}
                    amPmAriaLabel
                    clearIcon={null}
                    value={start_time}
                    onChange={startTimeChange}
                  />
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'self-start',
                }}
              >
                <InputLabel
                  sx={{
                    marginBottom: '-8%',
                    fontFamily: 'HelveticaMedium',
                    fontWeight: 400,
                  }}
                >
                  End Time
                </InputLabel>
                <div className="parent-div">
                  <TimePicker
                    style={{
                      backgroundColor: 'yellow',
                    }}
                    name="end_time"
                    className="timpicker_cst"
                    disableClock
                    format="hh:mm a"
                    hourPlaceholder="hh"
                    minutePlaceholder="mm"
                    locale="en-US"
                    clockIcon={null}
                    clearIcon={null}
                    defaultValue={null}
                    amPmAriaLabel
                    value={end_time}
                    onChange={endTimeChange}
                  />
                </div>
              </div>
            </div>
            <InputLabel
              sx={{
                textAlign: 'left',
                margin: '2% 0% 0% 12%',
                color: '#8C8C8C',
                fontSize: '16px',
                fontFamily: 'HelveticaMedium',
                fontWeight: 400,
              }}
            >
              Aquarium
            </InputLabel>
            <FormControl
              sx={{
                mb: 2,
                mt: 1,
                width: '81%',
                marginLeft: '3.5%',
              }}

              // sx={{ mb: 1, mt: 3, width: '85%' }}
              // variant="outlined"
            >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                value={aquarium}
                name="aquarium"
                onChange={handleChange}
                input={<BootstrapInput />}
              >
                <MenuItem disabled selected value="">
                  Select Aquarium
                </MenuItem>
                {aquariums?.map((_) => (
                  <MenuItem value={_._id}>
                    {' '}
                    <span
                      style={{
                        color: '#28CDFF',
                        fontFamily: 'HelveticaMedium',
                        marginRight: '6px',
                      }}
                    >
                      {`${_.client?.first_name} 
                      ${_.client?.last_name}`}
                    </span>
                    {`(${_.tank_details.size})`}
                  </MenuItem>
                ))}
              </Select>
              {!editing ? (
                <FormControlLabel
                  sx={{
                    mt: 2,
                    color: '#28CDFF',
                  }}
                  control={
                    // eslint-disable-next-line react/jsx-wrap-multilines
                    <Checkbox
                      defaultChecked
                      onChange={handleCheck}
                      style={{ color: '#28CDFF' }}
                    />
                  }
                  label="Want to repeat this task every"
                />
              ) : (
                ''
              )}
            </FormControl>
            {!editing ? (
              <FormControl
                sx={{
                  mb: 2,

                  width: '81%',
                  marginLeft: '3.5%',
                }}

                // sx={{ mb: 1, mt: 3, width: '85%' }}
                // variant="outlined"
              >
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  inputProps={{ 'aria-label': 'Without label' }}
                  value={repeat || ''}
                  disabled={!checked}
                  // label="size"
                  name="repeat"
                  onChange={handleChange}
                  input={<BootstrapInput />}
                >
                  <MenuItem value="1" selected>
                    1 week
                  </MenuItem>
                  <MenuItem value="2">2 weeks</MenuItem>
                  <MenuItem value="3">3 weeks</MenuItem>
                  <MenuItem value="4">4 weeks</MenuItem>
                  {/* ))} */}
                </Select>
              </FormControl>
            ) : (
              ''
            )}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            className="closeBtn"
            variant="outlined"
          >
            Close
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            className={disable ? 'disable' : 'resetPasswordBtn'}
            disabled={disable}
          >
            {editing ? 'Update Task' : 'Add Task'}
          </Button>
        </DialogActions>
        {created && (
          <TaskCreatedDetail
            details={details}
            openDetail={created}
            setOpenDetail={setCreated}
            schedule={schedule}
            getTasks={getTasks}
            selectedDate={selectedDate}
            prevPopup={setOpen}
            getDate={getDate}
            // handlePrevClose={handleClose}
          />
        )}
      </BootstrapDialog>
    </div>
  );
}
