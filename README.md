# VIONA – Your AI DevSidekick 🔊🤖

**VIONA** is a browser-based voice assistant powered by JavaScript and Web Speech APIs. Built by [Sunny Sharma](https://github.com/SunnySharma04) — a final year B.Tech CSE student at Haldia Institute of Technology, passionate about full-stack development, DSA, and bug bounty.

> 💡 “Synced with your ambition. Fueled by your code. I’m VIONA — let’s turn passion into product.”

---

## 🧠 Features

- 🎤 Voice recognition using Web Speech API
- 🔊 Text-to-speech with customizable voice selection
- 🎨 Light/Dark mode toggle via voice
- 🌐 Opens popular websites via commands (Google, YouTube, GitHub, etc.)
- 💬 Fun interactions like telling jokes, motivational quotes, and facts
- 🧠 Personalized greeting messages based on user identity
- 📜 Logs conversation history
- 🧩 Easy to extend with new commands

---

## 📁 Project Structure

```
/viona-ai-assistant
│
├── index.html         # Main UI for assistant
├── app.js             # Core JavaScript logic (voice recognition & actions)
├── style.css          # Styling for light/dark themes
├── avatar.png         # Assistant avatar icon
└── giphy.gif          # Assistant animation/visual
```

---

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/SunnySharma04/viona-ai-assistant.git
cd viona-ai-assistant
```

2. **Open `index.html` in any modern browser** (preferably Chrome)

```bash
start index.html   # Windows
open index.html    # macOS
```

3. **Click the mic button** 🎤 and start speaking!

> Example commands:
> - “Open Google”
> - “Tell me a joke”
> - “What is the time?”
> - “Change to dark mode”
> - “Who made you?”

---

## 🛠 How to Customize

- 🎙 To add your own voice greetings, update `speak(...)` lines in `app.js`
- 🌐 To add more commands, extend the `takeCommand()` function
- 🎨 Modify `style.css` for theme or UI updates
- 🔈 Voice options are loaded via `speechSynthesis.getVoices()` — you can select different ones

---

## 📦 Browser Requirements

- Google Chrome (recommended)
- Permissions to use microphone and speech synthesis

---

## 📄 License

This project is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html).  
© 2025 Sunny Sharma

> This project is built for personal use and learning. You are free to use, modify, or extend it — but please give credit to the original author.

---

## 🤝 Connect with Me

- 🔗 [GitHub](https://github.com/SunnySharma04)
- 💼 [LinkedIn](https://www.linkedin.com/in/sunny-sharma-2487312a7)
- ✉️ sunnysharma112004@gmail.com