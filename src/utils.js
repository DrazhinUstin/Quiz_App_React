const shuffleArray = (array) => {
    for (let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
        const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
        const currentElem = array[currentIndex];
        const randomElem = array[randomIndex];
        array[currentIndex] = randomElem;
        array[randomIndex] = currentElem;
    }
    return array;
};

const convertMilliseconds = (ms) => {
    if (ms < 0) return;
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed();
    return seconds === 60
        ? `${minutes + 1} : 00`
        : `${minutes} : ${seconds < 10 ? '0' + seconds : seconds}`;
};

export { shuffleArray, convertMilliseconds };
