moveToPotions = () => {
	if (!is_moving(character)) {
		smart_move(WORLD_LOCATIONS.POTIONS, () => { setState(STATES.BUYING_POTIONS) });
	}
}

buyPotions = () => {
	let healthPotionsCount = potionBuyCount - getItemQuantity(POTION_TYPES.HP_POTION_SMALL);
	let manaPotionsCount = potionBuyCount - getItemQuantity(POTION_TYPES.MP_POTION_SMALL);
	if (healthPotionsCount > 0) {
		buy_with_gold(POTION_TYPES.HP_POTION_SMALL, healthPotionsCount);
		game_log(`Bought ${healthPotionsCount} health potions.`);
	}
	if (manaPotionsCount > 0) {
		buy_with_gold(POTION_TYPES.MP_POTION_SMALL, manaPotionsCount);
		game_log(`Bought ${manaPotionsCount} mana potions.`);
	}
	setState(STATES.MOVING_TO_ENEMIES);
}