document.addEventListener("DOMContentLoaded", () => {

  // Setting the font size to automatically decrease

  const inputBox = document.getElementById("input-box-id");
  const cloneBox = document.getElementById("clone");
  
  const baseFont = 3.5
  const minimumFont = 2

  const enterButton = document.getElementById("enter-button-id");
  const outputBox = document.getElementById("output-box-id");
  const saveBox = document.getElementById("save-box-id");

  function syncStyles() {
    const style = getComputedStyle(inputBox);
    cloneBox.style.width = style.width;
    cloneBox.style.padding = style.padding;
    cloneBox.style.lineHeight = style.lineHeight;
    cloneBox.style.fontFamily = style.fontFamily;
    cloneBox.style.boxSizing = style.boxSizing;
  }

  function resizeInput() {
    syncStyles();
    cloneBox.textContent = inputBox.value || " ";

    let fontSize = baseFont;
    cloneBox.style.fontSize = fontSize + "rem";

    const maxHeight = inputBox.clientHeight;

    // Decrease font size until it fits without scrolling
    while (cloneBox.scrollHeight > maxHeight && fontSize > minimumFont) {
      fontSize--;
      cloneBox.style.fontSize = fontSize + "rem";
    }

    inputBox.style.fontSize = fontSize + "rem";
  }

  inputBox.addEventListener("input", resizeInput);

  // Setting the required JavaScript for the input and output box

  let dataSet = [];

    inputBox.addEventListener("keydown", function (event) {
    if (event.keyCode == 13) {
      enterButton.click();
      inputBox.value = "";
      event.preventDefault();
    } else if (event.shiftKey) {
      inputBox.value = inputBox.value + "\n";
    }
  });

  function outputInput() {
    dataSet.push(inputBox.value);
    outputBox.innerHTML = inputBox.value;
    copyAtt(outputBox, inputBox);
    inputBox.value = "";
    inputBox.focus();
    addData();
  }

  function copyAtt(target, source) {
    [...source.attributes].forEach(attr => {
      target.setAttribute(attr.nodeName, attr.nodeValue)
    })
  }

  enterButton.addEventListener("click", outputInput);
    function copyText() {
      inputBox.value = saveBox.innerHTML;
      inputBox.focus();
  }

  function addData() {
    let template = dataSet.map(data => `<li>${data}</li>`).join('\n');
    document.getElementById("save-box-id").innerHTML = template;  
  }

  // Setting the JavaScript to add a new line inside the input box

  // inputBox.addEventListener("keypress", function(event) {
  //   if (event.keyCode == 16) {
  //       inputBox.value = inputBox.value + "\n";
  //       event.preventDefault();
  //   }
  // })

  // Setting the option for a user to add a bold and non-bold effect to the input box

  const boldFont = document.getElementById("bold-font-link");
  const nonBoldFont = document.getElementById("non-bold-font-link");

  boldFont.onclick = function() {
    inputBox.style.fontWeight = "800";
    inputBox.focus();
  }

  nonBoldFont.onclick = function() {
    inputBox.style.fontWeight = "100";
    inputBox.focus();
  }

  // Setting the option for a user to change the background color of the application 

  const greenBackground = document.getElementById("green-background-link");
  const blueBackground = document.getElementById("blue-background-link");
  const blackBackground = document.getElementById("black-background-link");

  greenBackground.onclick = function() {
    inputBox.style.backgroundColor = "#00FF15";
    inputBox.focus();
  }

  blueBackground.onclick = function() {
    inputBox.style.backgroundColor = "#0400FF";
    inputBox.focus();
  }

  blackBackground.onclick = function() {
    inputBox.style.backgroundColor = "#0E0A0A";
    inputBox.focus();
  }

});