
function showLogin() {
    document.getElementById("authTitle").textContent = "User Login";
    document.getElementById("password").autocomplete = "current-password";
    document.getElementById("authModal").style.display = "flex";
}

function showRegister() {
    document.getElementById("authTitle").textContent = "Create Account";
    document.getElementById("password").autocomplete = "new-password";
    document.getElementById("authModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("authModal").style.display = "none";
}

function handleAuth(event) {
    event.preventDefault();

    const name = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const title = document.getElementById("authTitle").textContent;

    document.getElementById("authMessage").textContent =
        title + " demo submitted for " + name + " (" + email + ").";

    // Demo only: this does not create a secure account or authenticate a user.
}

function generateDiet() {
    const goal = document.getElementById("goal").value;
    let plan = "";

    if (goal === "muscle") {
        plan = "Breakfast: Eggs or paneer with whole-grain toast\n" +
               "Lunch: Rice or roti, dal and vegetables\n" +
               "Snack: Yogurt, nuts or fruit\n" +
               "Dinner: Beans, tofu, fish or another protein source with vegetables";
    } else if (goal === "energy") {
        plan = "Breakfast: Oats and fruit\n" +
               "Lunch: Whole grains, vegetables and protein\n" +
               "Snack: Fruit and nuts\n" +
               "Dinner: A balanced meal with vegetables and protein";
    } else {
        plan = "Breakfast: Oats, fruit or idli\n" +
               "Lunch: Rice or roti, dal and vegetables\n" +
               "Snack: Fruit or yogurt\n" +
               "Dinner: Vegetables, protein and whole grains";
    }

    document.getElementById("dietResult").textContent =
        "Your sample daily plan:\n\n" + plan +
        "\n\nAdjust portions to your needs and dietary requirements.";
}

function subscribe(plan) {
    const message = plan === "Free Plan"
        ? "You selected the Free Plan."
        : "You selected the Premium Plan. Payment gateway integration is required to pay.";

    document.getElementById("subscriptionResult").textContent = message;
}
