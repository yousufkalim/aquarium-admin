import { Grid, Button } from '@mui/material';
import ServiceHistoryTable from './ServiceHistoryTable';
import arrow from '../../../../assets/images/arrow.svg';

export default function ServiceHistory() {
  return (
    <div>
      <Grid container>
        <Grid xl={2} lg={3} />

        <Grid xl={10} lg={9}>
          <ServiceHistoryTable />
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
