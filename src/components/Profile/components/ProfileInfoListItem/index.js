import { Divider, ListItem, Grid, Typography } from '@material-ui/core';
import './index.scss';

const ProfileInfoListItem = ({ title, contentText, ContentIcon = null, contentClass = null }) => {
  const gridSizeProps = ContentIcon ? { xs: 4, md: 3, lg: 4 } : { xs: 7 };

  return (
    <>
      <ListItem className="profile-info-list-item">
        <Grid container justify="center" alignItems="center">
          <Grid container item xs={5} alignItems="center">
            <Typography>{title}</Typography>
          </Grid>
          <Grid container item {...gridSizeProps} alignItems="center">
            <Typography className={contentClass}>{contentText}</Typography>
          </Grid>
          {ContentIcon && (
            <Grid container item xs={3} md={4} lg={3} justify="center">
              {ContentIcon}
            </Grid>
          )}
        </Grid>
      </ListItem>
      <Divider />
    </>
  );
};

export default ProfileInfoListItem;
