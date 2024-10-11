import React from 'react';

// Step 1: Create a function to map emotions to colors
const getColorClass = (emotion) => {
  switch (emotion) {
    case 'happy':
      return 'bg-yellow-100';
    case 'sad':
      return 'bg-blue-100';
    case 'angry':
      return 'bg-red-100';
    case 'surprised':
      return 'bg-purple-100';
    case 'neutral':
      return 'bg-gray-100';
    default:
      return 'bg-white';
  }
};

const EmotionScore = ({ score }) => {
  // Assuming score is an object with emotion as key and percentage as value
  const emotion = Object.keys(score)[0]; // Get the first emotion
  const colorClass = getColorClass("angry");

  return (
    <div className={`card ${colorClass}`}>
      <div className="card-body">
        <h5 className="card-title">Emotion Score</h5>
        <p className="card-text">{`${emotion}: ${score[emotion]}%`}</p>
      </div>
    </div>
  );
};

export default EmotionScore;