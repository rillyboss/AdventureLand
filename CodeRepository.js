const repoURL = "https://raw.githubusercontent.com/rillyboss/AdventureLand/master/";

function CodeFile(slot, name, extension = ""){
    this.slot = slot;
    this.name = name;
    this.extension = extension;
}

let codeFiles = [
    new Codefile(2, "Constants"), 
    new Codefile(2, "Constants"), 
    new Codefile(3, "Config"),
    new Codefile(4, "Enemies"),
    new Codefile(5, "Inventory"),
    new Codefile(6, "Locations"),
    new Codefile(7, "SafeSay"),
    new Codefile(8, "Shop"),
    new Codefile(9, "Commands"),
    new Codefile(10, "Party"),
    new Codefile(11, "Targeting"),
    new Codefile(12, "Combat"),
    new Codefile(13, "StateMachine")
];

function getCodeFromGitHub() {
    parent.api_call("list_codes", {
        callback: function () {
            game_log("Updating from GitHub..."),
            codeFiles.foreach((codeFile) => {
                let request = new XMLHttpRequest();
                request.open("GET", repoURL + codeFile.name + codeFile.extension);
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