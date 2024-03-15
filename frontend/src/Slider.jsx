import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';

const PercentageSlide = () => {
  const [sliderValues, setSliderValues] = useState(() => {
    const storedValues = JSON.parse(localStorage.getItem('sliderValues2'));
    return storedValues || {
      Electricity: 100,
      Solar: 0,
      
    };
  });

  useEffect(() => {
    localStorage.setItem('sliderValues2', JSON.stringify(sliderValues));
  }, [sliderValues]);

  const handleChange = (slider, newValue) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [slider]: newValue,
    }));
  };

  const handleSubmit = () => {
    console.log('Electricity:', sliderValues.Electricity + '%');
    
    console.log('Steam:', sliderValues.Steam + '%');
    window.location.reload();
  };

  return (
    <Box style={{ width: '300px', margin: '20px' }}>
      <h2>Electricity Emission</h2>
      <Slider
        value={sliderValues.Electricity}
        onChange={(event, newValue) => handleChange('Electricity', newValue)}
        aria-label="Electricity Percentage"
        valueLabelDisplay="on"
        valueLabelFormat={(value) => `${value}%`}
        style={{ color: '#4570ff' }}
      />

      <h2>Solar Integration</h2>
      <Slider
        value={sliderValues.Solar}
        onChange={(event, newValue) => handleChange('Solar', newValue)}
        aria-label="Solar Percentage"
        valueLabelDisplay="on"
        valueLabelFormat={(value) => `${value}%`}
        style={{ color: '#4570ff' }}
      />

      

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default PercentageSlide;
