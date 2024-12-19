let gamepadIndex = null;

// Detect and assign gamepad
window.addEventListener("gamepadconnected", (e) => {
    gamepadIndex = e.gamepad.index;
    console.log(`Gamepad connected: ${e.gamepad.id}`);
});

window.addEventListener("gamepaddisconnected", (e) => {
    gamepadIndex = null;
    console.log("Gamepad disconnected");
});

// Function to test vibration
function testVibration() {
    if (gamepadIndex !== null) {
        const gamepad = navigator.getGamepads()[gamepadIndex];
        if (gamepad && gamepad.vibrationActuator) {
            gamepad.vibrationActuator.playEffect("dual-rumble", {
                startDelay: 0,
                duration: 1000, // Vibration lasts for 1 second
                weakMagnitude: 0.5, // Weak motor intensity (0.0 - 1.0)
                strongMagnitude: 1.0 // Strong motor intensity (0.0 - 1.0)
            });
            console.log("Vibration test started.");
        } else {
            alert("Vibration not supported on this controller.");
        }
    } else {
        alert("No gamepad detected! Please connect a gamepad.");
    }
}

// Attach the vibration test to the button
document.getElementById("vibrate-btn").addEventListener("click", testVibration);

function handleButtons(buttons) {
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        const buttonElement = document.getElementById(`controller-b${i}`);
        if (buttonElement) {
            if (button.value > 0) {
                buttonElement.classList.add("pressed"); // Change color when pressed
            } else {
                buttonElement.classList.remove("pressed"); // Reset color when not pressed
            }
        }
    }
}

function gameLoop() {
    if (gamepadIndex !== null) {
        const gamepad = navigator.getGamepads()[gamepadIndex];
        handleButtons(gamepad.buttons);
    }
    requestAnimationFrame(gameLoop);
}

gameLoop();
