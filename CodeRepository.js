const repoURL = "https://raw.githubusercontent.com/rillyboss/AdventureLand/:branch/";

function CodeFile(slot, name, extension = ".js"){
    this.slot = slot;
    this.name = name;
    this.extension = extension;
}

const CodeFiles = [
    new CodeFile(1, "CodeRepository"), 
    new CodeFile(2, "Main"), 
    new CodeFile(3, "Constants"), 
    new CodeFile(4, "Config"),
    new CodeFile(5, "Enemies"),
    new CodeFile(6, "Inventory"),
    new CodeFile(7, "Locations"),
    new CodeFile(8, "SafeSay"),
    new CodeFile(9, "Shop"),
    new CodeFile(10, "Commands"),
    new CodeFile(11, "Party"),
    new CodeFile(12, "Targeting"),
    new CodeFile(13, "Combat"),
    new CodeFile(14, "StateMachine")
];

getCodeFromRemoteBranch = (branch) => {
    parent.api_call("list_codes", {
        callback: function () {
            game_log("Updating from remote branch " + branch);
            CodeFiles.forEach(file => {
                let request = new XMLHttpRequest();
                let path = repoURL.replace(":branch", branch) + file.name + file.extension;
                request.open("GET", path);
                game_log("Requesting " + path);
                request.onreadystatechange = function () {
                    if (request.readyState === 4 && request.status === 200) {
                        let data = {
                            name: codeObject.name,
                            slot: codeObject.slot,
                            code: request.responseText
                        };
                        parent.api_call("save_code", data);
                        game_log("Recieved " + JSON.stringify(file));
                    }
                };
                request.send();
            });
            game_log("Fetch Completed.");
        }
    });
}