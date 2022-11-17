import { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import ScheduleTable from './ScheduleTable';
// import profileDummy from '../../../../assets/images/profileDummy.svg';
import AddTask from './AddTask';
import api from '../../../../api/index';
// import { genMediaUrl } from '../../../../config';

export default function Schedule() {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [tasks, setTasks] = useState([]);
  const [aquariums, setAquariums] = useState([]);
  const { id } = useParams();

  const getTasks = async (date) => {
    const { data } = await api('get', `/schedule/${id}?date=${date}`);
    if (data) {
      setTasks(data?.results || []);
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

        <Grid xl={8} lg={7}>
          <ScheduleTable
            taskList={tasks}
            getTasks={getTasks}
            aquariums={aquariums}
          />
          <div className="btnContainer" style={{ width: '16%' }}>
            <Button
              variant="contained"
              fullWidth
              className="addAdminBtn"
              onClick={() => setOpen(true)}
            >
              Add new task &nbsp;
            </Button>
          </div>
        </Grid>
        <Grid xl={2} lg={2}>
          {/* <div className="scheduleTech">
                          <img src={genMediaUrl() || profileDummy} alt="add" />
            <h1>David</h1>
          </div> */}
        </Grid>
      </Grid>
      {open && (
        <AddTask
          open={open}
          setOpen={setOpen}
          getTasks={getTasks}
          aquariums={aquariums}
        />
      )}
    </div>
  );
}
