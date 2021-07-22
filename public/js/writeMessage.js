var SHA1 = new Hashes.SHA1

const submitMessage = () => {
    const passcode = document.querySelector("#passcode").value; 
    const message = document.querySelector("#message").value; 
    const success = document.querySelector(".messageSentSuccess"); 
    const maxMessageLength = 10; 
    console.log(success);
    console.log(success.style.color);
 
    if (message.length > maxMessageLength) {
        alert(`Message is too long! Max message length is ${maxMessageLength} characters!`);
        return;  
    }

    if (checkPasscode(passcode)) {
        console.log(success.style.display); 
        success.style.display = ""; 
        console.log("Success!");

        firebase.database().ref("/message").push({
        passcode: SHA1.hex(passcode), 
        phrase: message
    });
    } else {
        // alert("Weak Password! Capital and Number needed!");
    }
}

function checkPasscode(passcode) {
    let capital = false; 
    let number = false; 

    for (char in passcode) {
         if (!isNaN(passcode[char] * 1)) {
            number = true; 
        } else if (passcode[char].toUpperCase() == passcode[char]) { 
            capital = true; 
        } 
    }
    if (capital && number) {
        return true; 
    } 
    return false; 
}

