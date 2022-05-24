import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core/';
import { useUser } from 'hooks';
import { useState, useEffect } from 'react';
import GordonUnauthorized from 'components/GordonUnauthorized';
import updateAlumniInfo from 'services/update';
import styles from './Update.module.css';
import GordonLoader from 'components/Loader';
import { gordonColors } from 'theme';
import SimpleSnackbar from 'components/Snackbar';
import userService from 'services/user';
import useNetworkStatus from 'hooks/useNetworkStatus';
import GordonOffline from 'components/GordonOffline';
//import userInfo from 'components/Profile/components/PersonalInfoList';
//import userService from 'services/user';

/**
 * Sends an update form to the development office with the following queried parameters
 *
 * @param {string} userSaluation updated with the user's new salutation
 * @param {string} userFirstName updated with the user's new first name
 * @param {string} userLastName updated with the user's new last name
 * @param {string} userMiddleName updated with the user's new middle name
 * @param {string} userPreferredName updated with the user's new preferred name
 * @param {string} userPersonalEmail updated with the user's new personal email
 * @param {string} userWorkEmail updated with the user's new work email
 * @param {string} userAlternateEmail updated with the user's new alternate email
 * @param {string} userPreferredEmail updated with the user's new preferred email
 * @param {boolean} userDoNotContact updated with the user's new do not contact preference
 * @param {boolean} userDoNotMail updated with the user's new do not mail preference
 * @param {string} userHomePhone updated with the user's new home phone
 * @param {string} userWorkPhone updated with the user's new work phone
 * @param {string} userMobilePhone updated with the user's new mobile phone
 * @param {string} userPreferredPhone updated with the user's new preferred phone
 * @param {string} userMailingStreet updated with the user's new mailing street
 * @param {string} userMailingCity updated with the user's new mailing city
 * @param {string} userMailingState updated with the user's new mailing state
 * @param {string} userMailingZip updated with the user's new mailing zip
 * @param {string} userMailingCountry updated with the user's new mailing country
 * @param {string} userMaritalStatus updated with the user's new marital status
 */

