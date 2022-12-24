const profile = () => {
	if (!localStorage.hcauth) {
		location.href =
			"https://app.handcash.io/#/authorizeApp?appId=639b712b489d787a921032d6";
	}
};
const auth = async () => {
	if (localStorage.hcauth) {
		document.getElementById("loggedOut").style.display = "none";
		document.getElementById("loggedIn").style.display = "";
		document.getElementById("avatar").src = `${localStorage.avatarUrl}`;
		document.getElementById(
			"handle"
		).innerHTML = `Welcome $${localStorage.handle.toUpperCase()}!`;
		if (!localStorage.decryption) {
			const id = await getUUID();
			localStorage.decryption = id;
			document.getElementById(
				"currentKey"
			).innerHTML = `Current Room Key: ${localStorage.decryption}`;
			document.getElementById("encryption").value = localStorage.decryption;
		}
	}
};
auth();
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
		encryption == "true"
			? await sha256(localStorage.paymail)
			: localStorage.paymail,
		"messageHash",
		await sha256(message),
		"encryption",
		encryption,
		"encryptHash",
		await sha256(localStorage.decryption),
	];

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
		document.getElementById("status").innerHTML = "";

		console.log(res);
	}
};
