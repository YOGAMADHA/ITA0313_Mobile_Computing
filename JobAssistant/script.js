
const jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "PixelWorks",
        logo: "🎨",
        location: "Chennai",
        type: "Full-time",
        salary: "₹4–7 LPA",
        skills: ["HTML", "CSS", "JavaScript"],
        description: "Build responsive web interfaces and create accessible user experiences.",
        requirements: [
            "Knowledge of HTML, CSS and JavaScript",
            "Understanding of responsive web design",
            "Ability to work with a development team"
        ]
    },
    {
        id: 2,
        title: "Python Developer",
        company: "TechNova",
        logo: "🐍",
        location: "Bengaluru",
        type: "Full-time",
        salary: "₹5–9 LPA",
        skills: ["Python", "Flask", "SQL"],
        description: "Develop backend services, APIs and database-driven applications.",
        requirements: [
            "Knowledge of Python programming",
            "Basic understanding of databases and APIs",
            "Problem-solving and debugging skills"
        ]
    },
    {
        id: 3,
        title: "Data Analyst Intern",
        company: "Insight Labs",
        logo: "📊",
        location: "Remote",
        type: "Internship",
        salary: "₹10,000–20,000/month",
        skills: ["SQL", "Excel", "Python"],
        description: "Analyze datasets and prepare reports to support business decisions.",
        requirements: [
            "Basic SQL and spreadsheet knowledge",
            "Interest in data analysis",
            "Attention to detail"
        ]
    },
    {
        id: 4,
        title: "UI/UX Designer",
        company: "Creative Hub",
        logo: "🖌️",
        location: "Hyderabad",
        type: "Full-time",
        salary: "₹4–8 LPA",
        skills: ["Figma", "UI Design", "Prototyping"],
        description: "Design user-friendly interfaces, prototypes and digital experiences.",
        requirements: [
            "Understanding of user-centred design",
            "Experience with design tools such as Figma",
            "A portfolio of projects is helpful"
        ]
    },
    {
        id: 5,
        title: "Machine Learning Intern",
        company: "AI Horizon",
        logo: "🤖",
        location: "Remote",
        type: "Internship",
        salary: "₹15,000–25,000/month",
        skills: ["Python", "Machine Learning", "Pandas"],
        description: "Assist with data preparation, model experiments and ML projects.",
        requirements: [
            "Python programming fundamentals",
            "Basic statistics and machine learning knowledge",
            "Willingness to learn and experiment"
        ]
    },
    {
        id: 6,
        title: "Java Developer",
        company: "CodeBridge",
        logo: "☕",
        location: "Chennai",
        type: "Full-time",
        salary: "₹4–8 LPA",
        skills: ["Java", "SQL", "OOP"],
        description: "Contribute to application development and software testing.",
        requirements: [
            "Java and object-oriented programming",
            "Basic SQL knowledge",
            "Understanding of software development practices"
        ]
    },
    {
        id: 7,
        title: "Content Writer",
        company: "WordCraft",
        logo: "✍️",
        location: "Remote",
        type: "Part-time",
        salary: "₹12,000–20,000/month",
        skills: ["Writing", "Research", "Communication"],
        description: "Create clear, engaging content for digital platforms.",
        requirements: [
            "Strong written communication",
            "Research and editing skills",
            "Ability to meet deadlines"
        ]
    },
    {
        id: 8,
        title: "Software Testing Intern",
        company: "QualityFirst",
        logo: "🧪",
        location: "Pune",
        type: "Internship",
        salary: "₹12,000–18,000/month",
        skills: ["Testing", "Python", "SQL"],
        description: "Help test software, report defects and verify application behaviour.",
        requirements: [
            "Attention to detail",
            "Basic software testing knowledge",
            "Willingness to learn test automation"
        ]
    }
];

let selectedResume = null;
let selectedJobId = null;

function readData(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    } catch {
        return fallback;
    }
}

