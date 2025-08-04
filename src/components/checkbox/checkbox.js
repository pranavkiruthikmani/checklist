import './checkbox.css';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { database } from '../../firebase/firebase';
import { ref, set, onValue } from 'firebase/database';

  function Checkbox() {

    const [checkbox, setCheckbox] = useState([]);
    const [textfield, setTextfield] = useState('');
    const [started, setStarted] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userID = auth.currentUser.uid;

    useEffect(() => {
      const dbRef = ref(database, 'array/' + userID);
      onValue(dbRef, (snapshot) => {
        const datavalues = snapshot.val();
        console.log(datavalues)
        if (datavalues && !started) {
          setCheckbox(datavalues);
          setStarted(true);
          setLoading(false);
        } else {
          setStarted(true);
          setLoading(false);
          setCheckbox([]);
        }
      })
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
        // localStorage.clear();
        //Clear firebase database
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
        // localStorage.setItem('checkbox', JSON.stringify(checkbox));
        //Send data to firebase
        const dbRef = ref(database, 'array/' + userID);
        set(dbRef, checkbox)
      }    
      // console.log(JSON.parse(localStorage.getItem('checkbox')));
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
        {loading ? (
          <div className='loadercontainer'> 
            <div class="loader"></div>
          </div>
         ) : (
          <div className='valuelist'>
            {checkbox.map((current, index) => {
              const key = current.id;
              return(
                <div key={key}>
                  <input className='checkbox' type='checkbox' id={key} name={key} value={current.text} checked={current.completed} onChange={(e) => handleCompleted(e, current)} />
                  <label htmlFor={key} className={current.completed ? 'checkboxcompleted' : 'checkboxlabel'}>{current.text}</label>
                </div>
              )
            }
          )
        }
          </div>)}          
      </div>
    );
  }

  export default Checkbox;
