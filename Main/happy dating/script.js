const stages = [
    {
        title: "DO YOU LOVE ME?",
        subtitle: "Be honest...",
        yesMessage: "❤️ I Love You Too! ❤️",
        noLabel: "NO",
        moveChance: 1
    },
    {
        title: "WILL YOU BE MY VALENTINE?",
        subtitle: "Pretty please...",
        yesMessage: "Yay! 💖 But wait...",
        noLabel: "NO",
        moveChance: 1
    },
    {
        title: "WILL YOU MARRY ME?",
        subtitle: "This is the real question",
        yesMessage: "💍 YESSSS! FOREVER & ALWAYS! 💍",
        noLabel: "NO",
        moveChance: 1
    }
];

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const message = document.getElementById("message");
const stageTitle = document.getElementById("stageTitle");
const stageSubtitle = document.getElementById("stageSubtitle");
const stageContainer = document.getElementById("stageContainer");
const progressBar = document.getElementById("progressBar");
const heartContainer = document.getElementById("heartContainer");

let currentStage = 0;
let isTransitioning = false;

function renderProgress() {
    progressBar.innerHTML = "";
    stages.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.classList.add("progress-dot");
        if (i < currentStage) dot.classList.add("completed");
        if (i === currentStage) dot.classList.add("active");
        progressBar.appendChild(dot);
    });
}

function moveNoButton() {
    const padding = 20;
    const btnRect = noBtn.getBoundingClientRect();
    const moveRange = Math.min(window.innerWidth - btnRect.width - padding, 300);

    const x = Math.random() * moveRange + padding;
    const y = Math.random() * (window.innerHeight - btnRect.height - 100) + 50;

    noBtn.style.position = "fixed";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.style.zIndex = "100";
}

function getNewNoPosition() {
    const padding = 20;
    const btnRect = noBtn.getBoundingClientRect();
    const moveRange = Math.min(window.innerWidth - btnRect.width - padding, 300);
    const x = Math.random() * moveRange + padding;
    const y = Math.random() * (window.innerHeight - btnRect.height - 100) + 50;
    return { x, y };
}

function transitionToStage(index) {
    if (isTransitioning) return;
    isTransitioning = true;

    stageContainer.style.opacity = "0";
    stageContainer.style.transform = "translateY(10px)";

    setTimeout(() => {
        currentStage = index;
        const stage = stages[currentStage];

        stageTitle.textContent = stage.title;
        stageSubtitle.textContent = stage.subtitle;
        noBtn.textContent = stage.noLabel;
        message.textContent = "";
        message.classList.remove("fade");

        noBtn.style.position = "";
        noBtn.style.left = "";
        noBtn.style.top = "";
        noBtn.style.zIndex = "";

        renderProgress();

        stageContainer.style.opacity = "1";
        stageContainer.style.transform = "translateY(0)";

        setTimeout(() => {
            isTransitioning = false;
        }, 400);
    }, 400);
}

function showMessage(text) {
    message.innerHTML = text;
    message.classList.remove("fade");
    void message.offsetWidth;
    message.classList.add("fade");
}

function spawnHearts(count = 40) {
    const hearts = ["❤️", "💖", "💕", "💗", "💓", "💝", "✨", "🥰"];
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement("div");
            heart.classList.add("heart");
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.bottom = "-50px";
            heart.style.animationDuration = `${2 + Math.random() * 2}s`;
            heart.style.animationDelay = `${Math.random() * 0.5}s`;
            heartContainer.appendChild(heart);

            setTimeout(() => heart.remove(), 4000);
        }, i * 60);
    }
}

function handleYes() {
    if (isTransitioning) return;

    const stage = stages[currentStage];

    if (currentStage < stages.length - 1) {
        showMessage(stage.yesMessage);
        setTimeout(() => transitionToStage(currentStage + 1), 1800);
    } else {
        showMessage(stage.yesMessage);
        spawnHearts(60);
        yesBtn.style.display = "none";
        noBtn.style.display = "none";
    }
}

function handleNo() {
    if (isTransitioning) return;

    if (currentStage < stages.length - 1) {
        const newPos = getNewNoPosition();
        noBtn.style.transition = "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        noBtn.style.position = "fixed";
        noBtn.style.left = `${newPos.x}px`;
        noBtn.style.top = `${newPos.y}px`;
        noBtn.style.zIndex = "100";

        const scale = 1 + currentStage * 0.15;
        noBtn.style.transform = `scale(${scale})`;

        setTimeout(() => {
            noBtn.style.transition = "";
        }, 300);
    } else {
        const newPos = getNewNoPosition();
        noBtn.style.transition = "all 0.15s ease-out";
        noBtn.style.position = "fixed";
        noBtn.style.left = `${newPos.x}px`;
        noBtn.style.top = `${newPos.y}px`;
        noBtn.style.zIndex = "100";
        noBtn.style.transform = `scale(${1.8 + Math.random() * 0.5})`;

        setTimeout(() => {
            noBtn.style.transition = "";
        }, 150);
    }
}

yesBtn.addEventListener("click", handleYes);

noBtn.addEventListener("mouseover", handleNo);
noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    handleNo();
}, { passive: false });

renderProgress();
