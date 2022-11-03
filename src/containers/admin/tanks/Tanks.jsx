import { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import add from '../../../assets/images/add.svg';
import AddTank from './AddTank';
import api from '../../../api/index';
import TankType from './Tank Type';
import TankSize from './Tank Size';
import TankMaterial from './Tank Material';
import TankFilter from './Tank Filter';

export default function Tanks() {
  const [open, setOpen] = useState(false);
  const [tanks, setTanks] = useState([]);
  const getTankDetails = async () => {
    const { data } = await api('get', '/tank');
    if (data) {
      setTanks(data?.tanks);
    }
  };

  useEffect(() => {
    getTankDetails();
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
          <TankSize tanks={tanks} getTanks={getTankDetails} />
          <TankType tanks={tanks} getTanks={getTankDetails} />
          <TankMaterial tanks={tanks} getTanks={getTankDetails} />
          <TankFilter tanks={tanks} getTanks={getTankDetails} />
          <div className="btnContainer" style={{ position: 'fixed' }}>
            <Button
              variant="contained"
              fullWidth
              className="addAdminBtn"
              onClick={() => setOpen(true)}
            >
              Add New Value &nbsp;
              <img src={add} alt="add" />
            </Button>
          </div>
        </Grid>
      </Grid>

      {open && (
        <AddTank
          open={open}
          setOpen={setOpen}
          getTanks={getTankDetails}
        />
      )}
    </div>
  );
}
