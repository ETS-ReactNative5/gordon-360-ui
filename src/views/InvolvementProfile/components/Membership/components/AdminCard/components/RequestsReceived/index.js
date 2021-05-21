import React, { useState, useEffect } from 'react';

import { gordonColors } from 'theme';
import membershipService from 'services/membership';

import {
  Button,
  Divider,
  List,
  ListItemText,
  ListItem,
  ListItemSecondaryAction,
  makeStyles,
  Typography,
} from '@material-ui/core';

const redButton = {
  color: gordonColors.secondary.red,
};

const useStyles = makeStyles(
  {
    secondaryAction: {
      paddingRight: 155,
    },
  },
  { name: 'MuiListItem' },
);

const RequestsReceived = ({ involvementCode, sessionCode }) => {
  const classes = useStyles();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const loadRequests = async () => {
      const requests = await membershipService.getRequests(involvementCode, sessionCode);

      setRequests(requests);
    };

    loadRequests();
  }, [involvementCode, sessionCode]);

  const onApprove = async (id) => {
    await membershipService.approveRequest(id);
    setRequests((prevRequests) => prevRequests.filter((r) => r.RequestID !== id));
  };

  const onDeny = async (id) => {
    await membershipService.denyRequest(id);
    setRequests((prevRequests) => prevRequests.filter((r) => r.RequestID !== id));
  };

  if (requests.length === 0) {
    return <Typography variant="h6">No pending requests</Typography>;
  } else {
    return (
      <List>
        {requests.map((request) => (
          <React.Fragment key={request.RequestID}>
            <ListItem
              key={request.RequestID}
              classes={{ secondaryAction: classes.secondaryAction }}
            >
              <ListItemText
                primary={`${request.FirstName} ${request.LastName} - ${request.ParticipationDescription}`}
                secondary={`${membershipService.getDiffDays(request.DateSent)} - ${
                  request.CommentText
                }`}
              />

              <ListItemSecondaryAction>
                <Button style={redButton} onClick={() => onDeny(request.RequestID)} size="small">
                  Deny
                </Button>
                &emsp;
                <Button color="primary" onClick={() => onApprove(request.RequestID)} size="small">
                  Approve
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    );
  }
};

export default RequestsReceived;
