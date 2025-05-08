import './App.css'
import SVG from './components/SVG';
import { useState } from 'react';

const App = () => {
  const [fillColor, setFillColor] = useState('#ff0000');

  return (
    <div>
      <SVG 
        path="/react.svg"
        className='logo' 
        height="6rem" 
        width="6rem" 
        fillColor={fillColor} 
      />

      <button onClick={() => setFillColor('#00ff00')}>Green</button>
      <button onClick={() => setFillColor('#0000ff')}>Blue</button>
    </div>
  );
};

export default App;