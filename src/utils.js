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

export { shuffleArray };
