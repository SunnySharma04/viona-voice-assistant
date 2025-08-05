
let selectedVoice = null;
const voiceSelect = document.getElementById("voiceSelect");
const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

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

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing VIONA...");
    wishMe();
    speak("Boot complete. Hello Sunny — Computer Science prodigy, code slayer, and bug hunter. I’m VIONA, tuned into your rhythm. Let’s make some tech magic happen.");
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    logHistory("You", transcript);
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, Myself VIONA, Virtual Intelligent Online Assistant, How May I Help You?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else if (message.includes("who made you")) {
        speak("I was developed by Sunny Sharma, a passionate software developer.");
    } else if (message.includes("linkedin profile")) {
        window.open("https://www.linkedin.com/in/sunny-sharma-2487312a7", "_blank");
        speak("Opening your LinkedIn profile...");
    } else if (message.includes("github profile")) {
        window.open("https://github.com/SunnySharma04", "_blank");
        speak("Opening your Github profile...");
    } else if (message.includes("motivate me")) {
        speak("Don't watch the clock; do what it does. Keep going.");
    } else if (message.includes("tell me a fun fact")) {
        speak("Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still perfectly good to eat.");
    } else if (message.includes('calculator')) {
        window.open('Calculator:///', '_blank');
        const finalText = "Opening Calculator";
        speak(finalText);
    } else if (message.includes("dark mode")) {
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
        speak("Dark mode activated.");
    } else if (message.includes("light mode")) {
        document.body.classList.add("light-theme");
        document.body.classList.remove("dark-theme");
        speak("Light mode activated.");
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}

function logHistory(user, message) {
    const log = document.getElementById("historyLog");
    if (!log) return;
    const entry = document.createElement("p");
    entry.innerHTML = `<strong>${user}:</strong> ${message}`;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
}
