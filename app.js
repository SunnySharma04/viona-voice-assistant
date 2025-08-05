let selectedVoice = null;
const voiceSelect = document.getElementById("voiceSelect");
const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
let initialized = false; // control intro once

// ✅ Load and populate voices
function populateVoices() {
    const voices = speechSynthesis.getVoices();

    if (!voices.length) {
        setTimeout(populateVoices, 100);
        return;
    }

    voiceSelect.innerHTML = "";
    voices.forEach((voice, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });

    const savedVoiceIndex = localStorage.getItem("selectedVoiceIndex");
    const defaultIndex = savedVoiceIndex && voices[savedVoiceIndex] ? savedVoiceIndex : 0;
    voiceSelect.value = defaultIndex;
    selectedVoice = voices[defaultIndex];
}

// ✅ Handle dropdown voice selection
voiceSelect?.addEventListener("change", () => {
    const voices = speechSynthesis.getVoices();
    const selectedIndex = voiceSelect.value;
    selectedVoice = voices[selectedIndex];
    localStorage.setItem("selectedVoiceIndex", selectedIndex);
});

// ✅ Setup voice list
window.speechSynthesis.onvoiceschanged = populateVoices;
populateVoices();

// ✅ Speak Function
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.volume = 1;
    utterance.pitch = 1;
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }
    window.speechSynthesis.speak(utterance);
    logHistory?.("VIONA", text);
}

// ✅ Greeting based on time
function wishMe() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

// ✅ Intro Speech (runs once on first mic click)
function speakIntro() {
    setTimeout(() => {
        speak("Initializing VIONA...");
    }, 500);

    setTimeout(() => {
        wishMe();
    }, 2500);

    setTimeout(() => {
        speak("Boot complete. Hello Sunny — Computer Science prodigy, code slayer, and bug hunter. I’m VIONA, tuned into your rhythm. Let’s make some tech magic happen.");
    }, 5000);
}

// ✅ Start Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    logHistory("You", transcript);
    takeCommand(transcript.toLowerCase());
};

// ✅ Mic Click Event
btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();

    if (!initialized) {
        speakIntro();
        initialized = true;
    }
});

// ✅ Command Logic
function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, Myself VIONA, Virtual Intelligent Online Assistant, How May I Help You?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Launching YouTube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Bringing up Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        speak("Here's what I found online regarding " + message);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        speak("This is what I found on Wikipedia about " + message);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleTimeString();
        speak("The current time is " + time);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
        speak("Today is " + date);
    } else if (message.includes("who made you")) {
        speak("I was crafted by Sunny Sharma, a visionary developer and relentless learner.");
    } else if (message.includes("linkedin profile")) {
        window.open("https://www.linkedin.com/in/sunny-sharma-2487312a7", "_blank");
        speak("Opening Sunny Sharma's LinkedIn profile.");
    } else if (message.includes("github profile")) {
        window.open("https://github.com/SunnySharma04", "_blank");
        speak("Here's Sunny's GitHub profile.");
    } else if (message.includes("motivate me")) {
        speak("Push yourself, because no one else is going to do it for you.");
    } else if (message.includes("tell me a fun fact")) {
        speak("Did you know? Bananas are berries, but strawberries aren't.");
    } else if (message.includes('calculator')) {
        window.open('Calculator:///', '_blank');
        speak("Launching calculator.");
    } else if (message.includes("dark mode")) {
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
        speak("Dark mode activated.");
    } else if (message.includes("light mode")) {
        document.body.classList.add("light-theme");
        document.body.classList.remove("dark-theme");
        speak("Light mode is now on.");
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        speak("Here's what I found for " + message + " on Google.");
    }
}

// ✅ Chat Log Utility
function logHistory(user, message) {
    const log = document.getElementById("historyLog");
    if (!log) return;
    const entry = document.createElement("p");
    entry.innerHTML = `<strong>${user}:</strong> ${message}`;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
}
