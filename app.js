// var address;
// var transactions = [];
// var myResult;

if (localStorage.decryption) {
	document.getElementById(
		"currentKey"
	).innerHTML = `Current Room Key: ${localStorage.decryption}`;
}

// var fileArray = [];
// const findTransactions = (transaction) => {
// 	if (transactions.length > 0) {
// 		transactions.push(transaction);
// 		localStorage.transactions = transactions;
// 	}
// };

// const listTransactions = () => {
// 	if (transactions.length > 0) {
// 		transactions.map((e) => {
// 			let list = document.getElementById("txList");
// 			let item = document.createElement("li");
// 			item.innerHTML = `<a target="_blank" href="https://whatsonchain.com/tx/${e}"`;
// 			list.appendChild(item);
// 		});
// 	}
// };
// listTransactions();

const messageSubmit = async () => {
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
			).innerHTML = `TXID: <a target="_blank" href="https://whatsonchain.com/tx/${pub}">${pub}</a>`;
			// transactions.push(pub);
			// findTransactions(pub);
			let txresult = await fetch(
				`https://api.whatsonchain.com/v1/bsv/main/tx/hash/${pub}`
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
			document.getElementById("password").value = "";
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
	document.getElementById("password").value = decryption;
	location.reload();
};

if (localStorage.decryption) {
	let password = document.getElementById("password");
	password.value = localStorage.decryption;
}
