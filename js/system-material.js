function xlxzOpenSynthesis() {
    let html = "<h2>材料合成</h2>";
    Object.keys(XLXZ_CONFIG.synthesisRecipes).forEach(key => {
        const r = XLXZ_CONFIG.synthesisRecipes[key];
        html += `<div>
            配方：${JSON.stringify(r.need)} → ${JSON.stringify(r.out)}
            <button onclick="xlxzDoSynthesis('${key}')">合成</button>
        </div>`;
    });
    xlxzShowPopup(html);
}

function xlxzDoSynthesis(key) {
    const r = XLXZ_CONFIG.synthesisRecipes[key];
    // 检查材料
    for (let m in r.need) {
        if (!XLXZ_STATE.materials[m] || XLXZ_STATE.materials[m] < r.need[m]) {
            alert("材料不足");
            return;
        }
    }
    // 扣除材料
    for (let m in r.need) XLXZ_STATE.materials[m] -= r.need[m];
    // 增加产出
    for (let m in r.out) {
        xlxzAddMaterial(m, r.out[m]);
    }
    alert("合成成功");
}