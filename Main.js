scriptLoadError = (scriptName) => game_log("Error Loading " + scriptName + " Script");
loadCode = (scriptName) => load_code(scriptName, scriptLoadError(scriptName));

loadCode("Constants"); 
loadCode("Config");
loadCode("Enemies");
loadCode("Inventory");
loadCode("Locations");
loadCode("SafeSay");
loadCode("Shop");
loadCode("Commands");
loadCode("Party");
loadCode("Targeting");
loadCode("Combat");
loadCode("StateMachine");