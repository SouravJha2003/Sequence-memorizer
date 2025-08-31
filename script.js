class SequenceMemorizerGame {
    constructor() {
        this.playerName = '';
        this.entityCount = 0;
        this.currentRound = 1;
        this.currentSequenceLength = 3;
        this.score = 0;
        this.computerSequence = [];
        this.userSequence = [];
        this.isSequencePlaying = false;
        this.isUserTurn = false;
        
        this.initializeElements();
        this.bindEvents();
    }
    
    initializeElements() {
        this.startForm = document.getElementById('startForm');
        this.gameArea = document.getElementById('gameArea');
        this.playerNameInput = document.getElementById('playerName');
        this.entityCountSelect = document.getElementById('entityCount');
        this.startBtn = document.getElementById('startBtn');
        this.playerNameDisplay = document.getElementById('playerNameDisplay');
        this.roundNumber = document.getElementById('roundNumber');
        this.sequenceLength = document.getElementById('sequenceLength');
        this.scoreElement = document.getElementById('score');
        this.cardsContainer = document.getElementById('cardsContainer');
        this.startSequenceBtn = document.getElementById('startSequenceBtn');
        this.homeBtn = document.getElementById('homeBtn');
        this.message = document.getElementById('message');
        this.sequenceArray = document.getElementById('sequenceArray');
    }
    
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.startSequenceBtn.addEventListener('click', () => this.startComputerSequence());
        this.homeBtn.addEventListener('click', () => this.goHome());
        this.goHomeBtn.addEventListener('click', () => this.goHome());
    }
    
    startGame() {
        const name = this.playerNameInput.value.trim();
        const entityCount = parseInt(this.entityCountSelect.value);
        
        if (!name || !entityCount) {
            this.showMessage('Please enter your name and select number of entities!', 'error');
            return;
        }
        
        this.playerName = name;
        this.entityCount = entityCount;
        this.currentSequenceLength = entityCount;
        
        this.playerNameDisplay.textContent = this.playerName;
        this.startForm.style.display = 'none';
        this.gameArea.style.display = 'block';
        
        this.generateCards();
        this.updateDisplay();
        this.generateSequenceArray();
        this.startSequenceBtn.style.display = 'block';
        this.showMessage(`Game started! You have ${this.entityCount} cards.`, 'info');
    }
    
    generateCards() {
        this.cardsContainer.innerHTML = '';
        this.cardsContainer.className = `cards-container grid-${this.entityCount}`;
        
        for (let i = 0; i < this.entityCount; i++) {
            const card = document.createElement('div');
            card.className = 'card';
            card.textContent = i + 1;
            card.dataset.index = i;
            
            card.addEventListener('click', () => this.handleCardClick(i));
            
            this.cardsContainer.appendChild(card);
        }
    }
    
    generateSequenceArray() {
        this.sequenceArray.innerHTML = '';
        for (let i = 0; i < this.currentSequenceLength; i++) {
            const box = document.createElement('div');
            box.className = 'sequence-box empty';
            box.textContent = i + 1;
            this.sequenceArray.appendChild(box);
        }
    }
    
    showComputerSequence() {
        // Reset all sequence boxes to empty first
        const boxes = this.sequenceArray.querySelectorAll('.sequence-box');
        boxes.forEach(box => {
            box.className = 'sequence-box empty';
        });
    }
    
    updateSequenceArray(index, className) {
        const boxes = this.sequenceArray.querySelectorAll('.sequence-box');
        if (boxes[index]) {
            boxes[index].className = `sequence-box ${className}`;
        }
    }
    
    startComputerSequence() {
        if (this.isSequencePlaying || this.isUserTurn) return;
        
        this.isSequencePlaying = true;
        this.startSequenceBtn.style.display = 'none';
        this.userSequence = [];
        this.computerSequence = this.generateRandomSequence();
        
        this.showMessage(`Watch the sequence! Length: ${this.currentSequenceLength}`, 'info');
        
        this.playSequence(0);
    }
    
    generateRandomSequence() {
        const sequence = [];
        for (let i = 0; i < this.currentSequenceLength; i++) {
            sequence.push(Math.floor(Math.random() * this.entityCount));
        }
        return sequence;
    }
    
    playSequence(index) {
        if (index >= this.computerSequence.length) {
            this.isSequencePlaying = false;
            this.isUserTurn = true;
            this.showMessage('Now repeat the sequence!', 'info');
            return;
        }
        
        const cardIndex = this.computerSequence[index];
        const card = this.cardsContainer.children[cardIndex];
        
        // Highlight the card
        card.classList.add('active');
        
        // Remove highlight after 1 second
        setTimeout(() => {
            card.classList.remove('active');
            // Play next card in sequence after a small delay
            setTimeout(() => {
                this.playSequence(index + 1);
            }, 200);
        }, 1000);
    }
    
    handleCardClick(index) {
        if (!this.isUserTurn || this.isSequencePlaying) return;
        
        const card = this.cardsContainer.children[index];
        const currentUserIndex = this.userSequence.length;
        
        // Check if this choice is correct
        if (index === this.computerSequence[currentUserIndex]) {
            // Correct choice - show green in sequence array
            this.userSequence.push(index);
            this.updateSequenceArray(currentUserIndex, 'user-correct');
            
            // Visual feedback on card
            card.classList.add('active');
            setTimeout(() => {
                card.classList.remove('active');
            }, 300);
            
            // Check if sequence is complete
            if (this.userSequence.length === this.computerSequence.length) {
                this.checkSequence();
            }
        } else {
            // Wrong choice - show red in sequence array and end game immediately
            this.updateSequenceArray(currentUserIndex, 'user-wrong');
            this.showMessage('Wrong choice! Game Over!', 'error');
            setTimeout(() => {
                this.gameOver();
            }, 1000);
        }
    }
    
    checkSequence() {
        this.isUserTurn = false;
        
        // Check if sequences match
        const isCorrect = this.userSequence.every((value, index) => value === this.computerSequence[index]);
        
        if (isCorrect) {
            this.score += this.currentSequenceLength * 10;
            this.currentRound++;
            this.currentSequenceLength += 2;
            
            this.showMessage(`Correct! Moving to round ${this.currentRound}`, 'success');
            this.updateDisplay();
            
            // Continue to next round - game only ends when user makes a mistake
            setTimeout(() => {
                this.generateSequenceArray();
                this.startSequenceBtn.style.display = 'block';
                this.showMessage('Press Start Sequence to continue to next round!', 'info');
            }, 1500);
        } else {
            this.showMessage('Wrong sequence! Game Over!', 'error');
            setTimeout(() => {
                this.gameOver();
            }, 1500);
        }
    }
    
    updateDisplay() {
        this.roundNumber.textContent = this.currentRound;
        this.sequenceLength.textContent = this.currentSequenceLength;
        this.scoreElement.textContent = this.score;
    }
    
    showMessage(text, type) {
        this.message.textContent = text;
        this.message.className = `message ${type}`;
        
        setTimeout(() => {
            this.message.textContent = '';
            this.message.className = 'message';
        }, 3000);
    }
    
    gameOver() {
        // Create game over component HTML
        const gameOverHTML = `
            <div class="game-over-component">
                <div class="game-over-header">
                    <h2>🎮 Game Over! 🎮</h2>
                    <div class="game-over-icon">💀</div>
                </div>
                
                <div class="game-over-stats">
                    <div class="stat-item">
                        <span class="stat-label">Final Score</span>
                        <span class="stat-value">${this.score}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Rounds Completed</span>
                        <span class="stat-value">${this.currentRound - 1}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Max Sequence Length</span>
                        <span class="stat-value">${this.currentSequenceLength}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Player</span>
                        <span class="stat-value">${this.playerName}</span>
                    </div>
                </div>
                
                <div class="game-over-message">
                    <p>${this.getGameOverMessage()}</p>
                </div>
                
                <div class="game-over-actions">
                    <button id="goHomeBtn" class="control-btn home-btn">🏠 Go Home</button>
                </div>
            </div>
        `;
        
        // Replace the game area content with game over component
        this.gameArea.innerHTML = gameOverHTML;
        
        // Re-bind the go home button event
        document.getElementById('goHomeBtn').addEventListener('click', () => this.goHome());
    }
    
    getGameOverMessage() {
        if (this.score >= 100) {
            return '🎉 Amazing! You have an incredible memory! 🎉';
        } else if (this.score >= 50) {
            return '🌟 Great job! You\'re getting really good at this! 🌟';
        } else if (this.score >= 20) {
            return '👍 Well done! Keep practicing to improve! 👍';
        } else {
            return '💪 Good effort! Try again to beat your score! 💪';
        }
    }
    
    goHome() {
        // Hide game area and show start form
        this.gameArea.style.display = 'none';
        this.startForm.style.display = 'block';
        
        // Reset form
        this.playerNameInput.value = '';
        this.entityCountSelect.value = '';
        
        // Reset game state
        this.currentRound = 1;
        this.currentSequenceLength = 3;
        this.score = 0;
        this.computerSequence = [];
        this.userSequence = [];
        this.isSequencePlaying = false;
        this.isUserTurn = false;
        
        // Restore original game area content
        this.restoreGameArea();
        
        this.showMessage('Welcome back!', 'info');
    }
    
    restoreGameArea() {
        // Restore the original game area HTML structure
        this.gameArea.innerHTML = `
            <div class="game-info">
                <h2>Welcome, <span id="playerNameDisplay"></span>!</h2>
                <p>Round: <span id="roundNumber">1</span></p>
                <p>Sequence Length: <span id="sequenceLength">3</span></p>
                <p>Score: <span id="score">0</span></p>
            </div>
            
            <!-- Sequence Array Bar -->
            <div class="sequence-bar">
                <h3>Current Sequence:</h3>
                <div id="sequenceArray" class="sequence-array">
                    <!-- Sequence boxes will be generated here -->
                </div>
            </div>
            
            <div class="cards-container" id="cardsContainer">
                <!-- Cards will be generated here -->
            </div>
            
            <div class="game-controls">
                <button id="startSequenceBtn" class="control-btn">Start Sequence</button>
                <button id="homeBtn" class="control-btn home-btn">Home</button>
            </div>
            
            <div id="message" class="message"></div>
        `;
        
        // Re-initialize elements and bind events
        this.initializeElements();
        this.bindEvents();
        
        // Generate initial sequence array
        this.generateSequenceArray();
    }
    

    

}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SequenceMemorizerGame();
});
