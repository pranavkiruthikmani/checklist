import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [checkbox, setCheckbox] = useState([]);
  const [textfield, setTextfield] = useState('');

  const updateArray = () => {
    if (textfield !== "") {
      setCheckbox([...checkbox, {textfield}]);
      setTextfield('');
    }
     
  }

  useEffect(() => {
    console.log(checkbox);
  }, [checkbox])

  return (
    <div>
      <div className='textbox'>
        <input type='text' className='form__field' name='textinput' value={textfield} onChange={(e) => setTextfield(e.target.value)}/>
        <button onClick={updateArray} className='button-30'>
          Add Reminder
        </button>
      </div> 
        <div className='valuelist'>
          {checkbox.map((current, index) => {
            const key = current.textfield - index;
            return(
              <div key={key}>
                <input className='checkbox' type='checkbox' id='index' name='index' value={current}/>
                <label htmlFor='index' className='checkboxlabel'>{current.textfield}</label>
              </div>
            )})}
        </div>
    </div>
  );
}

export default App;
