/* eslint-disable import/no-named-as-default */
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import ServiceHistoryTable from './ServiceHistoryTable';
import api from '../../../../api/index';
import ExportServiceHistory from '../../../../components/ExportCsv';

export default function ServiceHistory() {
  const [serviceHistory, setServiceHistory] = useState([]);
  const [exportServiceHistory, setExportServiceHistory] = useState(
    [],
  );

  const exportHistory = async (e) => {
    setExportServiceHistory(e);
  };

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
          <ServiceHistoryTable
            serviceHistory={serviceHistory}
            exportHistory={exportHistory}
          />
          <ExportServiceHistory
            serviceHistory={exportServiceHistory}
          />
        </Grid>
      </Grid>
    </div>
  );
}
