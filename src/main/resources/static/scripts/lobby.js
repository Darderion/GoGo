//-----------------------------------------------------------------------------------------------------------------------------------------
const player = 0
const token = $('#urlToken').text();
const lobby = $('#urlLobby').text();
let players

const characterImgList = []
Object.keys(imagesUrls['profileImages']).forEach(key => {
	characterImgList.push(imagesUrls['profileImages'][key])
})

// ----------------------------------------	// should be an ajax requests//-----------------------------------------------------------------

const playersSelectorsSettings = {
	colors : ['red', 'blue', 'green', 'purple'],
	// playerCurrentCharacter : players[Object.keys(players)[player]]
}

const lobbyQuerySelectors = {
	wrapper : $('#lobby'),
	characterSelectorScreen : $('#characterSelector')
}

const characterSelectorScreenObj = {
	divs : [],
	selectors : [],
	zIndexes : [
		[4, 1, 3, 2],
		[1, 3, 2, 4],
		[3, 2, 4, 1],
		[2, 4, 1, 3]
	]
}

const selectorMovingParams = {
	isMoving : false,
	speed : 250
}

const initLobbyGuiStyles = _ => {
	let numberOfRows = Math.ceil(characterImgList.length / 5)
	lobbyQuerySelectors.wrapper.height(numberOfRows * lobbyQuerySelectors.characterSelectorScreen.width() / 5)
	lobbyQuerySelectors.characterSelectorScreen.css('grid-template', `repeat(${numberOfRows}, auto) / repeat(5, auto)`)
}

const placeImagesOnCharacterSelectionScreen = _ => {
	characterImgList.forEach((img) => {
		let characterImg = document.createElement('div')
		characterImg.style.backgroundImage = (`url(${img})`)
		characterImg.id = img.split("/").pop().split('.')[0]
		characterImg.classList.add('characterImg')
		lobbyQuerySelectors.characterSelectorScreen.append(characterImg)
		characterSelectorScreenObj.divs.push(characterImg)
	})
}

const initSelectorsStyle = _ => {
	players.forEach((player, index) => {
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

		const characterDiv = $(`#${player.character}Profile`)[0]

		selector.style.left = `${characterDiv.offsetLeft}px`
		selector.style.top = `${characterDiv.offsetTop}px`

		lobbyQuerySelectors.characterSelectorScreen.append(selector)
		characterSelectorScreenObj.selectors.push(selector)
	})
}

const moveSelector = (player, character) => {
	if(players[player].character === character) return
	const characterDiv = $(`#${character}Profile`)[0]
	playersSelectorsSettings.playerCurrentCharacter = characterDiv.id

	$(`#${characterSelectorScreenObj.selectors[player].id}`).animate({
		left: `${characterDiv.offsetLeft}px`,
		top: `${characterDiv.offsetTop}px`,
	}, selectorMovingParams.speed, _ => {
		selectorMovingParams.isMoving = false
	})
}

const initOnClickCharacterChanger = _ => {
	characterSelectorScreenObj.divs.forEach(div => {
		div.onclick = _ => {
			$.ajax(`api/moveSelector?lobbyId=${lobby}&token=${player}&character=${div.id.replace("Profile", "")}`, {
				success: text => {
					console.log(text)
				}
			})
			moveSelector(player, div.id.replace("Profile", ""))
		}
	})
}

const moveCharacterSelectorByKeyPress = key => {
	const currentSelectorPosition = `${players[player].character}Profile`
	let divIndex
	let characterDiv = characterSelectorScreenObj.divs.filter((div,index) => {div.id === currentSelectorPosition; if(div.id === currentSelectorPosition) divIndex = index})
	let nextDiv
	switch(key) {
		case 'w' :
			divIndex -= 5
			divIndex = divIndex < 0 ? characterSelectorScreenObj.divs.length - divIndex: divIndex
			nextDiv = characterSelectorScreenObj.divs[divIndex]
			break
		case 's' :
			divIndex += 5
			divIndex = divIndex > characterSelectorScreenObj.divs.length ? (divIndex - characterSelectorScreenObj.divs.length)+1  : divIndex
			nextDiv = characterSelectorScreenObj.divs[divIndex]
			break
		case 'd':
			divIndex += 1
			divIndex = divIndex > characterSelectorScreenObj.divs.length ? divIndex - characterSelectorScreenObj.divs.length  : divIndex
			nextDiv = characterSelectorScreenObj.divs[divIndex]
			break
		case 'a':
			divIndex -= 1
			divIndex = divIndex < 0 ? characterSelectorScreenObj.divs.length - divIndex: divIndex
			nextDiv = characterSelectorScreenObj.divs[divIndex]
			break
	}
	if(nextDiv === undefined) return
	$.ajax(`api/moveSelector?lobbyId=${lobby}&token=${player}&character=${nextDiv.id.replace("Profile", "")}`, {
		success: text => {
			console.log(text)
		}
	})
}

const keyPressHandlers = {
	characterSelection : {
		keys : ['w','s','d','a'],
		handler :  moveCharacterSelectorByKeyPress
	},
}

document.addEventListener('keypress', event => {
	let key = event.key.toLowerCase()
	Object.keys(keyPressHandlers).forEach(keyEvent => {
		if(keyPressHandlers[keyEvent].keys.includes(key)) {
			keyPressHandlers[keyEvent].handler(key)
		}
	})
})

$.ajax(`api/getLobbyInfo?lobbyId=${lobby}`, {
	success: lobbyInfo => {
		console.log(lobbyInfo)
		players = lobbyInfo.players
		initLobbyGuiStyles()
		placeImagesOnCharacterSelectionScreen()
		initSelectorsStyle()
		initOnClickCharacterChanger()
		players.forEach(
			(player,ind) => {
			moveSelector(ind,player.character)
		})
	}
})

setInterval(_ => {
	$.ajax(`api/getLobbyInfo?lobbyId=${lobby}`, {
		success: lobbyInfo => {
			lobbyInfo.players.forEach(
				(player, ind) => {
					moveSelector(ind, player.character)
				}
			)
			players = lobbyInfo.players
		}
	})
}, 1)
