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

function updateActiveClock() {
    //Remove active state from current clock(s)
    const activeElements = document.querySelectorAll('.active');
    activeElements.forEach(element => {
        element.classList.remove('active');
    });

    //Set clock with ID matching current time to active
    const time = new Date();
    const h = time.getHours() % 12;
    const m = time.getMinutes();

    const activeElement = document.getElementById(`${h}h-${m}m`)
    activeElement.classList.add('active');

    const elementRect = activeElement.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const middle = absoluteElementTop - (window.innerHeight / 2);
    window.scrollTo({
        top: middle,
        left: 0,
        behavior: 'smooth'
    });

    //Update every 500ms
    let t = setTimeout(updateActiveClock, 500);
}

function toggleClockOrder() {
    if(clockContainer.classList.contains('shuffled')) {
        //Update container element state
        clockContainer.classList.remove('shuffled');
        clockContainer.classList.add('ordered');
        //Shift clock elements to chronological order
        orderClocks();
    } else {
        //Update container element state
        clockContainer.classList.remove('ordered');
        clockContainer.classList.add('shuffled');
        //Shuffle clock elements to random order
        shuffleClocks();
    }
}

function shuffleClocks() {
    //Get all clock elements
    const clocks = Array.from(clockContainer.children);
    //Shuffle array of clocks
    arrayShuffle(clocks);
    //Append clocks to DOM in shuffled order
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

function orderClocks() {
    //Get all clock elements
    const clocks = Array.from(clockContainer.children);
    //Order clocks chronologically
    chronologicalSort(clocks);
    //Append clocks to DOM in sequential order
    for(const clock of clocks) {
        clockContainer.appendChild(clock);
    }
}

function chronologicalSort(array) {
    array.sort((a,b) => {
        let timeStampA = getTimeStampFromID(a.id);
        let timeStampB = getTimeStampFromID(b.id);

        return timeStampA - timeStampB;
    });
}

function getTimeStampFromID(id) {
    //Remove alphabetic characters from ID
    let str = id.replace(/h|m/g, '');
    //Destructure assignment on either side of hyphen
    let [h, m] = str.split('-');
    //Calculate timestamp as seconds
    return (h*3600) + (m*60);
}

document.addEventListener('keypress', e => {
    if(e.key === ' ') {
        toggleClockOrder();
    }
});

//TODO: Add lightmode/darkmode toggle on window click