import React from 'react';
import {Snackbar, Alert,AlertTitle} from '@mui/material';

export default function ErrorPop({close, open, errorMessage}) {

  return (
    <Snackbar open={open} autoHideDuration={600000} onClose={()=> {close(false)}} sx={{top: '4rem', bottom: 'auto'}}>
      <Alert onClose={()=> {close(false)}} severity="error" sx={{width: '100%'}}>
        <AlertTitle>Server Error!</AlertTitle>
        {errorMessage}
      </Alert>
    </Snackbar>
  )
}
