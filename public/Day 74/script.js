// script.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const startBtn = document.getElementById('startListening');
    const stopBtn = document.getElementById('stopListening');
    const speakTestBtn = document.getElementById('speakTest');
    const clearConversationBtn = document.getElementById('clearConversation');
    const conversationLog = document.getElementById('conversationLog');
    const assistantStatus = document.getElementById('assistantStatus');
    const statusIndicator = document.getElementById('statusIndicator');
    const voiceSelect = document.getElementById('voiceSelect');
    const speedSelect = document.getElementById('speedSelect');
    const pitchSelect = document.getElementById('pitchSelect');
    const languageSelect = document.getElementById('languageSelect');
    const voiceLevel = document.getElementById('voiceLevel');
    const levelBars = voiceLevel.querySelectorAll('.level-bar');
    

const startNoteRecordingBtn = document.getElementById('startNoteRecording');
const voiceNotesTextarea = document.getElementById('voiceNotes');
const saveNoteBtn = document.getElementById('saveNote');
const clearNoteBtn = document.getElementById('clearNote');
const readNoteBtn = document.getElementById('readNote');

let isNoteRecording = false;
let noteRecognition;

function initNoteRecording() {
    if (!SpeechRecognition) return;
    
    noteRecognition = new SpeechRecognition();
    noteRecognition.continuous = true;
    noteRecognition.interimResults = true;
    noteRecognition.lang = languageSelect.value;
    
    noteRecognition.onresult = function(event) {
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            }
        }
        
        if (finalTranscript) {
            voiceNotesTextarea.value += finalTranscript + ' ';
            voiceNotesTextarea.scrollTop = voiceNotesTextarea.scrollHeight;
        }
    };
    
    noteRecognition.onerror = function(event) {
        stopNoteRecording();
        addMessage("Voice Assistant", "Note recording error.");
    };
    
    noteRecognition.onend = function() {
        stopNoteRecording();
    };
}

function startNoteRecording() {
    if (isNoteRecording) return;
    
    if (isListening) {
        addMessage("Voice Assistant", "Please stop listening first.");
        return;
    }
    
    if (!noteRecognition) {
        initNoteRecording();
    }
    
    try {
        noteRecognition.start();
        isNoteRecording = true;
        startNoteRecordingBtn.innerHTML = '<i class="fas fa-stop-circle"></i> Stop';
        startNoteRecordingBtn.classList.remove('btn-outline');
        startNoteRecordingBtn.classList.add('btn-secondary');
        
        const indicator = document.createElement('span');
        indicator.className = 'recording-indicator';
        startNoteRecordingBtn.prepend(indicator);
        
        addMessage("Voice Assistant", "Note recording started.");
        speakText("Note recording started.");
    } catch (error) {
        addMessage("Voice Assistant", "Failed to start note recording.");
    }
}

function stopNoteRecording() {
    if (!isNoteRecording) return;
    
    if (noteRecognition) {
        noteRecognition.stop();
    }
    
    isNoteRecording = false;
    startNoteRecordingBtn.innerHTML = '<i class="fas fa-microphone"></i> Dictate';
    startNoteRecordingBtn.classList.remove('btn-secondary');
    startNoteRecordingBtn.classList.add('btn-outline');
    
    const indicator = startNoteRecordingBtn.querySelector('.recording-indicator');
    if (indicator) {
        indicator.remove();
    }
    
    addMessage("Voice Assistant", "Note recording stopped.");
}

function saveNoteToStorage() {
    const noteText = voiceNotesTextarea.value.trim();
    if (!noteText) {
        addMessage("Voice Assistant", "Note is empty.");
        return;
    }
    
    const noteName = prompt("Enter a name for this note:", `Note ${new Date().toLocaleDateString()}`);
    if (!noteName) return;
    
    const savedNotes = JSON.parse(localStorage.getItem('voiceAssistantNotes')) || [];
    const noteData = {
        name: noteName,
        date: new Date().toLocaleString(),
        content: noteText
    };
    
    savedNotes.push(noteData);
    localStorage.setItem('voiceAssistantNotes', JSON.stringify(savedNotes));
    
    addMessage("Voice Assistant", `Note saved as "${noteName}".`);
    speakText(`Note saved as ${noteName}.`);
}

