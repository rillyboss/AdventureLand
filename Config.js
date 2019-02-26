getCharacterConfigSetting = (settingName, defaultIfNull) => {
    try {
        return pget(`${character.name}:${settingName}`);
    } catch (e) {
        setCharacterConfigSetting(settingName, defaultIfNull);
        return defaultIfNull;
    }
}

setCharacterConfigSetting = (settingName, value) => {
    pset(`${character.name}:${settingName}`, value);
    return value;
}

const DEFAULT_LOOP_INTERVAL = 1000 / 4;
const DEFAULT_POTION_COUNT_RESTOCK_THRESHOLD = 20;
const DEFAULT_POTION_BUY_COUNT = 200;
const DEFAULT_ENEMY_TO_KILL = ENEMY_TYPES.GOO;
const DEFAULT_USE_HEALTH_POTION_THRESHOLD = .33;
const DEFAULT_USE_MANA_POTION_THRESHOLD = .33;
const DEFAULT_HEAL_REQUEST_DELAY_IN_SECONDS = 1.5;
const DEFAULT_SAY_INTERVAL_IN_SECONDS = 15;

const SETTING_LOOP_INTERVAL = 'LOOP_INTERVAL';
const SETTING_POTION_COUNT_RESTOCK_THRESHOLD = `POTION_COUNT_RESTOCK_THRESHOLD`;
const SETTING_POTION_BUY_COUNT = `POTION_BUY_COUNT`;
const SETTING_ENEMY_TO_KILL = `ENEMY_TO_KILL`;
const SETTING_USE_HEALTH_POTION_THRESHOLD = `USE_HEALTH_POTION_THRESHOLD`;
const SETTING_USE_MANA_POTION_THRESHOLD = `USE_MANA_POTION_THRESHOLD`;
const SETTING_HEAL_REQUEST_DELAY_IN_SECONDS = `HEAL_REQUEST_DELAY_IN_SECONDS`;
const SETTING_SAY_INTERVAL_IN_SECONDS = `SAY_INTERVAL_IN_SECONDS`;

getInterval = () => getCharacterConfigSetting(SETTING_LOOP_INTERVAL, DEFAULT_LOOP_INTERVAL);
getPotionCountRestockThreshold = () => getCharacterConfigSetting(SETTING_POTION_COUNT_RESTOCK_THRESHOLD, DEFAULT_POTION_COUNT_RESTOCK_THRESHOLD);
getPotionBuyCount = () => getCharacterConfigSetting(SETTING_POTION_BUY_COUNT, DEFAULT_POTION_BUY_COUNT);
getEnemyToKill = () => getCharacterConfigSetting(SETTING_ENEMY_TO_KILL, DEFAULT_ENEMY_TO_KILL);
getUseHealthPotionThreshold = () => getCharacterConfigSetting(SETTING_USE_HEALTH_POTION_THRESHOLD, DEFAULT_USE_HEALTH_POTION_THRESHOLD);
getUseManaPotionThreshold = () => getCharacterConfigSetting(SETTING_USE_MANA_POTION_THRESHOLD, DEFAULT_USE_MANA_POTION_THRESHOLD);
getHealRequestDelayInSeconds = () => getCharacterConfigSetting(SETTING_HEAL_REQUEST_DELAY_IN_SECONDS, DEFAULT_HEAL_REQUEST_DELAY_IN_SECONDS);
getSayIntervalInSeconds = () => getCharacterConfigSetting(SETTING_SAY_INTERVAL_IN_SECONDS, DEFAULT_SAY_INTERVAL_IN_SECONDS);

setInterval = (newvalue) => setCharacterConfigSetting(SETTING_LOOP_INTERVAL, newValue);
setPotionCountRestockThreshold = (newvalue) => setCharacterConfigSetting(SETTING_POTION_COUNT_RESTOCK_THRESHOLD, newValue);
setPotionBuyCount = (newvalue) => setCharacterConfigSetting(SETTING_POTION_BUY_COUNT, newValue);
setEnemyToKill = (newvalue) => setCharacterConfigSetting(SETTING_ENEMY_TO_KILL, newValue);
setUseHealthPotionThreshold = (newvalue) => setCharacterConfigSetting(SETTING_USE_HEALTH_POTION_THRESHOLD, newValue);
setUseManaPotionThreshold = (newvalue) => setCharacterConfigSetting(SETTING_USE_MANA_POTION_THRESHOLD, newValue);
setHealRequestDelayInSeconds = (newvalue) => setCharacterConfigSetting(SETTING_HEAL_REQUEST_DELAY_IN_SECONDS, DEFAULT_HEAL_REQUEST_DEnewValueLAY_IN_SECONDS);
setSayIntervalInSeconds = (newvalue) => setCharacterConfigSetting(SETTING_SAY_INTERVAL_IN_SECONDS, newValue);

let nextValidHealRequestDate = new Date();
let nextSayAllowedDate = new Date();
let state = "";