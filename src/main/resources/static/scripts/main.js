class BattleGround {

	static configure(columns, rows) {
		//Exceptions block
		let name = 'BattleGround::configure'

		if (typeof columns !== 'number')	throw Error(`${name} Argument columns is not a Number`)
		if (!Number.isInteger(columns))		throw Error(`${name} Argument columns is not an Integer`)
		if (typeof rows !== 'number')		throw Error(`${name} Argument rows is not a Number`)
		if (!Number.isInteger(rows))		throw Error(`${name} Argument rows is not an Integer`)
		if (columns <= 0)					throw Error(`${name} Argument columns is below or equal to zero`)
		if (rows <= 0)						throw Error(`${name} Argument rows is below or equal to zero`)

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

BattleGround.configure(20, 10)

$.ajax("/api/update", {
	success: text => {
		console.log(text)
	}, type: "POST"
})
