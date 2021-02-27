// Basic card component to hold data and have button that Next.js SSR general about page.

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link'
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function BasicCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Username: {props.username}
        </Typography>
        <Typography variant="h5" component="h2">
          Name: {props.name} <br></br>
          City: {props.city} <br></br>
          Zip: {props.zipcode} 
        </Typography>
       
      </CardContent>
      <CardActions>
        {/* SSR to general about page */}
        <Link href='/about'>
          <Button size="small">Learn More</Button>

        </Link>
      </CardActions>
    </Card>
  );
}
