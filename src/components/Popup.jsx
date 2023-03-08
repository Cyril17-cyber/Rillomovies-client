import React from 'react';
import {Snackbar, Alert,AlertTitle} from '@mui/material';

export default function Popup({close, open}) {

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={()=> {close(false)}}>
      <Alert onClose={()=> {close(false)}} severity="success" sx={{width: '100%'}}>
        <AlertTitle>Email sent successfully!</AlertTitle>
        If you do not see an email, check the spam folder, check your email address or send again
      </Alert>
    </Snackbar>
  )
}
