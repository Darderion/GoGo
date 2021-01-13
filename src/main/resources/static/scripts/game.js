class BattleGround {

	static configure(columns, rows) {
		//Exceptions block
		let name = 'BattleGround::configure'

		if (typeof columns !== 'number') throw Error(`${name} Argument columns is not a Number`)
		if (!Number.isInteger(columns)) throw Error(`${name} Argument columns is not an Integer`)
		if (typeof rows !== 'number') throw Error(`${name} Argument rows is not a Number`)
		if (!Number.isInteger(rows)) throw Error(`${name} Argument rows is not an Integer`)
		if (columns <= 0) throw Error(`${name} Argument columns is below or equal to zero`)
		if (rows <= 0) throw Error(`${name} Argument rows is below or equal to zero`)

		//-------------------------------------------------------------------------------
		let wrapper = $('#battleGround')
		wrapper.css('grid-template', `repeat(${rows}, auto) / repeat(${columns}, auto)`)
		wrapper.height(rows * wrapper.width() / columns)
		let tileHeight = `${wrapper.width() / columns}px`
		for (let y = 1; y <= rows; y++) {
			for (let x = 1; x <= columns; x++) {
				let tile = document.createElement('div')

				tile.id = `tileX${x - 1}Y${y - 1}`
				tile.classList.add('tile')

				tile.style.height = tileHeight
				tile.style.gridColumn = x.toString()
				tile.style.gridRow = y.toString()
				tile.style.backgroundImage = 'url(images/empty.png)'
				wrapper.append(tile)
			}
		}
	}
}

let visiblePlayers = [						// should be an ajax request
	{
		name: 'Boiii',
		character: 'dio',
		params: {
			health: 7,
			bombLimit: 3,
			explosionRange: 3,
			speed: 8,
			ability: {
				name: 'THE WORLD',
				image: 'empty.png'
			},
			special: {
				point: 'Collect all gems',
				progress: '1/9'

			}

		}
	},
	{
		name: 'Boez',
		character: 'delamain',
		params: {
			health: 6,
			bombLimit: 1,
			explosionRange: 4,
			speed: 8,
			ability: {
				name: 'THE WORLD',
				image: 'empty.png'
			},
			special: {
				point: 'Kill two players',
				progress: '0/2'

			}

		}
	},
	{
		name: 'Bulba',
		character: 'jotaro',
		params: {
			health: 7,
			bombLimit: 3,
			explosionRange: 3,
			speed: 8,
			ability: {
				name: 'THE WORLD',
				image: 'empty.png'
			},
			special: {
				point: 'Collect all gems',
				progress: '1/9'

			}

		}
	},
	{
		name: 'Bobo',
		character: 'delamain',
		params: {
			health: 7,
			bombLimit: 3,
			explosionRange: 3,
			speed: 8,
			ability: {
				name: 'THE WORLD',
				image: 'empty.png'
			},
			special: {
				point: 'Collect all gems',
				progress: '1/9'

			}

		}
	},
]

let gameInterfaceQuerySelectors = {
	visiblePlayersWrapper: $('#visiblePlayers')
}

