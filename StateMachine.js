let interval = getInterval();

setState = (newState) => {
	game_log(`${state} => ${newState}`, "#ff00dc");
	state = newState;
}

setState(STATES.INITIAL_STATE);

updateStateMachine = (myState) => {

	set_message(myState);

	requestHealing();

	switch (state) {

		case STATES.INITIAL_STATE:
			determineInitialState();
			break;

		case STATES.ATTACKING:
			updateCombatState();
			break;

		case STATES.MOVING_TO_POTIONS:
			moveToPotions();
			break;

		case STATES.BUYING_POTIONS:
			buyPotions();
			break;

		case STATES.MOVING_TO_ENEMIES:
			moveToEnemies();
			break;

		case STATES.PAUSED:
			//Do nothing. This is a manual pause.
			break;

		default:
			determineInitialState();
			break;
	}
}

setInterval(function () {
	updateStateMachine(state);
}, interval);

determineInitialState = () => {
	if (hasEnoughPotions()) {
		setState(STATES.MOVING_TO_ENEMIES);
	} else {
		setState(STATES.MOVING_TO_POTIONS);
	}
}