import { MenuItem, Paper, Typography } from '@material-ui/core';
import { useState } from 'react';
import Downshift from 'downshift';
import styles from './SearchResults.module.css';

const PeopleSearchResults = ({ people, handleClick }) => {
  const [downshift, setDownshift] = useState();

  const reset = () => {
    // Remove chosen username from the input
    downshift.clearSelection();

    // Remove loaded suggestions
    downshift.clearItems();
  };

  const formattedPeople = people.map((p) => {
    return (
      <MenuItem
        key={p.UserName}
        // onClick={this.handleClick.bind(this, suggestion.UserName)}
        onClick={() => {
          handleClick(p.UserName);
        }}
        className={styles.people_search_suggestion}
      >
        <Typography variant="body2">{p.UserName}</Typography>
      </MenuItem>
    );
  });
  return (
    <Downshift
      ref={(downshift) => {
        setDownshift(downshift);
      }}
      children={null}
    >
      <Paper square className={styles.people_search_dropdown}>
        {formattedPeople}
      </Paper>
    </Downshift>
  );
};

export default PeopleSearchResults;
