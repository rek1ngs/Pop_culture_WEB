console.log(questions);

  // function incrementAttempts() {
  //   let attempts = parseInt(localStorage.getItem('quizAttempts') || '0');
  //   attempts += 1;
  //   localStorage.setItem('quizAttempts', attempts);
  // }

  document.addEventListener('DOMContentLoaded', () => {
  const count = localStorage.getItem('quizAttempts');
  const counter = document.getElementById('attempts-counter');
  if (count && counter) {
    counter.textContent = `Šis ir tavs ${count}. mēģinājums`;
  }

    questions.forEach((q, index) => {
      let html = `<div class="question"><p>${index + 1}. ${q.question}</p>`;

      if (q.type === "text") {
        html += `<input type="text" name="q${index}">`;
      }

      else if (q.type === "image") {
        html += `<p>${q.question}</p>`;
        html += `<img src="${q.image}" alt="Question Image" class="question-image">`;
        html += `<input type="text" name="q${index}">`;
      }

      else if (q.type === "multiple-choice") {
        q.options.forEach(opt => {
          html += `<label><input type="checkbox" name="q${index}" value="${opt}"> ${opt}</label><br>`;
        });
      }

      else if (q.type === "dropdown") {
        html += `<select name="q${index}">`;
        q.options.forEach(opt => {
          html += `<option value="${opt}">${opt}</option>`;
        });
        html += `</select>`;
      }   

      else if (q.type === "one-choice") {
        q.options.forEach(opt => {
          html += `<label><input type="radio" name="q${index}" value="${opt}"> ${opt}</label><br>`;
        });
      }

      else if (q.type === "checkbox") {
        q.options.forEach(opt => {
          html += `<label><input type="checkbox" name="q${index}" value="${opt}"> ${opt}</label><br>`;
        });
      }

      else if (q.type === "drag-drop") {
        html += `<div class="drop-zone" id="drop${index}">Nomet šeit</div>`;
        html += `<div class="drag-items">`;
        q.items.forEach((item, i) => {
          html += `<div class="drag-item" draggable="true" data-value="${item}" id="item${index}-${i}">${item}</div>`;
        });
        html += `</div>`;
      }

      html += `</div>`;
      document.getElementById("quiz").innerHTML += html;
    });

    let current = 0;
    
    const quest = document.querySelectorAll('.question');

    function showQuestion(index) {
      quest.forEach((q, i) => q.classList.toggle('active', i === index));
    }

    function nextQuestion() {
      if (current < quest.length - 1) {
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

    showQuestion(current);

    window.nextQuestion = nextQuestion;
    window.prevQuestion = prevQuestion;
    window.endTest = endTest;
  });

  function check(){
    correct = 0;

    questions.forEach((q, index) => {
      const name = `q${index}`;

      if (q.type === "text") {
        const answer = document.querySelector(`input[name="${name}"]`).value.trim();
        if (answer.toLowerCase() === q.answer.toLowerCase()) {
          correct++;
        }
      }
      else if (q.type === "multiple-choice") {
        const selected = document.querySelector(`input[name="${name}"]:checked`);
        if (selected && selected.value === q.answer) {
          correct++;
        }
      }

      else if (q.type === "dropdown") {
        const selected = document.querySelector(`select[name="${name}"]`).value;
        if (selected === q.answer) {
          correct++;
        }
      }

      else if (q.type === "one-choice") {
        const selected = document.querySelector(`input[name="${name}"]:checked`);
        if (selected && selected.value === q.answer) {
          correct++;
        }
      }

      else if (q.type === "checkbox") {
        const checked = Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(el => el.value);
        if (JSON.stringify(checked.sort()) === JSON.stringify(q.answer.sort())) {
          correct++;
        }
      }
    });
  }

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
      alert(`Tu atbildēji pareizi uz ${correct}`);
    }