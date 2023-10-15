let inputDir = { x: 0, y: 0 };
let gameSpeed = 2;
let lastPaintTime = 0;
let speed = 2;
let snakeArr = [{ x: 15, y: 16 }];
let foodPos = { x: 4, y: 6 };
const board = document.querySelector(".board");
// console.log("board", board);
// main();
function main(cTime) {
	window.requestAnimationFrame(main);
	if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
		return;
	} else {
		lastPaintTime = cTime;
		gameEngine();
		// console.log(cTime);
	}
}

function collide() {
	return false;
}

// generate random number
function randomIntFromInterval(min, max) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function gameEngine() {
	if (collide()) {
		alert("game over");
	}
	// if the snake eats the food then
	if (snakeArr[0].x === foodPos.x && snakeArr[0].y === foodPos.y) {
		snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
		// change food position
		foodPos = { x: randomIntFromInterval(1, 18), y: randomIntFromInterval(1, 18) };
	}
	//move the snake
	for (let i = snakeArr.length - 2; i >= 0; i--) {
		snakeArr[i + 1] = { ...snakeArr[i] };
	}

	snakeArr[0].x += inputDir.x;
	snakeArr[0].y += inputDir.y;

	board.innerHTML = "";
	// update snake and food
	// display snake body
	snakeArr.forEach((el, i) => {
		const snakeElement = document.createElement("div");
		snakeElement.style.gridRowStart = el.y;
		snakeElement.style.gridColumnStart = el.x;
		if (i == 0) {
			snakeElement.classList.add("snake-head");
		} else {
			snakeElement.classList.add("snake-body");
		}
		board.appendChild(snakeElement);
	});
	//render food
	const foodElement = document.createElement("div");
	foodElement.style.gridRowStart = foodPos.y;
	foodElement.style.gridColumnStart = foodPos.x;
	foodElement.classList.add("food");
	board.appendChild(foodElement);
}

// update input direction based on key press

window.addEventListener("keydown", function (e) {
	switch (e.key) {
		case "ArrowUp":
			inputDir.x = 0;
			inputDir.y = -1;
			break;
		case "ArrowDown":
			inputDir.x = 0;
			inputDir.y = 1;
			break;
		case "ArrowLeft":
			inputDir.x = -1;
			inputDir.y = 0;
			break;
		case "ArrowRight":
			inputDir.x = 1;
			inputDir.y = 0;
			break;
		default:
			break;
	}
});