const Update = (props) => {
  const isOnline = useNetworkStatus();
  const user = useUser();

  const profileSalutaton = user.profile?.Title
  ? user.profile.Title.charAt(0).toUpperCase() + user.profile.Title.slice(1).toLowerCase(): '';

  const profileMaritalStatus = user.profile.Married === 'N'
  ? 'No' : user.profile.Married === 'Y' ? 'Yes' : '';

  const address = (user.profile.HomeStreet1.length === 0)
  ? user.profile.HomeStreet2 : user.profile.HomeStreet1;

  const [userSalutation, setSalutation] = useState(profileSalutaton);
  const [userFirstName, setFirstName] = useState(user.profile.FirstName);
  const [userLastName, setLastName] = useState(user.profile.LastName);
  const [userMiddleName, setMiddleName] = useState(user.profile.MiddleName);
  const [userPreferredName, setPreferredName] = useState(user.profile.NickName);
  const [userPersonalEmail, setPersonalEmail] = useState('');
  const [userWorkEmail, setWorkEmail] = useState('');
  const [userAlternateEmail, setAlternateEmail] = useState(user.profile.Email);
  const [userPreferredEmail, setPreferredEmail] = useState('');
  const [userDoNotContact, setDoNotContact] = useState(false);
  const [userDoNotMail, setDoNotMail] = useState(false);
  const [userHomePhone, setHomePhone] = useState(user.profile.HomePhone);
  const [userWorkPhone, setWorkPhone] = useState('');
  const [userMobilePhone, setMobilePhone] = useState(user.profile.MobilePhone);
  const [userPreferredPhone, setPreferredPhone] = useState('');
  const [userMailingStreet, setMailingStreet] = useState(address);
  const [userMailingCity, setMailingCity] = useState(user.profile.HomeCity);
  const [userMailingState, setMailingState] = useState(user.profile.HomeState);
  const [userMailingZip, setMailingZip] = useState(user.profile.HomePostalCode);
  const [userMailingCountry, setMailingCountry] = useState(user.profile.HomeCountry);
  const [userMaritalStatus, setMaritalStatus] = useState(profileMaritalStatus);

  const [saving, setSaving] = useState(false);

  const [snackbar, setSnackbar] = useState({ message: '', severity: '', open: false});
  const createSnackbar = ( message, severity ) => {
    setSnackbar({message: message, severity: severity, open: true});
  }

  const [isUserStudent, setIsUserStudent] = useState(true);

  // I considered using a HashMap to get the names, but I don't think it's necessary.
  // Both arrays are constant. Many reasons why 2 arrays is better than one HashMap here.
  const formFields = [userPersonalEmail, userWorkEmail, userPreferredEmail, userDoNotContact,
  userDoNotMail, userWorkPhone, userPreferredPhone]

  const formHeadings = ["Personal Email", "Work Email", "Preferred Email", "Do Not Contact",
  "Do Not Mail", "Work Phone", "Preferred Phone"]

  const autoFill = [user.profile.MiddleName, user.profile.NickName, user.profile.Email,
  user.profile.HomePhone, user.profile.MobilePhone, user.profile.HomeCity, user.profile.HomeState,
  user.profile.HomePostalCode, user.profile.HomeCountry, profileSalutaton, address, profileMaritalStatus]

  const currentFields = [userMiddleName, userPreferredName, userAlternateEmail,
  userHomePhone, userMobilePhone, userMailingCity, userMailingState, userMailingZip, userMailingCountry,
  userSalutation, userMailingStreet, profileMaritalStatus]

  const currentHeadings = ["Middle Name", "Preferred Name", "Alternate Email", "Home Phone", "Mobile Phone",
  "City", "State", "Zip", "Country", "Salutation", "Mailing Address", "Married"]

  useEffect(() => {
    if (props.authentication) {
      userService.getProfileInfo().then((profile) => setIsUserStudent(profile.PersonType.includes('stu')));
    }
  }, [props.authentication]);

  if (props.authentication) {
    const handleSaveButtonClick = () => {
      if (userFirstName === "" || userLastName === "") {
        createSnackbar('Please fill in your first and last name.','error');
      } else {
        setSaving(true);
        updateInfo(
          emailBody()
        ).then(() => {
          createSnackbar('A request to update your information has been sent. Please check back later.','info');
          setSalutation('');
          setFirstName('');
          setLastName('');
          setMiddleName('');
          setPreferredName('');
          setPersonalEmail('');
          setWorkEmail('');
          setAlternateEmail('');
          setPreferredEmail('');
          setDoNotContact('');
          setDoNotMail('');
          setHomePhone('');
          setWorkPhone('');
          setMobilePhone('');
          setPreferredPhone('');
          setMailingStreet('');
          setMailingCity('');
          setMailingState('');
          setMailingZip('');
          setMailingCountry('');
          setMaritalStatus('');
          setSaving(false);
        });
      }
    };

    function emailBody() {
      var email_content = `<b>First name:</b> ${userFirstName} <br /> <b>Last name:</b> ${userLastName} <br />`;
      for (let i = 0; i < autoFill.length; i++) {
        if (autoFill[i] !== currentFields[i]) {
          email_content = `${email_content} <b>${currentHeadings[i]}:</b> ${currentFields[i]} <br />`;
        }
      }
      for (let i = 0; i < formFields.length; i++) {
          if (formFields[i] !== ''){
          email_content = `${email_content} <b>${formHeadings[i]}:</b> ${formFields[i]} <br />`;
        }
      }
      email_content = `<p> ${email_content} </p>`

      return email_content;
    }

    const updateInfo = async (
      email_content
    ) => {
      updateAlumniInfo.requestInfoUpdate(
        email_content,
      );
    };

    const handleSalutation = (event) => {
      setSalutation(event.target.value);
    };

    const handleFirstName = (event) => {
      setFirstName(event.target.value);
    };

    const handleLastName = (event) => {
      setLastName(event.target.value);
    };

    const handleMiddleName = (event) => {
      setMiddleName(event.target.value);
    };
    const handlePreferredName = (event) => {
      setPreferredName(event.target.value);
    };

    const handlePersonalEmail = (event) => {
      setPersonalEmail(event.target.value);
    };
    const handleWorkEmail = (event) => {
      setWorkEmail(event.target.value);
    };

    const handleAlternateEmail = (event) => {
      setAlternateEmail(event.target.value);
    };

    const handlePreferredEmail = (event) => {
      setPreferredEmail(event.target.value);
    };

    const handleDoNotContact = () => {
      setDoNotContact(!userDoNotContact);
    };
    const handleDoNotMail = () => {
      setDoNotMail(!userDoNotMail);
    };

    const handleHomePhone = (event) => {
      setHomePhone(event.target.value);
    };
    const handleWorkPhone = (event) => {
      setWorkPhone(event.target.value);
    };

    const handleMobilePhone = (event) => {
      setMobilePhone(event.target.value);
    };

    const handlePreferredPhone = (event) => {
      setPreferredPhone(event.target.value);
    };

    const handleMailingStreet = (event) => {
      setMailingStreet(event.target.value);
    };
    const handleMailingCity = (event) => {
      setMailingCity(event.target.value);
    };

    const handleMailingState = (event) => {
      setMailingState(event.target.value);
    };

    const handleMailingZip = (event) => {
      setMailingZip(event.target.value);
    };

    const handleMailingCountry = (event) => {
      setMailingCountry(event.target.value);
    };

    const handleMaritalStatus = (event) => {
      setMaritalStatus(event.target.value);
    };

    const saveButton = saving ? (
      <GordonLoader size={32} />
    ) : (
      <Button
        variant="contained"
        className={styles.update_button}
        onClick={handleSaveButtonClick}
      >
        Update
      </Button>
    );

    if (isOnline && isUserStudent) {
      return (
        <>
          <Grid container justifyContent="center">
            <Grid item xs={12} lg={8}>
              <Card className={styles.update}>
                <CardHeader
                  className={styles.update_title}
                  title="Update Information"
                  titleTypographyProps={{ variant: 'h4' }}
                />
                <CardContent>
                  <Card>
                    <CardHeader
                      className={styles.update_header}
                      title="Personal Information"
                    />
                    <CardContent>
                      <Grid container>
                        <Grid item xs={9} md={3} lg={3} className={styles.update_text}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Salutation"
                            value={userSalutation}
                            onChange={handleSalutation}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{width: 252,}}
                            label="First Name"
                            value={userFirstName}
                            onChange={handleFirstName}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Last Name"
                            value={userLastName}
                            onChange={handleLastName}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Middle Name"
                            value={userMiddleName}
                            onChange={handleMiddleName}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Preferred Name"
                            value={userPreferredName}
                            onChange={handlePreferredName}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Married"
                            value={userMaritalStatus}
                            onChange={handleMaritalStatus}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader
                      className={styles.update_header}
                      title="Email Addresses"
                    />
                    <CardContent>
                      <Grid container>
                        <Grid item xs={9} md={6} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Personal Email"
                            value={userPersonalEmail}
                            onChange={handlePersonalEmail}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Work Email"
                            value={userWorkEmail}
                            onChange={handleWorkEmail}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Alternate Email"
                            value={userAlternateEmail}
                            onChange={handleAlternateEmail}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <FormControl style={{ width: 252 }}>
                            <InputLabel>Preferred Email</InputLabel>
                            <Select
                              label="Preferred Email"
                              value={userPreferredEmail}
                              onChange={handlePreferredEmail}
                            >
                              <MenuItem value="Personal Email">Personal Email</MenuItem>
                              <MenuItem value="Work Email">Work Email</MenuItem>
                              <MenuItem value="Alternate Email">Alternate Email</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader
                      className={styles.update_header}
                      title="Phone Numbers"
                    />
                    <CardContent>
                      <Grid container>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Home Phone"
                            value={userHomePhone}
                            onChange={handleHomePhone}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Work Phone"
                            value={userWorkPhone}
                            onChange={handleWorkPhone}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Mobile Phone"
                            value={userMobilePhone}
                            onChange={handleMobilePhone}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <FormControl style={{ width: 252 }}>
                            <InputLabel>Preferred Phone</InputLabel>
                            <Select
                              label="Preferred Phone"
                              value={userPreferredPhone}
                              onChange={handlePreferredPhone}
                            >
                              <MenuItem value="Home Phone">Home Phone</MenuItem>
                              <MenuItem value="Work Phone">Work Phone</MenuItem>
                              <MenuItem value="Mobile Phone">Mobile Phone</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader
                      className={styles.update_header}
                      title="Mailing Address"
                    />
                    <CardContent>
                      <Grid container>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Street"
                            value={userMailingStreet}
                            onChange={handleMailingStreet}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="City"
                            value={userMailingCity}
                            onChange={handleMailingCity}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="State"
                            value={userMailingState}
                            onChange={handleMailingState}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Zip"
                            value={userMailingZip}
                            onChange={handleMailingZip}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Country"
                            value={userMailingCountry}
                            onChange={handleMailingCountry}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader
                      className={styles.update_header}
                      title="Contact Preferences"
                    />
                    <CardContent>
                      <Grid container>
                        <Grid item xs={9} md={3} lg={3}>
                          <FormControlLabel
                            control={
                              <Checkbox checked={userDoNotContact} onChange={handleDoNotContact} />
                            }
                            label="Do Not Contact"
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <FormControlLabel
                            control={<Checkbox checked={userDoNotMail} onChange={handleDoNotMail} />}
                            label="Do Not Mail"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  <Grid item xs={12} justifyContent="center">
                    {saveButton}
                  </Grid>
                </CardContent>
              </Card>
              <Typography variant="subtitle1">
                Found a bug?
                <a href="mailto:cts@gordon.edu?Subject=Gordon 360 Bug">
                  <Button
                    style={{ color: gordonColors.primary.cyan }}>Report to CTS</Button>
                </a>
              </Typography>
            </Grid>
          </Grid>
          <SimpleSnackbar
            text={snackbar.message}
            severity={snackbar.severity}
            open={snackbar.open}
            onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          />
        </>
      );
    } else {
      if (!isOnline) {
        return <GordonOffline feature="Update" />;
      } else if (!isUserStudent) {
        return (
          <Grid container justifyContent="center" spacing="16">
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent
                  style={{
                    margin: 'auto',
                    textAlign: 'center',
                  }}
                >
                  <br />
                  <h1>{'Update Information Unavailable'}</h1>
                  <h4>{'Updating alumni info is currently available for alumni only'}</h4>
                  <br />
                  <br />
                </CardContent>
                <Button
                  className={styles.update_info_button}
                  justifyContent="center"
                  onClick={() => {
                    window.location.pathname = '';
                  }}
                >
                  Back To Home
                </Button>
              </Card>
            </Grid>
          </Grid>
        );
      }
    }
  } else {
    return <GordonUnauthorized feature={'update'} />;
  }
};

export default Update;
