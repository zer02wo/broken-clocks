//Get clock element and remove from DOM
const clock = document.querySelector('.clock-wrapper');
clock.remove();
//Get container element from DOM
const clockContainer = document.querySelector('.clocks-container');

function init() {
    //For each minute of each hour
    for(let i = 0; i < 12; i++) {
        for(let j = 0; j < 60; j++) {
            //Create a clock displaying time in hours (i) and minutes (j)
            createClock(i, j);
        }
    }
    
    //Shuffle clock elements to random order
    shuffleClocks();

    //Set initial active clock
    updateActiveClock();
}

function createClock(h, m) {
    //Clone standard clock markup
    const clockClone = clock.cloneNode(true);
    //Set hand rotations based on time parameters
    clockClone.querySelector('.hour').style.transform = `rotate(${(h*30) + (m/2)}deg)`;
    clockClone.querySelector('.minute').style.transform = `rotate(${m*6}deg)`;
    //Set clock element ID
    clockClone.id = `${h}h-${m}m`;
    //Append clock to DOM
    clockContainer.appendChild(clockClone);
}

function shuffleClocks() {
    //Get all clock elements
    const clocks = Array.from(clockContainer.children);
    arrayShuffle(clocks);
    for(const clock of clocks) {
        clockContainer.appendChild(clock);
    }
}

function arrayShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function updateActiveClock() {
    //Remove active state from current clock(s)
    const activeElements = document.querySelectorAll('.active');
    activeElements.forEach(element => {
        element.classList.remove('active');
    });

    //TODO: Set clock with ID matching current time to active
    const time = new Date();
    const h = time.getHours() % 12;
    const m = time.getMinutes();

    document.getElementById(`${h}h-${m}m`).classList.add('active');

    //Update every 500ms
    let t = setTimeout(updateActiveClock, 500);
}

//TODO: Add lightmode/darkmode toggle on window click