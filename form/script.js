const button = document.getElementById("but1");
const popup = document.getElementById("pop-up-box");
const close = document.getElementById("close");




button.addEventListener('click', () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const pass1 = document.getElementById("pass1").value;


    if (!name || !email || !pass1) {
        alert("Please fill out all fields before submitting!");
        return;

    } else {
        popup.style.display = 'block'
    }



});


close.addEventListener('click', () => {
    popup.style.display = 'none'

});





const display = document.getElementById("display");
const qr = document.getElementById("qr");
const text = document.getElementById("text");


function generate() {
    if (text.value.length > 0) {
        qr.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + text.value;
        display.classList.add("show-img");
    } else {
        alert("cannot be empty");
        {
            alert.style.display = "block"

        }

    }
}




function formValidate() {

    const pass1 = document.getElementById("pass1").value;
    const pass2 = document.getElementById("pass2").value;

    if (pass1 == pass2) {
        return true;
    } else {
        alert("Passwords do not match");
        return false;
    }
};



