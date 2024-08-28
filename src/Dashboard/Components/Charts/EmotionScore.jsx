import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function EmotionScore({ score }) {
  const isPositive = score > 50;
  const cardStyle = {
    backgroundColor: isPositive ? 'lightgreen' : 'red',
    color: '#083347',
    borderRadius: '10px',
    padding: '1rem',
    textAlign: 'center',
    margin: '1rem',
  };

  return (
    <Card style={cardStyle}>
      <CardContent>
        <Typography variant="h5" component="div">
          Emotion Score
        </Typography>
        <Typography variant="h4" component="div">
          {score}
        </Typography>
        <Typography variant="body2">
          {isPositive ? 'Positive' : 'Negative'}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default EmotionScore;