const submitBtn = document.getElementById('submit-btn');
        const retryBtn = document.getElementById('retry-btn');
        const feedback = document.getElementById('feedback');
        const userGuessInput = document.getElementById('user-guess');
        
        let computerNo = Math.ceil(Math.random() * 50);
        let attempts = 0;
        const maxAttempts = 10;

        // Array of background colors
        const backgroundColors = [
            '#ff4d56', '#ff4352', '#ff333d', '#ff1925', '#ff0000',
            '#d40000', '#be0000', '#a20000', '#880000', '#6c0000'
        ];

        // Update the background color based on remaining attempts
        function updateBackground(attemptsLeft) {
            const colorIndex = maxAttempts - attemptsLeft;
            document.body.style.backgroundColor = backgroundColors[colorIndex];
        }

        // Handle guesses
        function handleGuess() {
            const userGuess = Number(userGuessInput.value);

            // Validate input
            if (isNaN(userGuess) || userGuess < 0 || userGuess > 50) {
                feedback.textContent = "Please enter a valid number between 0 and 50.";
                feedback.style.color = "red";
                return;
            }

            attempts++;
            const attemptsLeft = maxAttempts - attempts;

            if (userGuess === computerNo) {
                feedback.textContent = `Congratulations! You guessed it in ${attempts} attempts.`;
                feedback.style.color = "green";
                document.body.style.backgroundColor = "#32cd32"; // Bright green for success
                endGame();
            } else if (userGuess < computerNo) {
                feedback.textContent = `Too low! Attempts left: ${attemptsLeft}`;
                feedback.style.color = "orange";
            } else {
                feedback.textContent = `Nearly There! Attempts left: ${attemptsLeft}`;
                feedback.style.color = "orange";
            }

            // Update background for remaining attempts
            if (userGuess !== computerNo) {
                updateBackground(attemptsLeft);
            }

            // Game over
            if (attempts === maxAttempts && userGuess !== computerNo) {
                feedback.textContent = `Game over! The correct number was ${computerNo}.`;
                feedback.style.color = "red";
                endGame();
            }

            userGuessInput.value = ""; // Clear input
        }

        // End game
        function endGame() {
            submitBtn.disabled = true;
            retryBtn.classList.remove('hidden');
        }

        // Reset game
        function resetGame() {
            computerNo = Math.ceil(Math.random() * 50);
            attempts = 0;
            submitBtn.disabled = false;
            retryBtn.classList.add('hidden');
            feedback.textContent = "";
            userGuessInput.value = "";
            document.body.style.backgroundColor = backgroundColors[0]; // Reset to the lightest color
        }

        // Event listeners
        submitBtn.addEventListener('click', handleGuess);
        retryBtn.addEventListener('click', resetGame);