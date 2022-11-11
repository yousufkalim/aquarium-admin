import { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import ServiceTable from './ServiceTable';
import arrow from '../../../assets/images/arrow.svg';
import api from '../../../api/index';

export default function Services() {
  const [serviceHistory, setServiceHistory] = useState([]);

  const getServiceHistory = async () => {
    const { data } = await api('get', '//schedule/tasks');
    if (data) {
      setServiceHistory(data?.results);
    }
  };
  useEffect(() => {
    getServiceHistory();
  }, []);
  return (
    <div>
      <Grid container>
        <Grid xl={2} lg={3} />

        <Grid xl={10} lg={9}>
          <ServiceTable serviceHistory={serviceHistory} />
          <div className="btnContainer">
            <Button
              variant="contained"
              fullWidth
              className="addAdminBtn"
            >
              Export in CSV&nbsp; &nbsp;
              <img src={arrow} alt="arrow" />
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
