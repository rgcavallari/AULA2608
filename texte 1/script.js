// Atualiza o relógio digital
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

// Atualiza o relógio a cada segundo
setInterval(updateClock, 1000);
updateClock();

// Gera um número aleatório e alternativas
function generateRandomNumber() {
    const correctNumber = Math.floor(Math.random() * 100) + 1;
    let options = new Set([correctNumber]);

    while (options.size < 4) {
        options.add(Math.floor(Math.random() * 100) + 1);
    }

    return { correct: correctNumber, choices: Array.from(options).sort(() => Math.random() - 0.5) };
}

// Abre o prompt para inserir o e-mail
function openEmailPrompt() {
    const email = prompt("Digite seu e-mail para receber o número sorteado:");

    if (email && validateEmail(email)) {
        sendEmail(email);
    } else {
        alert("Por favor, insira um e-mail válido.");
    }
}

// Valida o formato do e-mail
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Envia o e-mail via EmailJS
function sendEmail(email) {
    const { correct, choices } = generateRandomNumber();

    emailjs.init("SEU_USER_ID"); // Substitua pelo seu USER_ID do EmailJS

    const templateParams = {
        to_email: email,
        message: `Adivinhe o número correto!\n\nOpções:\n${choices.join(", ")}\n\nBoa sorte!`
    };

    emailjs.send("SEU_SERVICE_ID", "SEU_TEMPLATE_ID", templateParams)
        .then(response => {
            alert(`Email enviado com sucesso para ${email}!`);
            console.log("Email enviado:", response);
        })
        .catch(error => {
            alert("Erro ao enviar o email.");
            console.error("Erro:", error);
        });
}


