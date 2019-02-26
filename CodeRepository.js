scriptLoadError = (scriptName) => game_log(`Error Loading Script: ${scriptName}`);
loadCode = (scriptName) => load_code(scriptName, () => scriptLoadError(scriptName));

const repoURL = "https://raw.githubusercontent.com/:user/:repo/:branch/";

function CodeFile(slot, name, extension = ".js"){
    this.slot = slot;
    this.name = name;
    this.extension = extension;
}

getRepoUrl = (user, repo, branch) => {
    return repoURL.replace(":user", user).replace(":repo", repo).replace(":branch", branch);
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
    new CodeFile(14, "StateMachine"),
    new CodeFile(15, "ConsoleUtilties")
];

fetchCodeFromRemoteBranch = (user, repo, branch) => {
    let recievedCount = 0;
    parent.api_call("list_codes", {
        callback: () => {
            game_log("Fetching updated code from remote branch " + branch);
            CodeFiles.forEach(file => {
                let request = new XMLHttpRequest();
                let filePath = `${getRepoUrl(user, repo, branch)}${file.name}${file.extension}`;
                request.open("GET", filePath);                
                request.onreadystatechange = () => {
                    if (request.readyState === 4 && request.status === 200) {
                        let data = {
                            name: file.name,
                            slot: file.slot,
                            code: request.responseText
                        };
                        parent.api_call("save_code", data);
                        game_log(`Recieved ${file.slot} - ${file.name}`);
                        recievedCount++;
                        if (recievedCount == CodeFiles.length){
                            game_log('Fetch Completed.');
                            startBot();
                        }
                    }
                };
                request.send();
            });
        }
    });
}

startBot = () => {    
    loadCode("Main");
}