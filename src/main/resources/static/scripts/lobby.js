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
		w: { x: 0,	y: 1	},
		s: { x: 0,	y: -1	},
		a: { x: -1,	y: 0	},
		d: { x: 1,	y: 0	}
	},
	width: 3,

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

	characterSelectionScreen.divs = Array(characterSelectionScreen.width).fill(null).map(_ => [])

	characterImgList.forEach((img,index) => {
		let characterImg = document.createElement('div')
		characterImg.style.backgroundImage = (`url(${img})`)
		characterImg.id = img.split("/").pop().split('.')[0]
		characterImg.classList.add('characterImg')
		lobbyJQuerySelectors.characterSelectorScreen.append(characterImg)
		characterSelectionScreen.divs[index % characterSelectionScreen.width].push(characterImg)
	})
	characterSelectionScreen.height = Math.max(...characterSelectionScreen.divs.map(line => line.length))
}

const initSelectorsStyle = _ => {
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
	x :	characterSelectionScreen.divs.findIndex(line => line.map(div => div.id).includes(currentSelectorPosition)),
	y : characterSelectionScreen.divs.map(line => line.map(div=>div.id).findIndex(id => id === currentSelectorPosition)).filter(index => index !== -1)[0]

})

function moveCharacterSelectorByKeyPress(key) {
	key = key.replace("Key", "").toLowerCase()

	const sumPositions = (pos1, pos2) => ({ x: pos1.x + pos2.x, y: pos1.y + pos2.y })

	const handleBorders = pos => ({
		x : (pos.x + characterSelectionScreen.width) % characterSelectionScreen.width,
		y : (pos.y + characterSelectionScreen.height) % characterSelectionScreen.height
	})

	const currentSelectorPosition = `${players[token].character}Profile`

	let divPos = getDivPositionById(currentSelectorPosition)
	let nextDivPos = handleBorders(sumPositions(divPos, characterSelectionScreen.keys[key]))

	const div = characterSelectionScreen.divs[nextDivPos.x][nextDivPos.y]

	if (div === undefined) return

	$.ajax(`api/moveCharacterSelector?lobbyId=${lobby}&token=${token}&character=${div.id.replace("Profile", "")}`)
}

const keyPressHandlers = {
	characterSelection: characterSelectionScreen.keyPressHandlers,
}

const initPlayerListStyle = _ => {

}

const displayCurrentPlayers = _ => {

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
