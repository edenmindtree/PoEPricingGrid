/**
 * Function to set the stash grid overlay
 */
function RenderGrid() {
	// PoE Stash is 12 x 12
	// stash slot space numbers start at 0,0
	x = 12;
	y = 12;

	// Grid Parent
	const gridParent = document.getElementById('grid');
	// Grid Table
	const gridTable = document.getElementById('gridTable');

	// Cell Rows
	for(var _y=0; _y < y; _y++) {
		const gridRow = document.createElement('tr');
		gridRow.className = ('row');
		gridTable.appendChild(gridRow);

		// Columns
		for(var _x=0; _x < x; _x++) {

			// Cells
			const cell = document.createElement('td');
			const cellDiv = document.createElement('div');

			cell.appendChild(cellDiv);
			cellDiv.className = ('cell');

			// cell price input
			const cellInput = document.createElement('input');
			cellInput.type = ('text');
			cellInput.className = ('cellInput');
			cellInput.setAttribute("y",_y);
			cellInput.setAttribute("x",_x);

			cellDiv.appendChild(cellInput);
			gridRow.appendChild(cell);
		}
	}
}

/**
 * Function to get and display the forum post
 */
document.getElementById('getPostButton').onclick = function() {

	const league = `Metamorph`;
	const cellInput = document.getElementsByClassName('cellInput');
	var postText = [];

	for(var i=0; i < cellInput.length; i++) {
		var thisInputValue = cellInput[i].value;
		if(thisInputValue !== "") {

			const y = cellInput[i].getAttribute("y");
			const x = cellInput[i].getAttribute("x");
			
			var currency = "chaos";
			if(thisInputValue.includes("exalted")) {
				currency = "exalted";
				thisInputValue = thisInputValue.split(" ")[0];
			}

			postText.push(`[linkItem location="Stash6" league="${league}" x="${x}" y="${y}"]`);
			postText.push(`~b/o ${thisInputValue} ${currency}`);
		}
	}

	postText = postText.join("\n");
	document.getElementById('postTextArea').value = postText;
};

/**
 * Import values from post Text
 */
document.getElementById('importPostButton').onclick = function() {
	const postTextAreaText = document.getElementById("postTextArea").value;
	var lines = postTextAreaText.split('\n');

	var foundPrices = [];

	var foundItem = false;
	var y = null;
	var x = null;
	var price = null;
	try {
		lines.forEach(line => {

			var itemRegex = /\[linkItem location="\w+" league="\w+" x="\d+" y="\d+"]/gis;
			var priceRegex = /~b\/o \d+ \w+/gis;
			var xRegex = /x="\d+"/g;
			var yRegex = /y="\d+"/g;
			var valueRegex = /\d+/g;
	
			if(line.match(itemRegex)) {
	
				var getX = xRegex.exec(line)[0];
				var getY = yRegex.exec(line)[0];
	
				x = valueRegex.exec(getX)[0];
				// have to rest valueRegex
				valueRegex = /\d+/g;
				y = valueRegex.exec(getY)[0];
	
				foundItem = true;
			}
			else if(foundItem && line.match(priceRegex)) {
				price = valueRegex.exec(line)[0];
			}
	
			if(foundItem && y && x && price) {
	
				foundPrices.push({
					'y' : y,
					'x' : x,
					'price' : price
				});
	
				// reset item values
				foundItem = false;
				y = null;
				x = null;
				price = null;
			}
		});	

		ClearGrid(true, false);
		foundPrices.forEach(price => {
			const cellInput = document.getElementsByClassName('cellInput');
			for(var i=0; i < cellInput.length; i++) {
				if(cellInput[i].getAttribute('x') == `${price.x}` && cellInput[i].getAttribute('y') == `${price.y}`) {
					cellInput[i].value = price.price;
				}
			}
		});

	} catch (error) {
		console.log("Try not sucking...", error);
	}

}

/**
 * Function to clear the grid on button push
 */
document.getElementById('clearGridButton').onclick = function() {
	ClearGrid(true, true);
}
function ClearGrid(clearNumbers, clearPictures) {
	const cellInput = document.getElementsByClassName('cellInput');
	for(var i=0; i < cellInput.length; i++) {
		if(clearNumbers) {
			cellInput[i].value = "";
		}
		if(clearPictures) {
			cellInput[i].style.backgroundImage = `none`;
		}
		
	}
}
