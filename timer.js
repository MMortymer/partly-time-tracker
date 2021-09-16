class Timer {
    constructor() {
        this.isRunning = false;
        this.startTime = 0;
        this.overallTime = 0;
    }

    _getTimeElapsedSinceLastStart() {
        if (!this.startTime) {
            return 0;
        }

        return Date.now() - this.startTime;
    }

    start() {
        if (this.isRunning) {
            return console.error('Timer is already running');
        }

        this.isRunning = true;

        this.startTime = Date.now();
    }

    stop() {
        if (!this.isRunning) {
            return console.error('Timer is already stopped');
        }

        this.isRunning = false;

        this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
    }

    reset() {
        this.overallTime = 0;

        if (this.isRunning) {
            this.startTime = Date.now();
            return;
        }

        this.startTime = 0;
    }

    getTime() {
        if (!this.startTime) {
            return 0;
        }

        if (this.isRunning) {
            return this.overallTime + this._getTimeElapsedSinceLastStart();
        }

        return this.overallTime;
    }
}


const timer = new Timer();

window.onload = function () {
    document.addEventListener('click', function (e) {
        if (e.target && e.target.classList[0] == 'timer-start') 
        {
            timer.start();
            document.getElementsByClassName("timer-start")[0].classList.add("timer-stop");
            document.getElementsByClassName("timer-stop")[0].classList.remove("timer-start");
            document.getElementsByClassName("timer-stop")[0].innerText = "Stop";
            setInterval(() => {
                const timeInSeconds = Math.round(timer.getTime() / 1000);
                document.getElementsByClassName('time')[0].innerText = timeInSeconds;
            }, 100)
        } 
        else if (e.target && e.target.classList[0] == 'timer-stop') 
        {
            timer.stop();
            document.getElementsByClassName("timer-stop")[0].classList.add("timer-start");
            document.getElementsByClassName("timer-start")[0].classList.remove("timer-stop");
            document.getElementsByClassName("timer-start")[0].innerText = "Start";
            document.getElementsByClassName('time')[0].innerText = Math.round(timer.getTime() / 1000);
        }
    });
}
