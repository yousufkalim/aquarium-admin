import { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import AquariumTable from './AquariumTable';
import add from '../../../../assets/images/add.svg';
import AddAquarium from './AddAquarium';
import api from '../../../../api/index';

export default function Aquariums() {
  const [open, setOpen] = useState(false);
  const [aquariums, setAquariums] = useState([]);

  const getAquariums = async () => {
    const { data } = await api('get', '/clients/aquariums');
    if (data) {
      setAquariums(data?.results);
    }
  };

  useEffect(() => {
    getAquariums();
  }, []);
  return (
    <div>
      <Grid container>
        <Grid xl={2} lg={3} />

        <Grid xl={10} lg={9}>
          <AquariumTable
            aquariums={aquariums}
            getAquariums={getAquariums}
          />
          <div className="btnContainer">
            <Button
              variant="contained"
              fullWidth
              className="addAdminBtn"
              onClick={() => setOpen(true)}
            >
              Add Aquarium &nbsp;
              <img src={add} alt="add" />
            </Button>
          </div>
        </Grid>
      </Grid>
      {open && (
        <AddAquarium
          open={open}
          setOpen={setOpen}
          getAquariums={getAquariums}
        />
      )}
    </div>
  );
}
