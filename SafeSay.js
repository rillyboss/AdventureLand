safeSay = (message) => {
    if (new Date() >= nextSayAllowedDate){
        say(message);
        updateSayInterval();        
    }
}

updateSayInterval = () => {
    var date = new Date();
    date.setSeconds(date.getSeconds() + sayIntervalInSeconds);
    nextSayAllowedDate = date;
}
