const PARTY_MEMBERS = {
    RILLYBOSS: "RillyBoss",
    STEALYBOSS: "RillyBoss2",
    HEALYBOSS: "HealyBoss",
    DEALYBOSS: "DealyBoss",
    MELEEBOSS: "MeleeBoss"
};
​
const HEALER = PARTY_MEMBERS.HEALYBOSS;
​
const STATES = {
    PAUSED: 'PAUSED',
    INITIAL_STATE: 'INITIAL STATE',
    ATTACKING: 'ATTACKING',
    MOVING_TO_POTIONS: 'MOVING TO POTIONS',
    BUYING_POTIONS: 'BUYING POTIONS',
    MOVING_TO_ENEMIES: 'MOVING TO ENEMIES'
};
​
const COMMAND_TYPES = {
    SAY: 'SAY',
    HEAL_REQUEST: 'HEAL_REQUEST'
};