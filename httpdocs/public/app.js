/**
 * app.js - Haus Gothensee
 * Funktionen: Auto-Load, Pax-Limit, Donnerstag-Deadline, Dienstag-Vorschau
 */

var currentSessionUser = JSON.parse(sessionStorage.getItem('user'));
let deadlinePassed = false;

// BERECHNUNG DER SPEISEPLAN-WOCHE (Turnus 1-6)
function getCurrentMenuWeek() {
    const startDate = new Date("2023-12-18");
    const now = new Date();
    const diff = now - startDate;
    let week = (Math.floor(diff / (1000 * 60 * 60 * 24 * 7)) % 6) + 1;

    // Dienstag-Vorschau: Ab Dienstag wird die nächste Woche angezeigt
    if (now.getDay() === 2) {
        week = (week % 6) + 1;
    }

    // Donnerstag-Sperre: Ab Donnerstag 12:00 Uhr aktiv
    if ((now.getDay() === 4 && now.getHours() >= 12) || now.getDay() === 5 || now.getDay() === 6) {
        deadlinePassed = true;
    }

    return week;
}

function getDateForWeekday(dayName) {
    const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
    const today = new Date();
    const currentDay = today.getDay() === 0 ? 6 : today.getDay() - 1;
    const targetDay = days.indexOf(dayName);
    const resultDate = new Date(today);
    resultDate.setDate(today.getDate() + (targetDay - currentDay));
    return resultDate.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
}

function checkDailyLimit(day) {
    const max = parseInt(currentSessionUser.pax) || 1;
    let currentTotal = 0;
    document.querySelectorAll(`input[data-day-name="${day}"]`).forEach(input => {
        currentTotal += parseInt(input.value) || 0;
    });
    if (currentTotal > max) {
        alert(`Limit erreicht: Maximal ${max} Essen für ${day} möglich.`);
        return false;
    }
    return true;
}

function logout() {
    sessionStorage.clear();
    window.location.href = 'index.html';
}

async function handleLogin() {
    const u = document.getElementById('u').value;
    const p = document.getElementById('p').value;
    try {
        const res = await fetch('/api/login', {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: u, password: p})
        });
        const data = await res.json();
        if (res.ok) {
            sessionStorage.setItem('user', JSON.stringify(data.user));
            if (data.user.role === 'admin') window.location.href = 'admin.html';
            else location.reload();
        } else {
            alert("Anmeldung fehlgeschlagen!");
        }
    } catch(e) {
        alert("Serverfehler beim Login.");
    }
}

async function renderMenu() {
    if (!currentSessionUser || currentSessionUser.role === 'admin') return;
    const week = getCurrentMenuWeek();
    
    let savedSelection = {};
    try {
        const res = await fetch(`/api/order/${week}/${currentSessionUser.username}`);
        savedSelection = await res.json();
    } catch(e) { console.log("Keine bestehende Bestellung gefunden."); }

    const container = document.getElementById('menu-view');
    const pax = currentSessionUser.pax || 1;
    
    let html = `
        <div style="background:#f4f4f4; padding:15px; border-radius:10px; margin-bottom:20px; border:1px solid #ddd;">
            <h2 style="margin:0;">Zimmer ${currentSessionUser.username}</h2>
            <p style="margin:5px 0;">Tisch: ${currentSessionUser.table || '?'} | Personen: <strong>${pax}</strong></p>
            ${deadlinePassed ? '<p style="color:red; font-weight:bold; margin:0;">⚠️ Bestellfrist abgelaufen (Donnerstag 12:00). Bestelleingabe für die nächste Woche ab Dienstag 0 Uhr möglich.</p>' : '<p style="margin:0;"><small>Maximal ' + pax + ' Essen pro Tag wählbar.</small></p>'}
            ${!deadlinePassed ? '<p style="color:red; font-weight:bold; margin:0;">🍽️ Bestelleingabe für die nächste Woche bis Donnerstag 12 Uhr möglich.</p>' : '<p style="margin:0;"><small>Maximal ' + pax + ' Essen pro Tag wählbar.</small></p>'}
        </div>
    `;

    if (typeof fullMenuData !== 'undefined' && fullMenuData[week]) {
        // Wochentage in fester Reihenfolge Mittwoch -> Dienstag
        const displayOrder = ["Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag", "Montag", "Dienstag"];
        
        displayOrder.forEach(day => {
            if (fullMenuData[week][day]) {
                const dateStr = getDateForWeekday(day);
                html += `<div style="margin-bottom:25px; opacity: ${deadlinePassed ? '0.6' : '1'}">
                            <h3 style="border-bottom:2px solid #eee; padding-bottom:5px;">${day}, ${dateStr}</h3>`;
                
                fullMenuData[week][day].forEach(m => {
                    const val = savedSelection[m.id] || 0;
                    html += `
                        <div class="meal-row type-${m.type}" style="display:flex; justify-content:space-between; margin:10px 0; align-items:center; padding:8px; border-radius:5px; background: ${val > 0 ? '#eef6ff' : 'transparent'}; border: 1px solid ${val > 0 ? '#bcd9ff' : 'transparent'}">
                            <span style="flex:1;"><strong>${m.type}:</strong> ${m.desc}</span>
                            <input type="number" name="${m.id}" value="${val}" min="0" max="${pax}" 
                                   data-day-name="${day}" data-desc="${m.desc}"
                                   ${deadlinePassed ? 'disabled' : ''}
                                   onchange="if(!checkDailyLimit('${day}')) this.value=0;" 
                                   style="width:50px; padding:5px; margin-left:10px;">
                        </div>`;
                });
                html += `</div>`;
            }
        });

        if (!deadlinePassed) {
            html += `<button class="save-btn" onclick="sendOrder()">Bestellung speichern</button>`;
        }
        html += `<button onclick="printMyOrder()" style="width:100%; margin-top:10px; padding:10px; background:#666; color:white; border:none; border-radius:8px; cursor:pointer;">Drucken / PDF</button>`;
    } else {
        html += `<p style="color:red;">Fehler: Speiseplan konnte nicht geladen werden.</p>`;
    }

    container.innerHTML = html;
}

async function sendOrder() {
    if (deadlinePassed) return alert("Die Bestellfrist ist abgelaufen.");
    const selection = {};
    document.querySelectorAll('input[type="number"]').forEach(i => { 
        if(parseInt(i.value) > 0) selection[i.name] = i.value; 
    });
    
    try {
        const res = await fetch('/api/order', {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                username: currentSessionUser.username, 
                week: getCurrentMenuWeek(), 
                selection 
            })
        });
        if(res.ok) alert("Erfolgreich gespeichert!");
    } catch(e) { alert("Serverfehler."); }
}

function printMyOrder() {
    let content = `<h2>Bestellung Zimmer ${currentSessionUser.username}</h2><hr>`;
    document.querySelectorAll('input[type="number"]').forEach(i => {
        if(parseInt(i.value) > 0) {
            content += `<p><b>${i.getAttribute('data-day-name')}:</b> ${i.value}x ${i.getAttribute('data-desc')}</p>`;
        }
    });
    const win = window.open('', '', 'width=700,height=800');
    win.document.write(`<html><body style="font-family:sans-serif;padding:40px;">${content}</body></html>`);
    win.document.close(); 
    win.print();
}

window.onload = () => {
    const pField = document.getElementById('p');
    if (pField) pField.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleLogin(); });
    if (currentSessionUser) {
        document.getElementById('login-ui').style.display = 'none';
        document.getElementById('app-ui').style.display = 'block';
        renderMenu();
    }
};