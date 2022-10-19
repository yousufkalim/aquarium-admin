import React from 'react';
import Dialog from '@mui/material/Dialog';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import api from '../api/index';
import delConfirm from '../assets/images/delConfirm.svg';

// eslint-disable-next-line object-curly-newline
function DeletePopup({ open, setOpen, item, getData, txt }) {
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    await api('delete', `/${txt}/${item._id}`);
    getData();
    toast.success('Deleted successfully');
    handleClose();
  };
  return (
    <div>
      <Dialog
        open={open}
        setOpen={setOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="deleteModal"
        style={{ borderRadius: '30px' }}
      >
        <div className="forgetPasswordPopup">
          <Grid container xs={12}>
            <Grid xs={12}>
              <img src={delConfirm} alt="" />
              <h1 style={{ fontSize: '24px', color: '#28CDFF' }}>
                Are you sure?
              </h1>
              <p className="enterEmailTxt">
                You won’t be able to revert this!
              </p>
              <div className="hl-forget" />

              <Grid item xs={12}>
                <Button
                  onClick={handleClose}
                  className="closeBtn"
                  variant="outlined"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}
                  className="delBtn"
                  variant="contained"
                >
                  Yes,Delete it!
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </div>
  );
}

export default DeletePopup;
