
let player = 0			//
let players = {
	'memePlayer' : 'delamain',
	'somePlayer' : 'JotaroProfile',
	'YEA' : 'DioProfile'
}		//
let characterImgList = ['delamain.png', 'DioProfile.png', 'JotaroProfile.png',
	'delamain.png', 'DioProfile.png', 'JotaroProfile.png',
	'delamain.png', 'DioProfile.png', 'JotaroProfile.png',
	'delamain.png', 'DioProfile.png', 'JotaroProfile.png'] // should be an ajax requests
						//
 						//
						//
						//

let playerCurrent = 'delamain'

playersColors = ['red','blue','green','purple']

let wrapper = $('#lobby')
let characterSelectorScreen = $('#characterSelector')
let numberOfRows = Math.ceil(characterImgList.length / 5)
wrapper.height(numberOfRows * characterSelectorScreen.width() / 5)
characterSelectorScreen.css('grid-template', `repeat(${numberOfRows}, auto) / repeat(5, auto)`)


let divs = []
characterImgList.forEach((img,index) => {
	let characterImg = document.createElement('div')
	characterImg.style.backgroundImage = (`url(images/${img})`)
	characterImg.id = img.split(".")[0]
	characterImg.classList.add('characterImg')
	characterSelectorScreen.append(characterImg)
	divs.push(characterImg)
})

let selectors = []

Object.keys(players).forEach((_,index) => {
	let selector = document.createElement('div')
	selector.style.width = (divs[0].offsetWidth - 10)+ 'px'
	selector.style.height = (divs[0].offsetHeight - 10) + 'px'
	selector.style.position = 'absolute'
	selector.style.border = `solid 5px ${playersColors[index]}`
	selector.classList.add('selector')
	selector.id = `player${index}`
	characterSelectorScreen.append(selector)
	selectors.push(selector)
})

let inMove = false
let speed = 1000
divs.forEach(div => {
	div.onclick = _ => {
		if(inMove) {return}
		console.log(inMove)
		inMove = true
		playerCurrent = div.id
		$(`#${selectors[player].id}`).animate({
			left : `${div.offsetLeft}px`,
			top : `${div.offsetTop}px`,
		},speed, _ => {
			inMove = false
		})
	}
})



