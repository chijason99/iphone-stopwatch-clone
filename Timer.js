export const STATUS = {
    ONGOING: "ongoing",
    PAUSED: "paused",
    INITIAL: "initial",
  };

export const TIMER_TEXT = {
    LAP: "Lap",
    START: "Start",
    PAUSE: "Pause",
    RESET: "Reset",
    RESUME: "Resume",
  };

export default class Timer{
    constructor(){
        this.startTime = null
        this.pauseTime = null
        this.status = STATUS.INITIAL
        this.elapsedTime = 0
        this.previousLapMoment = null
        this.laps = []
    }
    startTimer(){
        this.startTime = Date.now()
        if(this.status === STATUS.PAUSED && this.previousLapMoment){
            this.previousLapMoment+=this.startTime - this.pauseTime
            this.pauseTime = null
        } 
        this.status = STATUS.ONGOING
    }
    pauseTimer(){
        this.pauseTime = Date.now()
        this.elapsedTime += this.pauseTime - this.startTime
        this.status = STATUS.PAUSED
        console.log(this.elapsedTime)
    }
    resetTimer(){
        this.status = STATUS.INITIAL
        this.startTime = null
        this.elapsedTime = 0
        this.stopTime = null
        this.previousLapMoment = null
        this.laps = []
    }
    recordLap(){
        const lapMoment = Date.now()
        if(!this.previousLapMoment){
            const lapTime = lapMoment - this.startTime
            this.laps.push(lapTime)
        }else{
            const lapTime = lapMoment - this.previousLapMoment
            this.laps.push(lapTime)
        }
        this.previousLapMoment = lapMoment
    }
}