import React, { useState, useEffect } from 'react';
import {
  Grid,
  ListItem,
  ListItemSecondaryAction,
  MenuItem,
  FormControl,
  Input,
  InputLabel,
  Select,
  IconButton,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

const HallListItem = ({
  disabled,
  index,
  availableHalls,
  preferredHalls,
  onHallInputChange,
  onHallRemove,
}) => {
  const [hallRankValue, setHallRankValue] = useState(1); // Rank drop-down menu value
  const [hallNameValue, setHallNameValue] = useState(''); // Hall drop-down menu value

  useEffect(() => {
    // Get the hall info for this list item from the component's props
    const getHallFromProps = () => {
      setHallRankValue(preferredHalls[index].HallRank);
      setHallNameValue(preferredHalls[index].HallName);
    };

    getHallFromProps();
  }, [preferredHalls, index]);

  /**
   * Callback for changes to hall rank input field
   * @param {*} event
   */
  const handleRankInputChange = (event) => {
    if (event.target.value !== null) {
      let newHallRankValue = event.target.value;
      onHallInputChange(newHallRankValue, hallNameValue, index);
    }
  };

  /**
   * Callback for changes to hall name dropdown
   * @param {*} event
   */
  const handleHallInputChange = (event) => {
    if (event.target.value !== null) {
      let newHallNameValue = event.target.value;
      onHallInputChange(hallRankValue, newHallNameValue, index);
    }
  };

  /**
   * Callback for hall list remove button
   */
  const handleRemove = () => {
    if (index !== null) {
      // Send this list item's index to the parent component
      onHallRemove(index);
    }
  };

  const hallOptions = availableHalls.map((hallName) => (
    <MenuItem value={hallName} key={hallName}>
      {hallName}
    </MenuItem>
  ));

  const rankOptions = preferredHalls.map((_hall, i) => (
    <MenuItem value={i + 1} key={i + 1}>
      {i + 1}
    </MenuItem>
  ));

  return (
    <ListItem key={index} className={'list-item'}>
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs={3} sm={2}>
          <FormControl fullWidth>
            <InputLabel>Rank</InputLabel>
            <Select
              disabled={disabled}
              value={hallRankValue}
              onChange={handleRankInputChange}
              input={<Input id={'rank' + index} />}
            >
              {rankOptions}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={9} sm={10}>
          <FormControl fullWidth>
            <InputLabel>Hall</InputLabel>
            <Select
              disabled={disabled}
              value={hallNameValue}
              onChange={handleHallInputChange}
              input={<Input id={'hall' + index} />}
            >
              {hallOptions}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={handleRemove}>
          <ClearIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default HallListItem;
