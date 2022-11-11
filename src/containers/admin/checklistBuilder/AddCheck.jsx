/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable consistent-return */
import { React, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { makeStyles } from '@mui/styles';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { FormControl, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import api from '../../../api/index';
import media from '../../../assets/images/attachment.svg';

// eslint-disable-next-line object-curly-newline

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-root': {
    borderRadius: '25px',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(7),
    textAlign: 'center',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(7),
    margin: 'auto',
  },
}));
const useOutlinedInputStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '2px solid #CDEEFC ',
        borderRadius: '20px',
        fontSize: 16,
        width: 'auto',
      },
      '&:hover fieldset': {
        borderColor: '#28CDFF',
      },
      '&::placeholder fieldset': {
        fontWeight: 800,
        color: 'red',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#28CDFF',
      },
    },
  },
});
export default function AddTank({
  open,
  setOpen,
  editing,
  getChecks,
  check,
}) {
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState('');

  useEffect(() => {
    if (check) {
      setType(check.type);
      setTitle(check.title);
      setDescription(check.description);
      if (check.attachment?.url) {
        setAttachment({
          name: check.attachment?.url?.split('-').pop(),
          editing: true,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // eslint-disable-next-line no-unused-vars

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectedFile = (e) => {
    const myFile = e.target.files[0];
    setAttachment(myFile);
    setDescription('');
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('type', type);
    formData.append('title', title);

    if (description) {
      formData.append('description', description);
    }
    if (attachment.name && !attachment.editing) {
      formData.append('attachment', attachment);
    }

    if (editing) {
      await api('put', `/checklist/${check._id}`, formData);
      toast.success('Check edited successfully');
    } else {
      await api('post', '/checklist', formData);
      toast.success('Check created successfully');
    }
    getChecks();
    handleClose();
  };
  const outlinedInputStyles = useOutlinedInputStyles();

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        setOpen={setOpen}
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: {
            borderRadius: 25,
            width: 800,
            background: '#F3FDFF',
          },
        }}
      >
        <DialogContent>
          <Typography gutterBottom>
            <h1 style={{ fontSize: '24px', color: '#28CDFF' }}>
              {editing ? 'Edit Check' : 'Add new Check'}
            </h1>
            <p className="enterEmailTxt">
              {editing
                ? 'Check will be edited in the list which you are going to edit'
                : 'Check will be added in the list which you are going to select'}
            </p>
            <div
              className="hl-del"
              style={{ width: '76%', marginBottom: '7%' }}
            />
            <InputLabel
              sx={{
                textAlign: 'left',
                marginLeft: '12%',
                color: '#8C8C8C',
                fontSize: '16px',
              }}
            >
              Check for
              <span
                style={{ fontWeight: '100', letterSpacing: '1px' }}
              >
                {' '}
                (select one)
              </span>
            </InputLabel>
            <div>
              <Button
                className={
                  type === 'service'
                    ? 'activeCheckBtn'
                    : 'checkOptionBtns'
                }
                variant="outlined"
                onClick={() => setType('service')}
              >
                Service
              </Button>
              <Button
                className={
                  type === 'loadup'
                    ? 'activeCheckBtn'
                    : 'checkOptionBtns'
                }
                variant="outlined"
                onClick={() => setType('loadup')}
              >
                Vehicle Loadup
              </Button>
              <Button
                className={
                  type === 'unload'
                    ? 'activeCheckBtn'
                    : 'checkOptionBtns'
                }
                variant="outlined"
                onClick={() => setType('unload')}
              >
                Vehicle Unload
              </Button>
            </div>
            <FormControl
              sx={{ mb: 1, mt: 2, width: '78%' }}
              variant="outlined"
            >
              <TextField
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '25px',
                }}
                id="outlined-fname"
                classes={outlinedInputStyles}
                label="Sentence"
                size="normal"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                InputLabelProps={{
                  style: {
                    color: '#8C8C8C',
                    fontSize: '16px',
                    fontWeight: '500',
                  },
                }}
              />
            </FormControl>

            {type !== 'service' ? (
              <FormControl fullWidth sx={{ width: '78%', mt: 2 }}>
                <TextField
                  multiline
                  rows={5}
                  maxRows={5}
                  classes={outlinedInputStyles}
                  name="description"
                  value={description}
                  label="Description (optional)"
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '25px',
                  }}
                  InputLabelProps={{
                    style: {
                      color: '#8C8C8C',
                      fontSize: '16px',
                      fontWeight: '500',
                    },
                  }}
                />
              </FormControl>
            ) : (
              <div>
                <FormControl
                  sx={{ mb: 1, mt: 2, width: '78%' }}
                  variant="outlined"
                >
                  <TextField
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: '25px',
                    }}
                    id="outlined-fname"
                    classes={outlinedInputStyles}
                    label="Text, Image or video (optional)"
                    size="normal"
                    name="attachment"
                    type="text"
                    value={description || attachment.name}
                    onChange={(e) => {
                      if (attachment.name) {
                        setAttachment({
                          ...attachment,
                          name: e.target.value,
                        });
                      } else {
                        setAttachment({});
                        setDescription(e.target.value);
                      }
                    }}
                    InputLabelProps={{
                      style: {
                        color: '#8C8C8C',
                        fontSize: '16px',
                        fontWeight: '500',
                      },
                    }}
                  />
                  <div
                    style={{
                      width: '0%',
                      position: 'absolute',
                      right: '10%',
                      top: '23%',
                    }}
                  >
                    <label>
                      <input
                        style={{
                          display: 'none',
                        }}
                        name="media"
                        type="file"
                        onChange={handleSelectedFile}
                        // onClick={(event) => {
                        //   event.target.value = null;
                        // }}
                      />

                      <img
                        style={{
                          textAlign: 'right',
                          cursor: 'pointer',
                        }}
                        src={media}
                        alt=""
                      />
                    </label>
                  </div>
                </FormControl>
              </div>
            )}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            className="closeBtn"
            variant="outlined"
          >
            Close
          </Button>
          <Button
            onClick={handleSubmit}
            className="resetPasswordBtn"
            variant="contained"
          >
            {editing ? 'Update Check' : 'Add Check'}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
