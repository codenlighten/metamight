var address;
var address2;
var transactions = [];
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
		"Asset Wallet"
	).innerHTML = `<a href="bitcoin:${address}">${address}</a>`;
	document.getElementById(
		"confirmed"
	).innerHTML = `Confirmed: ${res.confirmed} TXS`;
	document.getElementById(
		"unconfirmed"
	).innerHTML = `Unconfirmed: ${res.unconfirmed} TXS`;
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
	).innerHTML = `Purse Address: <a href="bitcoin:${address2}">${address2}</a>`;
	document.getElementById(
		"confirmed2"
	).innerHTML = `Confirmed: ${res.confirmed} Sats`;
	document.getElementById(
		"unconfirmed2"
	).innerHTML = `Unconfirmed: ${res.unconfirmed} Sats`;
};
getBalance2(address2);

const messageSubmit = async () => {
	let encryption = "";
	let message = document.getElementById("myMessage").value;
	let password = document.getElementById("password").value;

	localStorage.decryption = password;
	if (password) {
		message = encrypt(password, message);
		encryption = "19ZdVjNeiqcUvSu32nJ3oTKyNmfqwZsnef";
		// console.log(decrypted);
		// console.log(message, address, password);
	}

	try {
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
		document.getElementById("myMessage").innerHTML = "";
		document.getElementById("password").innerHTML = "";
	} catch (e) {
		console.log(e);
	}

	// }
};

const submitFile = async () => {
	let file = document.getElementById("file");
	let myFile = await file.files[0];
	let reader = new FileReader();
	const fileByteArray = [];

	reader.readAsArrayBuffer(myFile);
	// reader.readAsDataURL(myFile);

	reader.onload = function (e) {
		console.log(e);
		// if (e.target.readyState === FileReader.DONE) {
		// 	const arrayBuffer = e.target.result,
		// 		array = new Uint8Array(arrayBuffer);
		// 	for (const a of array) {
		// 		fileByteArray.push(a);
		// 	}
		// }
		// console.log(reader);
		// let sha = sha256(fileByteArray);
		// console.log(sha);
		let result = reader.result;
		console.log(result);
		// let fileEncrypt = encrypt("password", fileByteArray);
		// console.log(fileEncrypt.length);
		// console.log(fileByteArray.length);
		let mime = myFile.type;
		console.log(mime);
		// pub(fileEncrypt);
		pub2(result, mime);
		// let formData = new FormData();
		// formData.append("userName", "userName");
		// formData.append("file", myFile);
		// formData.append("fileArray", fileByteArray);
		// formData.append("fileEncrypt", fileEncrypt);
		// formData.append("sha", sha);
		// axios({
		// 	method: "post",
		// 	url: "/pub",
		// 	data: formData,
		// 	headers: { "Content-Type": "multipart/form-data" },
		// })
		// 	.then(function (response) {
		// 		let data = response.data;
		// 		console.log(data);
		// 		// let decryptedFile = decrypt("password", data);
		// 		// console.log(decryptedFile);
		// 		// let dataURI = decryptedFile.buf.toString("base64");
		// 		// let newBase64 = arrayToBase64(decryptedFile);
		// 		// console.log(newBase64);
		// 		// console.log(dataURI);
		// 		// let url = `data:${metaResponse.mime};base64,${data}`;
		// 		//     const myBlob = await res.blob();//from binary?
		// 		// const res = await blobToDataURL(myBlob);
		// 	})
		// 	.catch(function (error) {
		// 		console.log(error);
		// 	});
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
