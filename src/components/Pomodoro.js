import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import '../styles/Pomodoro.css';

export default function Pomodoro() {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [displayMessage, setDisplayMessage] = useState(false);

    useEffect(() => {
        let interval = setInterval(() => {
            clearInterval(interval);

            if (seconds === 0) {
                if (minutes !== 0) {
                    setSeconds(60);
                    setMinutes(minutes - 1);
                } else {
                    let minutes = displayMessage ? 25 : 5;
                    let seconds = 60;

                    setSeconds(seconds);
                    setMinutes(minutes);
                    setDisplayMessage(!displayMessage);
                }
            } else {
                setSeconds(seconds - 1);
            }
        }, 1000)
    }, [displayMessage, minutes, seconds]);

    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const timeLeft = `${timerMinutes}:${timerSeconds}`;

    return ( 
        <div>

            <div id='break-label'>
                <Button id='break-decrement' className='btn'>
                    Break Decrement
                </Button>
                <Button id='break-increment' className='btn'>
                    Break Increment
                </Button>
                <div id='break-length'>5</div>
            </div>

            <div id='session-label'>
                <Button id='session-decrement' className='btn'>
                    Session Decrement
                </Button>
                <Button id='session-increment' className='btn'>
                    Session Increment
                </Button>
                <div id='session-length'>25</div>
            </div>

            <div>
                <Button id='start_stop'>

                </Button>
                <Button id='reset'>

                </Button>
            </div>
        
            <div id='timer-label' className='pomodoro' >
                <div className='message'>
                    {displayMessage && <div>Break Time! Timer restarts in:</div> }
                </div> 
                <div id='time-left' className='timer'>{timeLeft}</div>
            </div>

        </div>
    );
}