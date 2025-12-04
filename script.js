// --- LOGIKA AUDIO DAN TOGGLE MODE ---
let currentModeIndex = 0; 
const modes = ['dark-mode', 'light-mode'];
const body = document.body;
body.classList.add(modes[currentModeIndex]);

const music = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');

let hasAudioStarted = false;

document.addEventListener('DOMContentLoaded', () => {
    music.volume = 0.3;
    music.play().then(() => {
        hasAudioStarted = true;
    }).catch(error => {
        console.log("Autoplay initial attempt failed. Waiting for user interaction.");
    });
});

document.body.addEventListener('click', function attemptPlay() {
    if (!hasAudioStarted) {
        music.play().then(() => {
            hasAudioStarted = true;
            document.body.removeEventListener('click', attemptPlay);
        }).catch(error => {
        });
    }
});

musicToggle.addEventListener('click', (event) => {
    event.stopPropagation(); 
    if (!hasAudioStarted) {
        music.play().then(() => {
            hasAudioStarted = true;
            toggleMuteStatus();
        }).catch(() => {
            toggleMuteStatus();
        });
    } else {
        toggleMuteStatus();
    }
});

function toggleMuteStatus() {
    if (music.muted) {
        music.muted = false;
        musicToggle.textContent = '🔊';
        musicToggle.title = 'Music On';
    } else {
        music.muted = true;
        musicToggle.textContent = '🔈';
        musicToggle.title = 'Music Off';
    }
}


// LOGIKA TOGGLE MODE
function toggleMode() {
    body.classList.remove(modes[currentModeIndex]);
    currentModeIndex = (currentModeIndex + 1) % modes.length;
    body.classList.add(modes[currentModeIndex]);
}


// --- LOGIKA TERMINAL INTERAKTIF ---
const output = document.getElementById('terminal-output');
const inputField = document.getElementById('terminal-input');

let currentCommandSpan = document.getElementById('current-command'); 
const promptSymbol = '/user/saifullanwar:~$';
inputField.focus();

const availableCommands = "Available commands: clear, email, whatsapp, linkedin.";

const commands = {
    'clear': '', 
    'catch': availableCommands,
    'linkedin': 'Connect with me on LinkedIn: <a href="https://www.linkedin.com/in/saifullanwar" target="_blank" class="highlight">www.linkedin.com/in/saifullanwar</a>',
    'email': 'Send an email to: <a href="mailto:saiful.bks@gmail.com" class="highlight">saiful.bks@gmail.com</a>',
    'whatsapp': 'Chat with me: <a href="http://wa.me/628988185285" target="_blank" class="highlight">wa.me/628988185285</a>', 
};


// ==========================================================
// PERBAIKAN SCROLL MOBILE V5: SCROLL HANYA DENGAN JAVASCRIPT
// ==========================================================

// 1. Memaksa scroll di setiap input (setiap huruf diketik)
inputField.addEventListener('input', (e) => {
    if (currentCommandSpan) {
        currentCommandSpan.textContent = e.target.value;
    }
    // Tambahkan pemaksaan scroll di setiap ketikan untuk melawan auto-scroll browser mobile
    output.scrollTop = output.scrollHeight; 
});

// 2. Mengubah body click listener untuk memfokuskan input dan memaksa scroll
document.body.addEventListener('click', function() {
    inputField.focus();
    // Tambahkan pemaksaan scroll di setiap klik
    output.scrollTop = output.scrollHeight;
});

// 3. Mengatasi fokus/keyboard yang memicu scroll tak terduga
inputField.addEventListener('focus', function(e) {
    // Selalu pastikan terminal berada di bagian paling bawah
    output.scrollTop = output.scrollHeight;
    
    // Gulir kembali setelah jeda singkat (mengantisipasi munculnya keyboard)
    setTimeout(() => {
        output.scrollTop = output.scrollHeight;
    }, 100); 
});

// ==========================================================


inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = inputField.value.trim().toLowerCase();
        handleCommand(command);
        inputField.value = ''; 
        e.preventDefault(); 
    }
});

function handleCommand(command) {
    let outputText = '';
    
    // 1. NONAKTIFKAN KURSOR DI BARIS LAMA
    if (currentCommandSpan) {
        currentCommandSpan.classList.remove('typing-cursor'); 
        currentCommandSpan.removeAttribute('id');
    }

    // 2. Tentukan output
    if (command === 'clear') {
        while (output.children.length > 1) {
            output.removeChild(output.lastChild);
        }
        
    } else if (commands[command]) {
        outputText = commands[command];
    } else {
        outputText = `command not found: ${command}. Try 'catch' or 'clear'`;
    }
    
    // 3. Tambahkan output (kecuali clear)
    if (command !== 'clear') {
        const outputDiv = document.createElement('pre');
        outputDiv.classList.add('command-output');
        outputDiv.innerHTML = outputText; 
        output.appendChild(outputDiv);
    }
    
    // 4. Tambahkan baris prompt baru di akhir
    const newPromptLine = createPromptLine();
    output.appendChild(newPromptLine);

    // 5. LOGIKA AUTO-SCROLL saat ENTER
    newPromptLine.scrollIntoView({ behavior: 'auto', block: 'end' });
    
    inputField.focus(); 
}

// Fungsi untuk membuat baris prompt baru
function createPromptLine() {
    const newLine = document.createElement('div');
    newLine.classList.add('prompt-line');
    
    // Kursor (via CSS ::after) akan otomatis mengikuti teks
    newLine.innerHTML = `<span class="prompt">${promptSymbol}</span> <span id="new-current-command" class="typing-cursor"></span>`; 
    
    currentCommandSpan = newLine.querySelector('#new-current-command');
    currentCommandSpan.id = 'current-command'; 
    
    return newLine;
}