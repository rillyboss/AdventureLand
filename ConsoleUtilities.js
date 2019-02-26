updateEnemiesToKill = (newEnemiesToKill) => {
    sendCommandtoParty(new Command(COMMAND_TYPES.UPDATE_ENEMY_TO_KILL, newEnemiesToKill), true);
}