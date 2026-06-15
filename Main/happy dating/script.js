const stages = [
    {
        title: "{yourName}, do you love {herName}?",
        subtitle: "Be honest...",
        yesMessage: "I knew it! {herName} loves you too!",
        reason: "Because your smile makes every ordinary moment feel magical.",
        noLabel: "NO"
    },
    {
        title: "{herName}, will be my valentine?",
        subtitle: "Pretty please...",
        yesMessage: "Yay! Best decision ever!",
        reason: "Because every day with you feels like a love story worth remembering.",
        noLabel: "NO"
    },
    {
        title: "{herName}, will marry me?",
        subtitle: "This is the real question",
        yesMessage: "YESSSS! FOREVER & ALWAYS!",
        reason: "Because I want to choose you today, tomorrow, and every day after.",
        noLabel: "NO"
    }
];

const reasons = [
    "Because your laugh is my favorite sound.",
    "Because you make my heart feel at home.",
    "Because life is sweeter whenever you are near.",
    "Because I fall for you more every single day.",
    "Because you are my safest place and my biggest adventure."
];

const photos = [
    "6_Image.jpg",
    "download 1.jpg",
    "download 2.jpg",
    "download 3.jpg",
    "download 4.jpg"
];

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const startBtn = document.getElementById("startBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const musicBtn = document.getElementById("musicBtn");
const message = document.getElementById("message");
const stageTitle = document.getElementById("stageTitle");
const stageSubtitle = document.getElementById("stageSubtitle");
const stageContainer = document.getElementById("stageContainer");
const introCard = document.getElementById("introCard");
const celebration = document.getElementById("celebration");
const celebrationTitle = document.getElementById("celebrationTitle");
const celebrationMessage = document.getElementById("celebrationMessage");
const celebrationEyebrow = document.getElementById("celebrationEyebrow");
const progressBar = document.getElementById("progressBar");
const heartContainer = document.getElementById("heartContainer");
const galleryImage = document.getElementById("galleryImage");
const prevImageBtn = document.getElementById("prevImageBtn");
const nextImageBtn = document.getElementById("nextImageBtn");
const yourNameInput = document.getElementById("yourNameInput");
const herNameInput = document.getElementById("herNameInput");
const loveMusic = document.getElementById("loveMusic");

let currentStage = 0;
let currentPhoto = 0;
let isTransitioning = false;
let musicOn = false;
let yourName = "My Love";
let herName = "Beautiful";

function personalize(text) {
    return text
        .replaceAll("{yourName}", yourName)
        .replaceAll("{herName}", herName);
}

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

function updateGallery() {
    galleryImage.src = photos[currentPhoto];
}

function showGallery(nextIndex) {
    currentPhoto = (nextIndex + photos.length) % photos.length;
    updateGallery();
}

setInterval(() => {
    showGallery(currentPhoto + 1);
}, 3000);

function startApp() {
    yourName = yourNameInput.value.trim() || "My Love";
    herName = herNameInput.value.trim() || "Beautiful";

    loveMusic.volume = 0.45;
    loveMusic.play().then(() => {
        musicOn = true;
        musicBtn.textContent = "🎵 Music On";
    }).catch(() => {
        musicOn = false;
        musicBtn.textContent = "🎵 Music Off";
    });

    introCard.classList.add("hidden");
    stageContainer.classList.remove("hidden");

    currentStage = 0;
    currentPhoto = 0;
    updateGallery();
    renderStage();
}

function renderStage() {
    const stage = stages[currentStage];

    stageTitle.textContent = personalize(stage.title);
    stageSubtitle.textContent = personalize(stage.subtitle);
    noBtn.textContent = stage.noLabel;
    message.innerHTML = "";
    message.classList.remove("fade");

    noBtn.style.position = "";
    noBtn.style.left = "";
    noBtn.style.top = "";
    noBtn.style.zIndex = "";
    noBtn.style.transform = "";

    renderProgress();
}

function transitionToStage(index) {
    if (isTransitioning) return;
    isTransitioning = true;

    stageContainer.style.opacity = "0";
    stageContainer.style.transform = "translateY(10px)";

    setTimeout(() => {
        currentStage = index;
        renderStage();

        stageContainer.style.opacity = "1";
        stageContainer.style.transform = "translateY(0)";

        setTimeout(() => {
            isTransitioning = false;
        }, 400);
    }, 400);
}

function showMessage(text, reason) {
    message.innerHTML = `
        <div>${personalize(text)}</div>
        <div class="reason">${personalize(reason || reasons[currentStage] || reasons[0])}</div>
    `;
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
        }, i * 45);
    }
}

