
const token = 1

$.ajax("api/getToken", {
	success: token => {
		if (token === "-1") throw Error("Invalid token")

		$.ajax(`api/getTokenURL?token=${token}`, {
			success: text => {
				text = text.split(':')

				if (text.length !== 2) throw Error("Invalid token")
				if (text[0] === 'Err') throw Error(text[1])

				document.location.href = `lobby?token=${text[1]}`
			}, type: "GET"
		})
	}, type: "GET"
})

document.location.href = `api/getTokenURL?token=${token}`
