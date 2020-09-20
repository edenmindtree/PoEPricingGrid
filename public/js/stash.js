const stash = {
    league: `Heist`,
    userName: `edenmind`,
    stashNumber: 5,
    baseUrl: "http://localhost:3000"
}

/**
 * Function to get stash images and posisitions
 * Triggers on Import Stash button confirmation
 */
document.getElementById('importStashButton').onclick = function() {
    ClearGrid(true, true);
    // Get stash items from my logged-in PoE stash
    var inputValue = document.getElementById("currentStashIndex").value;
    if(inputValue && !isNaN(inputValue) ) {
        stash.stashNumber = inputValue;
    }
    else {
        document.getElementById("currentStashIndex").value = "5";
    }
    
    console.log("Stash URL:", `https://www.pathofexile.com/character-window/get-stash-items?league=${stash.league}&tabs=1&tabIndex=${stash.stashNumber}&accountName=${stash.userName}`);
    
    var requestUrl = `${stash.baseUrl}/stash/${stash.league}/${stash.userName}/${stash.stashNumber}`;
    var stashRequest = $.get(requestUrl,function( data ) {
        console.log(data);
        
        var items = data.items;
        var tab = data.tabs;
    
        for(var i = 0; i < items.length; i++) {
            // get item data
            var iconUrl = items[i].icon;
            var y = items[i].y;
            var x = items[i].x;
            const name = items[i].name;
            const typeLine = items[i].typeLine;
    
            // set image to input on grid
            var cells = document.getElementsByClassName("cell");
            for(var j = 0; j < cells.length; j++) {
                if(cells[j].getAttribute('y') === `${y}` && cells[j].getAttribute('x') === `${x}`) {
                    // set image icon
                    var imgElement = document.createElement('img');
                    imgElement.id = `img-${j}`;
                    imgElement.src = iconUrl;
                    cells[j].appendChild(imgElement);
    
                    // set price
                    if(items[i].note) {
                        cells[j].setAttribute("price", items[i].note.replace("~price ", ""));
                    }

                    // set tooltip
                    var itemToolTip = document.createElement("span");
                    itemToolTip.className = (`tooltiptext`);
                    var separator = ` - `;
                    if(name == "" || typeLine == "") {
                        var separator = ``;
                    }
                    itemToolTip.innerHTML = (`${name}${separator}${typeLine}`);
                    cells[j].appendChild(itemToolTip);
                }
            }
        }
        SetStashPricePost();
    });
}


/**
 * Function to get and display the forum post
 */
function SetStashPricePost() {
	const cells = document.getElementsByClassName('cell');
	var postText = [];

	for(var i=0; i < cells.length; i++) {
		var thisInputValue = cells[i].getAttribute("price");
		if(thisInputValue && thisInputValue !== "") {

			const y = cells[i].getAttribute("y");
			const x = cells[i].getAttribute("x");
			let stashNumber = parseInt(stash.stashNumber) + 1;
			postText.push(`[linkItem location="Stash${stashNumber}" league="${stash.league}" x="${x}" y="${y}"]`);
			postText.push(`~b/o ${thisInputValue}`);
		}
	}

	postText = postText.join("\n");
	document.getElementById('postTextArea').value = postText;
};