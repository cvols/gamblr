import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react';

import { useGlobalStateValue } from '../../../../context/GlobalState';
import useStyles from './Hero.styles';

const Hero = props => {
  console.log({ props });
  const [{ logout }] = useGlobalStateValue();

  const classes = useStyles();

  const handleClick = path => {
    props.history.push(path);
  };

  return (
    <Grid className={classes.container}>
      <Card className={classes.root} onClick={() => handleClick('/nflScores')}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
            align="center"
          >
            Scores from around the NFL
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.root} onClick={() => handleClick('/addWager')}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
            align="center"
          >
            Add wagers
          </Typography>
        </CardContent>
      </Card>
      <Card
        className={classes.root}
        onClick={() => handleClick('/pendingWagers')}
      >
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
            align="center"
          >
            Pending wagers
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Hero;
