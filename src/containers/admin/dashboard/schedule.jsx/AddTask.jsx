/* eslint-disable operator-linebreak */
/* eslint-disable no-constant-condition */
/* eslint-disable consistent-return */
import { React, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { FormControl, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputBase from '@mui/material/InputBase';
import TimePicker from 'react-time-picker';
// import moment from 'moment';
import api from '../../../../api/index';

// eslint-disable-next-line object-curly-newline

const useOutlinedInputStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '2px solid #CDEEFC ',
        borderRadius: '20px',
        fontSize: 16,
        textAlign: 'center',
      },

      '&:hover fieldset': {
        borderColor: '#28CDFF',
      },
      '&::placeholder fieldset': {
        fontWeight: 800,
        color: 'red',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#28CDFF',
      },
    },
  },
});
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
  task,
  aquariums,
}) {
  const { id } = useParams();

  const [schedule, setSchedule] = useState({
    technician: id,
    type: '',
    date: '',
    start_time: '',
    end_time: '',
    aquarium: '',
    repeat: '',
  });

  const { type, date, start_time, end_time, aquarium, repeat } =
    schedule;

  const [checked, setChecked] = useState(true);
  const outlinedInputStyles = useOutlinedInputStyles();

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };
  const handleChange = (e) => {
    setSchedule({
      ...schedule,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    // setSchedule(values);
  }, []);
  // eslint-disable-next-line no-unused-vars

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (editing) {
      await api('put', `/schedule/tasks/${task._id}`, schedule);
      toast.success('Tank edited successfully');
    } else {
      await api('post', '/schedule/tasks', schedule);
      toast.success('Tank created successfully');
    }
    getTasks();
    console.log('schedule================>', schedule);
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
                justifyContent: 'space-around',
                textAlign: 'center',
                justifyItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <InputLabel>Date</InputLabel>

                <TextField
                  type="date"
                  name="date"
                  value={date}
                  onChange={(e) => {
                    console.log(e.target.value);
                    // setSchedule({
                    //   ...schedule,
                    //   date: moment(e).format('DD/MM/YYYY'),
                    // });
                  }}
                  // onChange={(e) => {
                  //   setSchedule({
                  //     ...schedule,
                  //     date: moment(e).format('DD/MM/YYY'),
                  //   });
                  // }}
                  // InputLabelProps={{
                  //   style: {
                  //     color: '#8C8C8C',
                  //     fontSize: '19px',
                  //     fontWeight: '700',
                  //   },
                  // }}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '25px',
                    marginTop: '20px',
                  }}
                  classes={outlinedInputStyles}
                />
              </div>
              {/* <Button
                className={
                  type === 'size' ? 'activeTaskBtn' : 'taskOptionBtns'
                }
                variant="outlined"
                onClick={() => setType('size')}
              >
                Mon,14
              </Button> */}
              {/* <FormControl/> */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <InputLabel>Start Time</InputLabel>
                {/* <TextField
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '25px',
                    marginTop: '20px',
                  }}
                  value={start_time}
                  type="time"
                  name="start_time"
                  onChange={handleChange}
                  onkeydown={handleChange}
                  InputLabelProps={{
                    style: {
                      color: '#8C8C8C',
                      fontSize: '19px',
                      fontWeight: '700',
                    },
                  }}
                  classes={outlinedInputStyles}
                /> */}

                <TimePicker
                  style={{
                    height: 'calc(1.5em + 1.25rem + 2px)',
                    fontWeight: '500',
                    color: 'red',
                  }}
                  name="start_time"
                  className="timpicker_cst"
                  disableClock
                  hourPlaceholder="hh"
                  minutePlaceholder="mm"
                  locale="sv-sv"
                  clockIcon={null}
                  defaultValue={null}
                  // amPmAriaLabel
                  value={start_time}
                  onChange={(e) => {
                    setSchedule({
                      ...schedule,
                      start_time: e,
                    });
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <InputLabel>End Time</InputLabel>
                <TimePicker
                  style={{
                    backgroundColor: 'yellow',
                  }}
                  name="end_time"
                  className="timpicker_cst"
                  disableClock
                  hourPlaceholder="hh"
                  minutePlaceholder="mm"
                  locale="sv-sv"
                  clockIcon={null}
                  defaultValue={null}
                  // amPmAriaLabel={false}
                  value={end_time}
                  onChange={(e) => {
                    setSchedule({
                      ...schedule,
                      end_time: e,
                    });
                  }}
                />
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
                  Aquarium (150 gallon)
                </MenuItem>
                {aquariums.map((_) => (
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
                <MenuItem value="" disabled>
                  Week
                </MenuItem>
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
