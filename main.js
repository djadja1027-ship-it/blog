const numbersContainer = document.getElementById('numbers');
const bonusNumberElement = document.getElementById('bonus-number');
const generateBtn = document.getElementById('generate-btn');
const themeBtns = document.querySelectorAll('.theme-btn');

const ballColors = [
    '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
    '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
    '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
    '#FF5722', '#795548', '#9E9E9E', '#607D8B'
];

const generateNumbers = () => {
    numbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 7) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }

    const numberArray = Array.from(numbers);
    const bonusNumber = numberArray.pop();
    const mainNumbers = numberArray.sort((a, b) => a - b);

    mainNumbers.forEach(number => {
        const numberElement = document.createElement('div');
        numberElement.classList.add('number');
        numberElement.textContent = number;
        numberElement.style.backgroundColor = ballColors[Math.floor(Math.random() * ballColors.length)];
        numbersContainer.appendChild(numberElement);
    });

    bonusNumberElement.textContent = bonusNumber;
    bonusNumberElement.style.backgroundColor = ballColors[Math.floor(Math.random() * ballColors.length)];
};

// Theme switching logic
themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');
        document.body.className = ''; // Reset
        if (theme !== 'white') {
            document.body.classList.add(`theme-${theme}`);
        }
    });
});

generateBtn.addEventListener('click', generateNumbers);

// Initial generation
generateNumbers();