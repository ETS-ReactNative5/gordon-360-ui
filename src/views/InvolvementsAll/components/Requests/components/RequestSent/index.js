import { Button, Divider, Grid, Typography } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { formatDistanceToNow } from 'date-fns';
import requestService from 'services/request';
import { gordonColors } from 'theme';
// @TODO CSSMODULES - outside directory
import styles from '../../Requests.module.css';

const RequestSent = ({ member, onCancel }) => {
  const handleCancel = () => {
    requestService.cancelRequest(member.RequestID);
    onCancel(member); // Updates state of parent component to cause rerender
  };

  const button = {
    color: gordonColors.secondary.red,
  };

  let cancel;
  if (member.RequestApproved === 'Pending') {
    cancel = (
      <Button variant="outlined" size="small" style={button} onClick={handleCancel}>
        Cancel
      </Button>
    );
  } else {
    cancel = (
      <Button size="small" onClick={handleCancel}>
        {<ClearIcon />}
      </Button>
    );
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Grid container alignItems="center">
          <Grid item xs={6} sm={4}>
            <Typography>
              <strong> {member.ActivityDescription} </strong>
            </Typography>
            <Typography>
              <span className={styles.weak}>{formatDistanceToNow(new Date(member.DateSent))}</span>
            </Typography>
          </Grid>
          <Grid item xs={6} sm={4} align="center">
            <Typography>{member.ParticipationDescription}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={6} align="center">
                <Typography>{member.RequestApproved}</Typography>
              </Grid>
              <Grid item xs={6} align="center">
                {cancel}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
    </Grid>
  );
};

export default RequestSent;