let createInterfaceDivWrapper = _ => {
	//init div main parts
	let interfaceDiv = document.createElement('div')
	interfaceDiv.classList.add('interfaceDiv')

	let interfaceDivTop = document.createElement('div')
	interfaceDivTop.classList.add('interfaceDivTop')

	let interfaceDivBottom = document.createElement('div')
	interfaceDivBottom.classList.add('interfaceDivBottom')

	interfaceDiv.append(interfaceDivTop, interfaceDivBottom)
	//--------------------------------------------------------

	// Init top part of div
	let characterImage = document.createElement('div')
	characterImage.classList.add('characterImage')

	let textInfoPlaceholder = document.createElement("div")
	textInfoPlaceholder.classList.add('textInfoPlaceholder')

	let nickNamePlaceholder = document.createElement('div')
	nickNamePlaceholder.classList.add('nickNamePlaceholder')

	let specialPlaceholder = document.createElement('div')
	specialPlaceholder.classList.add('specialPlaceholder')

	textInfoPlaceholder.append(nickNamePlaceholder, specialPlaceholder)

	interfaceDivTop.append(characterImage, textInfoPlaceholder)
	//--------------------------------------------------------

	// Init bottom part of div


	// Init placeholders for stats
	let healthPlaceholder = document.createElement('div')
	healthPlaceholder.classList.add('stat')
	let healthImg = document.createElement('div')
	healthImg.style.backgroundImage = `url(${imagesUrls.statsImages['healthStat']})`
	let healthTextValue = document.createElement('text')
	healthPlaceholder.append(healthImg, healthTextValue)

	let bombLimitPlaceholder = document.createElement('div')
	bombLimitPlaceholder.classList.add('stat')
	let bombLimitImg = document.createElement('div')
	bombLimitImg.style.backgroundImage = `url(${imagesUrls.statsImages['bombLimitStat']})`
	let bombLimitTextValue = document.createElement('text')
	bombLimitPlaceholder.append(bombLimitImg, bombLimitTextValue)

	let explosionRangePlaceholder = document.createElement('div')
	explosionRangePlaceholder.classList.add('stat')
	let explosionRangeImg = document.createElement('div')
	explosionRangeImg.style.backgroundImage = `url(${imagesUrls.statsImages['explosionRangeStat']})`
	let explosionRangeTextValue = document.createElement('text')
	explosionRangePlaceholder.append(explosionRangeImg, explosionRangeTextValue)

	let speedPlaceholder = document.createElement('div')
	speedPlaceholder.classList.add('stat')
	let speedImg = document.createElement('div')
	speedImg.style.backgroundImage = `url(${imagesUrls.statsImages['speedStat']})`
	let speedTextValue = document.createElement('text')
	speedPlaceholder.append(speedImg, speedTextValue)
	//--------------------------------------------------------

	interfaceDivBottom.append(healthPlaceholder, bombLimitPlaceholder, explosionRangePlaceholder, speedPlaceholder)

	gameInterfaceQuerySelectors.visiblePlayersWrapper.append(interfaceDiv)// delete this
	//--------------------------------------------------------

	return {
		interfaceDiv: interfaceDiv,
		interfaceDivTop: interfaceDivTop,
		interfaceDivBottom: interfaceDivBottom,
		characterImage: characterImage,
		nickNamePlaceholder: nickNamePlaceholder,
		specialPlaceholder: specialPlaceholder,
		healthTextValue: healthTextValue,
		bombLimitTextValue: bombLimitTextValue,
		explosionRangeTextValue: explosionRangeTextValue,
		speedTextValue: speedTextValue
	}
}

let injectInfo = (interfaceWrapperObj, player) => {
	interfaceWrapperObj.characterImage.style.backgroundImage = `url(${imagesUrls.profileImages[player.character]})`
	interfaceWrapperObj.nickNamePlaceholder.innerText = player.name
	interfaceWrapperObj.specialPlaceholder.innerText = `${player.params.special.point} ${player.params.special.progress}`
	interfaceWrapperObj.healthTextValue.innerText = player.params.health
	interfaceWrapperObj.bombLimitTextValue.innerText = player.params.bombLimit
	interfaceWrapperObj.explosionRangeTextValue.innerText = player.params.explosionRange
	interfaceWrapperObj.speedTextValue.innerText = player.params.speed
}

let createInterfaceDivs = _ => {
	visiblePlayers.forEach(player => {
		let interfaceDivWrapper = createInterfaceDivWrapper()
		injectInfo(interfaceDivWrapper, player)
	})
}

createInterfaceDivs()

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const token = urlParams.get("token")

/*
$.ajax(`/api/getGameInfo?token=${token}`, {
	success: text => {
		console.log(text)
	}, type: "GET"
})
 */


$.ajax("/api/update", {
	success: text => {
		console.log(text)
	}, type: "POST"
})