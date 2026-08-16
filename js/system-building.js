function xlxzOpenBuild() {
    let html = "<h2>建筑建造</h2>";
    Object.keys(XLXZ_CONFIG.buildings).forEach(id => {
        const b = XLXZ_CONFIG.buildings[id];
        html += `<div>
            <b>${b.name}</b><br>
            材料需求：${JSON.stringify(b.need)}<br>
            金币需求：${b.goldCost}<br>
            <button onclick="xlxzChooseTile('${id}')">选择地块建造</button>
        </div>`;
    });
    xlxzShowPopup(html);
}

function xlxzChooseTile(buildingId) {
    xlxzClosePopup();
    alert("点击一个已解锁地块进行建造");
    const container = document.getElementById("town-container");

    function handler(e) {
        const tileDiv = e.target.closest(".tile");
        if (!tileDiv) return;
        const tileId = Number(tileDiv.dataset.tileId);
        const tile = XLXZ_STATE.tiles.find(t => t.id === tileId);
        if (!tile.unlocked) {
            alert("地块未解锁");
            return;
        }
        xlxzBuildOnTile(buildingId, tileId);
        container.removeEventListener("click", handler);
    }

    container.addEventListener("click", handler);
}

function xlxzBuildOnTile(buildingId, tileId) {
    const b = XLXZ_CONFIG.buildings[buildingId];
    // 材料检查
    for (let m in b.need) {
        if (!XLXZ_STATE.materials[m] || XLXZ_STATE.materials[m] < b.need[m]) {
            alert("材料不足");
            return;
        }
    }
    if (XLXZ_STATE.gold < b.goldCost) {
        alert("金币不足");
        return;
    }

    // 扣除材料与金币
    for (let m in b.need) XLXZ_STATE.materials[m] -= b.need[m];
    xlxzAddGold(-b.goldCost);

    XLXZ_STATE.buildings.push({
        id: buildingId,
        tileId,
        produceStart: Date.now()
    });

    xlxzSave();
    xlxzRenderTown();
    xlxzUpdateTopBar();
    alert("建造完成");
}

// 金币产出（仅前台运行）
setInterval(() => {
    const now = Date.now();
    XLXZ_STATE.buildings.forEach(b => {
        const cfg = XLXZ_CONFIG.buildings[b.id];
        const deltaSec = (now - b.produceStart) / 1000;
        const gain = deltaSec * cfg.produceGoldPerSec;
        if (gain > 0) {
            xlxzAddGold(gain);
            b.produceStart = now;
        }
    });
}, 3000);