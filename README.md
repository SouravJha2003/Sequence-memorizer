# Sequence Memorizer Game 🧠

A fun and challenging memory game where players must remember and repeat sequences of card blinks. Built with vanilla JavaScript, HTML5, and CSS3 featuring modern glassmorphism design.

## 📋 Table of Contents

- [How to Play](#how-to-play)
- [Game Rules](#game-rules)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Browser Compatibility](#browser-compatibility)
- [Technical Details](#technical-details)
- [Contributing](#contributing)

## 🎮 How to Play

1. **Start the Game**: Enter your name and select the number of entities (3, 5, 8, or 10)
2. **Watch the Sequence**: Click "Start Sequence" to see the computer blink cards in a random order
3. **Remember the Pattern**: Pay attention to the sequence - each card blinks for 1 second
4. **Repeat the Sequence**: Click the cards in the same order you saw them blink
5. **Progress**: If correct, move to the next round with an increased sequence length (+2)
6. **Game Over**: The game ends when you make a mistake

## 📜 Game Rules

- **Initial Sequence Length**: Starts with the number of entities you selected
- **Progression**: Sequence length increases by 2 after each successful round
- **Timing**: Computer blinks each card for exactly 1 second with a 0.2-second gap between cards
- **Scoring**: Earn points based on sequence length (10 points × sequence length)
- **Challenge**: Maximum sequence length is limited to 2 × number of entities

## ✨ Features

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Visual Feedback**: Cards highlight when active, correct, or wrong
- **Progress Tracking**: Real-time display of current round, sequence length, and score
- **Game Controls**: Start sequence, reset game, and play again options
- **Modern UI**: Beautiful glassmorphism design with smooth animations and gradients
- **Sequence Visualization**: Visual representation of the current sequence pattern
- **Accessibility**: Keyboard-friendly and screen reader compatible

## 🏗️ Project Structure

```
Sequence-memorizer/
├── index.html          # Main game structure and layout
├── style.css           # Game styling with glassmorphism effects
├── script.js           # Game logic and functionality
└── README.md           # Project documentation
```

### File Descriptions

- **`index.html`**: Contains the game's HTML structure, including the start form, game area, and card container
- **`style.css`**: Implements modern CSS features including:
  - Glassmorphism effects with backdrop-filter
  - Responsive grid layouts
  - Smooth animations and transitions
  - Gradient backgrounds and shadows
- **`script.js`**: Contains the `SequenceMemorizerGame` class with:
  - Game state management
  - Sequence generation and validation
  - User interaction handling
  - Score calculation and progression

## 🚀 Installation & Setup

1. **Clone or Download**: Get the project files
2. **Open in Browser**: Open `index.html` in any modern web browser
3. **No Dependencies**: All functionality is client-side - no additional setup required
4. **Offline Play**: Game works completely offline

## 🌐 Browser Compatibility

| Browser | Version | Status |
|---------|---------|---------|
| Chrome  | 60+     | ✅ Full Support |
| Firefox | 55+     | ✅ Full Support |
| Safari  | 12+     | ✅ Full Support |
| Edge    | 79+     | ✅ Full Support |
| Mobile  | Modern  | ✅ Responsive |

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup and modern HTML features
- **CSS3**: Advanced styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript**: ES6+ classes and modern JavaScript features
- **CSS Animations**: Smooth transitions and keyframe animations

### Key Features
- **Responsive Grid System**: Automatically adjusts card layout based on entity count
- **Glassmorphism Design**: Modern UI with backdrop-filter effects
- **Event-Driven Architecture**: Clean separation of concerns with event listeners
- **Progressive Enhancement**: Works on all modern browsers with graceful degradation

### Performance Optimizations
- Efficient DOM manipulation
- Optimized animation timing
- Minimal reflows and repaints
- Responsive design without JavaScript dependencies

## 🤝 Contributing

Feel free to contribute to this project! Here are some ways you can help:

- 🐛 Report bugs or issues
- 💡 Suggest new features
- 🎨 Improve the UI/UX design
- 📱 Enhance mobile responsiveness
- 🧪 Add unit tests
- 📚 Improve documentation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Enjoy testing your memory skills!** 🎯

*Built with ❤️ using vanilla web technologies*
