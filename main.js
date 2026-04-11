const resultsContainer = document.getElementById('results-container');
const generateBtn = document.getElementById('generate-btn');
const themeToggle = document.getElementById('theme-toggle');

// Theme Toggle Logic
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? '☀️ 라이트모드' : '🌙 다크모드';
});

// Helper: Get color class based on lotto number
const getBallColorClass = (number) => {
    if (number <= 10) return 'ball-1-10';
    if (number <= 20) return 'ball-11-20';
    if (number <= 30) return 'ball-21-30';
    if (number <= 40) return 'ball-31-40';
    return 'ball-41-45';
};

// Lotto Number Generation Logic (5 sets)
const generateLottoSets = () => {
    resultsContainer.innerHTML = '';
    
    for (let i = 1; i <= 5; i++) {
        const numbers = new Set();
        while (numbers.size < 7) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }

        const numberArray = Array.from(numbers);
        const bonusNumber = numberArray.pop();
        const mainNumbers = numberArray.sort((a, b) => a - b);

        // Create elements
        const setDiv = document.createElement('div');
        setDiv.classList.add('lotto-set');
        
        const setTitle = document.createElement('div');
        setTitle.classList.add('set-title');
        setTitle.textContent = `SET ${i}`;
        
        const numbersRow = document.createElement('div');
        numbersRow.classList.add('numbers-row');

        // Main Numbers
        mainNumbers.forEach(num => {
            const ball = document.createElement('div');
            ball.classList.add('ball', getBallColorClass(num));
            ball.textContent = num;
            numbersRow.appendChild(ball);
        });

        // Plus Sign
        const plusSign = document.createElement('span');
        plusSign.classList.add('plus-sign');
        plusSign.textContent = '+';
        numbersRow.appendChild(plusSign);

        // Bonus Number
        const bonusBall = document.createElement('div');
        bonusBall.classList.add('ball', getBallColorClass(bonusNumber));
        bonusBall.textContent = bonusNumber;
        numbersRow.appendChild(bonusBall);

        setDiv.appendChild(setTitle);
        setDiv.appendChild(numbersRow);
        resultsContainer.appendChild(setDiv);
    }
};

generateBtn.addEventListener('click', generateLottoSets);

// Initial generation
generateLottoSets();
