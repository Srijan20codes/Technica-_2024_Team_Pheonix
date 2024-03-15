import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import ELE from './ELE';
import ForecastC from './ForecastC';
import Slider from './Slider';
import Whatif from './Whatif';
function App() {
  const [theme, colorMode] = useMode();
  
  

  return (

          
            <div>
              <Whatif/>
            </div>
  );
}

export default App;

