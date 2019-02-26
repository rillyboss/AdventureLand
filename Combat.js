updateCombatState = () => {
	let healThreshold = character.max_hp * .15;
	let manaThreshold = character.max_mp * .05;
	if (hasEnoughPotions()) {
		try {
			useHealthPotion(healThreshold);
			useManaPotion(manaThreshold);
			loot();
			findCombatTarget();
			moveToCombatTarget();
			autoAttack();
		} catch (e) {
			combatTarget = null;
		}
	} else {
		setState(STATES.MOVING_TO_POTIONS);
	}
}

autoAttack = () => {
	if (canAttack()) {
		attack(combatTarget);
	}
}

canAttack = () => {
	return (character.rip || is_moving(character) || !combatTarget || can_attack(combatTarget));
}

moveToCombatTarget = () => {
	if (!combatTarget) {
		return;
	}

	if (!in_attack_range(combatTarget)) {
		move(
			character.x + (combatTarget.x - character.x) / 2,
			character.y + (combatTarget.y - character.y) / 2
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

moveToEnemies = () => {
	if (!is_moving(character)) {
		smart_move(enemyToKill, () => { setState(STATES.ATTACKING) });
	}
}

requestHealing = (requestThreshold) => {
	if (new Date() > nextValidHealRequestDate) {
		if (character.hp < character.max_hp / 2) {
			safeSay(`${HEALER}, I need healing!`);
			send_cm(HEALER, new Command(COMMAND_TYPES.HEAL_REQUEST, ""));
			var newDate = new Date();
			newDate.setSeconds(newDate.getSeconds() + healRequestDelayInSeconds);
			nextValidHealRequestDate = newDate;
		}
	}
}

findCombatTarget = () => {
	if (!combatTarget || combatTarget.dead) {
		combatTarget = get_nearest_monster({ min_xp: 100, max_att: 120, type: enemyToKill });
		if (combatTarget) {
			useCombatBuffAbility();
			change_combatTarget(combatTarget);
			if (character.ctype == "warrior") {
				sendCommandtoParty(new Command(COMMAND_TYPES.SET_TARGET, combatTarget.id));
			}
		}
	}
}

setCombatTarget = (id) => {
	let newTarget = getTargetEntityFromId(id);
	if (newTarget !== null) {
		combatTarget = newTarget;
		change_combatTarget(combatTarget);
	}
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