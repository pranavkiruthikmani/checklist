  import './checkbox.css';
  import { useEffect, useState } from 'react';

  function Checkbox() {

    const [checkbox, setCheckbox] = useState([]);
    const [textfield, setTextfield] = useState('');
    const [started, setStarted] = useState(false);

    useEffect(() => {
    const localvalues = JSON.parse(localStorage.getItem('checkbox'));
    if (localvalues) {
      setCheckbox(localvalues);
      setStarted(true);
    }
    }, [])

    const updateArray = () => {
      if (textfield.trim() !== "") {
        const entry = {
          id: Date.now(),
          text: textfield.trim()
        }
        setCheckbox([...checkbox, entry])
        setTextfield('')
      }     
    }

    const clearArray = () => {
      if (checkbox.length > 0) {
        setCheckbox([])
        localStorage.clear();
      }
    }

    useEffect(() => {
      if (started === true) {
        localStorage.setItem('checkbox', JSON.stringify(checkbox));
      }    
      console.log(JSON.parse(localStorage.getItem('checkbox')));
    }, [checkbox, started])

    return (
      <div>
        <div className='textbox'>
          <input type='text' className='form__field' name='textinput' value={textfield} onChange={(e) => setTextfield(e.target.value)}/>
          <button onClick={updateArray} className='button-30'>
            Add Reminder
          </button>
          <button onClick={clearArray} className='button-30'>
            Clear
          </button>
        </div> 
          <div className='valuelist'>
            {checkbox.map((current, index) => {
              const key = current.id;
              return(
                <div key={key}>
                  <input className='checkbox' type='checkbox' id={key} name={key} value={current.text}/>
                  <label htmlFor={key} className='checkboxlabel'>{current.text}</label>
                </div>
              )})}
          </div>
      </div>
    );
  }

  export default Checkbox;
