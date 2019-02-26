function Command(type, payload) {
    this.type = type;
    this.payload = payload;
    this.authKey = authKey;
}

sendCommandtoParty = (command, sendToSelf = false) => {
    for (var key in PARTY_MEMBERS) {
        let name = PARTY_MEMBERS[key];
        if (name == character.name && !sendToSelf) {
            continue;
        }
        send_cm(name, command);
    }
}

function on_cm(from, data) {

	if (!data) {
		game_log(`Recieved empty command from ${from}`);
		return;
	}

	if (!(data.authKey && data.authKey === authKey)) {
		game_log(`Recieved unauthorized command from ${from}`);
		return;
	}

	game_log(`Recieved command: ${JSON.stringify(data.type)} - ${JSON.stringify(data.payload)} from ${from}`);

	switch (data.type) {
		case COMMAND_TYPES.SAY:
			safeSay(data.payload);
			break;

		case COMMAND_TYPES.HEAL_REQUEST:
			safeSay(`Im healing ${from}`);
			heal(get_player(from));
			break;

		case COMMAND_TYPES.SET_TARGET:
			setCombatTarget(data.payload);
			break;

		case UPDATE_ENEMY_TO_KILL:
			enemyToKill = data.payload;
			setState(STATES.MOVING_TO_ENEMIES);
			break;

		default:
			game_log("Unhandled command type");
			break;
	}
}