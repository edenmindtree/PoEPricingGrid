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

			cellDiv.setAttribute("y",_y);
			cellDiv.setAttribute("x",_x);
			
			gridRow.appendChild(cell);
		}
	}
}


/**
 * Function to clear the grid
 */
function ClearGrid(clearNumbers, clearPictures) {
	const cells = document.getElementsByClassName('cell');
	for(var i=0; i < cells.length; i++) {
		while (cells[i].firstChild) {
			cells[i].removeChild(cells[i].firstChild);
		}		
	}
}
