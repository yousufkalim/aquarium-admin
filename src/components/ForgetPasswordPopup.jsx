import React from 'react';
import Dialog from '@mui/material/Dialog';
import ClearIcon from '@mui/icons-material/Clear';

function ForgetPasswordPopup({ open, setOpen, closeModal }) {
  const handleClose = () => {
    setOpen(false);
    closeModal();
  };
  return (
    <div>
      <Dialog
        open={open}
        setOpen={setOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ backdropFilter: 'blur(20px)' }}
      >
        <div className="uploadSuccessDiv">
          <ClearIcon className="subsclearIcon" onClick={handleClose} />
          <div className="uploadSuccess-centerDiv">f</div>
        </div>
      </Dialog>
    </div>
  );
}

export default ForgetPasswordPopup;
