import React from 'react';
import { Snackbar } from '@material-ui/core/';
import {
  CheckCircleOutlineOutlined,
  ErrorOutline,
  InfoOutlined,
  ReportProblemOutlined,
} from '@material-ui/icons/';
import MuiAlert from '@material-ui/lab/Alert';

const defaultAlertIconMapping = {
  success: <CheckCircleOutlineOutlined fontSize="inherit" />,
  info: <InfoOutlined fontSize="inherit" />,
  warning: <ReportProblemOutlined fontSize="inherit" />,
  error: <ErrorOutline fontSize="inherit" />,
};

const Alert = ({ iconMapping = defaultAlertIconMapping, ...otherProps }) => {
  return <MuiAlert elevation={6} variant="filled" iconMapping={iconMapping} {...otherProps} />;
};

const SimpleSnackbar = ({
  open,
  text,
  severity,
  duration = 10000,
  onClose,
  alertStyle,
  ...otherProps
}) => {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={onClose} {...otherProps}>
      <Alert style={alertStyle || { textAlign: 'center' }} onClose={onClose} severity={severity}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default SimpleSnackbar;
