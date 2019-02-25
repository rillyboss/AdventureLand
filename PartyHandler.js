setupParty = () => {
    if (isInParty()){
        game_log("Already in a Party. Leaving to join group.")
        leaveParty();
    }
	game_log("Searching for existing group party.");
	let partyLeader = findPartyLeader();
	if (partyLeader != null){
		game_log("Requesting to join " + partyLeader + "'s party");
		joinParty(partyLeader);
	} else {
		game_log("No party leader found. Starting new party.");
		initiateParty();
	}
}

leaveParty = () => {
    say('/leave');
}

isInParty = () => {
    return character.party !== undefined;
}

isPartyLeader = () => {
    return isInParty && character.party == character.name;
}

findPartyLeader = () => {
	for (var partyMember in PARTY_MEMBERS){
		let player = get_player(getPartyMemberName(partyMember));
		if (player && player.party !== undefined){
				return player.party;
		}
	}	
	return null;
}

joinParty = (partyLeaderName) => {
	send_party_request(partyLeaderName);
}

initiateParty = () => {
    for (var partyMember in PARTY_MEMBERS){
        if (getPartyMemberName(partyMember) != character.name){
			game_log("Inviting " + partyMember + " join party.");
            send_party_invite(getPartyMemberName(partyMember));
        }
    }
}

function on_party_invite(name){
    for (var partyMember in PARTY_MEMBERS){
        if (getPartyMemberName(partyMember) == name){
            accept_party_invite(name);
			return;
        }
    }
}

function on_party_request(name){
	for (var partyMember in PARTY_MEMBERS){
        if (getPartyMemberName(partyMember) == name){
			
            accept_party_request(name);
			return;
        }
    }
}

getPartyMemberName = (key) =>{
    return PARTY_MEMBERS[key];
}

setupParty();