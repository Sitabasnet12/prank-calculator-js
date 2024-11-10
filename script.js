//CREATE a function to get the value out of the btn
// add event linstener to click to trigger the function
// read the value of the btn
// store all value coming from clicking in a global variable
// create a function will take the value from global variable and displays in the Display element

//display element
let strToDisplay = "";
const displayElm = document.querySelector(".display");
const operators = "%/*-+";
let lastOperator = "";
// select all the btns
const btns = document.querySelectorAll(".btn");
const auido = new Audio("./assests/audio.mp3");
const calculatorOperation = (val) => {
  displayElm.style.background = "";
  displayElm.style.color = "";
  displayElm.classList.remove("prank");
  if (val === "AC") {
    strToDisplay = "";
    display();
    return;
  }
  if (val === "=" || val === "Enter") {
    const lastChar = strToDisplay[strToDisplay.length - 1];
    if (operators.includes(lastChar)) {
      strToDisplay = strToDisplay.slice(0, -1);
    }
    return total();
  }
  if (val === "C" || val === "Backspace") {
    strToDisplay = strToDisplay.slice(0, -1);
    return display(strToDisplay);
  }
  if (operators.includes(val)) {
    lastOperator = val;
    const lastChar = strToDisplay[strToDisplay.length - 1];
    if (operators.includes(lastChar)) {
      strToDisplay = strToDisplay.slice(0, -1);
    }
  }
  if (val === ".") {
    //when there is an operators
    const indexOfLastOperator = strToDisplay.lastIndexOf(lastOperator);
    const lastNumberSet = strToDisplay.slice(indexOfLastOperator);
    console.log(indexOfLastOperator, lastNumberSet);
    if (lastNumberSet.includes(".")) return;
    // when there is not operator
    if (!lastOperator && strToDisplay.includes(".")) return;
  }
  strToDisplay += val;
  display(strToDisplay);
};
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = btn.innerText;
    calculatorOperation(val);
  });
});
const display = (str) => {
  displayElm.innerText = str || "0.00";
};
const total = () => {
  if (!strToDisplay.length) return;
  const extraVal = randomNumber();
  if (extraVal) {
    displayElm.style.background = "red";
    displayElm.style.color = "white";
    displayElm.classList.add("prank");
    auido.play();
  }
  const ttl = eval(strToDisplay) + extraVal;
  strToDisplay = ttl.toString();
  display(ttl);
};
const randomNumber = () => {
  const num = Math.round(Math.random() * 10); //0 -10
  return num < 5 ? num : 0;
};
document.addEventListener("keydown", (e) => {
  const val = e.key;
  if (e.code.includes("Key") || val === "Shift") {
    return;
  }
  if (e.code.includes("Digit")) {
    console.log("It's number");
  }
  calculatorOperation(val);
});
