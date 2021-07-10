function generateRandomDate(startDate, currentDate) {
    return new Date(startDate.getTime() + Math.random() * (currentDate.getTime() - startDate.getTime()));
}

function convertItToValid(time) {
    if (time < 10) {
        if (time == 0)
            time += 1;
        
        time = '0' + time;
    }
    
    return time;
}

function getRandomNumber(times) {
    var randomNumber = Math.round(Math.random() * times);

    return randomNumber;
}

findUsers();

function findUsers() {
    // The start date is the date when the first Github user is created
    var startDate = new Date(2007, 10, 21);
    var currentDate = new Date();
    
    var randomDate = generateRandomDate(startDate, currentDate);
    
    var month = randomDate.getMonth();
    var date = randomDate.getDate();
    
    month = convertItToValid(month);
    date = convertItToValid(date);
    
    var timeInString = randomDate.getFullYear() + "-" + month + "-" + date;
    
    var nonalphanumeric = '<';    
    var randomNumber = getRandomNumber(1);

    if(randomNumber == 1)
        nonalphanumeric = '>';
    
    var pageNumber = getRandomNumber(10);
    
    let url = 'https://api.github.com/search/users?q=created:' + nonalphanumeric + timeInString + '&page=' + pageNumber+ '&per_page=100';
    
    $.getJSON(url, function (data) {
        var tag, element, childtag, grandchildtag;

        let length = data.items.length;

        // When there is no enough data, method will call again
        if (length < 100)
            findUsers();

        for (var i = 0; i < length; i++){
            var id = Math.floor(i / 10);
           
            tag = document.getElementById("c" + id);
            console.log("c" + id);

            childtag = document.createElement("a");
            childtag.setAttribute("href", data.items[i].html_url);
            childtag.setAttribute("target", "_blank");
            tag.appendChild(childtag);

            grandchildtag = document.createElement("img");           
            grandchildtag.setAttribute("alt", data.items[i].login);
            grandchildtag.setAttribute("src", data.items[i].avatar_url);
            childtag.appendChild(grandchildtag);
        }
    });
};
