const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
const initFile = (file, content) => {
    if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify(content, null, 2));
};
initFile(USERS_FILE, { "admin": { pw: "admin99", role: "admin", name: "Administrator" } });
initFile(ORDERS_FILE, {});

// LOGIN
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync(USERS_FILE));
    const user = users[username];
    if (user && user.pw === password) {
        res.json({ 
            success: true, 
            user: { 
                username, role: user.role, name: user.name,
                table: user.table || null, slot: user.slot || null,
                pax: user.pax || 1
            } 
        });
    } else { res.status(401).json({ success: false }); }
});

// ADMIN: NUTZER-LISTE
app.get('/api/admin/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync(USERS_FILE));
    const list = Object.keys(users)
        .filter(u => users[u].role !== 'admin')
        .map(u => ({ room: u, pw: users[u].pw, table: users[u].table, slot: users[u].slot, pax: users[u].pax || 1 }));
    res.json(list);
});

// ADMIN: SPEICHERN (Tische, Slots, Pax & Passwörter)
app.post('/api/admin/save-tables', (req, res) => {
    const { assignments } = req.body;
    const users = JSON.parse(fs.readFileSync(USERS_FILE));
    assignments.forEach(a => {
        if (users[a.room]) { 
            users[a.room].table = a.table; 
            users[a.room].slot = a.slot;
            users[a.room].pax = parseInt(a.pax) || 1;
            users[a.room].pw = a.pw; // Passwort-Update integriert
        }
    });
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    res.json({ success: true });
});

// ADMIN: ZIMMER AKTIVIEREN
app.post('/api/admin/activate', (req, res) => {
    const { room } = req.body;
    const users = JSON.parse(fs.readFileSync(USERS_FILE));
    const password = "HG-" + Math.floor(1000 + Math.random() * 9000);
    users[room] = { pw: password, role: "user", name: "Zimmer " + room, table: "", slot: "", pax: 1 };
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    res.json({ success: true, password });
});

app.delete('/api/admin/users/:room', (req, res) => {
    const users = JSON.parse(fs.readFileSync(USERS_FILE));
    delete users[req.params.room];
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    res.json({ success: true });
});

// BESTELL-LOGIK
app.get('/api/order/:week/:username', (req, res) => {
    const orders = JSON.parse(fs.readFileSync(ORDERS_FILE));
    const selection = (orders[req.params.week] && orders[req.params.week][req.params.username]) 
                      ? orders[req.params.week][req.params.username].selection : {};
    res.json(selection);
});

app.post('/api/order', (req, res) => {
    const { username, week, selection } = req.body;
    let orders = JSON.parse(fs.readFileSync(ORDERS_FILE));
    if (!orders[week]) orders[week] = {};
    orders[week][username] = { date: new Date().toLocaleString(), selection };
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
    res.json({ success: true });
});

app.get('/api/admin/orders', (req, res) => { res.json(JSON.parse(fs.readFileSync(ORDERS_FILE))); });

app.listen(3000, () => console.log('Server läuft auf Port 3000'));