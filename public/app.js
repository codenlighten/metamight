const profile = () => {
	if (!localStorage.hcauth) {
		location.href =
			"https://app.handcash.io/#/authorizeApp?appId=639b712b489d787a921032d6";
	}
};

// if (localStorage.hcauth) {
// 	document.getElementById("loggedOut").style.display = "none";
// 	document.getElementById("loggedIn").style.display = "";
// 	document.getElementById("handle").innerHTML = `Hello ${localStorage.handle}`;
// }
if (localStorage.hcauth) {
	document.getElementById("loggedOut").style.display = "none";
	document.getElementById("loggedIn").style.display = "";
	document.getElementById(
		"logo"
	).style.background = `center / contain no-repeat url(${localStorage.avatarUrl})`;
	document.getElementById(
		"welcome"
	).innerHTML = `$${localStorage.handle.toUpperCase()}`;
}
const onSubmit = async (message, encryption) => {
	let chatArr = [
		"19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut",
		message,
		"text/plain",
		"utf-8",
		"|",
		"1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5",
		"SET",
		"app",
		"metameet",
		"type",
		"message",
		"paymail",
		localStorage.paymail,
		"hash",
		await sha256(message),
		"encryption",
		encryption,
	];
	let chat = [
		"19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut",
		"",
		"text/plain",
		"utf-8",
		"|",
		"1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5",
		"SET",
		"app",
		"metameet chat",
		"type",
		"message",
		"paymail",
		localStorage.paymail,
	];
	// const channel = document.getElementById("channel");
	// const content = document.getElementById("content");
	// chatArr[1] = content.value;
	// if (channel.value) {
	// 	chatArr.push("context");
	// 	chatArr.push("channel");
	// 	chatArr.push("channel");
	// 	chatArr.push(channel.value);
	// }
	const r = await fetch("/hcpost", {
		method: "POST",
		body: JSON.stringify({
			hcauth: localStorage.hcauth,
			payload: chatArr,
			action: "chat",
		}),
	});
	const res = await r.json();
	if (res) {
		console.log(res);
	}
};