function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function currentUser() {
    const email = sessionStorage.getItem("careerPilotUser");
    if (!email) return null;

    return readData("careerPilotAccounts", [])
        .find(account => account.email === email) || null;
}

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function showPage(id) {
    if (id !== "login" && id !== "register" && !currentUser()) {
        id = "login";
    }

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const page = document.getElementById(id);
    if (page) page.classList.add("active");

    if (id === "dashboard") renderDashboard();
    if (id === "jobs") renderJobs();
    if (id === "applications") renderApplications();
    if (id === "profile") loadProfile();

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function setMessage(id, text, success = true) {
    const element = document.getElementById(id);
    element.textContent = text;
    element.style.color = success ? "#21876a" : "#c0392b";
}

// Registration
document.getElementById("registerForm").addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim().toLowerCase();
    const password = document.getElementById("regPassword").value;
    const plan = document.getElementById("regPlan").value;

    const accounts = readData("careerPilotAccounts", []);

    if (accounts.some(account => account.email === email)) {
        setMessage("registerMessage", "An account with this email already exists.", false);
        return;
    }

    // Demonstration only: real applications must use server-side password hashing.
    accounts.push({
        name,
        email,
        password,
        plan,
        profile: {},
        resumeName: ""
    });

    saveData("careerPilotAccounts", accounts);

    setMessage("registerMessage", "Registration successful! Please log in.");

    document.getElementById("registerForm").reset();
});

// Login
document.getElementById("loginForm").addEventListener("submit", event => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    const account = readData("careerPilotAccounts", []).find(item =>
        item.email === email && item.password === password
    );

    if (!account) {
        setMessage("loginMessage", "Incorrect email or password.", false);
        return;
    }

    sessionStorage.setItem("careerPilotUser", account.email);

    document.getElementById("loginForm").reset();
    updateNavigation();
    showPage("dashboard");
});

function logout() {
    sessionStorage.removeItem("careerPilotUser");
    updateNavigation();
    showPage("login");
}

function updateNavigation() {
    const link = document.getElementById("authLink");

    if (currentUser()) {
        link.textContent = "Logout";
        link.onclick = event => {
            event.preventDefault();
            logout();
        };
    } else {
        link.textContent = "Login";
        link.onclick = event => {
            event.preventDefault();
            showPage("login");
        };
    }
}

// Personal details
function loadProfile() {
    const user = currentUser();
    if (!user) return;

    const profile = user.profile || {};

    document.getElementById("fullName").value = profile.name || user.name || "";
    document.getElementById("profileEmail").value = user.email || "";
    document.getElementById("phone").value = profile.phone || "";
    document.getElementById("location").value = profile.location || "";
    document.getElementById("education").value = profile.education || "";
    document.getElementById("experience").value = profile.experience || "";
    document.getElementById("preferredRole").value = profile.preferredRole || "";
    document.getElementById("salary").value = profile.salary || "";
    document.getElementById("skills").value = profile.skills || "";
    document.getElementById("summary").value = profile.summary || "";
}

document.getElementById("profileForm").addEventListener("submit", event => {
    event.preventDefault();

    const user = currentUser();
    if (!user) return;

    const profile = {
        name: document.getElementById("fullName").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        location: document.getElementById("location").value.trim(),
        education: document.getElementById("education").value,
        experience: document.getElementById("experience").value,
        preferredRole: document.getElementById("preferredRole").value.trim(),
        salary: document.getElementById("salary").value,
        skills: document.getElementById("skills").value.trim(),
        summary: document.getElementById("summary").value.trim()
    };

    const accounts = readData("careerPilotAccounts", []);
    const index = accounts.findIndex(account => account.email === user.email);

    if (index === -1) return;

    accounts[index].name = profile.name;
    accounts[index].profile = profile;

    saveData("careerPilotAccounts", accounts);

    setMessage("profileMessage", "Your personal details have been saved.");
    renderDashboard();
});

// Subscription selection
function choosePlan(plan) {
    const user = currentUser();
    if (!user) {
        showPage("login");
        return;
    }

    const accounts = readData("careerPilotAccounts", []);
    const index = accounts.findIndex(account => account.email === user.email);

    if (index === -1) return;

    accounts[index].plan = plan;
    saveData("careerPilotAccounts", accounts);

    const prices = { Free: "₹0", Pro: "₹299", Premium: "₹599" };

    setMessage(
        "planMessage",
        `${plan} plan selected (${prices[plan]}/month). Demo only; no payment was taken.`
    );

    renderDashboard();
}

// Resume upload
const resumeInput = document.getElementById("resumeFile");
const uploadButton = document.getElementById("uploadButton");

