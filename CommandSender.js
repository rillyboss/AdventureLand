sendCommandtoParty = (command, sendToSelf = false) => {
    for (var key in PARTY_MEMBERS) {
        let name = PARTY_MEMBERS[key];
        if (name == character.name && !sendToSelf) {
            continue;
        }
        send_cm(name, command);
    }
}