function clearNote() {
    if (voiceNotesTextarea.value.trim() && !confirm("Clear all text?")) {
        return;
    }
    voiceNotesTextarea.value = '';
}

function readNoteAloud() {
    const noteText = voiceNotesTextarea.value.trim();
    if (!noteText) {
        addMessage("Voice Assistant", "Note is empty.");
        return;
    }
    
    speakText("Reading your note: " + noteText);
}

// Event listeners
startNoteRecordingBtn.addEventListener('click', function() {
    if (isNoteRecording) {
        stopNoteRecording();
    } else {
        startNoteRecording();
    }
});

saveNoteBtn.addEventListener('click', saveNoteToStorage);
clearNoteBtn.addEventListener('click', clearNote);
readNoteBtn.addEventListener('click', readNoteAloud);

// Update language change
languageSelect.addEventListener('change', function() {
    if (recognition) recognition.lang = this.value;
    if (noteRecognition) noteRecognition.lang = this.value;
    initSpeechSynthesis();
});

// Update main stop listening
stopBtn.addEventListener('click', function() {
    if (isListening && recognition) {
        recognition.stop();
    }
    if (isNoteRecording) {
        stopNoteRecording();
    }
});


    // Speech Recognition and Synthesis Setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    
    let recognition;
    let isListening = false;
    let voices = [];
    let currentTranscript = '';
    
    // Check browser support
    if (!SpeechRecognition) {
        alert("Sorry, your browser doesn't support the Web Speech API. Try Chrome or Edge.");
        startBtn.disabled = true;
        return;
    }
    
    // Initialize speech recognition
    function initSpeechRecognition() {
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = languageSelect.value;
        
        recognition.onstart = function() {
            console.log("Speech recognition started");
            isListening = true;
            startBtn.disabled = true;
            stopBtn.disabled = false;
            assistantStatus.textContent = "Listening...";
            statusIndicator.classList.add('listening');
            
            // Add listening message
            addMessage("Voice Assistant", "I'm listening. Speak now...");
        };
        
        recognition.onend = function() {
            console.log("Speech recognition ended");
            isListening = false;
            startBtn.disabled = false;
            stopBtn.disabled = true;
            
            // Only update status if we're not in the middle of speaking
            if (!statusIndicator.classList.contains('speaking')) {
                assistantStatus.textContent = "Ready to listen";
                statusIndicator.classList.remove('listening');
            }
            
            // Reset voice level
            resetVoiceLevel();
        };
        
        recognition.onresult = function(event) {
            currentTranscript = '';
            
            // Process all results
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    currentTranscript += event.results[i][0].transcript;
                } else {
                    // Update voice level visualization with interim results
                    updateVoiceLevel();
                }
            }
            
            // If we have a final transcript, process it
            if (currentTranscript) {
                console.log("You said: " + currentTranscript);
                
                // Add user message to conversation
                addMessage("You", currentTranscript);
                
                // Process the command
                processCommand(currentTranscript);
                
                // Reset voice level after processing
                resetVoiceLevel();
            }
        };
        
        recognition.onerror = function(event) {
            console.error("Speech recognition error:", event.error);
            assistantStatus.textContent = "Error: " + event.error;
            statusIndicator.classList.remove('listening');
            
            if (event.error === 'not-allowed') {
                addMessage("Voice Assistant", "Please allow microphone access to use the voice assistant.");
            }
        };
    }
    
    // Initialize speech synthesis
    function initSpeechSynthesis() {
        // Load available voices
        function loadVoices() {
            voices = speechSynthesis.getVoices();
            voiceSelect.innerHTML = '';
            
            // Filter for English voices (or the selected language)
            const langPrefix = languageSelect.value.substring(0, 2);
            const filteredVoices = voices.filter(voice => voice.lang.startsWith(langPrefix));
            
            if (filteredVoices.length > 0) {
                filteredVoices.forEach((voice, index) => {
                    const option = document.createElement('option');
                    option.value = index;
                    option.textContent = `${voice.name} (${voice.lang})`;
                    voiceSelect.appendChild(option);
                });
                
                // Try to select a natural sounding voice
                const defaultVoice = filteredVoices.find(voice => 
                    voice.name.includes('Natural') || voice.name.includes('Google') || voice.name.includes('Samantha')
                );
                
                if (defaultVoice) {
                    voiceSelect.value = filteredVoices.indexOf(defaultVoice);
                }
            } else {
                // Fallback to all voices
                voices.forEach((voice, index) => {
                    const option = document.createElement('option');
                    option.value = index;
                    option.textContent = `${voice.name} (${voice.lang})`;
                    voiceSelect.appendChild(option);
                });
            }
        }
        
        // Load voices when they become available
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = loadVoices;
        }
        
        loadVoices();
    }
    
    // Speak text using speech synthesis
    function speakText(text) {
        if (!text) return;
        
        return new Promise((resolve) => {
            // Cancel any ongoing speech
            speechSynthesis.cancel();
            
            // Create utterance
            const utterance = new SpeechSynthesisUtterance(text);
            
            // Set voice
            const selectedVoiceIndex = parseInt(voiceSelect.value);
            if (voices[selectedVoiceIndex]) {
                utterance.voice = voices[selectedVoiceIndex];
            }
            
            // Set rate and pitch
            utterance.rate = parseFloat(speedSelect.value);
            utterance.pitch = parseFloat(pitchSelect.value);
            
            // Update UI for speaking state
            assistantStatus.textContent = "Speaking...";
            statusIndicator.classList.remove('listening');
            statusIndicator.classList.add('speaking');
            
            utterance.onend = function() {
                console.log("Finished speaking");
                assistantStatus.textContent = "Ready to listen";
                statusIndicator.classList.remove('speaking');
                resolve();
            };
            
            utterance.onerror = function(event) {
                console.error("Speech synthesis error:", event);
                assistantStatus.textContent = "Ready to listen";
                statusIndicator.classList.remove('speaking');
                resolve();
            };
            
            // Speak the text
            speechSynthesis.speak(utterance);
        });
    }
    
    // Process voice commands
    function processCommand(transcript) {
        const command = transcript.toLowerCase().trim();
        let response = "";
        
        // Greeting
        if (command.includes('hello') || command.includes('hi') || command.includes('hey')) {
            response = "Hello! How can I help you today?";
        }
        // Time
        else if (command.includes('time') && (command.includes('what') || command.includes('tell'))) {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            response = `The current time is ${timeString}`;
        }
        // Date
        else if (command.includes('date') && (command.includes('what') || command.includes('today'))) {
            const now = new Date();
            const dateString = now.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
            response = `Today is ${dateString}`;
        }
        // Weather
        else if (command.includes('weather')) {
            response = "I can't check real weather data, but it's always a beautiful day in the digital world!";
        }
        // Search
        else if (command.includes('search for') || command.includes('find')) {
            const query = command.replace('search for', '').replace('find', '').trim();
            if (query) {
                response = `Searching for "${query}". In a real application, I would open a browser search.`;
            } else {
                response = "What would you like me to search for?";
            }
        }
        // Calculate
        else if (command.includes('calculate') || command.includes('what is')) {
            try {
                // Extract math expression
                let expression = command
                    .replace('calculate', '')
                    .replace('what is', '')
                    .replace('times', '*')
                    .replace('x', '*')
                    .replace('multiplied by', '*')
                    .replace('divided by', '/')
                    .replace('plus', '+')
                    .replace('minus', '-')
                    .replace('percent', '%')
                    .trim();
                
                // Handle percentage calculations
                if (expression.includes('% of')) {
                    const parts = expression.split('% of');
                    if (parts.length === 2) {
                        const percent = parseFloat(parts[0]) / 100;
                        const number = parseFloat(parts[1]);
                        if (!isNaN(percent) && !isNaN(number)) {
                            const result = percent * number;
                            response = `${parts[0]}% of ${number} is ${result}`;
                        }
                    }
                } else {
                    // Evaluate simple arithmetic
                    // Note: In a real app, use a safer evaluation method
                    const result = eval(expression);
                    if (!isNaN(result)) {
                        response = `The result is ${result}`;
                    }
                }
                
                if (!response) {
                    throw new Error("Could not calculate");
                }
            } catch (error) {
                response = "I couldn't calculate that. Please try a simpler expression.";
            }
        }
        // Joke
        else if (command.includes('joke') || command.includes('laugh')) {
            const jokes = [
                "Why don't scientists trust atoms? Because they make up everything!",
                "Why did the scarecrow win an award? Because he was outstanding in his field!",
                "What do you call a fake noodle? An impasta!",
                "How does a penguin build its house? Igloos it together!",
                "Why did the math book look sad? Because it had too many problems."
            ];
            const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
            response = randomJoke;
        }
        // Music
        else if (command.includes('play music') || command.includes('play song')) {
            response = "Now playing: Digital Dreams by the Virtual Orchestra. Enjoy the music!";
        }
        else if (command.includes('stop music')) {
            response = "Music stopped. It's quiet now.";
        }
        // Help
        else if (command.includes('what can you do') || command.includes('help') || command.includes('commands')) {
            response = "I can tell you the time and date, tell jokes, perform calculations, search the web, and more. Try saying 'what time is it' or 'tell me a joke'.";
        }
        // Unknown command
        else {
            response = "I'm not sure how to help with that. Try asking about the time, date, or ask me to tell a joke.";
        }
        
        // Add assistant response to conversation
        addMessage("Voice Assistant", response);
        
        // Speak the response
        speakText(response);
    }
    
    // Add message to conversation log
    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(sender === 'You' ? 'user-message' : 'assistant-message');
        
        const now = new Date();
        const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        messageElement.innerHTML = `
            <div class="message-header">
                <span class="sender">${sender}</span>
                <span class="time">${timeString}</span>
            </div>
            <div class="message-content">${message}</div>
        `;
        
        conversationLog.appendChild(messageElement);
        
        // Scroll to the bottom of conversation
        conversationLog.scrollTop = conversationLog.scrollHeight;
    }
    
    // Update voice level visualization
    function updateVoiceLevel() {
        levelBars.forEach(bar => {
            // Randomize which bars are active for demo purposes
            // In a real app, you would use actual audio level data
            if (Math.random() > 0.5) {
                bar.classList.add('active');
                // Set random height
                bar.style.height = `${20 + Math.random() * 80}%`;
            } else {
                bar.classList.remove('active');
                bar.style.height = '20%';
            }
        });
    }
    
    // Reset voice level visualization
    function resetVoiceLevel() {
        levelBars.forEach(bar => {
            bar.classList.remove('active');
            bar.style.height = '20%';
        });
    }
    
    // Event Listeners
    startBtn.addEventListener('click', function() {
        if (!isListening) {
            initSpeechRecognition();
            recognition.start();
        }
    });
    
    stopBtn.addEventListener('click', function() {
        if (isListening && recognition) {
            recognition.stop();
        }
    });
    
    speakTestBtn.addEventListener('click', function() {
        speakText("This is a test of the voice assistant. Everything is working correctly!");
    });
    
    clearConversationBtn.addEventListener('click', function() {
        conversationLog.innerHTML = '';
        addMessage("Voice Assistant", "Conversation cleared. How can I help you?");
    });
    
    // Update recognition language when changed
    languageSelect.addEventListener('change', function() {
        if (recognition) {
            recognition.lang = this.value;
        }
        initSpeechSynthesis(); // Reload voices for new language
    });
    
    // Initialize the application
    function init() {
        initSpeechRecognition();
        initSpeechSynthesis();
        
        // Add welcome message
        setTimeout(() => {
            speakText("Welcome to your voice assistant. Click the start listening button or say hello to begin.");
        }, 1000);
    }
    
    // Start the application
    init();
});