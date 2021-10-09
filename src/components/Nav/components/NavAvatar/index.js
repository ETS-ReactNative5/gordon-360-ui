import { Avatar, Button, Typography } from '@material-ui/core';
import { useAuth, useUser } from 'hooks';
import { forwardRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userService from 'services/user';
import styles from './NavAvatar.module.css';
import GordonConfetti from 'components/GordonConfetti';
import Confetti from 'react-dom-confetti';

const config = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: '10px',
  height: '10px',
  perspective: '500px',
  colors: ['#000', '#77f', '#00f'],
};

const GordonNavAvatar = ({ onLinkClick }) => {
  const [email, setEmail] = useState();
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const user = useUser();
  const authenticated = useAuth();
  const [confetti, setConfetti] = useState();

  useEffect(() => {
    async function loadAvatar() {
      if (authenticated) {
        setName(user.profile.fullName);
        setEmail(user.profile.Email);
        setImage(user.images?.pref || user.images?.def);
      } else {
        setName('Guest');
      }
    }

    loadAvatar();

    if (authenticated) {
      // Used to re-render the page when the user's profile picture changes
      // The origin of the message is checked to prevent cross-site scripting attacks
      window.addEventListener('message', async (event) => {
        if (event.data === 'update-profile-picture' && event.origin === window.location.origin) {
          const { def: defaultImage, pref: preferredImage } = await userService.getImage();
          const image = preferredImage || defaultImage;
          setImage(image);
        }
      });

      popConfetti();

      return window.removeEventListener('message', () => {});
    }
  }, [user, authenticated]);

  const avatar = authenticated ? (
    image ? (
      <Avatar className={`${styles.avatar}`} src={`data:image/jpg;base64,${image}`} />
    ) : (
      <Avatar className={`${styles.avatar} ${styles.placeholder}`}>
        {user.profile?.FirstName?.[0]} {user.profile?.LastName?.[0]}
      </Avatar>
    )
  ) : (
    <Avatar className={`${styles.avatar} ${styles.placeholder}`}>Guest</Avatar>
  );

  const buttonLink = forwardRef((props, ref) => (
    <Link
      {...props}
      innerRef={ref}
      to={authenticated ? `/myprofile` : '/'}
      onClick={onLinkClick}
      className="gc360_link"
    />
  ));

  const popConfetti = () => {
    setConfetti(false);
    setConfetti(true);
  };

  const label = authenticated ? (
    <>
      <Typography variant="body2" className={styles.avatar_text} align="left" gutterBottom>
        {name}
      </Typography>
      <Typography variant="caption" className={styles.avatar_text} align="left" gutterBottom>
        {email}
      </Typography>
    </>
  ) : (
    <Typography variant="body2" className={styles.avatar_text} align="left" gutterBottom>
      Guest
    </Typography>
  );

  return (
    <Button component={buttonLink} onClick={popConfetti()}>
      <Confetti active={confetti} config={config} />
      <div className={styles.gordon_nav_avatar}>
        {avatar}
        {label}
      </div>
    </Button>
  );
};

export default GordonNavAvatar;
