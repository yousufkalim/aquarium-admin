import { useState } from 'react';
import { Grid, Button } from '@mui/material';

import AdminTable from './AdminTable';
import add from '../../../assets/images/add.svg';
import AddAdmin from './AddAdmin';

// eslint-disable-next-line import/no-cycle
import Sidebar from '../../../components/Sidebar';

export default function Admins() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Grid container>
        <Grid xl={2} lg={3}>
          <Sidebar />
        </Grid>

        <Grid xl={10} lg={9}>
          <AdminTable />
          <div className="btnContainer">
            <Button
              variant="contained"
              fullWidth
              className="addAdminBtn"
              onClick={() => setOpen(true)}
            >
              Add Admin &nbsp; &nbsp;
              <img src={add} alt="add" />
            </Button>
          </div>
        </Grid>
      </Grid>
      {open && <AddAdmin open={open} setOpen={setOpen} />}
    </div>
  );
}
