setState = (newState) => {
	game_log("New State: " + newState, "#ff00dc");
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

hasEnoughPotions = () => {
	return (getItemQuantity("mpot0") >= potionThreshold && getItemQuantity("hpot0") >= potionThreshold);
}

moveToEnemies = () => {
	if (!is_moving(character)) {
		smart_move(enemyToKill, () => { setState(STATES.ATTACKING) });
	}
}

moveToPotions = () => {
	if (!is_moving(character)) {
		smart_move("potions", () => { setState(STATES.BUYING_POTIONS) });
	}
}

buyPotions = () => {
	let healthPotionsCount = potionBuyCount - getItemQuantity("hpot0");
	let manaPotionsCount = potionBuyCount - getItemQuantity("mpot0");
	if (healthPotionsCount > 0) {
		buy_with_gold("hpot0", healthPotionsCount);
		game_log("Bought " + healthPotionsCount + " health potions.");
	}
	if (manaPotionsCount > 0) {
		buy_with_gold("mpot0", manaPotionsCount);
		game_log("Bought " + manaPotionsCount + " mana potions.");
	}
	setState(STATES.MOVING_TO_ENEMIES);
}

updateCombatState = () => {
	let healThreshold = character.max_hp * .15;
	let manaThreshold = character.max_mp * .05;
	if (hasEnoughPotions()) {
		try {
			useHealthPotion(healThreshold);
			useManaPotion(manaThreshold);
			loot();
			findTarget();
			moveToTarget();
			autoAttack();
		} catch (e) {
			target = null;
		}
	} else {
		setState(STATES.MOVING_TO_POTIONS);
	}
}

requestHealing = (requestThreshold) => {
	if (new Date() > nextValidHealRequestDate) {
		if (character.hp < character.max_hp / 2) {
			say(HEALER + ", I need healing!");
			send_cm(HEALER, new Command(COMMAND_TYPES.HEAL_REQUEST, ""));
			var newDate = new Date();
			newDate.setSeconds(newDate.getSeconds() + healRequestDelayInSeconds);
			nextValidHealRequestDate = newDate;
		}
	}
}

autoAttack = () => {
	if (canAttack()) {
		attack(target);
	}
}

findTarget = () => {
	if (!target || target.dead) {
		target = get_nearest_monster({ min_xp: 100, max_att: 120, type: enemyToKill });
		if (target) {
			useCombatBuffAbility();
			change_target(target);
			if (character.ctype == "warrior") {
				sendCommandtoParty(new Command(COMMAND_TYPES.SET_TARGET, target.mtype));
			}
		}
	}
}

setTarget = (id) => {
	let newTarget = get_target_of(id);
	if (newTarget !== null) {
		target = newTarget;
		change_target(target);
	}
}

canAttack = () => {
	return (character.rip || is_moving(character) || !target || can_attack(target));
}

moveToTarget = () => {
	if (!target) {
		return;
	}

	if (!in_attack_range(target)) {
		move(
			character.x + (target.x - character.x) / 2,
			character.y + (target.y - character.y) / 2
		);
	}
}

useHealthPotion = (healthPotionThreshold) => {
	if (character.hp <= healthPotionThreshold) {
		game_log("Restoring HP");
		use("use_hp");
	}
}

useManaPotion = (manaPotionThreshhold) => {
	if (character.mp <= manaPotionThreshhold) {
		game_log("Restoring MP");
		use("use_mp");
	}
}

getItemQuantity = (name) => {
	var item = character.items.find(x => x !== null && x.name == name);
	if (item) {
		return item.q;
	}
	return 0;
}

useCombatBuffAbility = () => {
	switch (character.ctype) {

		case "rogue":
			if (can_use("invis")) {
				game_log("Using Assassins Smoke");
				use("invis");
			}
			break;

		default:
			break;
	}
}