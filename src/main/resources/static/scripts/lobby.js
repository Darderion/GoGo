//-----------------------------------------------------------------------------------------------------------------------------------------
let player = 0
let players = {
	'memePlayer': 'delamain',
	'somePlayer': 'JotaroProfile',
	'YEA': 'DioProfile',
	'meme': 'delamain'
}
let characterImgList = []
Object.keys(imagesUrls['profileImages']).forEach(key => {
	characterImgList.push(imagesUrls['profileImages'][key])
})

// ----------------------------------------	// should be an ajax requests//-----------------------------------------------------------------

let playerCurrent = 'delamain'
playersColors = ['red', 'blue', 'green', 'purple']

let wrapper = $('#lobby')
let characterSelectorScreen = $('#characterSelector')
let numberOfRows = Math.ceil(characterImgList.length / 5)
wrapper.height(numberOfRows * characterSelectorScreen.width() / 5)
characterSelectorScreen.css('grid-template', `repeat(${numberOfRows}, auto) / repeat(5, auto)`)

let divs = []
characterImgList.forEach((img, index) => {
	let characterImg = document.createElement('div')
	characterImg.style.backgroundImage = (`url(${img})`)
	characterImg.id = img.split("/").pop().split('.')[0]
	characterImg.classList.add('characterImg')
	characterSelectorScreen.append(characterImg)
	divs.push(characterImg)
})

let selectors = []
let zIndexes = [
	[4, 1, 3, 2],
	[1, 3, 2, 4],
	[3, 2, 4, 1],
	[2, 4, 1, 3]
]

Object.keys(players).forEach((_, index) => {
	let selector = document.createElement('div')
	selector.style.width = (divs[0].offsetWidth) + 'px'
	selector.style.height = (divs[0].offsetHeight) + 'px'
	selector.style.position = 'absolute'
	selector.classList.add('selector')
	selector.style.display = 'grid'
	selector.style.gridTemplate = 'auto auto / auto auto'

	let parts = ['Top-Left', 'Top-Right', 'Bottom-Left', 'Bottom-Right']

	parts.forEach((part, _index) => {
		let selectorPart = document.createElement('div')
		selectorPart.style.zIndex = zIndexes[_index][index]
		part.split('-').forEach(borderDirection => {
			selectorPart.style[`border${borderDirection}`] = `solid 10px ${playersColors[index]}`
		})
		selector.append(selectorPart)
	})

	selector.id = `player${index}`
	characterSelectorScreen.append(selector)
	selectors.push(selector)
})

let isMoving = false
let speed = 500
divs.forEach(div => {
	div.onclick = _ => {
		if (isMoving) {
			return
		}
		isMoving = true
		playerCurrent = div.id
		$(`#${selectors[player].id}`).animate({
			left: `${div.offsetLeft}px`,
			top: `${div.offsetTop}px`,
		}, speed, _ => {
			isMoving = false
		})
	}
})

const token = $('#urlToken').text();
const lobby = $('#urlLobby').text();

$.ajax(`api/getLobbyInfo?lobby=${lobby}`, {
	success: lobbyInfo => {

	}
})
