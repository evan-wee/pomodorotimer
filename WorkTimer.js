import { useState, useEffect } from 'react';
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

	const playpause = () => {
		setIsActive(!isActive);	
	}
	
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

//countdown

  useEffect(() => {
    let interval = null;
    if (isActive) {
        interval = setInterval(() => {
            setSeconds(seconds => seconds - 1);
        }, 1000);
    }


	else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    if (seconds === -1){
      setSeconds(59)
      setMinutes(minutes-1)
    }

//

//change status
	if (isWorking && isActive) {
		setStatus('Working')
		document.title = 'Working...';
	}
	else if (isBreak) {
		setStatus('Break Time');
		document.title = 'Break Time!';
	}
//

//work timer done
	if ( seconds === 0 && minutes === 0 && isWorking && isBreak === false && isLongBreak === false ) {
		setIsActive(false)
		// setStatus('Break time')
		// setSeconds(0);
		// setMinutes(5);
		// setIsWorking(false);
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
//

//break timer done
	if ( seconds === 0 && minutes === 0 && isWorking === false && isBreak && isLongBreak === false ) {
		setIsActive(false);
		setStatus('Back to work');
		setSeconds(0);
		setMinutes(25);
		setIsWorking(true);
		setIsBreak(false);
		document.title = 'Back to work!';
	}

//long break is done
	if ( seconds === 0 && minutes === 0 && isLongBreak && isBreak === false && isWorking === false ) {
		setIsActive(false);
		setStatus('Back to Work!');
		setSeconds(0);
		setMinutes(25);
		setIsWorking(true);
		setIsLongBreak(false);
		setPomodoroCount(0);
		document.title = 'Back to work!';
	}
	
//

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (

	<div id='timer' className={theme}> 
		
		{theme === 'kuromi' &&
		<img src='kuromi2.png' width='85px'/>
		}

	
  		<p className='status'>{status} {status.valueOf()==='Working'&&<BsPersonWorkspace/>} {status.valueOf() === "Break Time"&&<IoMdRestaurant/>}</p>
		<h2 className='time'>{minutes<10&&'0'}{minutes}:{seconds<10&&'0'}{seconds}</h2>

	  
		<button onClick={playpause}>{isActive ? `Pause` : 'Start'}</button>
		<button onClick={reset} title="Go back to working">Reset</button>
		<input id='timer-input' placeholder="Task" autoComplete="off" spellCheck="false" autoFocus></input>

	</div>

  );
}

export default WorkTimer;
