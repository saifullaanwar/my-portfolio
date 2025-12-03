// --- LOGIKA TOGGLE MODE (Dark/Light) ---
let currentModeIndex = 0; 
const modes = ['dark-mode', 'light-mode'];
const body = document.body;
body.classList.add(modes[currentModeIndex]);

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

// Daftar perintah yang valid
const commands = {
    'help': "Available commands: help, clear, whoami",
    'whoami': 'I am Saiful Anwar, a Geological Engineering graduate and a dedicated full-stack developer.',
    'clear': '', 
};

// Menampilkan input di layar
inputField.addEventListener('input', (e) => {
    currentCommandSpan.textContent = e.target.value;
});

// Memproses saat tombol ENTER ditekan
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
    
    // 1. Gantikan baris prompt lama dengan perintah yang sudah selesai
    const oldPromptLine = currentCommandSpan.closest('.prompt-line');
    if (oldPromptLine) {
        oldPromptLine.querySelector('.cursor').style.display = 'none'; 
        currentCommandSpan.removeAttribute('id'); 
    }

    // 2. Tentukan output
    if (command === 'clear') {
        output.innerHTML = ''; 
        // Konten statis yang dimasukkan kembali setelah clear (disalin dari index.html)
        output.innerHTML = `
            <pre class="static-content">
/Last login: 12/3/2025, 8:30:22 PM WIB on ttys002

<span class="welcome-message">Welcome, fellow explorer 🌎.</span>

From analyzing the deep layers of the Earth to architecting the full stack of the digital realm, my career trajectory is defined by a singular passion: <span class="highlight">complex problem-solving</span>. I am a Full-Stack developer trained in data interpretation—skills that accelerate my transition. I am actively executing a career switch, embracing the challenge of building the most robust development.

I am a Geological Engineering graduate, trained in logic and system complications. I embrace the task of building intuitive, efficient, and well-designed applications from the data layer to the user interface.

<span class="section-title">MY DIGITAL CORE STACK:</span>
* <span class="tech-category">Backend Foundation:</span> Mastery in <span class="highlight">Python</span>, <span class="highlight">Node.js</span>, and <span class="highlight">PHP</span>. Expertise in designing resilient <span class="highlight">REST API</span> architectures using the <span class="highlight">Express.js</span> framework. I integrate <span class="highlight">Prisma ORM</span> for effiable and scalable database access and data integrity using <span class="highlight">MySQL</span>.

<span class="section-title">FRONTEND MASTERY:</span>
* <span class="tech-category">State & System Layer:</span> Mastery of <span class="tech-category">State Management</span> for efficient data handling in <span class="highlight">React</span>. Expertise with <span class="highlight">JavaScript</span> and analyzing APIs for seeking server-side flaws using <span class="highlight">Vite</span>. Leveraging the strong HTTP client <span class="highlight">Axios</span>, I apply UI/UX principles to guarantee a superior user experience.

Whether mapping geological faults or debugging the same: uncovering structure in every project. I am ready to begin.
Type 'help' for available commands.
</pre>`;
        
    } else if (commands[command]) {
        outputText = commands[command];
    } else {
        outputText = `command not found: ${command}`;
    }
    
    // 3. Tambahkan output (kecuali clear)
    if (command !== 'clear') {
        const outputDiv = document.createElement('pre');
        outputDiv.classList.add('command-output');
        outputDiv.innerHTML = outputText;
        output.appendChild(outputDiv);
    }
    
    // 4. Tambahkan baris prompt baru di akhir
    output.appendChild(createPromptLine());

    output.scrollTop = output.scrollHeight;
}

// Fungsi untuk membuat baris prompt baru
function createPromptLine() {
    const newLine = document.createElement('div');
    newLine.classList.add('prompt-line');
    newLine.innerHTML = `<span class="prompt">${promptSymbol}</span> <span id="new-current-command"></span><span class="cursor">_</span>`;
    
    currentCommandSpan = newLine.querySelector('#new-current-command');
    currentCommandSpan.id = 'current-command'; 
    
    return newLine;
}