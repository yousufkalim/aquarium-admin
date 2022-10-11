import { useState } from 'react';
import { Grid, Button } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import TableList from '../../components/TableList';
import add from '../../assets/images/add.svg';
import AddAdmin from './AddAdmin';

export default function Admin() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Grid container>
        <Grid xl={2} lg={3}>
          <Sidebar />
        </Grid>

        <Grid xl={10} lg={9}>
          <TableList />
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
