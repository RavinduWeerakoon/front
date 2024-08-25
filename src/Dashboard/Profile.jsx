import React from 'react';
import Bars from './Components/BarChart';
import EmotionScore from './Components/EmotionScore';

const Profile = () => {
  return (

    <div className="container mx-auto p-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* First row, spans 2 columns */}
      <div className="md:col-span-2 bg-white p-4 shadow rounded">
        <Bars/>
      </div>
      {/* First row, spans 1 column */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-bold mb-2">Sidebar</h2>
        <EmotionScore score={"angry"}/>
      </div>
      {/* Second row, spans 1 column */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-bold mb-2">Additional Content</h2>
        <p>This section spans one column.</p>
      </div>
      {/* Second row, spans 1 column */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-bold mb-2">More Content</h2>
        <p>This section spans one column.</p>
      </div>
      {/* Second row, spans 1 column */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-bold mb-2">Even More Content</h2>
        <p>This section spans one column.</p>
      </div>
    </div>
  </div>
  
  );
};



export default Profile;