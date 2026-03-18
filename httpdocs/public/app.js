/**
 * app.js - Finale Version
 * Funktionen: Auto-Load, Pax-Limit, Typ-Farben, Druckfunktion
 */

var currentSessionUser = JSON.parse(sessionStorage.getItem('user'));

// BERECHNUNG DER SPEISEPLAN-WOCHE (Turnus 1-6)
function getCurrentMenuWeek() {
    const startDate = new Date("2023-12-18");
    const diff = new Date() - startDate;
    return (Math.floor(diff / (1000 * 60 * 60 * 24 * 7)) % 6) + 1; 
}

// DATUMSBERECHNUNG FÜR DIE ANZEIGE
function getDateForWeekday(dayName) {
    const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
    const today = new Date();
    const currentDay = today.getDay() === 0 ? 6 : today.getDay() - 1;
    const targetDay = days.indexOf(dayName);
    const resultDate = new Date(today);
    resultDate.setDate(today.getDate() + (targetDay - currentDay));
    return resultDate.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
}

// PAX-LIMIT PRÜFUNG (Max. Essen pro Tag)
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

// ABMELDEN
function logout() {
    sessionStorage.clear();
    window.location.href = 'index.html';
}

// LOGIN LOGIK
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

// HAUPTFUNKTION: SPEISEPLAN RENDERN
async function renderMenu() {
    if (!currentSessionUser || currentSessionUser.role === 'admin') return;
    const week = getCurrentMenuWeek();
    
    // Bestehende Auswahl vom Server laden (Auto-Load)
    let savedSelection = {};
    try {
        const res = await fetch(`/api/order/${week}/${currentSessionUser.username}`);
        savedSelection = await res.json();
    } catch(e) { console.log("Keine bestehende Bestellung gefunden."); }

    const container = document.getElementById('menu-view');
    const pax = currentSessionUser.pax || 1;
    
    // Header mit User-Infos
    let html = `
        <div style="background:#f4f4f4; padding:15px; border-radius:10px; margin-bottom:20px; border:1px solid #ddd;">
            <h2 style="margin:0;">Zimmer ${currentSessionUser.username}</h2>
            <p style="margin:5px 0;">Tisch: ${currentSessionUser.table || '?'} | Personen im Zimmer: <strong>${pax}</strong></p>
            <p style="margin:0;"><small>Maximal ${pax} Essen pro Tag wählbar.</small></p>
        </div>
    `;

    // Speiseplan-Schleife
    if (typeof fullMenuData !== 'undefined' && fullMenuData[week]) {
        for (let day in fullMenuData[week]) {
            const dateStr = getDateForWeekday(day);
            html += `<div style="margin-bottom:25px;">
                        <h3 style="border-bottom:2px solid #eee; padding-bottom:5px;">${day}, ${dateStr}</h3>`;
            
            fullMenuData[week][day].forEach(m => {
                const val = savedSelection[m.id] || 0;
                // m.type sorgt für die Farbakzente (Klasse type-A, type-B, etc.)
                html += `
                    <div class="meal-row type-${m.type}" style="display:flex; justify-content:space-between; margin:10px 0; align-items:center; padding:8px; border-radius:5px;">
                        <span style="flex:1;"><strong>${m.type}:</strong> ${m.desc}</span>
                        <input type="number" name="${m.id}" value="${val}" min="0" max="${pax}" 
                               data-day-name="${day}" data-desc="${m.desc}"
                               onchange="if(!checkDailyLimit('${day}')) this.value=0;" 
                               style="width:50px; padding:5px; margin-left:10px;">
                    </div>`;
            });
            html += `</div>`;
        }

        html += `
            <button class="save-btn" onclick="sendOrder()">Bestellung speichern</button>
            <button onclick="printMyOrder()" style="width:100%; margin-top:10px; padding:10px; background:#666; color:white; border:none; border-radius:8px; cursor:pointer;">Drucken / PDF</button>
        `;
    } else {
        html += `<p style="color:red;">Fehler: Speiseplan für Woche ${week} konnte nicht geladen werden.</p>`;
    }

    container.innerHTML = html;
}

// BESTELLUNG ABSCHICKEN
async function sendOrder() {
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
        if(res.ok) alert("Ihre Auswahl wurde erfolgreich gespeichert!");
    } catch(e) {
        alert("Fehler beim Speichern der Bestellung.");
    }
}

// DRUCKFUNKTION
function printMyOrder() {
    let content = `<h2>Bestellung Haus Gothensee - Zimmer ${currentSessionUser.username}</h2><hr>`;
    let hasEntries = false;
    document.querySelectorAll('input[type="number"]').forEach(i => {
        if(parseInt(i.value) > 0) {
            content += `<p><b>${i.getAttribute('data-day-name')}:</b> ${i.value}x ${i.getAttribute('data-desc')}</p>`;
            hasEntries = true;
        }
    });
    if(!hasEntries) return alert("Bitte wählen Sie zuerst Essen aus.");
    const win = window.open('', '', 'width=700,height=800');
    win.document.write(`<html><body style="font-family:sans-serif;padding:40px;">${content}</body></html>`);
    win.document.close(); 
    win.print();
}

// INITIALISIERUNG BEIM LADEN
window.onload = () => {
    const pField = document.getElementById('p');
    if (pField) pField.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleLogin(); });
    
    if (currentSessionUser) {
        const loginUi = document.getElementById('login-ui');
        const appUi = document.getElementById('app-ui');
        if(loginUi) loginUi.style.display = 'none';
        if(appUi) {
            appUi.style.display = 'block';
            renderMenu();
        }
    }
};