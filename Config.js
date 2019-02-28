getCharacterConfigSetting = (settingName, defaultIfNull) => {
    let value = pget(`${character.name}:${settingName}`);
    if (value === undefined){
        return setCharacterConfigSetting(settingName, defaultIfNull);
    }
    return value;    
}

setCharacterConfigSetting = (settingName, value) => {
    pset(`${character.name}:${settingName}`, value);
    return value;
}

let DEFAULT_LOOP_INTERVAL = 1000 / 4;
let DEFAULT_POTION_COUNT_RESTOCK_THRESHOLD = 20;
let DEFAULT_POTION_BUY_COUNT = 200;
let DEFAULT_ENEMY_TO_KILL = ENEMY_TYPES.GOO;
let DEFAULT_USE_HEALTH_POTION_THRESHOLD = .33;
let DEFAULT_USE_MANA_POTION_THRESHOLD = .33;
let DEFAULT_HEAL_REQUEST_DELAY_IN_SECONDS = 1.5;
let DEFAULT_SAY_INTERVAL_IN_SECONDS = 15;

let SETTING_LOOP_INTERVAL = 'LOOP_INTERVAL';
let SETTING_POTION_COUNT_RESTOCK_THRESHOLD = `POTION_COUNT_RESTOCK_THRESHOLD`;
let SETTING_POTION_BUY_COUNT = `POTION_BUY_COUNT`;
let SETTING_ENEMY_TO_KILL = `ENEMY_TO_KILL`;
let SETTING_USE_HEALTH_POTION_THRESHOLD = `USE_HEALTH_POTION_THRESHOLD`;
let SETTING_USE_MANA_POTION_THRESHOLD = `USE_MANA_POTION_THRESHOLD`;
let SETTING_HEAL_REQUEST_DELAY_IN_SECONDS = `HEAL_REQUEST_DELAY_IN_SECONDS`;
let SETTING_SAY_INTERVAL_IN_SECONDS = `SAY_INTERVAL_IN_SECONDS`;

getLoopInterval = () => getCharacterConfigSetting(SETTING_LOOP_INTERVAL, DEFAULT_LOOP_INTERVAL);
getPotionCountRestockThreshold = () => getCharacterConfigSetting(SETTING_POTION_COUNT_RESTOCK_THRESHOLD, DEFAULT_POTION_COUNT_RESTOCK_THRESHOLD);
getPotionBuyCount = () => getCharacterConfigSetting(SETTING_POTION_BUY_COUNT, DEFAULT_POTION_BUY_COUNT);
getEnemyToKill = () => getCharacterConfigSetting(SETTING_ENEMY_TO_KILL, DEFAULT_ENEMY_TO_KILL);
getUseHealthPotionThreshold = () => getCharacterConfigSetting(SETTING_USE_HEALTH_POTION_THRESHOLD, DEFAULT_USE_HEALTH_POTION_THRESHOLD);
getUseManaPotionThreshold = () => getCharacterConfigSetting(SETTING_USE_MANA_POTION_THRESHOLD, DEFAULT_USE_MANA_POTION_THRESHOLD);
getHealRequestDelayInSeconds = () => getCharacterConfigSetting(SETTING_HEAL_REQUEST_DELAY_IN_SECONDS, DEFAULT_HEAL_REQUEST_DELAY_IN_SECONDS);
getSayIntervalInSeconds = () => getCharacterConfigSetting(SETTING_SAY_INTERVAL_IN_SECONDS, DEFAULT_SAY_INTERVAL_IN_SECONDS);

setLoopInterval = (newvalue) => setCharacterConfigSetting(SETTING_LOOP_INTERVAL, newValue);
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