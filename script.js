// Select the display element where numbers and operations will be shown
const display = document.querySelector("#display");

// Select all buttons in the calculator
const buttons = document.querySelectorAll("button");

// Add click event listener to each button
buttons.forEach((item) => {
  item.onclick = () => {
    // Clear button - clears the entire display
    if (item.id == "clear") {
      display.innerText = "";
    }
    // Backspace button - removes the last character from display
    else if (item.id == "backspace") {
      let string = display.innerText.toString();
      display.innerText = string.substr(0, string.length - 1);
    } 
    // Equal button when display has content - evaluates the expression
    else if (display.innerText != "" && item.id == "equal") {
      // Add implicit multiplication before evaluating
      let expression = addImplicitMultiplication(display.innerText);
      display.innerText = eval(expression);
    } 
    // Equal button when display is empty - shows error message
    else if (display.innerText == "" && item.id == "equal") {
      display.innerText = "Empty!";
      setTimeout(() => (display.innerText = ""), 2000); // Clear message after 2 seconds
    } 
    // For all other buttons (numbers and operators) - append to display
    else {
      display.innerText += item.id;
    }
  };
});

// Function to add implicit multiplication (e.g., 2(3) becomes 2*(3))
function addImplicitMultiplication(expression) {
  // Add * between number and opening parenthesis: 2( becomes 2*(
  expression = expression.replace(/(\d)\(/g, '$1*(');
  // Add * between closing and opening parenthesis: )( becomes )*(
  expression = expression.replace(/\)\(/g, ')*(');
  // Add * between closing parenthesis and number: )2 becomes )*2
  expression = expression.replace(/\)(\d)/g, ')*$1');
  return expression;
}

// Select theme toggle button
const themeToggleBtn = document.querySelector(".theme-toggler");

// Select calculator container for theme switching
const calculator = document.querySelector(".dark");

// Select toggle icon element
const toggleIcon = document.querySelector(".toggler-icon");

// Track current theme state (starts as dark)
let isDark = true;

// Add click event to theme toggle button
themeToggleBtn.onclick = () => {
  // Toggle dark class on calculator (switches between dark and light theme)
  calculator.classList.toggle("dark");
  
  // Toggle active class on theme button (changes button appearance)
  themeToggleBtn.classList.toggle("active");
  
  // Update theme state
  isDark = !isDark;
};

// Add keyboard input support
document.addEventListener('keydown', function(event) {
    // Get the key that was pressed
    const key = event.key;
    
    // Handle number keys (0-9) - append to display
    if (key >= '0' && key <= '9') {
        display.innerText += key;
    }
    // Handle operator keys (+, -, *, /) - append to display
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
        display.innerText += key;
    }
    // Handle decimal point - append to display
    else if (key === '.') {
        display.innerText += '.';
    }
    // Handle parentheses - append to display
    else if (key === '(' || key === ')') {
        display.innerText += key;
    }
    // Handle Enter or = key - calculate result
    else if (key === 'Enter' || key === '=') {
        event.preventDefault(); // Prevent default Enter behavior
        if (display.innerText != "") {
            // Add implicit multiplication before evaluating
            let expression = addImplicitMultiplication(display.innerText);
            display.innerText = eval(expression); // Evaluate expression
        } else {
            display.innerText = "Empty!"; // Show error if empty
            setTimeout(() => (display.innerText = ""), 2000); // Clear after 2 seconds
        }
    }
    // Handle Escape or C key - clear display
    else if (key === 'Escape' || key === 'c' || key === 'C') {
        display.innerText = "";
    }
    // Handle Backspace key - remove last character
    else if (key === 'Backspace') {
        let string = display.innerText.toString();
        display.innerText = string.substr(0, string.length - 1);
    }
});