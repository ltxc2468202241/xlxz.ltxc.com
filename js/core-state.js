const XLXZ_STATE = {
    gold: 0,
    materials: {},
    buildings: [],      // {id, tileId, produceStart}
    tiles: [],          // 运行时地块状态
    noticesRead: [],
    codeUsedPublic: [],
    codeUsedOnce: [],
    setting: {
        music: true,
        sound: true
    }
};

function xlxzInitState() {
    // 初始化地块
    XLXZ_STATE.tiles = XLXZ_CONFIG.tiles.map(t => ({...t}));

    const raw = localStorage.getItem(XLXZ_CONFIG.saveKey);
    if (raw) {
        try {
            const data = JSON.parse(raw);
            Object.assign(XLXZ_STATE, data);
        } catch (e) {
            console.warn("存档损坏，使用默认状态");
        }
    }
}

function xlxzSave() {
    localStorage.setItem(XLXZ_CONFIG.saveKey, JSON.stringify(XLXZ_STATE));
}

function xlxzAddGold(amount) {
    XLXZ_STATE.gold += amount;
    XLXZ_EVENTS.emit("gold-change", XLXZ_STATE.gold);
    xlxzSave();
}

function xlxzAddMaterial(id, amount) {
    XLXZ_STATE.materials[id] = (XLXZ_STATE.materials[id] || 0) + amount;
    XLXZ_EVENTS.emit("material-change", XLXZ_STATE.materials);
    xlxzSave();
}