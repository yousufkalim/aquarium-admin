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
import moment from 'moment';
import api from '../../../../api/index';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 20,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #CDEEFC',
    fontSize: 16,
    padding: '3%',
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
}) {
  const { id } = useParams();
  const t_options = {
    hour: '2-digit',
    minute: '2-digit',
  };
  const [schedule, setSchedule] = useState({
    technician: id,
    type: '',
    date: '',
    start_time: '',
    end_time: '',
    aquarium: '',
    repeat: '',
  });

  // eslint-disable-next-line prefer-const
  let { type, date, start_time, end_time, aquarium, repeat } =
    schedule;

  const [checked, setChecked] = useState(true);
  // const outlinedInputStyles = useOutlinedInputStyles();

  console.log('[=============]', task);
  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };
  const handleChange = (e) => {
    setSchedule({
      ...schedule,
      [e.target.name]: e.target.value,
    });
  };
  const dateChange = (e) => {
    setSchedule({
      ...schedule,
      date: e,
    });
  };

  const startTimeChange = (e) => {
    setSchedule({
      ...schedule,
      start_time: e,
    });
  };
  const endTimeChange = (e) => {
    setSchedule({
      ...schedule,
      end_time: e,
    });
  };
  useEffect(() => {
    console.log(
      'UseEffect',
      open,
      setOpen,
      editing,
      getTasks,
      selectedDate,
      task,
      aquariums,
    );
    if (editing) {
      setSchedule({
        ...schedule,
        type: task.type,
        date: task.date,
        start_time: new Date(task.start_time).toLocaleTimeString(
          'en',
          t_options,
        ),
        end_time: new Date(task.end_time).toLocaleTimeString(
          'en',
          t_options,
        ),
        aquarium: task.aquarium._id,
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
      date: moment(date).format('DD/MM/YYYY'),
      start_time: moment(start_time, 'HH:mm').format('hh:mm a'),
      end_time: moment(end_time, 'HH:mm').format('hh:mm a'),
    };
    if (editing) {
      await api(
        'put',
        `/schedule/tasks/${task._id}`,
        updatedSchedule,
      );
      toast.success('Tank edited successfully');
    } else {
      await api('post', '/schedule/tasks', updatedSchedule);
      toast.success('Tank created successfully');
    }
    getTasks(moment(selectedDate).format('DD/MM/YYYY'));
    handleClose();
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
              style={{ width: '70%', marginBottom: '7%' }}
            />

            <div>
              <InputLabel
                sx={{
                  textAlign: 'left',
                  marginLeft: '12%',
                  color: '#8C8C8C',
                  fontSize: '16px',
                }}
              >
                Task
              </InputLabel>
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

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                displayEmpty
                variant="outlined"
                className={
                  [
                    'drive',
                    'lunch',
                    'outOfOffice',
                    'endOfShift',
                  ].includes(type)
                    ? 'activeOtherTaskBtn'
                    : 'otherTaskBtn'
                }
                inputProps={{ 'aria-label': 'Without label' }}
                value={
                  [
                    'drive',
                    'lunch',
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
                <MenuItem value="outOfOffice" name="type">
                  Out of Office
                </MenuItem>
                <MenuItem value="endOfShift" name="type">
                  End of Shift
                </MenuItem>
              </Select>
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
                <InputLabel>Date</InputLabel>

                <div className="parent-date-div">
                  <DatePicker
                    showPopperArrow
                    dateFormat="dd/MMMM/yyyy"
                    name="date"
                    placeholderText="DD/MM/YYYY"
                    value={date}
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
                }}
              >
                <InputLabel>Start Time</InputLabel>

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
                }}
              >
                <InputLabel>End Time</InputLabel>
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
                marginLeft: '12%',
                color: '#8C8C8C',
                fontSize: '16px',
              }}
            >
              Aquarium
            </InputLabel>
            <FormControl
              sx={{
                mb: 2,
                mt: 1,
                width: '85%',
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
                    {`${_.client?.first_name} ${_.client?.last_name} (${_.tank_details.size})`}
                  </MenuItem>
                ))}
              </Select>
              <FormControlLabel
                sx={{ mt: 2 }}
                control={
                  <Checkbox defaultChecked onChange={handleCheck} />
                }
                label="Want to repeat this task every"
              />
            </FormControl>
            <FormControl
              sx={{
                mb: 2,

                width: '85%',
              }}

              // sx={{ mb: 1, mt: 3, width: '85%' }}
              // variant="outlined"
            >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                value={repeat}
                disabled={!checked}
                // label="size"
                name="repeat"
                onChange={handleChange}
                input={<BootstrapInput />}
              >
                <MenuItem value="1">1 week</MenuItem>
                <MenuItem value="2">2 weeks</MenuItem>
                <MenuItem value="3">3 weeks</MenuItem>
                {/* ))} */}
              </Select>
            </FormControl>
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
            className="resetPasswordBtn"
            variant="contained"
          >
            {editing ? 'Update Task' : 'Add Task'}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
