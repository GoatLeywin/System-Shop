const validUsers = {
    "user1": { password: "password123", balance: 100, history: [] },
    "user2": { password: "password456", balance: 50, history: [] }
};

const adminPassword = "adminpass";  // Admin password

let currentUser = null;

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (validUsers[username] && validUsers[username].password === password) {
        currentUser = username;
        document.getElementById('login').style.display = "none";
        document.getElementById('shop').style.display = "block";
        document.getElementById('user-balance').textContent = validUsers[username].balance;
    } else {
        document.getElementById('error-message').textContent = "Invalid username or password!";
    }
}

function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.style.display = "none";
    });

    document.getElementById(tabName).style.display = "block";
}

function purchaseItem(item, cost) {
    if (currentUser) {
        const user = validUsers[currentUser];
        if (user.balance >= cost) {
            user.balance -= cost;
            user.history.push(item);
            alert(`${item} purchased!`);

            // Update balance in the UI
            document.getElementById('user-balance').textContent = user.balance;
        } else {
            alert("Not enough coins!");
        }
    }
}

function adminLogin() {
    const password = document.getElementById('admin-password').value;

    if (password === adminPassword) {
        alert("Admin logged in!");
        // Show admin controls
        const adminControls = document.createElement('div');
        adminControls.innerHTML = `
            <h3>Give Coins</h3>
            <input type="text" id="user-name" placeholder="Enter username">
            <input type="number" id="coin-amount" placeholder="Enter amount of coins">
            <button onclick="giveCoins()">Give Coins</button>

            <h3>User Purchase History</h3>
            <button onclick="viewHistory()">View Purchase History</button>
        `;
        document.getElementById('admin').appendChild(adminControls);
    } else {
        alert("Incorrect admin password.");
    }
}

function giveCoins() {
    const username = document.getElementById('user-name').value;
    const coins = parseInt(document.getElementById('coin-amount').value);

    if (validUsers[username] && coins > 0) {
        validUsers[username].balance += coins;
        alert(`${coins} coins given to ${username}`);
    } else {
        alert("Invalid username or coin amount.");
    }
}

function viewHistory() {
    let history = "";
    for (const user in validUsers) {
        history += `${user}: ${validUsers[user].history.join(", ")}<br>`;
    }
    alert(history);
}
