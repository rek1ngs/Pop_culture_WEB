
  function incrementAttempts() {
    let attempts = parseInt(localStorage.getItem('quizAttempts') || '0');
    attempts += 1;
    localStorage.setItem('quizAttempts', attempts);
  }

  document.addEventListener('DOMContentLoaded', () => {
  const count = localStorage.getItem('quizAttempts');
  const counter = document.getElementById('attempts-counter');
  if (count && counter) {
    counter.textContent = `Šis ir tavs ${count}. mēģinājums`;
  }
});

let current = 0;
    const questions = document.querySelectorAll('.question');

    function showQuestion(index) {
      questions.forEach((q, i) => q.classList.toggle('active', i === index));
    }

    function nextQuestion() {
      if (current < questions.length - 1) {
        current++;
        showQuestion(current);
      }
    }

    function prevQuestion() {
      if (current > 0) {
        current--;
        showQuestion(current);
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

    function endTest() {
      document.querySelectorAll('.question').forEach(q => q.style.display = 'none');
      document.querySelector('.navigation').style.display = 'none';
      resultEl.style.display = 'block';
    }
