var SHA1 = new Hashes.SHA1

const getMessages = () => {
 const messagesRef = firebase.database().ref("/message");
 messagesRef.on('value', (snapshot) => {
     const data = snapshot.val();
     checkPasscode(data); 
 });
}

var passwordAttempts = 0; 
var secondsPast = 0;
const goBackButton = document.querySelector('.goBack');
const messageDiv = document.querySelector('#message');
const viewMessageButton = document.getElementById("viewMsg");

function checkPasscode(messages) {
    const passcodeAttempt = SHA1.hex(document.querySelector('#passcode').value);
    let found = false; 
    for (message in messages) {
        const messageData = messages[message];
        if (messageData.passcode === passcodeAttempt) {
            const passcodeInput = document.querySelector('#passcodeInput');
            messageDiv.innerHTML = messageData.phrase;
            passcodeInput.style.display = 'none';
            found = true; 
            messageDiv.style.color = "black"; 
            goBackButton.style.display = "block";  
        }
    }   
    if (!found) {
        passwordAttempts++; 
        messageDiv.innerHTML = `Incorrect Passcode! ${5 - passwordAttempts} attempts remaining.`;
        messageDiv.style.color = "red"; 
        if (passwordAttempts >= 3) {
            // alert(`${passwordAttempts} wrong attempts registered, ${5 - passwordAttempts} attempts left.`)
            if (passwordAttempts == 5) {
                console.log(viewMessageButton);
                messageDiv.innerHTML = `Incorrect Passcode! 0 attempts remaining. Button is locked for 5 seconds.`
                viewMessageButton.disabled = true; 
                secondsPast = 0; 
                timer = setInterval(reactivateButton, 1000); 
            }
        }
    }
}

function reactivateButton() {
    secondsPast++; 
    messageDiv.innerHTML = `Incorrect Passcode! 0 attempts remaining. Button is locked for ${5 - secondsPast} seconds.`
    if (secondsPast == 5) {
        passwordAttempts = 0; 
        messageDiv.innerHTML = "";        
        viewMessageButton.disabled = false;  
        clearInterval(timer);
        
    }
}

goBackButton.addEventListener("click", () => {
    goBackButton.style.display = "none"; 
    messageDiv.innerHTML = "";
    passcodeInput.style.display = "";
});

