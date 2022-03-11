/**
 *
 * @module update
 *
 */
import user from './user';
import http from './http';

const requestInfoUpdate = async (
  to_email,
  from_email,
  subject,
  email_content,
  password
  /*
  userSalutation,
  userFirstName,
  userLastName,
  userMiddleName,
  userPreferredName,
  userPersonalEmail,
  userWorkEmail,
  userAlternateEmail,
  userPreferredEmail,
  userDoNotContact,
  userDoNotMail,
  userHomePhone,
  userWorkPhone,
  userMobilePhone,
  userPreferredPhone,
  userMailingStreet,
  userMailingCity,
  userMailingState,
  userMailingZip,
  userMailingCountry,
  userMaritalStatus,
  */
) => {
  /*
  const alumniInfo = {
    SALUTATION: userSalutation,
    FIRST_NAME: userFirstName,
    LAST_NAME: userLastName,
    MIDDLE_NAME: userMiddleName,
    PREFERRED_NAME: userPreferredName,
    PERSONAL_EMAIL: userPersonalEmail,
    WORK_EMAIL: userWorkEmail,
    ALTERNATE_EMAIL: userAlternateEmail,
    PREFERRED_EMAIL: userPreferredEmail,
    DO_NOT_CONTACT: userDoNotContact,
    DO_NOT_MAIL: userDoNotMail,
    HOME_PHONE: userHomePhone,
    WORK_PHONE: userWorkPhone,
    MOBILE_PHONE: userMobilePhone,
    PREFERRED_PHONE: userPreferredPhone,
    MAILING_STREET: userMailingStreet,
    MAILING_CITY: userMailingCity,
    MAILING_STATE: userMailingState,
    MAILING_ZIP: userMailingZip,
    MAILING_COUNTRY: userMailingCountry,
    MARITAL_STATUS: userMaritalStatus,
  };
  */
  const alumniInfo = {
    ToAddress: to_email,
    FromEmail: from_email,
    Subject: subject,
    Content: email_content,
    Password: password
  };
  //console.log('update/updateRequest/');
  //console.log(alumniInfo);
  http.post('update/updateRequest/', alumniInfo);
};

const updateAlumniInfo = {
  requestInfoUpdate,
};

export default updateAlumniInfo;