function xlxzUpdateTopBar() {
    document.getElementById("gold-display").innerText = "金币：" + XLXZ_STATE.gold;
    document.getElementById("material-display").innerText =
        "材料：" + JSON.stringify(XLXZ_STATE.materials);
}

XLXZ_EVENTS.on("gold-change", xlxzUpdateTopBar);
XLXZ_EVENTS.on("material-change", xlxzUpdateTopBar);

function xlxzRenderTown() {
    const container = document.getElementById("town-container");
    container.innerHTML = "";

    XLXZ_STATE.tiles.forEach(tile => {
        const div = document.createElement("div");
        div.className = "tile";
        div.style.left = tile.x + "px";
        div.style.top = tile.y + "px";
        div.dataset.tileId = tile.id;
        if (!tile.unlocked) {
            div.style.opacity = 0.4;
        }
        container.appendChild(div);
    });

    XLXZ_STATE.buildings.forEach(b => {
        const tile = XLXZ_STATE.tiles.find(t => t.id === b.tileId);
        if (!tile) return;
        const div = document.createElement("div");
        div.className = "building";
        div.style.left = tile.x + "px";
        div.style.top = tile.y + "px";
        div.innerText = XLXZ_CONFIG.buildings[b.id].name;
        container.appendChild(div);
    });
}

function xlxzShowPopup(html) {
    const mask = document.getElementById("popup-mask");
    const popup = document.getElementById("popup");
    popup.innerHTML = html + `<hr><button onclick="xlxzClosePopup()">关闭</button>`;
    mask.style.display = "flex";
}

function xlxzClosePopup() {
    document.getElementById("popup-mask").style.display = "none";
}

// 菜单绑定
document.addEventListener("click", e => {
    const btn = e.target.closest("#menu button");
    if (!btn) return;
    const action = btn.dataset.action;
    if (action === "synthesis") xlxzOpenSynthesis();
    else if (action === "build") xlxzOpenBuild();
    else if (action === "notice") xlxzOpenNotice();
    else if (action === "code") xlxzOpenCode();
    else if (action === "setting") xlxzOpenSetting();
});