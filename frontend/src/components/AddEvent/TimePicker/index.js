import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

const TimePicker = ({
  name,
  ...otherProps
}) => {
  const [field, meta] = useField(name);

  const configTimePicker = {
    ...field,
    ...otherProps,
    type: 'time',
    variant: 'outlined',
    fullWidth: true,
    InputLabelProps: {
      shrink: true
    }
  };

  if(meta && meta.touched && meta.error) {
    configTimePicker.error = true;
    configTimePicker.helperText = meta.error;
  }

  return (
    <TextField
      {...configTimePicker}
    />
  );
};

export default TimePicker;