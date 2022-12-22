const balance = async () => {
	if (localStorage.address) {
		let address = localStorage.address;
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
	}
};

const createNewAddress = async () => {
	if (!localStorage.address) {
		let privateKey = bsv.PrivateKey.fromRandom();
		let privKey = privateKey.toWIF();
		let password = prompt("welcome to MetaMeet, please choose a password");
		let privKeyEncrypted = await doubleEncrypt(password, privKey);
		address = bsv.Address.fromPrivateKey(privateKey).toString();
		console.log(address, privKey);
		localStorage.address = address;
		localStorage.myKey = privKey;
		localStorage.privKeyEncrypted = privKeyEncrypted;
	}
	balance();
};
createNewAddress();

// balance();
let getBalance = async () => {
	let address = localStorage.address;
	let response = await fetch(
		`https://api.whatsonchain.com/v1/bsv/main/address/${address}/balance`
	);
	let res = await response.json();
	// console.log(res);
	let confirmed = res.confirmed;
	let unconfirmed = res.unconfirmed;
	if (document.getElementById("address")) {
		document.getElementById(
			"address"
		).innerHTML = `<a href="bitcoin:${address}">${address}</a>`;
		document.getElementById(
			"myBalance"
		).innerHTML = `Confirmed: ${confirmed} | Unconfirmed: ${unconfirmed}`;
	}

	// console.log(res);
	return { res };
};

const checkTxType = (txObject) => {
	console.log("check Type", txObject);
};

const wocUTXOS = async () => {
	console.log("grabbing utxos");
	let address = localStorage.address;
	let endPoint = "";

	const bitTailsPoint = `https://api.bitails.net/address/${address}/unspent?limit=500000`;
	const wocPoint = `https://api.whatsonchain.com/v1/bsv/main/address/${address}/unspent`;
	const taalEndpoint = `https://api.taal.com/api/v1/address/${address}/unspent`;
	endPoint = wocPoint;
	const uts = await fetch(bitTailsPoint);
	console.log(endPoint);

	// console.log(uts);
	if (uts.status != 200) {
		console.log(uts, "utxo grab issues");
		return { status: uts.status };
	} else {
		console.log(uts);
		// return;
		let utxos = await uts.json();
		console.log(utxos);
		let resBit = utxos.unspent;
		let res = resBit.sort(
			(a, b) => parseFloat(a.satoshis) - parseFloat(b.satoshis)
		);
		console.log(res);
		let utxo2 = JSON.stringify(res);
		localStorage.setItem("utxo", utxo2);
		console.log("bitgrab length", res.length, res[0], res[res.length - 1]);
		// return;
		if (res.length == 0) {
			console.log("no funds found", res, address);
			return res;
		}
		console.log("bitgrab length", res.length, res[0], res[res.length - 1]);
		// return;
		if (res.length == 0) {
			console.log("no funds found", res, address);
			return res;
		}
	}
};

if (localStorage.address) {
	wocUTXOS();
	setTimeout(() => {
		balance();
	}, 5000);
}
if (localStorage.address && !localStorage.utxo) {
	wocUTXOS();
}

const clearKeys = () => {
	if (confirm("Are you sure you want to clear your Keys??")) {
		localStorage.clear();
		location.reload();
	}
};
