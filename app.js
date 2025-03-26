// Store users and their coins locally (simulated in this example)
let users = {
    "user1": { password: "userpass1", coins: 100 },
    "user2": { password: "userpass2", coins: 200 }
};

// Admin Credentials
const adminCredentials = { username: "adminuser", password: "adminpass" };

// Function to handle login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if the login is for the admin
    if (username === adminCredentials.username && password === adminCredentials.password) {
        // Hide user login
        document.getElementById('login').style.display = 'none';
        // Show the admin area
        document.getElementById('admin-area').style.display = 'block';
        console.log("Logged in as Admin");
    } 
    // Check if the login is for a regular user
    else if (users[username] && users[username].password === password) {
        // Hide user login
        document.getElementById('login').style.display = 'none';
        // Show the user area
        document.getElementById('user-area').style.display = 'block';
        // Display user coin balance
        document.getElementById('coin-balance').innerText = users[username].coins;
        console.log("Logged in as User");
    } 
    else {
        alert("Invalid credentials. Please try again.");
    }
}

// Admin control functions
function giveCoins() {
    const username = prompt("Enter the username to give coins to:");
    const amount = parseInt(prompt("Enter the number of coins to give:"), 10);

    if (users[username]) {
        users[username].coins += amount;
        alert(`${amount} coins have been added to ${username}'s balance.`);
    } else {
        alert("User not found.");
    }
}

function viewPurchaseHistory() {
    alert("Viewing purchase history (This is a placeholder).");
}

