function on_cm(from, data) {
	
	if (!data){
		game_log("Recieved empty command from " + from);
		return;
	}		
	
	if (!(data.authKey && data.authKey === authKey)){
		game_log("Recieved unauthorized command from " + from);
		return;
	}
	
	game_log("Recieved " + data.type + " command from " + from);
	
	switch (data.type){	
		case COMMAND_TYPES.SAY:
			say(data.payload);
			break;
			
		case COMMAND_TYPES.HEAL_REQUEST:
			say("Im healing " + from + "!");
			heal(get_player(from));
            break;
            
        case COMMAND_TYPES.SET_TARGET:
			setTarget(from);
			break;
			
		default:
			game_log("Unhandled command type.");
			break;
	}
}