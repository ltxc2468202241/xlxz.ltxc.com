function xlxzDecryptNotices() {
    return XLXZ_CONFIG.encryptedNotices.map(e => {
        const parts = e.split("|");
        return {
            title: parts[0].replace("U2FsdGVkX1+", ""),
            date: parts[1],
            text: parts[2]
        };
    });
}

function xlxzOpenNotice() {
    const list = xlxzDecryptNotices();
    let html = "<h2>公告</h2>";
    list.forEach(n => {
        html += `<div><b>${n.title}</b><br>${n.date}<br>${n.text}</div><hr>`;
    });
    xlxzShowPopup(html);
}