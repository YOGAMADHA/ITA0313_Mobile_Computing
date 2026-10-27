
const healthData = [
    {
        title: "5-Minute Morning Meditation",
        category: "Meditation",
        icon: "🧘",
        color: "#e4f1e5",
        time: "5 min read",
        desc: "Start your morning with a calm mind and a fresh perspective.",
        intro: "A few minutes of mindful attention can help you begin the day with intention.",
        steps: [
            "Sit comfortably in a quiet place.",
            "Close your eyes if comfortable and relax your shoulders.",
            "Breathe naturally and notice each breath.",
            "When your mind wanders, gently return your attention to breathing.",
            "Finish by choosing one positive intention for the day."
        ]
    },
    {
        title: "A Simple Daily Fitness Routine",
        category: "Fitness",
        icon: "🏃",
        color: "#f8eadb",
        time: "6 min read",
        desc: "Add gentle movement to your everyday schedule.",
        intro: "Regular movement can support your physical health and mood. Adjust the routine to your abilities.",
        steps: [
            "Begin with two minutes of gentle warm-up.",
            "Try a comfortable walk for five to ten minutes.",
            "Stretch your arms and shoulders gently.",
            "Take short movement breaks during long sitting periods.",
            "Rest whenever needed and stay hydrated."
        ]
    },
    {
        title: "Build a Better Sleep Routine",
        category: "Sleep",
        icon: "🌙",
        color: "#e9e5f6",
        time: "4 min read",
        desc: "Create a peaceful evening routine for restful sleep.",
        intro: "Consistent sleep habits can support rest and everyday wellbeing.",
        steps: [
            "Try going to bed and waking up at consistent times.",
            "Dim the lights before bedtime.",
            "Put away stimulating screens before sleeping.",
            "Try reading or listening to quiet sounds.",
            "Keep your bedroom comfortable and restful."
        ]
    },
    {
        title: "Practice Box Breathing",
        category: "Meditation",
        icon: "🌬️",
        color: "#dff0ef",
        time: "3 min read",
        desc: "Explore a gentle breathing exercise to pause and reset.",
        intro: "Slow, comfortable breathing can help you pause during a busy day.",
        steps: [
            "Sit in a relaxed position.",
            "Breathe in gently for a comfortable count.",
            "Pause briefly if that feels comfortable.",
            "Breathe out slowly without forcing it.",
            "Repeat a few times. Return to normal breathing if uncomfortable."
        ]
    },
    {
        title: "Healthy Hydration Habits",
        category: "Fitness",
        icon: "💧",
        color: "#e2effb",
        time: "4 min read",
        desc: "Make drinking water a simple part of your daily routine.",
        intro: "Staying hydrated supports normal body functions. Your needs vary with activity and climate.",
        steps: [
            "Keep drinking water accessible.",
            "Drink regularly throughout the day.",
            "Have water with meals.",
            "Drink more when heat or activity increases your needs.",
            "Follow medical advice if you have fluid restrictions."
        ]
    },
    {
        title: "A Peaceful Digital Detox",
        category: "Sleep",
        icon: "📵",
        color: "#f5e7df",
        time: "5 min read",
        desc: "Create screen-free moments to rest your attention.",
        intro: "Taking breaks from notifications can give you more space for rest and connection.",
        steps: [
            "Choose one short screen-free period each day.",
            "Silence nonessential notifications.",
            "Keep your phone away during meals.",
            "Replace scrolling with reading or a short walk.",
            "Notice which habits help you feel more refreshed."
        ]
    }
];

