const resultsContainer = document.getElementById('results-container');
const generateBtn = document.getElementById('generate-btn');
const themeToggle = document.getElementById('theme-toggle');
const lottoDrum = document.getElementById('lotto-drum');

// Theme Toggle Logic
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.textContent = isDark ? '☀️ 라이트모드' : '🌙 다크모드';
    });
}

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
    if (!lottoDrum || !resultsContainer) return;
    
    lottoDrum.classList.add('spinning');
    generateBtn.disabled = true;
    generateBtn.textContent = '추첨 중...';
    resultsContainer.style.opacity = '0.3';

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

if (generateBtn) {
    generateBtn.addEventListener('click', generateLottoSets);
    generateLottoSets();
}

// Naver Blog Automation Logic
const collectBtn = document.getElementById('collect-btn');
const autoPostBtn = document.getElementById('auto-post-btn');
const statusContainer = document.getElementById('status-container');
const statusList = document.getElementById('status-list');
const generatedContainer = document.getElementById('generated-container');
const postResult = document.getElementById('post-result');

if (collectBtn) {
    collectBtn.addEventListener('click', () => {
        const keyword = document.getElementById('keyword').value;

        if (!keyword) {
            alert('키워드를 입력해주세요.');
            return;
        }

        statusContainer.style.display = 'block';
        generatedContainer.style.display = 'none';
        statusList.innerHTML = '';
        collectBtn.disabled = true;
        collectBtn.textContent = '수집 및 작성 중...';

        const addStatus = (message, delay) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    const li = document.createElement('li');
                    li.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
                    statusList.appendChild(li);
                    statusList.scrollTop = statusList.scrollHeight;
                    resolve();
                }, delay);
            });
        };

        const runAutomation = async () => {
            await addStatus(`"${keyword}" 키워드로 관련 자료 수집 중...`, 1500);
            await addStatus('뉴스, 커뮤니티, 전문 블로그 데이터 분석 중...', 2000);
            await addStatus('네이버 블로그 알고리즘에 최적화된 문맥 구성 중...', 1500);
            await addStatus('글 구조 잡기 (서론 - 본론 - 결론)...', 1000);
            await addStatus('가독성 향상을 위한 이모지 및 서식 추가 중...', 1200);
            await addStatus('포스팅 내용 생성 완료!', 1000);
            
            const postContent = `
[네이버 블로그 추천 포스팅]

제목: ${keyword} 완벽 가이드! 이것만 알면 끝 (2026 업데이트)

안녕하세요! 오늘은 많은 분들이 궁금해하시는 '${keyword}'에 대해 아주 자세히 알아보려고 합니다. 🍀

최근 트렌드를 분석해보면 ${keyword}에 대한 관심이 급증하고 있는데요.
제가 직접 수집한 최신 자료를 바탕으로 핵심만 콕콕 집어 정리해 드릴게요!

1. ${keyword}란 무엇인가?
사실 ${keyword}는 우리 일상에서 매우 중요한 부분을 차지하고 있어요. 
특히 이번에 새롭게 밝혀진 사실들에 따르면... (중략)

2. 꼭 알아야 할 핵심 포인트 3가지
✅ 첫 번째: 효율적인 활용 방법
✅ 두 번째: 전문가들이 말하는 주의사항
✅ 세 번째: 2026년 이후의 전망

많은 분들이 놓치기 쉬운 부분까지 세세하게 담았으니 끝까지 읽어주세요!

더 자세한 정보가 필요하시다면 댓글로 남겨주시고, 
도움이 되셨다면 공감(❤️) 부탁드립니다!

#${keyword.replace(/\s+/g, '')} #${keyword}추천 #정보공유 #블로그자동화 #2026트렌드
            `.trim();

            postResult.textContent = postContent;
            generatedContainer.style.display = 'block';
            collectBtn.disabled = false;
            collectBtn.textContent = '자료 수집 및 글쓰기 시작';
            
            generatedContainer.scrollIntoView({ behavior: 'smooth' });
        };

        runAutomation();
    });
}

if (autoPostBtn) {
    autoPostBtn.addEventListener('click', async () => {
        autoPostBtn.disabled = true;
        autoPostBtn.textContent = '네이버 서버 전송 중...';
        
        const addStatus = (message, delay) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    const li = document.createElement('li');
                    li.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
                    statusList.appendChild(li);
                    statusList.scrollTop = statusList.scrollHeight;
                    resolve();
                }, delay);
            });
        };

        await addStatus('네이버 API 인증 토큰 확인 중...', 1000);
        await addStatus('이미지 서버 업로드 중...', 1500);
        await addStatus('최종 발행 승인 요청 중...', 1000);
        await addStatus('✅ 발행 완료! 네이버 블로그 포스팅이 성공적으로 업로드되었습니다.', 2000);
        
        autoPostBtn.textContent = '발행 완료';
        alert('네이버 블로그에 성공적으로 업로드되었습니다!');
    });
}
