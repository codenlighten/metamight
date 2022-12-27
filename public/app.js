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
			navigator.clipboard.writeText(
				`https://metameet.icu/?key=${localStorage.decryption}`
			);
		}
	}
};
auth();
const onSubmit = async (message, encryption) => {
	let chatArr = [
		"1CnyAyY48a89Cv1nXbciAngoJDsk28rrbm",
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
			? await encrypt(localStorage.decryption, localStorage.paymail)
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

//
const getRoomKey = async () => {
	const urlParams = new URLSearchParams(location.search);
	const key = urlParams.get("key");
	// const audio = urlParams.get("audio");
	if (key) {
		localStorage.setItem("decryption", key);
		document.getElementById(
			"currentKey"
		).innerHTML = `Current Room Key: ${key}`;
		navigator.clipboard.writeText(`https://metameet.icu/?key=${key}`);
		document.getElementById("encryption").value = key;
	}
};

if (localStorage.decryption) {
	document.getElementById(
		"currentKey"
	).innerHTML = `Current Room Key: ${localStorage.decryption}`;
	document.getElementById("encryption").value = localStorage.decryption;
	navigator.clipboard.writeText(
		`https://metameet.icu/?key=${localStorage.decryption}`
	);
}
const uniqueKey = async () => {
	const id = await getUUID();
	localStorage.setItem("decryption", id);
	document.getElementById("currentKey").innerHTML = `Current Room Key: ${id}`;
	document.getElementById("encryption").value = id;
	navigator.clipboard
		.writeText(`https://metameet.icu/?key=${id}`)
		.then(function (x) {
			alert(
				`Congrats!! ID copied to clipboard: https://metameet.icu/?key=${id} Share with your friend`
			);
		});
};

const messageSubmit = async () => {
	let encryption = "false";
	let message = document.getElementById("myMessage").value;
	if (!message) {
		alert("add message");
		return;
	}
	document.getElementById("status").innerHTML = "...sending";

	const encryptionKey = document.getElementById("encryption");
	if (encryptionKey.value) {
		localStorage.setItem("decryption", encryptionKey.value);
		message = encrypt(encryptionKey.value, message);
		encryption = "true";
		try {
			console.log(message, encryptionKey.value);
			let pub = await onSubmit(message, encryption);
			// console.log(pub);
		} catch (e) {
			console.log(e);
		}
	} else {
		try {
			let pub = await onSubmit(message, encryption);
			console.log(pub);
			return;
		} catch (e) {
			console.log(e);
		}
	}
};

const roomKey = () => {
	let decryption = document.getElementById("myPassword").value;
	if (!decryption) {
		alert("choose a key");
		return;
	}
	console.log(decryption);
	localStorage.setItem("decryption", decryption);
	navigator.clipboard
		.writeText(`https://metameet.icu/?key=${decryption}`)
		.then(function (x) {
			alert(
				`Congrats!! ID copied to clipboard: https://metameet.icu/?key=${decryption} Share with your friend`
			);
		});
	document.getElementById(
		"currentKey"
	).innerHTML = `Current Room Key: ${localStorage.decryption}`;
	document.getElementById("encryption").value = localStorage.decryption;
};
