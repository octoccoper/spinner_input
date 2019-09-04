document.addEventListener("DOMContentLoaded", function (event) {
    var dataDownBtn = document.querySelectorAll('.spinner__btn[data-down="true"]')[0],
        dataUpBtn = document.querySelectorAll('.spinner__btn[data-up="true"]')[0];

    dataDownBtn.addEventListener("click", spinnerChangeInputValue);
    dataUpBtn.addEventListener("click", spinnerChangeInputValue);
});


function spinnerChangeInputValue(e) {
    var spinnerQuantityEl = document.getElementById("spinner__quantity"),
        spinnerQuantityVal = parseInt(spinnerQuantityEl.value);

    if (e.target.getAttribute("data-down")) {
        --spinnerQuantityVal;
        if (spinnerQuantityVal < 0) {
            showMessage("Number cannot be less than 0");
            spinnerQuantityVal = 0;
        }
        spinnerQuantityEl.setAttribute('value', spinnerQuantityVal);
    }

    if (e.target.getAttribute("data-up")) {
        ++spinnerQuantityVal;
        if (spinnerQuantityVal > 10) {
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

var event = new Event('new-event');

// Listen for the event.
document.addEventListener('new-event', function (e) {
    console.log("Custom event works!");
}, false);

// Dispatch the event.
document.dispatchEvent(event);