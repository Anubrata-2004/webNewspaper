const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
let expression = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    if (value) {
      expression += value;
      display.textContent = expression;
    } else if (button.id === 'equals') {
      try {
        expression = eval(expression).toString();
      } catch {
        expression = 'Error';
      }
      display.textContent = expression;
    } else if (button.id === 'clear') {
      expression = '';
      display.textContent = '0';
    }
  });
});
