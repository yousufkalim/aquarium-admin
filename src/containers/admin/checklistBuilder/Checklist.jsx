import { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import add from '../../../assets/images/add.svg';
import AddCheck from './AddCheck';
import api from '../../../api/index';
import ServiceChecklist from './ServiceChecklist';
import VehicleLoadUpChecklist from './VehicleLoadUpChecklist';
import VehicleUnloadChecklist from './VehicleUnloadChecklist';

export default function Checklist() {
  const [open, setOpen] = useState(false);
  const [checks, setChecks] = useState([]);
  const getCheckList = async () => {
    const { data } = await api('get', '/checklist');
    if (data) {
      setChecks(data?.results);
    }
  };

  useEffect(() => {
    getCheckList();
  }, []);
  return (
    <div>
      <Grid container>
        <Grid xl={2} lg={3} />

        <Grid
          xl={10}
          lg={9}
          sx={{ backgroundColor: '#d9f4ff', height: '100%' }}
        >
          <ServiceChecklist
            checks={checks}
            getChecks={getCheckList}
          />
          <VehicleLoadUpChecklist
            checks={checks}
            getChecks={getCheckList}
          />
          <VehicleUnloadChecklist
            checks={checks}
            getChecks={getCheckList}
          />
          <div className="btnContainer" style={{ position: 'fixed' }}>
            <Button
              variant="contained"
              fullWidth
              className="CheckListBtn"
              onClick={() => setOpen(true)}
            >
              Add New Check &nbsp;
              <img src={add} alt="add" />
            </Button>
          </div>
        </Grid>
      </Grid>

      {open && (
        <AddCheck
          open={open}
          setOpen={setOpen}
          getChecks={getCheckList}
        />
      )}
    </div>
  );
}
