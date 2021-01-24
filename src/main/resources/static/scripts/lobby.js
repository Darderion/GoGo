const token = $('#urlToken').text();
const lobby = $('#urlLobby').text();

let players
let characters

const playerSelectors = {
	colors: ['red', 'blue', 'green', 'purple'],
	speed: 250,
	divs: [],
	zIndexes: [
		[4, 1, 3, 2],
		[1, 3, 2, 4],
		[3, 2, 4, 1],
		[2, 4, 1, 3]
	]
}

const lobbyJQuerySelectors = {
	wrapper: $('#lobby'),
	characterSelectorScreen: $('#characterSelector')
}

const characterSelectionScreen = {
	divs: [],
	keys: {
		w: {x: 0, y: 1},
		s: {x: 0, y: -1},
		a: {x: -1, y: 0},
		d: {x: 1, y: 0}
	},
	width: 8,

	keyPressHandlers: {
		get keys() {
			return Object.keys(characterSelectionScreen.keys)
		},
		handler: moveCharacterSelectorByKeyPress
	}
}

const keyPressHandlers = {
	characterSelection: characterSelectionScreen.keyPressHandlers,
}

const playersGUI = {
	divs: [],
	wrapper: $('#currentPlayers'),
	colors: {
		readyColor : 'rgba(0,255,0,0.25)',
		notReadyColor: 'rgba(255,0,0,0.25)'
	}
}

function injectPlayerInfo(div, player) {
	div.playerImg.src = player.account.pictureURL
	div.playerNickname.innerText = player.account.name
	div.playerCharacter.innerText = player.character
	div.playerCharacterModel.style.backgroundImage = `url(${imagesUrls['models'][player.character]['idle']})`
	div.playerCharacterModel.style.backgroundColor = player.ready ? playersGUI.colors.readyColor : playersGUI.colors.notReadyColor
}

const updateReady = (div,player) => div.playerCharacterModel.style.backgroundColor = player.ready ?
	playersGUI.colors.readyColor :
	playersGUI.colors.notReadyColor

function initPlayersGUI() {
	players.forEach((player,index) => {
		console.log(player)
		const playerContainer = document.createElement('div')
		playerContainer.id = 'playerContainer'
		playerContainer.style.borderBottom = index === players.length-1 ?  '' : '2px solid black'
		playerContainer.style.display = 'grid'
		playerContainer.style.gridTemplateAreas = '"a b c" "a d c"'
		const playerImgPlaceholder = document.createElement('div')
		const playerImg = document.createElement('img')
		playerImgPlaceholder.id = 'playerImgPlaceholder'
		playerImg.style.gridArea = 'a'
		playerImgPlaceholder.append(playerImg)
		const playerNickname = document.createElement('div')
		playerNickname.id = 'playerNickname'
		playerNickname.style.maxWidth = '0'
		playerNickname.style.gridArea = 'b'
		const playerCharacter = document.createElement('div')
		playerCharacter.id = 'playerCharacter'
		playerCharacter.style.maxWidth = '0'
		playerCharacter.style.gridArea = 'd'
		const playerCharacterModel = document.createElement('div')
		playerCharacterModel.id = 'characterModel'
		playerCharacterModel.style.gridArea = 'c'

		if (index == token) playerCharacterModel.onclick = _ => {
			$.ajax(`api/setReady?lobbyId=${lobby}&token=${token}&status=${!players[index].ready}`)
		}
		playerContainer.append(playerImgPlaceholder, playerNickname, playerCharacter, playerCharacterModel)
		playersGUI.divs.push({playerContainer, playerImgPlaceholder, playerImg, playerNickname, playerCharacter, playerCharacterModel})
		injectPlayerInfo(playersGUI.divs[index],player)
		playersGUI.wrapper.append(playerContainer)
	})
}

function initLobbyGuiStyles() {
	const numberOfRows = Math.ceil(characters.length / characterSelectionScreen.width)
	lobbyJQuerySelectors.wrapper.height(numberOfRows * lobbyJQuerySelectors.characterSelectorScreen.width() / characterSelectionScreen.width)
	lobbyJQuerySelectors.characterSelectorScreen.css('grid-template', `repeat(${numberOfRows}, auto) / repeat(${characterSelectionScreen.width}, auto)`)
}

function placeImagesOnCharacterSelectionScreen() {
	characterSelectionScreen.divs = Array(characterSelectionScreen.width).fill(null).map(_ => [])
	characters.forEach((img, index) => {
		let characterImg = document.createElement('div')
		characterImg.style.backgroundImage = (`url(${img})`)
		characterImg.id = img.split("/").pop().split('.')[0]
		characterImg.classList.add('characterImg')
		lobbyJQuerySelectors.characterSelectorScreen.append(characterImg)
		characterSelectionScreen.divs[index % characterSelectionScreen.width].push(characterImg)
	})
	characterSelectionScreen.height = Math.max(...characterSelectionScreen.divs.map(line => line.length))
}

