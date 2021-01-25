
let createInterfaceDivWrapper = _ => {
	//init div main parts
	const interfaceDiv = document.createElement('div')
	interfaceDiv.classList.add('interfaceDiv')

	const interfaceDivTop = document.createElement('div')
	interfaceDivTop.classList.add('interfaceDivTop')

	const interfaceDivBottom = document.createElement('div')
	interfaceDivBottom.classList.add('interfaceDivBottom')

	interfaceDiv.append(interfaceDivTop, interfaceDivBottom)
	//--------------------------------------------------------

	// Init top part of div
	const characterImage = document.createElement('div')
	characterImage.classList.add('characterImage')

	const textInfoPlaceholder = document.createElement("div")
	textInfoPlaceholder.classList.add('textInfoPlaceholder')

	const nickNamePlaceholder = document.createElement('div')
	nickNamePlaceholder.classList.add('nickNamePlaceholder')

	const specialPlaceholder = document.createElement('div')
	specialPlaceholder.classList.add('specialPlaceholder')

	textInfoPlaceholder.append(nickNamePlaceholder, specialPlaceholder)

	interfaceDivTop.append(characterImage, textInfoPlaceholder)
	//--------------------------------------------------------

	// Init bottom part of div


	// Init placeholders for stats
	const healthPlaceholder = document.createElement('div')
	healthPlaceholder.classList.add('stat')
	const healthImg = document.createElement('div')
	healthImg.style.backgroundImage = `url(${imagesUrls.statsImages['healthStat']})`
	const healthTextValue = document.createElement('text')
	healthPlaceholder.append(healthImg, healthTextValue)

	const bombLimitPlaceholder = document.createElement('div')
	bombLimitPlaceholder.classList.add('stat')
	const bombLimitImg = document.createElement('div')
	bombLimitImg.style.backgroundImage = `url(${imagesUrls.statsImages['bombLimitStat']})`
	const bombLimitTextValue = document.createElement('text')
	bombLimitPlaceholder.append(bombLimitImg, bombLimitTextValue)

	const explosionRangePlaceholder = document.createElement('div')
	explosionRangePlaceholder.classList.add('stat')
	const explosionRangeImg = document.createElement('div')
	explosionRangeImg.style.backgroundImage = `url(${imagesUrls.statsImages['explosionRangeStat']})`
	const explosionRangeTextValue = document.createElement('text')
	explosionRangePlaceholder.append(explosionRangeImg, explosionRangeTextValue)

	const speedPlaceholder = document.createElement('div')
	speedPlaceholder.classList.add('stat')
	const speedImg = document.createElement('div')
	speedImg.style.backgroundImage = `url(${imagesUrls.statsImages['speedStat']})`
	const speedTextValue = document.createElement('text')
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

function injectInfo(interfaceWrapperObj, player) {
	interfaceWrapperObj.characterImage.style.backgroundImage = `url(${imagesUrls.profileImages[player.character]})`
	interfaceWrapperObj.nickNamePlaceholder.innerText = player.name
	interfaceWrapperObj.specialPlaceholder.innerText = `${player.params.special.point} ${player.params.special.progress}`
	interfaceWrapperObj.healthTextValue.innerText = player.params.health
	interfaceWrapperObj.bombLimitTextValue.innerText = player.params.bombLimit
	interfaceWrapperObj.explosionRangeTextValue.innerText = player.params.explosionRange
	interfaceWrapperObj.speedTextValue.innerText = player.params.speed
}

function createInterfaceDivs() {
	visiblePlayers.forEach(player => {
		const interfaceDivWrapper = createInterfaceDivWrapper()
		injectInfo(interfaceDivWrapper, player)
	})
}

createInterfaceDivs()