resumeInput.addEventListener("change", () => {
    const file = resumeInput.files[0];
    selectedResume = null;
    uploadButton.disabled = true;

    if (!file) {
        document.getElementById("fileDetails").textContent = "No file selected";
        return;
    }

    const extension = file.name.split(".").pop().toLowerCase();
    const allowed = ["pdf", "doc", "docx"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowed.includes(extension)) {
        setMessage("resumeMessage", "Choose a PDF, DOC or DOCX file.", false);
        resumeInput.value = "";
        document.getElementById("fileDetails").textContent = "Invalid file type";
        return;
    }

    if (file.size > maxSize) {
        setMessage("resumeMessage", "The file must be smaller than 5 MB.", false);
        resumeInput.value = "";
        document.getElementById("fileDetails").textContent = "File is too large";
        return;
    }

    selectedResume = file;
    document.getElementById("fileDetails").textContent =
        `${file.name} · ${(file.size / 1024).toFixed(1)} KB`;

    setMessage("resumeMessage", "File selected. Confirm to save its name.");
    uploadButton.disabled = false;
});

uploadButton.addEventListener("click", () => {
    const user = currentUser();
    if (!user || !selectedResume) return;

    const accounts = readData("careerPilotAccounts", []);
    const index = accounts.findIndex(account => account.email === user.email);

    if (index === -1) return;

    // Saves the filename only, not the resume's file contents.
    accounts[index].resumeName = selectedResume.name;
    saveData("careerPilotAccounts", accounts);

    setMessage(
        "resumeMessage",
        "Resume filename saved in this demo. The file itself has not been uploaded to a server."
    );

    uploadButton.disabled = true;
    renderDashboard();
});

// Demo job matching
function calculateMatch(job, profile) {
    if (!profile || !Object.values(profile).some(value => String(value).trim())) {
        return 75;
    }

    const skills = (profile.skills || "")
        .toLowerCase()
        .split(",")
        .map(skill => skill.trim())
        .filter(Boolean);

    const role = (profile.preferredRole || "").toLowerCase();
    const jobText = (
        job.title + " " + job.skills.join(" ") + " " + job.description
    ).toLowerCase();

    let score = 60;

    if (role && job.title.toLowerCase().includes(role)) {
        score += 25;
    } else if (role && role.split(/\s+/).some(word =>
        word.length > 2 && job.title.toLowerCase().includes(word)
    )) {
        score += 15;
    }

    const matchedSkills = skills.filter(skill => jobText.includes(skill));
    score += Math.min(matchedSkills.length * 5, 15);

    const location = (profile.location || "").toLowerCase();

    if (location && job.location.toLowerCase().includes(location)) {
        score += 5;
    }

    return Math.min(score, 99);
}

function createJobCard(job) {
    const user = currentUser();
    const match = calculateMatch(job, user ? user.profile : {});

    return `
        <article class="job-card">
            <div class="job-top">
                <div class="company-logo">${job.logo}</div>
                <div>
                    <h3 class="job-title">${escapeHTML(job.title)}</h3>
                    <p class="company-name">${escapeHTML(job.company)}</p>
                </div>
                <span class="match-badge">${match}% match*</span>
            </div>

            <div class="job-meta">
                <span>📍 ${escapeHTML(job.location)}</span>
                <span>💼 ${escapeHTML(job.type)}</span>
            </div>

            <p class="job-description">${escapeHTML(job.description)}</p>

            <div class="job-meta">
                ${job.skills.map(skill =>
                    `<span>${escapeHTML(skill)}</span>`
                ).join("")}
            </div>

            <div class="job-bottom">
                <strong>${escapeHTML(job.salary)}</strong>
                <button class="primary" onclick="openJob(${job.id})">
                    View Job →
                </button>
            </div>
        </article>
    `;
}

function renderJobs() {
    const search = document.getElementById("jobSearch").value.toLowerCase().trim();
    const location = document.getElementById("jobLocation").value.toLowerCase().trim();
    const type = document.getElementById("jobType").value;

    const filtered = jobs.filter(job => {
        const text = (
            job.title + " " + job.company + " " + job.skills.join(" ")
        ).toLowerCase();

        const matchesSearch = !search || text.includes(search);
        const matchesLocation = !location ||
            job.location.toLowerCase().includes(location);
        const matchesType = type === "All" ||
            job.type === type ||
            (type === "Remote" && job.location === "Remote");

        return matchesSearch && matchesLocation && matchesType;
    });

    document.getElementById("resultsCount").textContent =
        `${filtered.length} jobs found`;

    document.getElementById("allJobs").innerHTML = filtered.length
        ? filtered.map(createJobCard).join("")
        : "<p>No matching sample jobs found. Try different filters.</p>";
}

