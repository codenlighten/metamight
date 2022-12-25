const getRoomKey = async () => {
	const urlParams = new URLSearchParams(location.search);
	const key = urlParams.get("key");
	const audio = urlParams.get("audio");
	if (key) {
		localStorage.decryption = key;
		document.getElementById(
			"currentKey"
		).innerHTML = `Current Room Key: ${localStorage.decryption}`;
		navigator.clipboard.writeText(`https://metameet.icu/?key=${key}`);
		document.getElementById("encryption").value = localStorage.decryption;
	}
	if (audio == "true") {
		initiateCall(audio, key);
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
	navigator.clipboard.writeText(`https://metameet.icu/?key=${id}`);
	alert(
		`Congrats!! ID copied to clipboard: https://metameet.icu/?key=${id} Share with your friend`
	);
};

const messageSubmit = async () => {
	document.getElementById("status").innerHTML = "...sending";
	let encryption = "false";
	let message = document.getElementById("myMessage").value;
	if (!message) {
		alert("add message");
		return;
	}
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
	document.getElementById("success").innerHTML = "Room Key Saved!";
	setTimeout(() => {
		document.getElementById(
			"currentKey"
		).innerHTML = `Current Room Key: ${localStorage.decryption}`;
		document.getElementById("encryption").value = localStorage.decryption;
		document.getElementById("success").innerHTML = "";
	}, 1000);
	// location.reload();
};
