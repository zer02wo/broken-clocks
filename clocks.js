//Get clock element and remove from DOM
const clock = document.querySelector('.clock-wrapper');
clock.remove();
//Get container element from DOM
const clockContainer = document.querySelector('.clocks-container');

//For each minute of each hour
for(let i = 0; i < 12; i++) {
    for(let j = 0; j < 60; j++) {
        //Create a clock displaying time in hours (i) and minutes (j)
        createClock(i, j);
    }
}

function createClock(h, m) {
    const clockClone = clock.cloneNode(true);
    //Set hand rotations based on time parameters
    clockClone.querySelector('.hour').style.transform = `rotate(${(h*30) + (m/2)}deg)`;
    clockClone.querySelector('.minute').style.transform = `rotate(${m*6}deg)`;
    clockContainer.appendChild(clockClone);
}

//TODO: Assign ID to each clock (e.g. id="3h-42m" for 03:42)
    //TODO: Then use JS to set that element to "active" when it matches the current time
        //TODO: Remove "active" from any other element (use query selector to get ".active") beforehand
//TODO: Shuffle clocks to be in random order