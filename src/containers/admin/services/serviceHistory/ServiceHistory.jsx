/* eslint-disable import/no-named-as-default */
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import ServiceHistoryTable from './ServiceHistoryTable';
import api from '../../../../api/index';
import ExportServiceHistory from '../../../../components/ExportCsv';

export default function ServiceHistory() {
  // const [open, setOpen] = useState(false);
  const [serviceHistory, setServiceHistory] = useState([]);
  // const [clients, setClients] = useState([]);
  // const [tanks, setTanks] = useState([]);

  const getServiceHistory = async () => {
    const { data } = await api('get', '//schedule/tasks');
    if (data) {
      setServiceHistory(data?.results);
    }
  };

  // const getClients = async () => {
  //   const { data } = await api('get', '/clients');
  //   if (data) {
  //     setClients(data?.results);
  //   }
  // };
  // const getTankDetails = async () => {
  //   const { data } = await api('get', '/tank');
  //   if (data) {
  //     setTanks(data?.tanks.filter((tank) => tank.type === 'size'));
  //   }
  // };

  useEffect(() => {
    getServiceHistory();
    // getClients();
    // getTankDetails();
  }, []);

  return (
    <div>
      <Grid container>
        <Grid xl={2} lg={3} />

        <Grid xl={10} lg={9}>
          <ServiceHistoryTable serviceHistory={serviceHistory} />
          <ExportServiceHistory serviceHistory={serviceHistory} />
        </Grid>
      </Grid>
    </div>
  );
}