function initSelectorsStyle() {
	players.forEach((player, index) => {
		let selector = document.createElement('div')
		selector.style.width = (characterSelectionScreen.divs[0][0].offsetWidth) + 'px'
		selector.style.height = (characterSelectionScreen.divs[0][0].offsetHeight) + 'px'
		selector.style.position = 'absolute'
		selector.classList.add('selector')
		selector.style.display = 'grid'
		selector.style.gridTemplate = 'auto auto / auto auto'

		let parts = ['Top-Left', 'Top-Right', 'Bottom-Left', 'Bottom-Right']

		parts.forEach((part, _index) => {
			let selectorPart = document.createElement('div')
			selectorPart.style.zIndex = playerSelectors.zIndexes[_index][index]
			part.split('-').forEach(borderDirection => {
				selectorPart.style[`border${borderDirection}`] = `solid 10px ${playerSelectors.colors[index]}`
			})
			selector.append(selectorPart)
		})
		selector.id = `player${index}`

		const characterDiv = $(`#${player.character}Profile`)[0]

		selector.style.left = `${characterDiv.offsetLeft}px`
		selector.style.top = `${characterDiv.offsetTop}px`

		lobbyJQuerySelectors.characterSelectorScreen.append(selector)
		playerSelectors.divs.push(selector)
	})
}

function movePlayer(playerInd, character) {
	if (players[playerInd].character === character) return

	const characterDiv = $(`#${character}Profile`)[0]
	playerSelectors.playerCurrentCharacter = characterDiv.id

	const jqueryDiv = $(`#${playerSelectors.divs[playerInd].id}`)

	jqueryDiv.stop().animate({
		left: `${characterDiv.offsetLeft}px`,
		top: `${characterDiv.offsetTop}px`,
	}, playerSelectors.speed)
}

function initOnClickCharacterChanger() {
	characterSelectionScreen.divs.forEach(line => {
		line.forEach(div => {
			div.onclick = _ => {
				$.ajax(`api/moveCharacterSelector?lobbyId=${lobby}&token=${token}&character=${div.id.replace("Profile", "")}`)
				movePlayer(token, div.id.replace("Profile", ""))
			}
		})
	})
}

const getDivPositionById = currentSelectorPosition => ({
	x: characterSelectionScreen.divs.findIndex(line => line.map(div => div.id).includes(currentSelectorPosition)),
	y: characterSelectionScreen.divs.map(line => line.map(div => div.id).findIndex(id => id === currentSelectorPosition)).filter(index => index !== -1)[0]
})

function moveCharacterSelectorByKeyPress(key) {
	key = key.replace("Key", "").toLowerCase()

	const sumPositions = (pos1, pos2) => ({x: pos1.x + pos2.x, y: pos1.y + pos2.y})

	const handleBorders = pos => ({
		x: (pos.x + characterSelectionScreen.width) % characterSelectionScreen.width,
		y: (pos.y + characterSelectionScreen.height) % characterSelectionScreen.height
	})

	const currentSelectorPosition = `${players[token].character}Profile`

	let divPos = getDivPositionById(currentSelectorPosition)
	let nextDivPos = handleBorders(sumPositions(divPos, characterSelectionScreen.keys[key]))

	const div = characterSelectionScreen.divs[nextDivPos.x][nextDivPos.y]

	if (div === undefined) return

	$.ajax(`api/moveCharacterSelector?lobbyId=${lobby}&token=${token}&character=${div.id.replace("Profile", "")}`)
}

document.addEventListener('keypress', event => {
	const key = event.code.replace("Key", "").toLowerCase()
	Object.keys(keyPressHandlers).forEach(keyEvent => {
		if (keyPressHandlers[keyEvent].keys.includes(key)) {
			keyPressHandlers[keyEvent].handler(key)
		}
	})
})

const lobbyInfoRequest = new Promise(resolve => {
	$.ajax(`api/getLobbyInfo?lobbyId=${lobby}`, {
		success: lobbyInfo => {
			players = lobbyInfo.players
			characters = Object.values(lobbyInfo.characters).map(characterName => imagesUrls.profileImages[characterName])
			resolve()
		}
	})
})

lobbyInfoRequest.then(_ => {
	initLobbyGuiStyles()
	placeImagesOnCharacterSelectionScreen()
	initSelectorsStyle()
	initOnClickCharacterChanger()
	initPlayersGUI()
	players.forEach(
		(player, ind) => {
			movePlayer(ind, player.character)
		})
	setInterval(_ => {
		$.ajax(`api/getLobbyInfo?lobbyId=${lobby}`, {
			success: lobbyInfo => {
				lobbyInfo.players.forEach(
					(player, ind) => {
						movePlayer(ind, player.character)
						updateReady(playersGUI.divs[ind],player)
					}
				)
				players = lobbyInfo.players
			}
		})
	}, 10)
})
