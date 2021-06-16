import { gordonColors } from 'theme';
import { FormControl, FormControlLabel, Checkbox, Grid, Typography } from '@material-ui/core';
import privacy from './privacy.json';

const PrivacyAgreement = ({ values, handleCheck }) => {
  const cyan = gordonColors.primary.cyan;
  return (
    <Grid container justify="center" alignItems="center" direction="column" spacing={1}>
      <Grid item>
        <Typography variant="h5" gutterbottom style={{ color: cyan }}>
          Step 3: Review Privacy Policies
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1" gutterbottom align="center">
          This page explains Gordon's policies regarding student privacy. Please click each checkbox
          before continuing with your check-in.
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6" gutterbottom align="center">
          {privacy.FERPA.header}
        </Typography>
        <br />
        <Typography variant="body1" gutterbottom>
          {privacy.FERPA.description1}
        </Typography>
        <br />
        <Grid item>
          <Typography variant="body1" gutterbottom>
            {privacy.FERPA.para1}
          </Typography>
          <br />
          <Typography variant="body1" gutterbottom>
            {privacy.FERPA.para2}
          </Typography>
          <br />
          <Typography variant="body1" gutterbottom>
            {privacy.FERPA.para2sub}
          </Typography>
          <br />
          <Typography variant="body1" gutterbottom>
            {privacy.FERPA.para3}
          </Typography>
          <br />
          <Typography variant="body1" gutterbottom>
            {privacy.FERPA.para4}
          </Typography>
          <br />
          <Typography variant="subtitle2" gutterbottom>
            {privacy.FERPA.para4sub}
          </Typography>
          <br />
          <Typography variant="body1" gutterbottom>
            {privacy.FERPA.para5}
          </Typography>
          <br />
          <Typography variant="subtitle1" gutterbottom>
            Directory information is defined as a student's:
          </Typography>
          <Typography variant="body1" component="ul" gutterbottom>
            <li>name </li>
            <li>month/day and place of birth </li>
            <li>major field of study</li>
            <li>full- or part-time status </li>
            <li>participation in officially recognized activities and sports </li>
            <li>dates of attendance </li>
            <li>degrees, honors and awards received</li>
            <li>most recent previous education agency or institution attended</li>
            <li>photograph</li>
            <li>weights and heights of members of athletic teams</li>
          </Typography>
          <br />
          <Typography variant="body2" gutterbottom>
            <b>
              {privacy.disclaimer}
              <a href="mailto:registrar@gordon.edu"> registrar@gordon.edu</a>.
            </b>
          </Typography>
          <br />
          <FormControl>
            <FormControlLabel
              control={<Checkbox checked={values.FERPA} name="FERPA" onChange={handleCheck} />}
              label="I have read and understand the FERPA Statement above."
              labelPlacement="end"
            />
          </FormControl>
          <br />
          <br />
          <Typography variant="h6" gutterbottom align="center">
            {privacy.dataPolicy.header}
          </Typography>
          <br />
          <Typography variant="body1" paragraph>
            {privacy.dataPolicy.para1}
          </Typography>
          <Typography variant="body2" paragraph>
            <b>
              {privacy.disclaimer}
              <a href="mailto:registrar@gordon.edu">registrar@gordon.edu</a>.
            </b>
          </Typography>
          <FormControl>
            <FormControlLabel
              control={
                <Checkbox checked={values.dataUsage} name="dataUsage" onChange={handleCheck} />
              }
              label="I have read and understand the On-Campus Data Usage paragraph above and I give
            Gordon College consent to store and process my personal information as outline in its
            data privacy policy"
              labelPlacement="end"
            />
          </FormControl>
          <br />
          <br />
          <Typography variant="h6" gutterBottom align="center">
            {privacy.campusPhoto.header}
          </Typography>
          <Typography variant="body1">{privacy.campusPhoto.para1}</Typography>
          <br />
          <Typography variant="body2" gutterBottom>
            <b>
              {privacy.disclaimer}
              <a href="mailto:registrar@gordon.edu">registrar@gordon.edu</a>.
            </b>
          </Typography>
          <br />
          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.photoConsent}
                  name="photoConsent"
                  onChange={handleCheck}
                />
              }
              label="I have read and understand the photography statement above and I agree that the
               College may use my photograph, without identification, in Gordon College publications
                or on the Gordon College website."
              labelPlacement="end"
            />
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PrivacyAgreement;
