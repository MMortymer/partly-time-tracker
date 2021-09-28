window.onload = function () {
    let timerInterval;
    let timestring;

    startTimer = () => {
        clearInterval(timerInterval);
        document.querySelector(".timer-time").innerText = "00:00";
        
        let second = 0,
            minute = 0,
            hour = 0,
            timestring = '';
    
        timerInterval = setInterval(() => {
            second++;
    
            if (second == 60) {
                minute++;
                second = 0;
            }
    
            if (minute == 60) {
                hour++;
                minute = 0;
            }
    
            timestring = (hour !== 0 ? hour+":" : "") + 
            (minute < 10 ? "0"+minute : minute ) + ":" +
            (second < 10 ? "0"+second : second );
    
            document.querySelector(".timer-time").innerText = timestring;
        }, 1000)

        document.querySelector(".timer-start").classList.add("timer-stop");
        document.querySelector(".timer-stop").classList.remove("timer-start");
        document.querySelector(".timer-stop").innerText = "Stop";
    }

    stopTimer = (e) => {
        clearInterval(timerInterval);
        let timestring = document.querySelector(".timer-time").innerText;
        let entryName = document.querySelector(".timer-input").value;
        document.querySelector(".timer-time").innerText = "00:00";
        document.querySelector(".timer-input").value = "";
        document.querySelector(".timer-stop").classList.add("timer-start");
        document.querySelector(".timer-start").classList.remove("timer-stop");
        document.querySelector(".timer-start").innerText = "Start";
        return [timestring, entryName];
    }

    addTimeEntryToLog = (timestring, timeEntryName) => {
        // Append new Time Entry to the log
        let timeEntry = document.createElement("div");
        timeEntry.className = "time-entry";
        
        let time = document.createElement("span");
        time.className = "time-entry-value";
        let timeText = document.createTextNode(timestring);
        time.appendChild(timeText);

        let entryName= document.createElement("p");
        entryName.className = "time-entry-name";
        let entryNameText = timeEntryName !== "" ? document.createTextNode(timeEntryName) : document.createTextNode("(no description)");
        entryName.appendChild(entryNameText);

        timeEntry.appendChild(time);
        timeEntry.appendChild(entryName);
        
        let log = document.querySelector(".time-entries-log");
        log.prepend(timeEntry);
    }



    document.addEventListener('click', function (e) {
        e.preventDefault();
        if (e.target && e.target.classList.contains("timer-start")) {
            startTimer();
        } else if (e.target && e.target.classList.contains("timer-stop")) {
            let [timestring, timeEntryName] = stopTimer();
            addTimeEntryToLog(timestring, timeEntryName);
        }
    });

    
}
