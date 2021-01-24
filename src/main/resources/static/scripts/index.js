
$.ajax("api/getToken", {
	success: token => {
		if (token === "-1") throw Error(`Invalid token : ${token}`)

		$.ajax(`api/getTokenURL?token=${token}`, {
			success: text => {
				text = text.split(':')

				if (text.length !== 2) throw Error(`Server responded with a message : ${text}`)
				if (text[0] === 'Err') throw Error(text[1])

				document.location.href = text[1]
			}, type: "GET"
		})
	}, type: "GET"
})

//document.location.href = `api/getTokenURL?token=${token}`
