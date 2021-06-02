import React, { useEffect, useState } from 'react';
import { gordonColors } from 'theme';
import GordonLoader from 'components/Loader';
import activity from 'services/activity';
import session from 'services/session';
import InvolvementStatusList from './components/InvolvementStatusList/index';
import { Typography, Divider, Card, CardHeader } from '@material-ui/core';
import { NotFoundError } from 'services/error';

const InvolvementsStatus = ({ status }) => {
  const [loading, setLoading] = useState(true);
  const [involvements, setInvolvements] = useState([]);
  const [currentSession, setCurrentSession] = useState('');

  useEffect(() => {
    const loadSession = async () => {
      const { SessionCode } = await session.getCurrent();
      setCurrentSession(SessionCode);
    };
    loadSession();
  }, []);

  useEffect(() => {
    const loadInvolvements = async () => {
      try {
        setLoading(true);
        if (status === 'Open') {
          setInvolvements(await activity.getOpen());
        } else {
          setInvolvements(await activity.getClosed());
        }
      } catch (err) {
        if (err instanceof NotFoundError) {
          setInvolvements([]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadInvolvements();
  }, [status]);

  const headerStyle = {
    backgroundColor: gordonColors.primary.blue,
    color: '#FFF',
  };

  let content;

  if (loading === true) {
    content = <GordonLoader />;
  } else if (involvements.length > 0) {
    content = involvements.map((activity) => (
      <React.Fragment key={activity.ActivityCode}>
        <InvolvementStatusList Activity={activity} session={currentSession} />
        <Divider />
      </React.Fragment>
    ));
  } else {
    content = <Typography variant="h5">No {status} Involvements To Show</Typography>;
  }

  return (
    <Card>
      <CardHeader style={headerStyle} align="center" title={`${status} Involvements`} />
      {content}
    </Card>
  );
};

export default InvolvementsStatus;
