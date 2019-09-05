var eventSpinnerUp = new CustomEvent('spinnerUp', { detail: {time: new Date()}}),
    eventSpinnerDown = new CustomEvent('spinnerDown', { detail: {time: new Date()}});

document.addEventListener("DOMContentLoaded", function (event) {
    var dataDownBtn = document.querySelectorAll('.spinner__btn[data-down="true"]')[0],
        dataUpBtn = document.querySelectorAll('.spinner__btn[data-up="true"]')[0];

   dataDownBtn.addEventListener("click", spinnerChangeInputValue);
   dataUpBtn.addEventListener("click", spinnerChangeInputValue);
});

function spinnerChangeInputValue(e) {
    var spinnerQuantityEl = document.getElementById("spinner__quantity"),
        spinnerQuantityVal = parseInt(spinnerQuantityEl.value),
        spinnerWrap = document.getElementById("spinner");

    spinnerWrap.addEventListener('spinnerUp',spinnerUpFunc);
    spinnerWrap.addEventListener('spinnerDown',spinnerDownFunc);

    if (e.target.getAttribute("data-down")) {
        spinnerWrap.dispatchEvent(eventSpinnerDown);

        --spinnerQuantityVal;

        if (spinnerQuantityVal < 0) {
            eventSpinnerDown.stopImmediatePropagation();
            console.log("Custom event spinnerDown stopped!");
            showMessage("Number cannot be less than 0");
            spinnerQuantityVal = 0;
        }
        spinnerQuantityEl.setAttribute('value', spinnerQuantityVal);
    }

    if (e.target.getAttribute("data-up")) {
        spinnerWrap.dispatchEvent(eventSpinnerUp);

        ++spinnerQuantityVal;

        if (spinnerQuantityVal > 10) {
            eventSpinnerUp.stopImmediatePropagation();
            console.log("Custom event spinnerUp stopped!");
            showMessage("Number cannot be more than 10");
            spinnerQuantityVal = 10;
        }
        spinnerQuantityEl.setAttribute('value', spinnerQuantityVal);
    }
}

function showMessage(message) {
    var messageBox = document.getElementsByClassName("message-box")[0];

    if (!messageBox) {
        var textNode = document.createTextNode(message),
        bodyFirstEl = document.getElementsByTagName('body')[0].firstChild;

        messageBox = document.createElement("div");
        messageBox.appendChild(textNode);
        document.body.insertBefore(messageBox, bodyFirstEl);
        messageBox.classList.add("message-box");

    } else {
        messageBox.classList.remove('hide');
        messageBox.innerHTML = message;
        window.setTimeout(() => {
            messageBox.classList.add('hide');
        }, 3000);
    }
}

function spinnerUpFunc(value) {
    console.log("Custom event spinnerUp works!");
}

function spinnerDownFunc(value) {
    console.log("Custom event spinnerDown works!");
}