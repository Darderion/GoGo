//-----------------------------------------------------------------------------------------------------------------------------------------
const token = $('#urlToken').text();
const lobby = $('#urlLobby').text();
let players

const characterImgList = []
Object.keys(imagesUrls['profileImages']).forEach(key => {
	characterImgList.push(imagesUrls['profileImages'][key])
})

// ----------------------------------------	// should be an ajax requests//-----------------------------------------------------------------

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
		w: -5,
		s: 5,
		a: -1,
		d: 1
	},
	width: 5,
	keyPressHandlers: {
		get keys() {
			return Object.keys(characterSelectionScreen.keys)
		},
		handler: moveCharacterSelectorByKeyPress
	}
}

const initLobbyGuiStyles = _ => {
	let numberOfRows = Math.ceil(characterImgList.length / characterSelectionScreen.width)
	lobbyJQuerySelectors.wrapper.height(numberOfRows * lobbyJQuerySelectors.characterSelectorScreen.width() / characterSelectionScreen.width)
	lobbyJQuerySelectors.characterSelectorScreen.css('grid-template', `repeat(${numberOfRows}, auto) / repeat(${characterSelectionScreen.width}, auto)`)
}

const placeImagesOnCharacterSelectionScreen = _ => {
	characterImgList.forEach((img) => {
		let characterImg = document.createElement('div')
		characterImg.style.backgroundImage = (`url(${img})`)
		characterImg.id = img.split("/").pop().split('.')[0]
		characterImg.classList.add('characterImg')
		lobbyJQuerySelectors.characterSelectorScreen.append(characterImg)
		characterSelectionScreen.divs.push(characterImg)
	})
}

const initSelectorsStyle = _ => {
	players.forEach((player, index) => {
		let selector = document.createElement('div')
		selector.style.width = (characterSelectionScreen.divs[0].offsetWidth) + 'px'
		selector.style.height = (characterSelectionScreen.divs[0].offsetHeight) + 'px'
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

const movePlayer = (playerInd, character) => {
	if (players[playerInd].character === character) return

	const characterDiv = $(`#${character}Profile`)[0]
	playerSelectors.playerCurrentCharacter = characterDiv.id

	const jqueryDiv = $(`#${playerSelectors.divs[playerInd].id}`)

	jqueryDiv.stop().animate({
		left: `${characterDiv.offsetLeft}px`,
		top: `${characterDiv.offsetTop}px`,
	}, playerSelectors.speed)
}

const initOnClickCharacterChanger = _ => {
	characterSelectionScreen.divs.forEach(div => {
		div.onclick = _ => {
			$.ajax(`api/moveCharacterSelector?lobbyId=${lobby}&token=${token}&character=${div.id.replace("Profile", "")}`)
			movePlayer(player, div.id.replace("Profile", ""))
		}
	})
}

function moveCharacterSelectorByKeyPress(key) {
	key = key.replace("Key", "").toLowerCase()

	const currentSelectorPosition = `${players[token].character}Profile`
	let divIndex = characterSelectionScreen.divs
		.map((div, index) => ({ id: div.id, index }))
		.filter(div => div.id === currentSelectorPosition)[0].index
	divIndex = divIndex + characterSelectionScreen.keys[key] % characterSelectionScreen.divs.length
	const div = characterSelectionScreen.divs[divIndex]
	$.ajax(`api/moveCharacterSelector?lobbyId=${lobby}&token=${token}&character=${div.id.replace("Profile", "")}`)
}

const keyPressHandlers = {
	characterSelection: characterSelectionScreen.keyPressHandlers,
}

document.addEventListener('keypress', event => {
	const key = event.code.replace("Key", "").toLowerCase()
	Object.keys(keyPressHandlers).forEach(keyEvent => {
		if (keyPressHandlers[keyEvent].keys.includes(key)) {
			keyPressHandlers[keyEvent].handler(key)
		}
	})
})

const promiseCharacters = new Promise(resolve => {
	$.ajax(`api/getLobbyInfo?lobbyId=${lobby}`, {
		success: lobbyInfo => {
			players = lobbyInfo.players
			resolve()
		}
	})
})

promiseCharacters.then(_ => {
	initLobbyGuiStyles()
	placeImagesOnCharacterSelectionScreen()
	initSelectorsStyle()
	initOnClickCharacterChanger()
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
					}
				)
				players = lobbyInfo.players
			}
		})
	}, 10)
})
