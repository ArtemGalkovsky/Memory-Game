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
		//i % 2 != 0 && columnsList.length % 2 != 0 && i === Coulums ? emojisUse.push(emoji) : emojisUse = emojisUse.concat([emoji, emoji])
		if (columnsList.length % 2 != 0 && i === Math.floor(columnsList.length / 2)) {
			emojisUse.push(emoji)
		} else {
			emojisUse = emojisUse.concat([emoji, emoji])
		}
		emojis.splice(emojis.indexOf(emoji), 1)
		//console.log(emojis.length)
		//console.log(emojis.pop(emoji), "D")
		//console.log(emoji)
		// emojisUse.push(emoji)
		// emojisUse
		//console.log(i, Math.floor(columnsList.length / 2), emoji)
		//console.log()
	}

	emojisUse = shuffle(emojisUse)

	console.log(emojis.length)

	//shuffle(emojisUse)

	console.log(emojisUse, "EU")

	columnsList.forEach((item, index) => {
		//console.log(item, item.textContent, item.firstChild)
		// item.firstChild.src = emojisUse[index]
		item.dataset.content = item.firstChild.src = emojisUse[index]
		//console.log(item.firstChild)
		//console.log("TC")
		//console.dir(item)
		//console.log(item, index, emojisUse[index])
		console.log(index, emojisUse[index])
	})//; console.log(item.nextElementSibling); console.log(item.nextElementSibling); console.log(item.nextElementSibling); console.log(item.nextElementSibling); console.log(item.nextElementSibling)})
	//console.log(emojis)
}

// columnsList.forEach((item) => {item.dataset.content = item.nextSibling.src})

function gameStart () {

	allColumns = Array.from(columnsList)
	
	allColumns.forEach(item => {
		item.firstChild.src = item.dataset.content = "../img/emojis/No BG.webp"
	})

	//console.log(columnsList)
	//console.dir(columnsList)
	//console.log(allColumns)

	const columnsCloseTimeout = setTimeout(() => {columnsList.forEach(item => {
		item.style.transform = 'rotateY(180deg)'
		item.firstChild.src = "../img/emojis/No BG.webp"
		item.onclick = () => {click(item)}
		//console.log("time")
	})}, 15000)//5000000)

	clickList = []

}

function click (btn) {
	//console.log(btn, "click")
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
		
		//columnsList.pop(clickList[0])
		//columnsList.pop(clickList[1])
		allColumns.pop(clickList[0])
		allColumns.pop(clickList[1])

		clickList = []

		console.log(allColumns, allColumns.length)

	}
	console.log(clickList)

	if (allColumns.length < 10) {//(clickList.length === 0) {
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
//let leave_btn = document.querySelector(".leave")

//leave_btn.addEventListener("click", window.top.close())

// function playing (action) {



// 	//if (action === "stop") {
// 	//	querySelector(".win_window")
// 	//}
// }
