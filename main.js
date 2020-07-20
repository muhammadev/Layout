function placeItems() {
	/**
	 	* first step: get the elements
		* to determin how much vertical free space is there: **DONE**
				1. the space take by one element will be its width + the gap: 250px + 20px = 270px;
				2. if the entire width of the window is 1200px, so 1200/270=4.444 which means it can take up to 4 elements
	 	* the process:
				1. determine how many elements will take the calculated vertical free space. **DONE**
				2. if the free space can take, for example, up to 5 elements vertically.
						give each element an order from 1 to 5, repeatedly: 1 2 3 4 5, 1 2 3 4 5, etc. **DONE**
				3. each element will look for if it has a previous element above it or at the left.
						determine that by comparing the order, for example, if the current element to be placed has index 6
						(the 7th element) then 6-5=1, so 1 is the index of the element that is exactly above the 7th element
						thus, the horizontal place determined.
						the vertical place can be determined easily by looking to the order of the element, if the current
						element to be placed has order 7 (the 7th element that has index 6), then 7-5=2, which means that 
						it's the second element in the row.
			 
	*/

	let windowWidth = elementsContainer.getBoundingClientRect().width;
	let children = document.getElementsByClassName("child");
	children = Array.from(children);
	let childWidth = children[0].getBoundingClientRect().width; // all children has same width;
	let gap = 10; // gap between elements
	let actualWidth = childWidth + gap;

	let verticalCapacity = Math.floor((windowWidth-20)/actualWidth);
	let containerHeight = 0;

	children.forEach((child, index) => {
		// get the order of current element in the row
		let neededSubs;
		let orderInRow;
		if (index < verticalCapacity) {
			orderInRow = 0;
			orderInRow = index+1
		}
		if (index >= verticalCapacity) {
			neededSubs = Math.floor(index/verticalCapacity);
			orderInRow = index;
			for (let i=0; i < neededSubs; i++) {
				orderInRow -= verticalCapacity;
			}
			orderInRow += 1;
		}

		// get the order of current element in the row
		let orderInColumn = Math.ceil((index+1)/verticalCapacity);

		let childHeight = 0;
		let horizontalSpace = 0;
		for (let i=0; i < (orderInColumn-1); i++) {
			childHeight = children[index - (verticalCapacity * (i+1))].getBoundingClientRect().height
			horizontalSpace += childHeight;
		}

		let containerX = elementsContainer.getBoundingClientRect().x + 10;
		let containerY = elementsContainer.getBoundingClientRect().y + 10;

		let verticalSpace = childWidth*(orderInRow-1) + (gap * (orderInRow-1)) + gap;
		horizontalSpace = horizontalSpace + (gap * (orderInColumn-1)) + gap;
		child.style.transform = `translate(${verticalSpace}px, ${horizontalSpace}px)`;
	})

	setTimeout(function() {
		elementsContainer.style.height = document.body.scrollHeight + gap + "px";
	}, 310)
}

window.onload = placeItems;
window.onresize = placeItems;