function renderDashboard() {
    const user = currentUser();
    if (!user) return;

    document.getElementById("welcomeTitle").textContent =
        `Welcome, ${(user.profile && user.profile.name) || user.name}!`;

    document.getElementById("jobCount").textContent = jobs.length;
    document.getElementById("applicationCount").textContent =
        readData("careerPilotApplications", [])
            .filter(app => app.email === user.email).length;

    document.getElementById("resumeStatus").textContent =
        user.resumeName ? "Uploaded" : "Pending";

    document.getElementById("planStatus").textContent = user.plan || "Free";

    const recommendations = [...jobs]
        .sort((a, b) =>
            calculateMatch(b, user.profile) - calculateMatch(a, user.profile)
        )
        .slice(0, 4);

    document.getElementById("recommendedJobs").innerHTML =
        recommendations.map(createJobCard).join("");
}

// Job details and application tracking
function openJob(id) {
    const job = jobs.find(item => item.id === id);
    if (!job) return;

    selectedJobId = id;

    const user = currentUser();
    const match = calculateMatch(job, user ? user.profile : {});

    const alreadyApplied = readData("careerPilotApplications", []).some(
        app => app.email === user.email && app.jobId === id
    );

    document.getElementById("jobDetailContent").innerHTML = `
        <div class="job-top">
            <div class="company-logo">${job.logo}</div>
            <div>
                <span class="eyebrow">SAMPLE JOB OPPORTUNITY</span>
                <h2>${escapeHTML(job.title)}</h2>
                <p>${escapeHTML(job.company)} · ${escapeHTML(job.location)}</p>
            </div>
        </div>

        <div class="detail-tags">
            <span class="skill-tag">${escapeHTML(job.type)}</span>
            <span class="skill-tag">${escapeHTML(job.salary)}</span>
            <span class="skill-tag">${match}% demo match</span>
        </div>

        <h3>About the role</h3>
        <p>${escapeHTML(job.description)}</p>

        <h3>Requirements</h3>
        <ul>${job.requirements.map(item =>
            `<li>${escapeHTML(item)}</li>`
        ).join("")}</ul>

        <h3>Skills</h3>
        <div class="detail-tags">
            ${job.skills.map(skill =>
                `<span class="skill-tag">${escapeHTML(skill)}</span>`
            ).join("")}
        </div>

        <button class="primary" ${alreadyApplied ? "disabled" : ""}
            onclick="applyForJob(${job.id})">
            ${alreadyApplied ? "Application Saved" : "Save Application"}
        </button>

        <p id="applyMessage" class="message"></p>
        <p class="disclaimer">
            Sample listing: this action records a demo application, not an application to a real employer.
        </p>
    `;

    showPage("jobDetail");
}

function applyForJob(id) {
    const user = currentUser();
    if (!user) {
        showPage("login");
        return;
    }

    const applications = readData("careerPilotApplications", []);

    const exists = applications.some(app =>
        app.email === user.email && app.jobId === id
    );

    if (exists) {
        setMessage("applyMessage", "This job is already in your saved applications.", false);
        return;
    }

    const job = jobs.find(item => item.id === id);
    if (!job) return;

    applications.push({
        email: user.email,
        jobId: id,
        title: job.title,
        company: job.company,
        status: "Saved",
        date: new Date().toLocaleDateString()
    });

    saveData("careerPilotApplications", applications);

    setMessage("applyMessage", "Job saved successfully to your demo applications.");
    renderDashboard();
}

function renderApplications() {
    const user = currentUser();
    if (!user) return;

    const applications = readData("careerPilotApplications", [])
        .filter(app => app.email === user.email);

    const container = document.getElementById("applicationList");

    if (!applications.length) {
        container.innerHTML = `
            <div class="form-card center">
                <h2>No applications yet</h2>
                <p>Explore jobs and save opportunities you are interested in.</p>
                <br>
                <button class="primary" onclick="showPage('jobs')">Find Jobs</button>
            </div>
        `;
        return;
    }

    container.innerHTML = applications.map(app => `
        <div class="application-row">
            <div>
                <h3>${escapeHTML(app.title)}</h3>
                <p>${escapeHTML(app.company)} · Saved on ${escapeHTML(app.date)}</p>
            </div>
            <span class="status">${escapeHTML(app.status)}</span>
        </div>
    `).join("");
}

// Initial setup
function initialise() {
    updateNavigation();

    if (currentUser()) {
        showPage("dashboard");
    } else {
        showPage("login");
    }
}

initialise();
