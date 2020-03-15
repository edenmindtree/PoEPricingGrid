/**
 * Function to set the stash grid overlay
 */
function SetStashUrl() {
    // must be logged into PoE with username
    const userName = `edenmind`;
    const league = `Delirium`;
    const stashNUmber = 5; // Stash numbers start at 0
    const myStashUrl = `https://www.pathofexile.com/character-window/get-stash-items?league=${league}&tabs=1&tabIndex=${stashNUmber}&accountName=${userName}`;
    // set href on UI
    document.getElementById('myStashUrl').href = myStashUrl;
}

/**
 * Function to get stash images and posisitions
 * Triggers on Import Stash button confirmation
 */
document.getElementById('importStashButton').onclick = function() {
    ClearGrid(false, true);
    // Get stash items from my logged-in PoE stash
    var responseText = document.getElementById("stashTextArea").value;
    var responseObj = JSON.parse(responseText);
    var items = responseObj.items;
    var tab = responseObj.tabs;

    console.log(items);

    for(var i = 0; i < items.length; i++) {
        // get item data
        var url = items[i].icon;
        var y = items[i].y;
        var x = items[i].x;
        const league = items[i].league;
        const name = items[i].name;
        const typeLine = items[i].typeLine;

        // set image to input on grid
        var cellImages = document.getElementsByClassName("cellInput");
        for(var j = 0; j < cellImages.length; j++) {
            if(cellImages[j].getAttribute('y') === `${y}` && cellImages[j].getAttribute('x') === `${x}`) {
                // set image icon
                cellImages[j].style.backgroundImage = `url("${url}")`;

                // set price
                cellImages[j].value = (items[i].note).split("~price ")[1];

                // set tooltip
                var itemToolTip = document.createElement("span");
                itemToolTip.className = (`tooltiptext`);
                var separator = ` - `;
                if(name == "" || typeLine == "") {
                    var separator = ``;
                }
                itemToolTip.innerHTML = (`${name}${separator}${typeLine}`);
                cellImages[j].parentElement.appendChild(itemToolTip);
            }
        }
    }
    SetStashPricePost();
}


/**
 * Function to get and display the forum post
 */
function SetStashPricePost() {

	const league = `Delirium`;
	const cellInput = document.getElementsByClassName('cellInput');
	var postText = [];

	for(var i=0; i < cellInput.length; i++) {
		var thisInputValue = cellInput[i].value;
		if(thisInputValue !== "") {

			const y = cellInput[i].getAttribute("y");
			const x = cellInput[i].getAttribute("x");
			
			postText.push(`[linkItem location="Stash6" league="${league}" x="${x}" y="${y}"]`);
			postText.push(`~b/o ${thisInputValue}`);
		}
	}

	postText = postText.join("\n");
	document.getElementById('postTextArea').value = postText;
};