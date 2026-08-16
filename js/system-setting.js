function xlxzOpenSetting() {
    let html = `
        <h2>设置</h2>
        <div>
            音乐：
            <input type="checkbox" id="set-music" ${XLXZ_STATE.setting.music ? "checked" : ""}>
        </div>
        <div>
            音效：
            <input type="checkbox" id="set-sound" ${XLXZ_STATE.setting.sound ? "checked" : ""}>
        </div>
        <hr>
        <button onclick="xlxzApplySetting()">保存设置</button>
        <button onclick="xlxzResetSave()">清空存档</button>
    `;
    xlxzShowPopup(html);
}

function xlxzApplySetting() {
    XLXZ_STATE.setting.music = document.getElementById("set-music").checked;
    XLXZ_STATE.setting.sound = document.getElementById("set-sound").checked;
    xlxzSave();
    alert("设置已保存");
}

function xlxzResetSave() {
    if (!confirm("确定要清空所有进度吗？")) return;
    localStorage.removeItem(XLXZ_CONFIG.saveKey);
    location.reload();
}