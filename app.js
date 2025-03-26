// Admin password
const adminPassword = "adminpass";

// Define user data object
let validUsers = {};
let currentUser = null;

// Load the user data from localStorage (if exists)
function loadUserData() {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
        validUsers = JSON.parse(savedUsers); // Load user data
    } else {
        // Default sample users, if nothing in storage
        validUsers = {
            "user1": { password: "password123", balance: 100, history: [] },
            "user2": { password: "password456", balance: 50, history: [] }
        };
        saveUserData(); // Save default users
    }
}

// Save the user data to localStorage
function saveUserData() {
    localStorage.setItem("users", JSON.stringify(validUsers));
}

// Load user data on page load
loadUserData();

// Login function for regular users
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (validUsers[username] && validUsers[username].password === password) {
        currentUser = username;
        // Hide login and show shop
        document.getElementById("login").style.display = "none";
        document.getElementById("shop").style.display = "block";
        document.getElementById("user-name").textContent = username;
        document.getElementById("user-balance").textContent = validUsers[username].balance;
    } else {
        document.getElementById("error-message").textContent = "Invalid username or password!";
    }
}

// Show different tabs for the shop
function showTab(tabName) {
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((tab) => {
        tab.style.display = "none"; // Hide all tabs
    });

    document.getElementById(tabName).style.display = "block"; // Show selected tab
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

// Admin login function
function adminLogin() {
    const password = document.getElementById("admin-password").value;

    if (password === adminPassword) {
        alert("Admin logged in!");
        document.getElementById("admin-controls").style.display = "block";
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

// Logout function for regular users
function logout() {
    currentUser = null;
    document.getElementById("login").style.display = "block";
    document.getElementById("shop").style.display = "none";
}
