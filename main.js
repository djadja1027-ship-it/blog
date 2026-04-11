const resultsContainer = document.getElementById('results-container');
const generateBtn = document.getElementById('generate-btn');
const themeToggle = document.getElementById('theme-toggle');
const lottoDrum = document.getElementById('lotto-drum');

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
    // 1. Start Animation
    lottoDrum.classList.add('spinning');
    generateBtn.disabled = true;
    generateBtn.textContent = '추첨 중...';
    resultsContainer.style.opacity = '0.3';

    // 2. Wait for animation to finish (2s for more realism)
    setTimeout(() => {
        lottoDrum.classList.remove('spinning');
        generateBtn.disabled = false;
        generateBtn.textContent = '새 번호 생성';
        resultsContainer.style.opacity = '1';
        
        resultsContainer.innerHTML = '';
        
        for (let i = 1; i <= 5; i++) {
            const numbers = new Set();
            while (numbers.size < 7) {
                numbers.add(Math.floor(Math.random() * 45) + 1);
            }

            const numberArray = Array.from(numbers);
            const bonusNumber = numberArray.pop();
            const mainNumbers = numberArray.sort((a, b) => a - b);

            const setDiv = document.createElement('div');
            setDiv.classList.add('lotto-set');
            
            const setBanner = document.createElement('div');
            setBanner.classList.add('set-banner', `banner-${i}`);
            
            const setTitle = document.createElement('div');
            setTitle.classList.add('set-title');
            setTitle.textContent = `🍀 LOTTO 추천 SET ${i}`;
            
            const setInfo = document.createElement('div');
            setInfo.style.fontSize = '0.8rem';
            setInfo.textContent = '가장 행운의 번호';
            
            setBanner.appendChild(setTitle);
            setBanner.appendChild(setInfo);

            const setContent = document.createElement('div');
            setContent.classList.add('set-content');
            
            const numbersRow = document.createElement('div');
            numbersRow.classList.add('numbers-row');

            mainNumbers.forEach(num => {
                const ball = document.createElement('div');
                ball.classList.add('ball', getBallColorClass(num));
                ball.textContent = num;
                numbersRow.appendChild(ball);
            });

            const plusSign = document.createElement('span');
            plusSign.classList.add('plus-sign');
            plusSign.textContent = '+';
            numbersRow.appendChild(plusSign);

            const bonusBall = document.createElement('div');
            bonusBall.classList.add('ball', getBallColorClass(bonusNumber));
            bonusBall.textContent = bonusNumber;
            numbersRow.appendChild(bonusBall);

            setContent.appendChild(numbersRow);
            setDiv.appendChild(setBanner);
            setDiv.appendChild(setContent);
            resultsContainer.appendChild(setDiv);
        }
    }, 1500);
};

generateBtn.addEventListener('click', generateLottoSets);

// Initial generation
generateLottoSets();
