getItemQuantity = (name) => {
	var item = character.items.find(x => x !== null && x.name == name);
	if (item) {
		return item.q;
	}
	return 0;
}

hasEnoughPotions = () => {
	let threshold = getPotionCountRestockThreshold();
	return (getItemQuantity(POTION_TYPES.HP_POTION_SMALL) >= threshold && getItemQuantity(POTION_TYPES.MP_POTION_SMALL) >= threshold);
}