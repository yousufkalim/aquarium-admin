import { Grid, Button } from '@mui/material';
import ServiceTable from './ServiceTable';
import arrow from '../../../assets/images/arrow.svg';

export default function Services() {
  return (
    <div>
      <Grid container>
        <Grid xl={2} lg={3} />

        <Grid xl={10} lg={9}>
          <ServiceTable />
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
