"use strict";

// DOM elements
const inputBill = document.getElementById("bill-amount");
const inputPeople = document.getElementById("people-count");
const inputCustom = document.querySelector(".custom-percentage");
const btn_5 = document.querySelector(".btn_5");
const btn_10 = document.querySelector(".btn_10"); 
const btn_15 = document.querySelector(".btn_15");
const btn_25 = document.querySelector(".btn_25");
const btn_50 = document.querySelector(".btn_50");
const btnReset = document.querySelector(".reset-btn");
const showTip = document.querySelector(".show-tip");
const showTotal = document.querySelector(".show-total");
const showWarning = document.querySelector("label span"); /*id ver */

let billAmount, numPeople, customPercent, tipTotal, tipPerson, totalPerson;

/*functions*/
function resetBtn() {
  inputBill.value = "";
  inputPeople.value = "";
  inputPeople.classList.remove("empty");
  inputCustom.value = "";
  percentBtns.forEach(function (btn) {
    btn.classList.remove("click");
  });
  showTip.textContent = "$0.00";
  showTotal.textContent = "$0.00";
  showWarning.classList.remove("empty");
}

/*activate reset button*/
inputBill.addEventListener("change", function () {
  billAmount = Number(inputBill.value);
  numPeople = Number(inputPeople.value);

  if (billAmount !== 0) {
    btnReset.removeAttribute("disabled");
  }

  if (numPeople === 0) {
    showWarning.classList.add("empty");
    inputPeople.classList.add("empty");
  }
});

/*validate number of people (non zero)*/
inputPeople.addEventListener("change", function () {
  numPeople = Number(inputPeople.value);
  if (numPeople !== 0) {
    showWarning.classList.remove("empty");
    inputPeople.classList.remove("empty");
  } else  {
    showWarning.classList.add("empty");
    inputPeople.classList.add("empty");
  }
});

/*select tip*/
const percentBtns = [btn_5, btn_10, btn_15, btn_25, btn_50, inputCustom];
let percent = 0;

percentBtns.forEach(function (btn) {
  btn.addEventListener("pointerdown", function (e) {
    btn.classList.add("click");
    percentBtns.forEach(function (btnInner) {
      if (btnInner !== btn) btnInner.classList.remove("click");
    });
    if (btn.id !== "custom") percent = Number(btn.innerHTML);
  });
});

/*reset form*/
btnReset.addEventListener("click", resetBtn);

/*calculate tip and total*/
document.querySelectorAll("input").forEach(function (input) {
  input.addEventListener("change", function () {
    billAmount = Number(inputBill.value);
    numPeople = Number(inputPeople.value);   /*hangi inputu döneceksen ona classa verip onu dönmek daha mantıklı(ileride eklenebilecek inputlar için) */ 
    customPercent = Number(inputCustom.value);

    if (customPercent > 100) {
      alert("percentage cannot be greater than 100!")
      resetBtn();
    }
    if (percent === 0) percent = customPercent;

    if (billAmount !== 0 && numPeople !== 0 && percent !== 0) {
      tipTotal = billAmount * (percent / 100);
      tipPerson = tipTotal / numPeople;
      totalPerson = (billAmount + tipTotal) / numPeople;

      showTip.textContent = "$" + tipPerson.toFixed(2);
      showTotal.textContent = "$" + totalPerson.toFixed(2);
    }
  });
});