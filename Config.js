let interval = 1000 / 4;
let potionThreshold = 20;
let potionBuyCount = 200;
let state = "";
let enemyToKill = ENEMY_TYPES.GOO;
let nextValidHealRequestDate = new Date();
let healRequestDelayInSeconds = 1;
let sayIntervalInSeconds = 15;
let nextSayAllowedDate = new Date();