function showCelebration() {
    const finalMessage = personalize("Forever with {yourName} and {herName}.");

    celebrationTitle.textContent = "She said YES!";
    celebrationEyebrow.textContent = "It's official!";
    celebrationMessage.textContent = finalMessage;

    stageContainer.classList.add("hidden");
    celebration.classList.remove("hidden");
    document.body.classList.add("celebrating");

    spawnHearts(100);
}

function resetApp() {
    celebration.classList.add("hidden");
    introCard.classList.remove("hidden");
    stageContainer.classList.add("hidden");
    document.body.classList.remove("celebrating");

    currentStage = 0;
    currentPhoto = 0;
    isTransitioning = false;

    yesBtn.style.display = "";
    noBtn.style.display = "";
    stageContainer.style.opacity = "";
    stageContainer.style.transform = "";
    stageContainer.style.position = "";
    stageContainer.style.left = "";
    stageContainer.style.top = "";
    stageContainer.style.zIndex = "";

    updateGallery();
    renderProgress();
}

function getNewNoPosition() {
    const padding = 20;
    const btnRect = noBtn.getBoundingClientRect();
    const moveRange = Math.min(window.innerWidth - btnRect.width - padding, 300);
    const x = Math.random() * moveRange + padding;
    const y = Math.random() * (window.innerHeight - btnRect.height - 100) + 50;
    return { x, y };
}

function handleYes() {
    if (isTransitioning) return;

    const stage = stages[currentStage];

    if (currentStage < stages.length - 1) {
        showMessage(stage.yesMessage, stage.reason);
        setTimeout(() => transitionToStage(currentStage + 1), 1800);
    } else {
        showMessage(stage.yesMessage, stage.reason);
        spawnHearts(60);
        setTimeout(showCelebration, 900);
    }
}

function handleNo() {
    if (isTransitioning) return;

    const newPos = getNewNoPosition();
    noBtn.style.transition = "all 0.2s ease-out";
    noBtn.style.position = "fixed";
    noBtn.style.left = `${newPos.x}px`;
    noBtn.style.top = `${newPos.y}px`;
    noBtn.style.zIndex = "100";
    noBtn.style.transform = `scale(${1.4 + Math.random() * 0.5})`;

    setTimeout(() => {
        noBtn.style.transition = "";
    }, 250);
}

function toggleMusic() {
    musicOn = !musicOn;

    if (musicOn) {
        loveMusic.volume = 0.45;
        loveMusic.play().then(() => {
            musicBtn.textContent = "🎵 Music On";
        }).catch(() => {
            musicOn = false;
            musicBtn.textContent = "🎵 Music Off";
        });
    } else {
        loveMusic.pause();
        loveMusic.currentTime = 0;
        musicBtn.textContent = "🎵 Music Off";
    }
}

startBtn.addEventListener("click", startApp);
yesBtn.addEventListener("click", handleYes);
noBtn.addEventListener("mouseover", handleNo);
noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    handleNo();
}, { passive: false });

prevImageBtn.addEventListener("click", () => showGallery(currentPhoto - 1));
nextImageBtn.addEventListener("click", () => showGallery(currentPhoto + 1));
playAgainBtn.addEventListener("click", resetApp);
musicBtn.addEventListener("click", toggleMusic);

yourNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") herNameInput.focus();
});

herNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") startApp();
});

document.addEventListener("click", () => {
    if (!musicOn) {
        loveMusic.volume = 0.45;
        loveMusic.play().then(() => {
            musicOn = true;
            musicBtn.textContent = "🎵 Music On";
        }).catch(() => {
            musicOn = false;
            musicBtn.textContent = "🎵 Music Off";
        });
    }
}, { once: true });

renderProgress();
updateGallery();
