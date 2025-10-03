Shiritori Word Game (React)

A fun two-player Shiritori word game built with React where players take turns creating words that begin with the last letter of the previous word. Includes scoring, timers, and validation using DictionaryAPI.dev.


---
Game Rules

1. Two players take turns entering words.


2. The first word can be any valid word (minimum 4 letters).


3. Each next word must start with the last letter of the previous word.


4. Word validation:

Must exist in the dictionary (validated with dictionaryapi.dev).

Cannot be reused (duplicates not allowed).



5. Scoring system:

Points are awarded based on remaining time (1 * timer / 10).

Wrong words or invalid plays result in a -1 penalty.



6. Timer: Each player gets 60 seconds to make a move. If time runs out:

They lose 1 point (if their score is > 0).

Turn passes to the other player.





---

Features

✅ Real-time timer countdown per turn.

✅ Player highlighting (active player’s panel glows).

✅ Word validation via dictionary API.

✅ Duplicate word detection.

✅ Dynamic scoring system.

✅ List of all used words shown in order.

✅ Responsive UI with Tailwind CSS.



---

Tech Stack

React (Frontend)

React Hooks (useState, useEffect)

Tailwind CSS (UI styling)

react-hot-toast (error/success notifications)

DictionaryAPI.dev (word validation)



---

Getting Started

1. Clone the Repository

git clone https://github.com/your-username/shiritori-game.git
cd shiritori-game

2. Install Dependencies

npm install

3. Run the Development Server

npm run dev

The app will be available at:
http://localhost:3000


----

Contributing

Contributions are welcome!
If you'd like to improve the game, feel free to fork the repo and submit a pull request.


---

License

This project is open-source and available under the MIT License.
