import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import ServiceTable from './ServiceTable';
import api from '../../../api/index';
import ExportServiceHistory from '../../../components/ExportCsv';

export default function Services() {
  const [serviceHistory, setServiceHistory] = useState([]);

  const getServiceHistory = async () => {
    const { data } = await api('get', '/schedule/tasks');
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
          <ExportServiceHistory serviceHistory={serviceHistory} />
        </Grid>
      </Grid>
    </div>
  );
}