const selfcareData = [
    {
        title: "Create Your Self-Care Ritual",
        category: "Lifestyle",
        icon: "🕯️",
        color: "#f7e8e8",
        time: "5 min read",
        desc: "Make space for small activities that help you recharge.",
        intro: "Self-care does not have to be expensive or complicated. Small, repeatable actions count.",
        steps: [
            "Choose one activity that feels restorative.",
            "Set aside a realistic amount of time.",
            "Make your space comfortable.",
            "Treat this time as a reasonable personal priority.",
            "Adjust your routine when your needs change."
        ]
    },
    {
        title: "Start a Gratitude Journal",
        category: "Mindfulness",
        icon: "📔",
        color: "#eee7fa",
        time: "4 min read",
        desc: "Use simple writing prompts to reflect on your day.",
        intro: "Journaling can help you reflect on experiences, feelings and things that matter to you.",
        steps: [
            "Write down one thing you appreciated today.",
            "Describe a moment that felt meaningful.",
            "Name a challenge you worked through.",
            "Write one kind sentence to yourself.",
            "Remember that difficult feelings are valid too."
        ]
    },
    {
        title: "Set Healthy Boundaries",
        category: "Lifestyle",
        icon: "🌷",
        color: "#f8e9e4",
        time: "6 min read",
        desc: "Learn to protect your time and communicate your needs.",
        intro: "Healthy boundaries help you balance your responsibilities and personal wellbeing.",
        steps: [
            "Notice situations that leave you feeling overwhelmed.",
            "Identify what you can realistically manage.",
            "Practice saying no respectfully when needed.",
            "Communicate your limits clearly.",
            "Remember that boundaries can be adjusted as circumstances change."
        ]
    },
    {
        title: "Be Kind to Yourself",
        category: "Mindfulness",
        icon: "💗",
        color: "#f8e4ec",
        time: "3 min read",
        desc: "Replace harsh self-criticism with a kinder inner voice.",
        intro: "Self-compassion means responding to yourself with understanding, especially during difficult moments.",
        steps: [
            "Notice when your inner voice becomes critical.",
            "Ask what you would say to a close friend.",
            "Use a more balanced and compassionate statement.",
            "Allow yourself to make mistakes and learn.",
            "Remember that growth does not require perfection."
        ]
    },
    {
        title: "Take a Mindful Nature Break",
        category: "Mindfulness",
        icon: "🌳",
        color: "#e4f0df",
        time: "4 min read",
        desc: "Reconnect with the present moment through your senses.",
        intro: "A short break outdoors, when possible, can offer a refreshing change of environment.",
        steps: [
            "Find a comfortable and safe outdoor space.",
            "Notice the colours around you.",
            "Listen to nearby sounds.",
            "Feel the air and notice your breathing.",
            "Return to your day at your own pace."
        ]
    },
    {
        title: "Build a Relaxing Evening",
        category: "Lifestyle",
        icon: "🛁",
        color: "#e8e7f7",
        time: "5 min read",
        desc: "Create a simple routine to transition from a busy day.",
        intro: "A gentle evening routine can help create a clearer separation between work and rest.",
        steps: [
            "Write down unfinished tasks for tomorrow.",
            "Tidy one small area if it helps you relax.",
            "Choose a calming activity.",
            "Reduce unnecessary noise and notifications.",
            "Give yourself permission to rest."
        ]
    }
];

let currentFilter = {
    health: "All",
    selfcare: "All"
};

let previousBlogPage = "health";
let breathingInterval = null;
let breathPhaseTimeout = null;
let breathingEndTime = 0;
let remainingSeconds = 60;

// Demo-only account storage. Do not use this for real user accounts.
function getAccounts() {
    try {
        return JSON.parse(localStorage.getItem("mindcareAccounts")) || [];
    } catch {
        return [];
    }
}

function saveAccounts(accounts) {
    localStorage.setItem("mindcareAccounts", JSON.stringify(accounts));
}

function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const target = document.getElementById(pageId);

    if (target) {
        target.classList.add("active");
    }

    if (pageId === "health" || pageId === "selfcare") {
        renderBlogs(pageId);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateWelcome() {
    const user = sessionStorage.getItem("mindcareUser");
    const welcome = document.getElementById("welcomeTitle");
    const authLink = document.getElementById("authLink");

    if (user) {
        welcome.textContent = `Welcome back, ${user} 💚`;
        authLink.textContent = "Logout";
        authLink.onclick = function () {
            sessionStorage.removeItem("mindcareUser");
            updateWelcome();
            showPage("home");
        };
    } else {
        welcome.textContent = "Welcome to your wellness space 💚";
        authLink.textContent = "Login";
        authLink.onclick = function () {
            showPage("login");
        };
    }
}

// Registration
document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim().toLowerCase();
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("registerMessage");

    if (password !== confirmPassword) {
        message.style.color = "#c0392b";
        message.textContent = "Passwords do not match.";
        return;
    }

    const accounts = getAccounts();

    if (accounts.some(account => account.email === email)) {
        message.style.color = "#c0392b";
        message.textContent = "This email is already registered.";
        return;
    }

    accounts.push({ name, email, password });
    saveAccounts(accounts);

    message.style.color = "#47775d";
    message.textContent = "Account created! You can now log in.";

    document.getElementById("registerForm").reset();
});

// Login
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");

    const account = getAccounts().find(item =>
        item.email === email && item.password === password
    );

    if (!account) {
        message.style.color = "#c0392b";
        message.textContent = "Invalid email or password.";
        return;
    }

    sessionStorage.setItem("mindcareUser", account.name);

    message.style.color = "#47775d";
    message.textContent = "Login successful!";

    updateWelcome();

    setTimeout(() => showPage("home"), 500);
});

// Blog filters
function filterBlogs(page, category) {
    currentFilter[page] = category;
    renderBlogs(page);
}

