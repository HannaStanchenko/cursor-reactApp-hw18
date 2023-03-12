import { Component } from 'react';

import "./Timer.css"

class Timer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            seconds: props.seconds,
            value: 1
        }
        this.isPaused = false
    }

    startTimer() {
        console.log("Таймер запущено!");
        setInterval(()=> {
            if(!this.isPaused && this.state.seconds > 0) {
                this.setState((state) => ({seconds: state.seconds - this.state.value}))
                this.timeHandler()
            }
        }, Number(this.state.value + "000"));
    }

    stopTimer() {
        this.isPaused = !this.isPaused;
        if(this.isPaused) console.log("Таймер на паузі") 
    }

    componentDidUpdate() {
        if(this.state.seconds > 0) console.log(`Залишилось ${this.state.seconds} секунд`);
        else console.log("Час вийшов!")
        return true
    }

    checked() {
        const a = document.getElementById("autostart");
        if(a.checked === true) this.startTimer()
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    timeHandler() {
        let minutes = Math.floor(this.state.seconds / 60);
        let seconds = this.state.seconds % 60;
        return {minutes, seconds}
    }
    
    btn() {
        if (this.isPaused === false) {
            (<button onClick={this.stopTimer.bind(this)}>Пауза</button>)
        } else {
            (<button onClick={this.stopTimer.bind(this)}>Продовжити</button>)
        }
    }
    

    render() {

        return (
            <div className="timer">
                <div className="timer-time">
                    <p>m:{this.timeHandler().minutes}</p>
                    <p>s:{this.timeHandler().seconds}</p>
                </div>

                <div className="timer-manage">
                    <div className="btns">
                        <button id="start-btn" onClick={() => {
                            this.startTimer()
                            document.getElementById("start-btn").setAttribute("disabled", "")
                        }}>Start</button>

                        <button onClick={() => this.stopTimer()}>Pause</button>
                    </div>

                    <div className="auto_int">
                        <label htmlFor='autostart'>Autostart 
                            <input type={'checkbox'} id="autostart" onClick={() => {
                                this.checked()
                                document.getElementById("autostart").setAttribute("disabled", "")
                            }}/>
                        </label>            

                        <label htmlFor="interval">Interval: 
                            <select id="interval" onChange={this.handleChange.bind(this)}>
                                <option value={1}>1s</option>
                                <option value={2}>2s</option>
                            </select>
                        </label>
                    </div>

                </div>
            </div>
        )
    }
}

export default Timer;