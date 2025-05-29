
    const correctAnswers = {
      q0: 'downey',
      q1: 'rock you',
      q2: '1997',
      q3: {
        'Michael Jackson': 'Thriller',
        'Madonna': 'Like a Prayer',
        'Ed Sheeran': 'Shape of You'
      },
        q4: ['Mad Show Boys', 'The Hobos', 'Pirates of the Sea'],
        q5: '2002',
        q6: 'Blinding Lights',
        q7: 'true',
        q8: ['kanye west', 'kanye', 'ye'],
        q9: 'Endijs Defrēns',
        q10: {
          'Zinātniskā fantastika': 'Pirmsākums',
          'Komedija': 'Paģiras',
          'Šausmas': 'Platforma',
          'Trilleris': 'Spiegu spēle'
        },
        q11: 'The Weeknd',
        q12: 'Leonardo DiCaprio',
        q13: 'Just Like That',
        q14: 'Freddie Mercury'
    };

    let current = 0;
    
    const questions = document.querySelectorAll('.question');
    const navContainer = document.getElementById('questionNav');

    questions.forEach((q, index) => {
      const btn = document.createElement('button');
      btn.textContent = index + 1;
      btn.addEventListener('click', () => {
        current = index;
        showQuestion(index);
          if (current === questions.length - 1) {
            document.getElementById('nextQuest').disabled = true;
          }
      });
      if (index === 0) btn.classList.add('active');
      navContainer.appendChild(btn);
    });


    function showQuestion(index) {
      questions.forEach((q, i) => q.classList.toggle('active', i === index));
      
      const navButtons = navContainer.querySelectorAll('button');
      navButtons.forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
      });
    }

    function nextQuestion() {
      if (current < questions.length - 1) {
        current++;
        showQuestion(current);
        if (current === questions.length - 1) {
          document.getElementById('nextQuest').disabled = true;
        }
      }
    }

    function prevQuestion() {
      if (current > 0) {
        current--;
        showQuestion(current);
        document.getElementById('nextQuest').disabled = false;
      }
    }

    const draggables = document.querySelectorAll('.drag-item');
    const dropzones = document.querySelectorAll('.drop-zone');

    draggables.forEach(item => {
      item.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', item.textContent);
      });
    });

    dropzones.forEach(zone => {
      zone.addEventListener('dragover', e => e.preventDefault());
      zone.addEventListener('drop', e => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        zone.textContent = data;
      });
    });

    // timer
    let startTime = Date.now();
    let timeLeft = 30 * 60;
    const timerEl = document.getElementById('timer');
    const resultEl = document.getElementById('result');

    const timerInterval = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endTest();
      }
      timeLeft--;
    }, 1000);

  function handleResult() {
    let score = 0;

    const q0 = document.querySelector('input[name="q0"]:checked');
    if (q0 && q0.value === correctAnswers.q0) score++;

    const q1 = document.querySelector('#q1 input').value.trim().toLowerCase();
    if (q1 === correctAnswers.q1.toLowerCase()) score++;

    const q2 = document.querySelector('#q2 select').value;
    if (q2 === correctAnswers.q2) score++;

    let dropZonesCorrect = 0;
    const dropZones = document.querySelectorAll('.drop-zone');
    
    dropZones.forEach(zone => {
      const expected = correctAnswers.q3[zone.dataset.answer];
      const actual = zone.textContent.trim();
      if (actual === expected) dropZonesCorrect++;
    });

    if (dropZonesCorrect === Object.keys(correctAnswers.q3).length) score++;

    const selectedQ4 = Array.from(document.querySelectorAll('#q4 input[type="checkbox"]:checked')).map(cb => cb.value);
    const correctQ4 = correctAnswers.q4;
    const isCorrectQ4 = selectedQ4.length === correctQ4.length && selectedQ4.every(val => correctQ4.includes(val));
    if (isCorrectQ4) score++;

    const q5 = document.querySelector('input[name="q5"]:checked');
    if (q5 && q5.value === correctAnswers.q5) score++;

    const q6 = document.querySelector('input[name="q6"]:checked');
    if (q6 && q6.value === correctAnswers.q6) score++;

    const q7 = document.querySelector('input[name="q7"]:checked');
    if (q7 && q7.value === correctAnswers.q7) score++;

    const q8input = document.getElementById('q8input').value.trim().toLowerCase();
    if (correctAnswers.q8.includes(q8input)) score++;

    const q9 = document.querySelector('input[name="q9"]:checked');
    if (q9 && q9.value === correctAnswers.q9) score++;
    
    const dropZones10 = document.querySelectorAll('#q10 .drop-zone');
    let dropZonesCorrect10 = 0;

    dropZones10.forEach(zone => {
      const expected = correctAnswers.q10[zone.dataset.answer];
      const actual = zone.textContent.trim();
      if (actual === expected) dropZonesCorrect10++;
    });

    if (dropZonesCorrect10 === Object.keys(correctAnswers.q10).length) score++;
    
    const q11 = document.querySelector('input[name="q11"]:checked');
    if (q11 && q11.value === correctAnswers.q11) score++;

    const q12 = document.querySelector('input[name="q12"]:checked');
    if (q12 && q12.value === correctAnswers.q12) score++;

    const q13 = document.querySelector('input[name="q13"]:checked');
    if (q13 && q13.value === correctAnswers.q13) score++;

    const q14 = document.querySelector('input[name="q14"]:checked');
    if (q14 && q14.value === correctAnswers.q14) score++;

    return score;
  }

  function endTest() {

    const totalTime = Math.floor((Date.now() - startTime) / 1000); // sekundēs
    const usedMinutes = Math.floor(totalTime / 60);
    const usedSeconds = totalTime % 60;

    navContainer.style.display = 'none';
    timerEl.style.display = 'none';
    document.querySelectorAll('.question').forEach(q => q.style.display = 'none');
    document.querySelector('.navigation').style.display = 'none';
    resultEl.style.display = 'block';
    resultEl.innerHTML = `<p>Tests ir pabeigts.</p><p>Tu atbildēji pareizi uz ${handleResult()} no ${questions.length} jautājumiem. </p><p style="font-weight: 100;">Tu pabeidzi testu ${usedMinutes} minūtēs un ${usedSeconds} sekundēs.</p><a  href="index.html"><button>Atgriezties uz sākumu</button></a>`;
  }

