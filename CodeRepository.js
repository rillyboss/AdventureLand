const repoURL = "https://raw.githubusercontent.com/rillyboss/AdventureLand/:branch/";

function CodeFile(slot, name, extension = ""){
    this.slot = slot;
    this.name = name;
    this.extension = extension;
}

let CodeFiles = [
    new CodeFile(2, "CodeRepositorys"), 
    new CodeFile(2, "Main"), 
    new CodeFile(3, "Constants"), 
    new CodeFile(4, "Constants"), 
    new CodeFile(5, "Config"),
    new CodeFile(6, "Enemies"),
    new CodeFile(7, "Inventory"),
    new CodeFile(8, "Locations"),
    new CodeFile(9, "SafeSay"),
    new CodeFile(10, "Shop"),
    new CodeFile(11, "Commands"),
    new CodeFile(12, "Party"),
    new CodeFile(13, "Targeting"),
    new CodeFile(14, "Combat"),
    new CodeFile(15, "StateMachine")
];

getCodeFromRemoteBranch = (branch) => {
    parent.api_call("list_codes", {
        callback: function () {
            game_log("Updating from GitHub..."),
            CodeFiles.foreach((CodeFile) => {
                let request = new XMLHttpRequest();
                request.open("GET", repoURL.replace(":branch", branch) + CodeFile.name + CodeFile.extension);
                request.onreadystatechange = function () {
                    if (request.readyState === 4 && request.status === 200) {
                        let data = {
                            name: codeObject.name,
                            slot: codeObject.slot,
                            code: request.responseText
                        };
                        parent.api_call("save_code", data);
                    }
                };
                request.send();
            });
        }
    });
}