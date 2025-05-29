
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