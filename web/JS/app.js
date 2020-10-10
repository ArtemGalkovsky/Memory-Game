const columnsList = document.querySelectorAll(".column")
var clickList = []
var allColumns
var Allemojis

function shuffle (array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}



function getEmojis (emojis) {
	Allemojis = Array.from(emojis)
	let emojisUse = []
	console.log(emojis.length)

	for (let i = 0; i < Math.ceil(columnsList.length / 2); i++) {
 		let emoji = emojis[Math.floor(Math.random() * columnsList.length)] 
		console.log(emoji)
	
		if (columnsList.length % 2 != 0 && i === Math.floor(columnsList.length / 2)) {
			emojisUse.push(emoji)
		} else {
			emojisUse = emojisUse.concat([emoji, emoji])
		}
		emojis.splice(emojis.indexOf(emoji), 1)
	}

	emojisUse = shuffle(emojisUse)

	console.log(emojis.length)

	console.log(emojisUse, "EU")

	columnsList.forEach((item, index) => {
	
		item.dataset.content = item.firstChild.src = emojisUse[index]
		
		console.log(index, emojisUse[index])
	})
}

function gameStart () {

	allColumns = Array.from(columnsList)
	
	allColumns.forEach(item => {
		item.firstChild.src = item.dataset.content = "../img/emojis/No BG.webp"
	})

	const columnsCloseTimeout = setTimeout(() => {columnsList.forEach(item => {
		item.style.transform = 'rotateY(180deg)'
		item.firstChild.src = "../img/emojis/No BG.webp"
		item.onclick = () => {click(item)}
	})}, 15000)

	clickList = []

}

function click (btn) {
	clickList.push(btn)
	btn.style.transform = 'rotateY(0deg)'
	setTimeout(() => {btn.firstChild.src = btn.dataset.content}, 300)

	if (clickList.length > 2) {
		let element = clickList.shift()
		element.style.transform = 'rotateY(180deg)'
		element.firstChild.src = "../img/emojis/No BG.webp"
	}

	if (clickList.length === 2 && clickList[0].dataset.content === clickList[1].dataset.content) {

		clickList[0].onclick = undefined
		clickList[1].onclick = undefined
		
		allColumns.pop(clickList[0])
		allColumns.pop(clickList[1])

		clickList = []

		console.log(allColumns, allColumns.length)

	}
	console.log(clickList)

	if (allColumns.length < 3) {
		console.log("WIN!")
		columnsList.forEach(item => {
			item.style.transform = 'rotateY(180deg)' ? item.style.transform = 'rotateY(0deg)' : undefined
		})
		win_window.classList.remove("hide")

	}
}

let win_window = document.querySelector(".win_window")
let new_game_btn = document.querySelector(".new_game")

new_game_btn.addEventListener("click", () => {
	win_window.classList.add("hide")
	gameStart()
	getEmojis(Allemojis)
})

console.log("START")
gameStart()
