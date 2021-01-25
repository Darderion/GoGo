
let game

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
		const wrapper = $('#battleGround')
		wrapper.css('grid-template', `repeat(${rows}, auto) / repeat(${columns}, auto)`)
		wrapper.height(rows * wrapper.width() / columns)
		const tileHeight = `${wrapper.width() / columns}px`
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < columns; x++) {
				let tile = document.createElement('div')

				tile.id = `tileX${x}Y${y}`
				tile.classList.add('tile')

				tile.style.height = tileHeight
				tile.style.gridColumn = `${x + 1}`
				tile.style.gridRow = `${y + 1}`
				tile.style.backgroundImage = 'url(images/empty.png)'
				wrapper.append(tile)
			}
		}
	}
}

const visiblePlayers = [						// should be an ajax request
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

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const token = urlParams.get("token")

$.ajax(`/api/update?token=${token}`, {
	success: ajaxGame => {
		game = ajaxGame
	}, type: "GET"
})
