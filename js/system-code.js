function xlxzDecryptCode(raw) {
    const str = raw.replace("U2FsdGVkX1+", "");
    const arr = str.split(",");
    const reward = {gold: 0, materials: {}};
    arr.forEach(item => {
        const [k, v] = item.split(":");
        if (k === "gold") reward.gold = Number(v);
        else reward.materials[k] = Number(v);
    });
    return reward;
}

function xlxzOpenCode() {
    let html = `
        <h2>兑换码</h2>
        <input id="code-input" placeholder="输入兑换码">
        <button onclick="xlxzSubmitCode()">兑换</button>
    `;
    xlxzShowPopup(html);
}

function xlxzSubmitCode() {
    const code = document.getElementById("code-input").value.trim();
    let raw = XLXZ_CONFIG.encryptedCodesPublic[code];
    let type = "public";

    if (!raw) {
        raw = XLXZ_CONFIG.encryptedCodesOnce[code];
        type = "once";
    }
    if (!raw) {
        alert("兑换码无效");
        return;
    }

    if (type === "public" && XLXZ_STATE.codeUsedPublic.includes(code)) {
        alert("该公共码已使用过");
        return;
    }
    if (type === "once" && XLXZ_STATE.codeUsedOnce.includes(code)) {
        alert("该一次性兑换码已被使用");
        return;
    }

    const reward = xlxzDecryptCode(raw);
    if (reward.gold) xlxzAddGold(reward.gold);
    for (let m in reward.materials) {
        xlxzAddMaterial(m, reward.materials[m]);
    }

    if (type === "public") XLXZ_STATE.codeUsedPublic.push(code);
    else XLXZ_STATE.codeUsedOnce.push(code);

    xlxzSave();
    alert("兑换成功");
}