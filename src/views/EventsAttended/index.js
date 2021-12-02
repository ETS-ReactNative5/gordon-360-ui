import { Button, Grid } from '@material-ui/core';
import EventList from 'components/EventList';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import { useAuth } from 'hooks';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import event from 'services/event';
import { gordonColors } from 'theme';

const style = {
  button: {
    background: gordonColors.primary.cyan,
    color: 'white',
  },
};

const EventsAttended = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const authenticated = useAuth();

  useEffect(() => {
    const loadEvents = async () => {
      if (authenticated) {
        setEvents(await event.getAttendedChapelEvents());
      }
      setLoading(false);
    };
    loadEvents();
  }, [authenticated]);

  if (loading === true) {
    return <GordonLoader />;
  } else if (!authenticated) {
    return <GordonUnauthorized feature={'your attended events'} />;
  } else {
    return (
      <Grid container spacing={2} justifyContent="center">
        <Grid xs={12} item align="center">
          <Button
            variant="contained"
            style={style.button}
            component={Link}
            to="/events?CLW%20Credits"
          >
            Need More Chapel Credits?
          </Button>
        </Grid>
        <Grid item xs={12} lg={8}>
          <EventList events={events} />
        </Grid>
      </Grid>
    );
  }
};

export default EventsAttended;
