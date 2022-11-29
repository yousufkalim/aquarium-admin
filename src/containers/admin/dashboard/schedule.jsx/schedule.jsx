/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Avatar from 'react-avatar';
import ScheduleTable from './ScheduleTable';
import add from '../../../../assets/images/add.svg';
import AddTask from './AddTask';
import api from '../../../../api/index';
import { genMediaUrl } from '../../../../config';

export default function Schedule() {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [tasks, setTasks] = useState([]);
  const [technician, setTechnician] = useState({});
  const [aquariums, setAquariums] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const { id } = useParams();

  const getDate = (d) => {
    setSelectedDate(d);
  };
  const phoneFormat = (num) => {
    const match = num?.match(/(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      // eslint-disable-next-line no-param-reassign
      num = ['(', match[1], ') ', match[2], '-', match[3]].join('');
      return num;
    }
    return num;
  };

  const getTasks = async (date) => {
    const { data } = await api('get', `/schedule/${id}?date=${date}`);
    if (data) {
      setTasks(data?.results || []);
      setTechnician(data?.results?.technician);
    }
  };
  const getAquariums = async () => {
    const { data } = await api('get', '/clients/aquariums');
    if (data) {
      setAquariums(data?.results);
    }
  };

  useEffect(() => {
    getTasks(moment().format('DD/MM/YYYY'));
    getAquariums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Grid container>
        <Grid xl={2} lg={3} />

        <Grid xl={8} lg={6.5}>
          <ScheduleTable
            taskList={tasks}
            getTasks={getTasks}
            aquariums={aquariums}
            getDate={getDate}
            technician={technician}
          />
          <div className="btnContainer" style={{ width: '14%' }}>
            <Button
              variant="contained"
              fullWidth
              className="addAdminBtn"
              onClick={() => setOpen(true)}
            >
              Add new task &nbsp; <img src={add} alt="add" />
            </Button>
          </div>
        </Grid>
        <Grid xl={2} lg={2.5}>
          <div className="scheduleTech">
            <div className="scheduleCard">
              {technician?.profile_pic ? (
                <img
                  src={
                    // eslint-disable-next-line operator-linebreak
                    genMediaUrl(technician?.profile_pic)
                  }
                  alt=""
                  id="dummyimg3"
                  onError={
                    () => {
                      document.getElementById('dummyimg3').src = undefined;
                    }
                    // eslint-disable-next-line react/jsx-curly-newline
                  }
                />
              ) : (
                <Avatar
                  name={technician?.first_name}
                  style={{
                    width: 'fit-content',
                    height: 'fit-content',
                    border: '3px solid #28CDFF',
                    borderRadius: '50%',
                  }}
                  round
                  size="150"
                  alt="profile_pic"
                />
              )}
            </div>
            <div>
              <h1 className="techName">{`${technician.first_name} ${technician.last_name}`}</h1>
              <p className="techNum">{`+1 ${phoneFormat(
                technician.phone_number,
                // eslint-disable-next-line react/jsx-closing-tag-location
              )}`}</p>
            </div>
          </div>
        </Grid>
      </Grid>
      {open && (
        <AddTask
          open={open}
          setOpen={setOpen}
          getTasks={getTasks}
          aquariums={aquariums}
          selectedDate={selectedDate || moment()._d}
        />
      )}
    </div>
  );
}
