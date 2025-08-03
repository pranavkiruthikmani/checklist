import './checkbox.css';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

  function Checkbox() {

    const [checkbox, setCheckbox] = useState([]);
    const [textfield, setTextfield] = useState('');
    const [started, setStarted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
    const localvalues = JSON.parse(localStorage.getItem('checkbox'));
    if (localvalues) {
      setCheckbox(localvalues);
      setStarted(true);
    }
    }, [])

    const logOut = async () => {
      try {
        await signOut(auth);
        navigate('/signin')
        console.log("Signed out")
      } catch (error) {
        console.error("Error signing out", error)
      }
    }

    const updateArray = () => {
      if (textfield.trim() !== "") {
        const entry = {
          id: Date.now(),
          text: textfield.trim(),
          completed : false
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

    const handleCompleted = (e, arrayin) => {
      const updatedArray = checkbox.map((item) => {
        if (item.id === arrayin.id) {
          return {...item, completed: e.target.checked}
        } else {
          return item;
        }
      })
      setCheckbox(updatedArray)
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
            Add Task
          </button>
          <button onClick={clearArray} className='button-30'>
            Clear
          </button>
          <button onClick={logOut} className='button-30'>
            Sign Out
          </button>
        </div> 
          <div className='valuelist'>
            {checkbox.map((current, index) => {
              const key = current.id;
              return(
                <div key={key}>
                  <input className='checkbox' type='checkbox' id={key} name={key} value={current.text} checked={current.completed} onChange={(e) => handleCompleted(e, current)} />
                  <label htmlFor={key} className={current.completed ? 'checkboxcompleted' : 'checkboxlabel'}>{current.text}</label>
                </div>
              )})}
          </div>
      </div>
    );
  }

  export default Checkbox;
