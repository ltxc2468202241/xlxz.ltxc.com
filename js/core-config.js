// 全局配置与数据表

const XLXZ_CONFIG = {
    saveKey: "xlxz-save-v1",

    // 材料基础表
    materials: {
        wood: {name: "木材"},
        stone: {name: "石料"},
        wood2: {name: "精制木材"},
        stone2: {name: "精制石料"}
    },

    // 合成配方
    synthesisRecipes: {
        wood2: {need: {wood: 2}, out: {wood2: 1}},
        stone2: {need: {stone: 2}, out: {stone2: 1}}
    },

    // 建筑表
    buildings: {
        house: {
            name: "民居",
            need: {wood2: 2, stone2: 1},
            goldCost: 50,
            produceGoldPerSec: 1
        },
        tower: {
            name: "瞭望塔",
            need: {stone2: 3},
            goldCost: 80,
            produceGoldPerSec: 2
        }
    },

    // 地块布局（简单示例）
    tiles: [
        {id: 1, x: 50, y: 50, unlocked: true},
        {id: 2, x: 150, y: 50, unlocked: false},
        {id: 3, x: 250, y: 50, unlocked: false}
    ],

    // 公告密文（示例）
    encryptedNotices: [
        "U2FsdGVkX1+欢迎来到星落小镇|2026-01-01|在这里建设你的家园吧",
        "U2FsdGVkX1+版本更新|2026-02-01|新增建筑与合成配方"
    ],

    // 兑换码密文（示例）
    encryptedCodesPublic: {
        "WELCOME": "U2FsdGVkX1+gold:100,wood:5"
    },
    encryptedCodesOnce: {
        "ONCE2026": "U2FsdGVkX1+gold:300,stone2:2"
    }
};