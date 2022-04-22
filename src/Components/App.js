import React from 'react';
import '../styles/AppLogo.css';
import '../styles/App.css';
import logo from '../media/logo.svg';
import Footer from './Footer';
import mySound from '../media/timerDing.mp3';
import Button from 'react-bootstrap/Button';

function App() {

    // const [displayTime, setDisplayTime] = React.useState(3);
    // const [breakTime, setBreakTime] = React.useState(10);
    // const [sessionTime, setSessionTime] = React.useState(3);
    const [displayTime, setDisplayTime] = React.useState(25 * 60);
    const [breakTime, setBreakTime] = React.useState(5 * 60);
    const [sessionTime, setSessionTime] = React.useState(25 * 60);
    const [timerOn, setTimerOn] = React.useState(false);
    const [onBreak, setOnBreak] = React.useState(false);
    const [breakAudio, setBreakAudio] = React.useState(new Audio(mySound));
    const [testMode, setTestMode] = React.useState(false);

    const playBreakSound = () => {
        breakAudio.currentTime = 0;
        breakAudio.play();
    }

    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        return (
            (minutes < 10 ? '0' + minutes : minutes) 
            + ':' + 
            (seconds < 10 ? '0' + seconds : seconds)
        );
    };

    const changeTime = (amount, type) => {
        if(type === 'break') {
            if(breakTime <= 60 && amount < 0) {
                return;
            }
            setBreakTime((prev) => prev + amount);
        } else {
            if(sessionTime <= 60 && amount < 0) {
                return;
            }
            setSessionTime((prev) => prev + amount);
            if(!timerOn) {
                setDisplayTime(sessionTime + amount);
            }
        }
    };

    const controlTime = () => {
        const second = () => {
            if(testMode === true) {
                return 10;
            }
            return 1000;
        }
        let date = new Date().getTime();
        let nextDate = new Date().getTime() + second();
        let onBreakVariable = onBreak;
        if(!timerOn) {
            let interval = setInterval(() => {
                date = new Date().getTime();
                if(date > nextDate) {
                    setDisplayTime((prev) => {
                        if(prev <= 0 && !onBreakVariable) { 
                            playBreakSound();
                            onBreakVariable = true;
                            setOnBreak(true);
                            return breakTime;
                        } else if(prev <= 0 && onBreakVariable) {
                            playBreakSound();
                            onBreakVariable = false;
                            setOnBreak(false);
                            return sessionTime;
                        }
                        return prev - 1;
                    });
                    nextDate += second();
                }
            }, 30);
            localStorage.clear();
            localStorage.setItem('interval-id', interval);
        }
        if(timerOn) {
            clearInterval(localStorage.getItem('interval-id'));
        }
        setTimerOn(!timerOn);
    };

    const resetTime = () => {
        setDisplayTime(25 * 60);
        setBreakTime(5 * 60);
        setSessionTime(25 * 60);
    };

    return (
        <div className="App">
        <main className="App-body">
            <img 
                src={logo} 
                alt="React.js animated logo" 
                className={!timerOn ? 'App-logo stop' : testMode ? 'App-logo testing' : 'App-logo'}
            />
            <h1>Pomodoro Clock</h1>
            <div id='buttonContainer'>
                <Length 
                    id={'break'}
                    title={'break'} 
                    changeTime={changeTime} 
                    type={'break'}
                    time={breakTime}
                    formatTime={formatTime}
                />
                <Length 
                    id={'session'}
                    title={'session'} 
                    changeTime={changeTime} 
                    type={'session'}
                    time={sessionTime}
                    formatTime={formatTime}
                />
            </div>
            <div id='timer-label'>
                <h3>{onBreak ? 'Break' : 'Session'}</h3>
                <h2 id='time-left'>{formatTime(displayTime)}</h2>
            </div>
            <div className='timesets'>

                <Button 
                    id='start_stop'
                    variant='secondary'
                    size='lg'
                    onClick={controlTime}
                    className={timerOn ? 'red' : null}
                    >
                    {timerOn ? ' | | ' : <span>&#8680;</span>}
                </Button>
                <Button
                    id='reset'
                    variant='secondary'
                    size='lg'
                    onClick={resetTime}
                    >
                    &#10227;
                </Button>
                <Button
                    id='testMode'
                    variant='secondary'
                    size='lg'
                    onClick={() => {
                        if(timerOn === true) {
                            controlTime();
                        }
                        setTestMode(!testMode);
                    }}
                    className={testMode ? 'red' : null}
                    >
                    {testMode ? 'In Test Mode' : 'Toggle Test'}
                </Button>
            </div>
        </main>
        <Footer />
        </div>
    );
}

function Length({title, changeTime, type, time, formatTime, id}) {
    return (
        <div>
            <h3>{title}</h3>
            <div
                id={`${id}-label`}
                className='time-sets'>
                <Button 
                    id={`${id}-decrement`}
                    variant='secondary' size='md'
                    onClick={() => changeTime(-60, type)}
                >
                    &#8681;
                </Button>
                <h3 id={`${id}-length`}>{formatTime(time)}</h3>
                <Button 
                    id={`${id}-increment`}
                    variant='secondary' size='md'
                    onClick={() => changeTime(60, type)}
                >
                    &#8679;
                </Button>
            </div>
        </div>
    );
}

export default App;