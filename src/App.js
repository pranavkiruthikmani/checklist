import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [checkbox, setCheckbox] = useState([]);
  const [textfield, setTextfield] = useState('');

  const updateArray = () => {
     setCheckbox([...checkbox, {textfield}]);
     setTextfield('');
  }

  useEffect(() => {
    console.log(checkbox);
  }, [checkbox])

  return (
    <div> 
      <input type='text' id='textinput' name='textinput' value={textfield} onChange={(e) => setTextfield(e.target.value)}/>
      <button onClick={updateArray}>
        Add Reminder
      </button>
      <div>
        {checkbox.map((current, index) => {
          return(
            <div>
              <input type='checkbox' id='index' name='index' value={current}/>
              <label htmlFor='index'>{current.textfield}</label>
            </div>
          )})}
      </div>
    </div>
  );
}

export default App;
