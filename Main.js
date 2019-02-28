//AuthKey needs to be created manually and expose a const string of authKey! I store this in slot 100.
loadCode("AuthKey"); 
loadCode("Constants"); 
loadCode("Enemies");
loadCode("Inventory");
loadCode("Locations");
loadCode("SafeSay");
loadCode("Config");
loadCode("Shop");
loadCode("Commands");
loadCode("Party");
loadCode("Targeting");
loadCode("Combat");
loadCode("StateMachine");
loadCode("ConsoleUtilities");

startCharacters = () => {    
    let characters = [TANK, HEALER, DPS];
    let charactersToLoad = characters.filter(x => x !== characters.name && get_player(x) == null);
    charactersToLoad.forEach(x => start_character(x, 'AutoStart'));
}

startCharacters();