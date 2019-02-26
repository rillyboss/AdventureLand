getTargetEntityFromId = (id) => {
	try{
		return parent.entities[id];
	} catch {
		game_log(`Unable to find entity with id ${id}`)
		return null;
	}
}