import { Divider, Drawer, Hidden } from '@material-ui/core';
import GordonNavAvatar from './components/NavAvatar';
import GordonNavLinks from './components/NavLinks';

const GordonNav = ({ onDrawerToggle, drawerOpen }) => (
  <Hidden mdUp>
    <Drawer
      variant="temporary"
      open={drawerOpen}
      onClose={onDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <GordonNavAvatar onLinkClick={onDrawerToggle} />
      <Divider />
      <GordonNavLinks onLinkClick={onDrawerToggle} />
    </Drawer>
  </Hidden>
);

export default GordonNav;
