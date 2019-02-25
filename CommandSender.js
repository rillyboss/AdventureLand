sendCommandtoParty = (command, sendToSelf = false) => { 
    for (var key in PARTY_MEMBERS){
        let name =  PARTY_MEMBERS[key];
        if (name == character.name && !sendToSelf){
            continue;
        }
        send_cm(name, command);
    }   
}
​
//sendCommandtoParty(new Command(COMMAND_TYPES.SAY, "Incoming Command From HealyBoss"));