function renderBlogs(page) {
    const isHealth = page === "health";
    const data = isHealth ? healthData : selfcareData;
    const searchId = isHealth ? "healthSearch" : "selfSearch";
    const containerId = isHealth ? "healthBlogs" : "selfcareBlogs";

    const query = document.getElementById(searchId).value
        .trim()
        .toLowerCase();

    const category = currentFilter[page];

    const filtered = data.filter(blog => {
        const matchesCategory =
            category === "All" || blog.category === category;

        const matchesSearch =
            (blog.title + " " + blog.desc + " " + blog.category)
                .toLowerCase()
                .includes(query);

        return matchesCategory && matchesSearch;
    });

    const container = document.getElementById(containerId);

    if (filtered.length === 0) {
        container.innerHTML = "<p>No matching blogs found. Try another search.</p>";
        return;
    }

    container.innerHTML = filtered.map(blog => {
        const index = data.indexOf(blog);

        return `
            <article class="blog-card">
                <div class="blog-cover" style="background:${blog.color}">
                    ${blog.icon}
                </div>
                <div class="blog-info">
                    <small>${blog.category.toUpperCase()} · ${blog.time}</small>
                    <h3>${blog.title}</h3>
                    <p>${blog.desc}</p>
                    <button class="read-link"
                        onclick="openBlog('${page}', ${index})">
                        Read Article →
                    </button>
                </div>
            </article>
        `;
    }).join("");
}

// Blog details
function openBlog(page, index) {
    const data = page === "health" ? healthData : selfcareData;
    const blog = data[index];

    if (!blog) return;

    previousBlogPage = page;

    const steps = blog.steps.map(step => `<li>${step}</li>`).join("");

    document.getElementById("blogContent").innerHTML = `
        <div class="detail-cover" style="background:${blog.color}">
            ${blog.icon}
        </div>
        <small>${blog.category.toUpperCase()} · ${blog.time}</small>
        <h1>${blog.title}</h1>
        <p>${blog.intro}</p>
        <h3>Try This Routine</h3>
        <ol>${steps}</ol>
        <p><strong>Remember:</strong> Start small, adapt these ideas to
        your needs, and be kind to yourself.</p>
        <button onclick="showPage('${page}')">Explore More Articles</button>
    `;

    showPage("blogDetail");
}

function goBack() {
    showPage(previousBlogPage);
}

// Guided breathing exercise
function startBreathing() {
    stopBreathing();

    showPage("breathing");

    remainingSeconds = 60;
    breathingEndTime = Date.now() + 60000;

    const circle = document.getElementById("breathCircle");
    const text = document.getElementById("breathText");
    const timer = document.getElementById("breathTimer");
    const status = document.getElementById("breathStatus");
    const button = document.getElementById("breathButton");

    button.textContent = "Restart Session";
    status.textContent = "Breathe gently and follow the prompts.";

    function updatePhase() {
        if (Date.now() >= breathingEndTime) {
            finishBreathing();
            return;
        }

        const elapsed = (60000 - (breathingEndTime - Date.now())) % 8000;

        if (elapsed < 4000) {
            text.textContent = "Breathe in";
            circle.className = "breath-circle inhale";
        } else {
            text.textContent = "Breathe out";
            circle.className = "breath-circle exhale";
        }

        breathPhaseTimeout = setTimeout(updatePhase, 250);
    }

    function updateTimer() {
        remainingSeconds = Math.max(
            0,
            Math.ceil((breathingEndTime - Date.now()) / 1000)
        );

        timer.textContent = `${remainingSeconds} seconds remaining`;

        if (remainingSeconds <= 0) {
            finishBreathing();
        }
    }

    updatePhase();
    updateTimer();

    breathingInterval = setInterval(updateTimer, 250);
}

function finishBreathing() {
    stopBreathing();

    document.getElementById("breathText").textContent = "Well done!";
    document.getElementById("breathTimer").textContent = "Session complete";
    document.getElementById("breathStatus").textContent =
        "Take a moment to notice how you feel.";
}

function stopBreathing() {
    if (breathingInterval) {
        clearInterval(breathingInterval);
        breathingInterval = null;
    }

    if (breathPhaseTimeout) {
        clearTimeout(breathPhaseTimeout);
        breathPhaseTimeout = null;
    }

    const circle = document.getElementById("breathCircle");

    if (circle) {
        circle.className = "breath-circle";
    }

    const timer = document.getElementById("breathTimer");
    const text = document.getElementById("breathText");
    const status = document.getElementById("breathStatus");

    if (timer && remainingSeconds > 0) {
        timer.textContent = `${remainingSeconds} seconds remaining`;
    }

    if (text) text.textContent = "Ready?";
    if (status) status.textContent = "Take a comfortable breath whenever you're ready.";
}

updateWelcome();
renderBlogs("health");
renderBlogs("selfcare");
