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

let playersSelectorsSettings = {
	colors : ['red', 'blue', 'green', 'purple'],
	playerCurrentCharacter : players[Object.keys(players)[player]]
}

let lobbyQuerySelectors = {
	wrapper : $('#lobby'),
	characterSelectorScreen : $('#characterSelector')
}

let characterSelectorScreenObj = {
	divs : [],
	selectors : [],
	zIndexes : [
		[4, 1, 3, 2],
		[1, 3, 2, 4],
		[3, 2, 4, 1],
		[2, 4, 1, 3]
	]
}

let selectorMovingParams = {
	isMoving : false,
	speed : 500
}

let initLobbyGuiStyles = _ => {
	let numberOfRows = Math.ceil(characterImgList.length / 5)
	lobbyQuerySelectors.wrapper.height(numberOfRows * lobbyQuerySelectors.characterSelectorScreen.width() / 5)
	lobbyQuerySelectors.characterSelectorScreen.css('grid-template', `repeat(${numberOfRows}, auto) / repeat(5, auto)`)
}

let placeImagesOnCharacterSelectionScreen = _ => {
	characterImgList.forEach((img) => {
		let characterImg = document.createElement('div')
		characterImg.style.backgroundImage = (`url(${img})`)
		characterImg.id = img.split("/").pop().split('.')[0]
		characterImg.classList.add('characterImg')
		lobbyQuerySelectors.characterSelectorScreen.append(characterImg)
		characterSelectorScreenObj.divs.push(characterImg)
	})
}

let initSelectorsStyle = _ => {
	Object.keys(players).forEach((_, index) => {
		let selector = document.createElement('div')
		selector.style.width = (characterSelectorScreenObj.divs[0].offsetWidth) + 'px'
		selector.style.height = (characterSelectorScreenObj.divs[0].offsetHeight) + 'px'
		selector.style.position = 'absolute'
		selector.classList.add('selector')
		selector.style.display = 'grid'
		selector.style.gridTemplate = 'auto auto / auto auto'

		let parts = ['Top-Left', 'Top-Right', 'Bottom-Left', 'Bottom-Right']

		parts.forEach((part, _index) => {
			let selectorPart = document.createElement('div')
			selectorPart.style.zIndex = characterSelectorScreenObj.zIndexes[_index][index]
			part.split('-').forEach(borderDirection => {
				selectorPart.style[`border${borderDirection}`] = `solid 10px ${playersSelectorsSettings.colors[index]}`
			})
			selector.append(selectorPart)
		})
		selector.id = `player${index}`
		lobbyQuerySelectors.characterSelectorScreen.append(selector)
		characterSelectorScreenObj.selectors.push(selector)
	})
}

const token = $('#urlToken').text();
const lobby = $('#urlLobby').text();

$.ajax(`api/getLobbyInfo?lobby=${lobby}`, {
	success: lobbyInfo => {

	}
})

let initOnClickCharacterChanger = _ => {
	characterSelectorScreenObj.divs.forEach(div => {
		div.onclick = _ => {
			if (selectorMovingParams.isMoving) {
				return
			}
			selectorMovingParams.isMoving = true
			playersSelectorsSettings.playerCurrentCharacter = div.id
			$(`#${characterSelectorScreenObj.selectors[player].id}`).animate({
				left: `${div.offsetLeft}px`,
				top: `${div.offsetTop}px`,
			}, selectorMovingParams.speed, _ => {
				selectorMovingParams.isMoving = false
			})
		}
	})
}

initLobbyGuiStyles()
placeImagesOnCharacterSelectionScreen()
initSelectorsStyle()
initOnClickCharacterChanger()
