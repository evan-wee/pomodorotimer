import { useState, useRef, useEffect } from 'react';
import './App.css';
import {MdWork} from 'react-icons/md';
import {IoMdRestaurant} from 'react-icons/io';
import {BsPersonWorkspace} from 'react-icons/bs';

const WorkTimer = ({theme}) => {
  const [minutes,setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive,setIsActive] = useState(false);
  const [status,setStatus] = useState('');
  const [isWorking, setIsWorking] = useState(true);
  const [isBreak, setIsBreak] = useState(false);
  const [isLongBreak,setIsLongBreak] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [pomodoroInterval, setPomodoroInterval] = useState(4);

  const reset = () => {
    setSeconds(0);
    setMinutes(25);
    setIsActive(false);
    setStatus('');
    setIsWorking(true);
    setIsBreak(false);
    setIsLongBreak(false);
    document.getElementById('timer-input').value = '';
    document.title = 'Pomodoro Timer';
  }

  const intervalRef = useRef(null);
  const targetDateRef = useRef(new Date().getTime() + 25 * 60 * 1000); // Set initial target date

  const playpause = () => {
    if (!isActive) {
      // Update the target date when the timer is started
      targetDateRef.current = new Date().getTime() + minutes * 60 * 1000 + seconds * 1000;
      setStatus('Working');
      document.title = 'Working';
    }
    setIsActive(!isActive);
  };
  
  useEffect(() => {
    const countdown = () => {
      const now = new Date().getTime();
      const distance = targetDateRef.current - now;


      if (distance < 0) {
        clearInterval(intervalRef.current);
        setMinutes(0);
        setSeconds(0);
        // Handle what happens when the timer reaches 0
        if ( isWorking && isBreak === false && isLongBreak === false ) {

          setIsActive(false)
          setStatus('Break Time!');
          document.title = 'Break Time!';
          setPomodoroCount(pomodoroCount => pomodoroCount + 1);
  
          if ( pomodoroCount < (pomodoroInterval-1) ) {
            setIsBreak(true);
            setStatus('Break time')
            setSeconds(0);
            setMinutes(5);
            setIsWorking(false);
          }
          else if ( pomodoroCount === (pomodoroInterval-1) ) {
            //when reaches 4 pomodoro's creates a long break
            setIsLongBreak(true);
            setPomodoroCount(0);
            setStatus("Long break! (20 min)")
            setSeconds(0);
            setMinutes(20);
            setIsWorking(false)
          }
        }
	
        //break timer done
        if ( isWorking === false && isBreak && isLongBreak === false ) {

          setIsActive(false);
          setStatus('Back to work');
          setSeconds(0);
          setMinutes(25);
          setIsWorking(true);
          setIsBreak(false);
          document.title = 'Back to work!';
        }
	
        //long break is done
        if ( isLongBreak && isBreak === false && isWorking === false ) {
          setIsActive(false);
          setStatus('Back to Work!');
          setSeconds(0);
          setMinutes(25);
          setIsWorking(true);
          setIsLongBreak(false);
          setPomodoroCount(0);
          document.title = 'Back to work!';
        }
      } else {
        const newMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const newSeconds = Math.floor((distance % (1000 * 60)) / 1000);

        setMinutes(newMinutes);
        setSeconds(newSeconds);
      }
    };

    if (isActive) {
      countdown(); // Immediately invoke the function
      intervalRef.current = setInterval(countdown, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive]); // Only re-run the effect if isActive changes

  return (
    <div id='timer' className={theme}> 

		{theme === 'kuromi' &&
		<img src='kuromi2.png' width='85px'/>
		}

      <p className='status'>{status} {status.valueOf()==='Working'&&<BsPersonWorkspace/>} {status.valueOf() === "Break Time"&&<IoMdRestaurant/>}</p>
      <h2 className='time'>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</h2>
      <button onClick={playpause}>{isActive ? `Pause` : 'Start'}</button>
      <button onClick={reset} title="Go back to working">Reset</button>
      <input id='timer-input' placeholder="Task" autoComplete="off" spellCheck="false" autoFocus></input>
    </div>
  );
}

export default WorkTimer;