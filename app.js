var address;
var address2;
var transactions = [];
var myResult;

if (localStorage.decryption) {
	document.getElementById(
		"currentKey"
	).innerHTML = `Current Room Key: ${localStorage.decryption}`;
}

var fileArray = [];
const findTransactions = (transaction) => {
	if (transactions.length > 0) {
		transactions.push(transaction);
		localStorage.transactions = transactions;
	}
};

const listTransactions = () => {
	if (transactions.length > 0) {
		transactions.map((e) => {
			let list = document.getElementById("txList");
			let item = document.createElement("li");
			item.innerHTML = `<a target="_blank" href="https://whatsonchain.com/tx/${e}"`;
			list.appendChild(item);
		});
	}
};
listTransactions();
if (!localStorage.address) {
	let privateKey = bsv.PrivateKey.fromRandom();
	let privKey = privateKey.toWIF();
	address = bsv.Address.fromPrivateKey(privateKey).toString();
	console.log(address, privKey);
	localStorage.address = address;
	localStorage.myKey = privKey;

	let privateKey2 = bsv.PrivateKey.fromRandom();
	let privKey2 = privateKey2.toWIF();
	address2 = bsv.Address.fromPrivateKey(privateKey2).toString();
	console.log(address2, privKey2);
	localStorage.address2 = address2;
	localStorage.myKey2 = privKey2;
} else {
	address = localStorage.address;
	let privKey = localStorage.myKey;
	address2 = localStorage.address2;
	let privKey2 = localStorage.myKey2;
}

const getBalance = async (address) => {
	let response = await fetch(
		`https://api.whatsonchain.com/v1/bsv/main/address/${address}/balance`
	);
	let res = await response.json();
	console.log(res);
	confirmed = res.confirmed;
	unconfirmed = res.unconfirmed;

	document.getElementById(
		"address"
	).innerHTML = `<a href="bitcoin:${address}">${address}</a>`;
	document.getElementById(
		"confirmed"
	).innerHTML = `Confirmed: ${res.confirmed} SATS`;
	document.getElementById(
		"unconfirmed"
	).innerHTML = `Unconfirmed: ${res.unconfirmed} SATS`;
};

getBalance(address);

const getBalance2 = async (address2) => {
	let response = await fetch(
		`https://api.whatsonchain.com/v1/bsv/main/address/${address2}/balance`
	);
	let res = await response.json();
	console.log(res);
	confirmed = res.confirmed;
	unconfirmed = res.unconfirmed;
	document.getElementById(
		"address2"
	).innerHTML = `NFTY Address: <a href="bitcoin:${address2}">${address2}</a>`;
	document.getElementById(
		"confirmed2"
	).innerHTML = `Confirmed: ${res.confirmed} Sats`;
	document.getElementById(
		"unconfirmed2"
	).innerHTML = `Unconfirmed: ${res.unconfirmed} Sats`;
};
// getBalance2(address2);

const messageSubmit = async () => {
	let encryption = "";
	let message = document.getElementById("myMessage").value;
	if (!message) {
		return;
	}
	let password = document.getElementById("password");
	let myPassword = document.getElementById("myPassword");
	// let fileCheck = () => {

	// }

	if (password.value || myPassword.value) {
		localStorage.setItem("decryption", password.value);
		message = encrypt(password.value, message);
		encryption = "19ZdVjNeiqcUvSu32nJ3oTKyNmfqwZsnef";
		// console.log(decrypted);
		// console.log(message, address, password);
		try {
			console.log(message, encryption);
			let pub = await pub2(message, encryption);
			console.log(pub);
			document.getElementById(
				"result"
			).innerHTML = `TXID: <a target="_blank" href="https://whatsonchain.com/tx/${pub}">${pub}</a>`;
			transactions.push(pub);
			findTransactions(pub);
			let txresult = await fetch(
				`https://api.whatsonchain.com/v1/bsv/main/tx/hash/${pub}`
			);
			console.log(txresult);
			document.getElementById("myMessage").value = "";
			document.getElementById("password").value = "";
		} catch (e) {
			console.log(e);
		}
	} else {
		try {
			let pub = await pub2(message);
			console.log(pub);
			document.getElementById(
				"result"
			).innerHTML = `TXID: <a target="_blank" href="https://whatsonchain.com/tx/${pub}">${pub}</a>`;
			transactions.push(pub);
			findTransactions(pub);
			let txresult = await fetch(
				`https://api.whatsonchain.com/v1/bsv/main/tx/hash/${pub}`
			);
			console.log(txresult);
			document.getElementById("myMessage").value = "";
			document.getElementById("password").value = "";
		} catch (e) {
			console.log(e);
		}
	}
};

const submitFile = async () => {
	let file = document.getElementById("file");
	let myFile = await file.files[0];
	if (!myFile) {
		return;
	}

	let reader = new FileReader();
	// const fileByteArray = [];
	// localStorage.decryption = password;

	reader.readAsDataURL(myFile);

	reader.onload = function () {
		myResult = reader.result;

		myResult = myResult.split(",").pop();
		// myResult = encrypt("jonah", myResult);
		let size = myResult.length;
		let sizeMB = size / 1048576;
		console.log(size, myResult);

		if (sizeMB >= 5) {
			let chunkArray = fileSplit(myResult);
			chunkArray.map(async (e) => {
				let chunk = await pubFile(e);
				fileArray.push(chunk);
				console.log(e);
			});
			console.log(fileArray);
			return;
		}
		// console.log(myResult);

		let mime = myFile.type;
		// console.log(myResult);
		// if (password) {
		// 	let myResultEncrypted = encrypt(password, myResult);
		// 	myResult = myResultEncrypted;
		// 	encryption = "19ZdVjNeiqcUvSu32nJ3oTKyNmfqwZsnef";
		// }
		pubFile(myResult, mime).then((res) => {
			document.getElementById(
				"result"
			).innerHTML = `TXID: <a target="_blank" href="https://whatsonchain.com/tx/${res}">${res}</a>`;
			console.log(res);
		});
	};

	reader.onerror = function () {
		console.log(reader.error);
	};
};

const sha256 = async (string) => {
	const utf8 = new TextEncoder().encode(string);
	const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray
		.map((bytes) => bytes.toString(16).padStart(2, "0"))
		.join("");
	return hashHex;
};
// const encrypt = (password, message) => {
// 	var ciphertext = CryptoJS.AES.encrypt(
// 		JSON.stringify(message),
// 		password
// 	).toString();
// 	// console.log("ciphertext", ciphertext);
// 	decrypt(password, ciphertext); //test decrypt out
// 	return ciphertext;
// };
// const decrypt = (password, ciphertext) => {
// 	// Decrypt
// 	let bytes = CryptoJS.AES.decrypt(ciphertext, password);
// 	let originalText = bytes.toString(CryptoJS.enc.Utf8);
// 	// console.log("orig", originalText);
// 	return originalText;
// };
const arrayToBase64 = (buffer) => {
	var binary = "";
	var bytes = new Uint8Array(buffer);
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	let myBase = window.btoa(binary);
	console.log(myBase);
	return myBase;
};

const clearStorage = () => {
	if (confirm("are you Sure you want to clear wallet?")) {
		localStorage.clear();
		location.reload();
	}
};

const fileSplit = (arr) => {
	var chunks = [],
		i = 0,
		n = arr.length;
	while (i < n) {
		chunks.push(arr.slice(i, (i += 5000000)));
	}
	console.log(chunks);
	return chunks;
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
