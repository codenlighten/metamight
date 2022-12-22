// var address;
// var transactions = [];
// var myResult;
// setTimeout(() => {
// 	document.getElementById("password").value = "";
// }, 500);

if (localStorage.decryption) {
	document.getElementById(
		"currentKey"
	).innerHTML = `Current Room Key: ${localStorage.decryption}`;
	document.getElementById("encryption").value = localStorage.decryption;
}

const messageSubmit = async () => {
	let encryption = "false";
	// const password = document.getElementById("password").value;
	let message = document.getElementById("myMessage").value;
	if (!message) {
		alert("add message");
		return;
	}
	const encryptionKey = document.getElementById("encryption");
	// let fileCheck = () => {

	// }

	if (encryptionKey.value) {
		localStorage.setItem("decryption", encryptionKey.value);
		message = encrypt(encryptionKey.value, message);
		encryption = "true";
		try {
			console.log(message, encryptionKey, encryption);
			let pub = await onSubmit(message, encryption);
			return;
			console.log(pub);
			document.getElementById(
				"result"
			).innerHTML = `TXID: <a target="_blank" href="https://whatsonchain.com/tx/${pub.txid}">${pub.txid}</a>`;
			// transactions.push(pub);
			// findTransactions(pub);
			let txresult = await fetch(
				`https://api.whatsonchain.com/v1/bsv/main/tx/hash/${pub.txid}`
			);
			console.log(txresult);
			document.getElementById("myMessage").value = "";
			// document.getElementById("password").value = "";
		} catch (e) {
			console.log(e);
		}
	} else {
		try {
			let pub = await onSubmit(message, encryption);
			console.log(pub);
			return;
			document.getElementById(
				"result"
			).innerHTML = `TXID: <a target="_blank" href="https://whatsonchain.com/tx/${pub.txid}">${pub.txid}</a>`;
			// transactions.push(pub);
			// findTransactions(pub);
			let txresult = await fetch(
				`https://api.whatsonchain.com/v1/bsv/main/tx/hash/${pub.txid}`
			);
			console.log(txresult);
			document.getElementById("myMessage").value = "";
		} catch (e) {
			console.log(e);
		}
	}
};

const messageSubmit2 = async () => {
	let encryption = false;
	const password = document.getElementById("password").value;
	let message = document.getElementById("myMessage").value;
	if (!message || !password) {
		alert("add all required fields");
		return;
	}
	const encryptionKey = document.getElementById("encryption");
	// let fileCheck = () => {

	// }

	if (encryptionKey.value) {
		localStorage.setItem("decryption", encryptionKey.value);
		message = encrypt(encryptionKey.value, message);
		encryption = true;
		try {
			console.log(message, encryptionKey, encryption);
			let pub = await pub2(message, password, encryption);
			console.log(pub);
			document.getElementById(
				"result"
			).innerHTML = `TXID: <a target="_blank" href="https://whatsonchain.com/tx/${pub.txid}">${pub.txid}</a>`;
			// transactions.push(pub);
			// findTransactions(pub);
			let txresult = await fetch(
				`https://api.whatsonchain.com/v1/bsv/main/tx/hash/${pub.txid}`
			);
			console.log(txresult);
			document.getElementById("myMessage").value = "";
			// document.getElementById("password").value = "";
		} catch (e) {
			console.log(e);
		}
	} else {
		try {
			let pub = await pub2(message, password, encryption);
			console.log(pub);
			document.getElementById(
				"result"
			).innerHTML = `TXID: <a target="_blank" href="https://whatsonchain.com/tx/${pub.txid}">${pub.txid}</a>`;
			// transactions.push(pub);
			// findTransactions(pub);
			let txresult = await fetch(
				`https://api.whatsonchain.com/v1/bsv/main/tx/hash/${pub.txid}`
			);
			console.log(txresult);
			document.getElementById("myMessage").value = "";
		} catch (e) {
			console.log(e);
		}
	}
};

const clearStorage = () => {
	if (confirm("are you Sure you want to clear wallet?")) {
		localStorage.clear();
		location.reload();
	}
};

const roomKey = () => {
	let decryption = document.getElementById("myPassword").value;
	console.log(decryption);
	localStorage.setItem("decryption", decryption);
	document.getElementById("success").innerHTML = "Room Key Saved!";
	location.reload();
};
