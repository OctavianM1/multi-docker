import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [allValues, setAllValues] = useState([]);
  const [calculatedValues, setCalculatedValues] = useState([]);
  const [indexInput, setIndexInput] = useState('');

  useEffect(() => {
    (async () => {
      const response = await axios.get('/api/values/all');
      setAllValues(response.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axios.get('/api/values/current');
      setCalculatedValues(response.data);
    })();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/values', {
      index: indexInput,
    });
    setIndexInput('');
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <p>Enter your value:</p>
        <input type="number" value={indexInput} onChange={(e) => setIndexInput(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <h5>Values i have seen:</h5>
      <p>{JSON.stringify(allValues)}</p>
      <h5>Calculated values:</h5>
      <p>{JSON.stringify(calculatedValues)}</p>
    </div>
  );
}

export default App;
