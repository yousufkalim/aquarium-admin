import { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
// import ScheduleTable from './ScheduleTable';
import add from '../../../../assets/images/add.svg';
import AddTask from './AddTask';
import api from '../../../../api/index';

export default function Schedule() {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [tasks, setTasks] = useState([]);
  const [aquariums, setAquariums] = useState([]);

  const getTasks = async () => {
    const { data } = await api('get', '/users');
    if (data) {
      setTasks(data?.users);
    }
  };
  const getAquariums = async () => {
    const { data } = await api('get', '/clients/aquariums');
    if (data) {
      setAquariums(data?.results);
    }
  };

  useEffect(() => {
    getTasks();
    getAquariums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Grid container>
        <Grid xl={2} lg={3} />

        <Grid xl={10} lg={9}>
          {/* <ScheduleTable tasks={tasks} getTasks={getTasks} /> */}
          <div className="btnContainer" style={{ width: '16%' }}>
            <Button
              variant="contained"
              fullWidth
              className="addAdminBtn"
              onClick={() => setOpen(true)}
            >
              Add new task &nbsp;
              <img src={add} alt="add" />
            </Button>
          </div>
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
