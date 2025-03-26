const adminPassword = "adminpass"; // Admin password

let currentUser = null;
let validUsers = {}; // Define an empty object for valid users

// Load the user data from localStorage (if it exists)
function loadUserData() {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
        validUsers = JSON.parse(savedUsers);
    } else {
        // If no user data is found, define some sample users
        validUsers = {
            "user1": { password: "password123", balance: 100, history: [] },
            "user2": { password: "password456", balance: 50, history: [] }
        };
        saveUserData(); // Save the sample users to localStorage
    }
}

// Save the user data to localStorage
function saveUserData() {
    localStorage.setItem("users", JSON.stringify(validUsers));
}

// Load user data on page load
loadUserData();

// Login Function
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (validUsers[username] && validUsers[username].password === password) {
        currentUser = username;
        document.getElementById("login").style.display = "none";
        document.getElementById("shop").style.display = "block";
        document.getElementById("user-name").textContent = username;
        document.getElementById("user-balance").textContent = validUsers[username].balance;
    } else {
        document.getElementById("error-message").textContent = "Invalid username or password!";
    }
}

// Show the specific tab based on the category clicked
function showTab(tabName) {
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((tab) => {
        tab.style.display = "none";
    });

    document.getElementById(tabName).style.display = "block";
}

// Handle purchasing an item
function purchaseItem(item, cost) {
    if (currentUser) {
        const user = validUsers[currentUser];
        if (user.balance >= cost) {
            user.balance -= cost;
            user.history.push(item);
            alert(`${item} purchased!`);

            // Update balance in the UI
            document.getElementById("user-balance").textContent = user.balance;

            // Save user data to localStorage after purchase
            saveUserData();
        } else {
            alert("Not enough coins!");
        }
    }
}

// Admin Login Function
function adminLogin() {
    const password = document.getElementById("admin-password").value;

    if (password === adminPassword) {
        alert("Admin logged in!");
        // Show admin controls
        const adminControls = document.getElementById("admin-controls");
        adminControls.style.display = "block";
    } else {
        alert("Incorrect admin password.");
    }
}

// Admin gives coins to users
function giveCoins() {
    const username = document.getElementById("user-name").value;
    const coins = parseInt(document.getElementById("coin-amount").value);

    if (validUsers[username] && coins > 0) {
        validUsers[username].balance += coins;
        alert(`${coins} coins given to ${username}`);

        // Save user data to localStorage after giving coins
        saveUserData();
    } else {
        alert("Invalid username or coin amount.");
    }
}

// Admin views user purchase history
function viewHistory() {
    let history = "";
    for (const user in validUsers) {
        history += `${user}: ${validUsers[user].history.join(", ")}<br>`;
    }
    alert(history);
}

// Log out the current user
function logout() {
    currentUser = null;
    document.getElementById("login").style.display = "block";
    document.getElementById("shop").style.display = "none";
}
