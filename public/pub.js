var previousTXID = "genesis";
var dataArray = [];
// console.log(run);
var dataCount = 0;

async function broadcast(tx) {
	let b = await fetch(`https://api.whatsonchain.com/v1/bsv/main/tx/raw`, {
		method: "POST",
		// mode: "no-cors",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			txhex: tx.uncheckedSerialize(),
		}),
	});
	return b;
}

// const pub2 = async (message, password, encryption) => {
// 	console.log("pubtest", message);
// 	let p = await decryptPrivKey(password, localStorage.privKeyEncrypted);

// 	const privKey = bsv.PrivateKey.fromWIF(p);
// 	console.log(privKey);
// 	console.log(privKey);
// 	const address = bsv.Address.fromPrivateKey(privKey).toString();
// 	let scriptFromAddress = bsv.Script.fromAddress(address);
// 	let script = scriptFromAddress.toHex();
// 	const tx = new bsv.Transaction();
// 	tx.feePerKb(50);
// 	console.log(address);
// 	// Build tx consumming utxos for current key
// 	// console.log(UTXOArray);
// 	let uts = JSON.parse(localStorage.utxo);
// 	console.log(uts);
// 	// let script = "";
// 	for (const utxo of uts) {
// 		tx.from({
// 			txid: utxo.txid,
// 			vout: utxo.vout,
// 			script: script,
// 			satoshis: utxo.satoshis,
// 		});
// 	}
// 	// Send change to the same key.
// 	let btoaArray = [
// 		btoa("17EuxBNFgQvN9MdQKfJDDGcaqcr9sTWczt"),
// 		btoa(address),
// 		btoa(message),
// 		btoa(await sha256(message)),
// 		btoa(encryption ? encryption : ""),
// 	];
// 	console.log(btoaArray);
// 	tx.change(address);
// 	const myTxOutput = new bsv.Transaction.Output({
// 		satoshis: 0,
// 		script: bsv.Script.buildSafeDataOut(btoaArray, "base64"),
// 	});

// 	tx.addOutput(myTxOutput);

// 	tx.sign([privKey]);

// 	// Broadcast

// 	let b = await broadcast(tx);
// 	if (b.status != 200) {
// 		console.log(b.status);
// 		return;
// 	} else {
// 		console.log(b);
// 		return tx.hash;
// 	}
// };

const pub2 = async (message, password, encryption) => {
	const priv = await decryptPrivKey(password, localStorage.privKeyEncrypted);
	console.log(priv);
	const privKey = bsv.PrivateKey.fromWIF(priv);
	console.log(privKey);
	const address = bsv.Address.fromPrivateKey(privKey).toString();
	let scriptFromAddress = bsv.Script.fromAddress(address);
	let script = scriptFromAddress.toHex();
	const tx = new bsv.Transaction();
	tx.feePerKb(50);
	console.log(address);
	// Build tx consumming utxos for current key
	// console.log(UTXOArray);
	let uts = JSON.parse(localStorage.utxo);
	console.log(uts);
	// let script = "";
	for (const utxo of uts) {
		tx.from({
			txid: utxo.txid,
			vout: utxo.vout,
			script: script,
			satoshis: utxo.satoshis,
		});
	}
	let inputArray = [];

	let btoaArray = [
		"1Mr1DMzM1Hix5H3DeJfiFpviq4NPbyZHPJ",
		message,
		"text/plain",
		"utf-8",
		"|",
		"1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5",
		"SET",
		"app",
		"metameet",
		"type",
		"chat",
		"hash",
		await sha256(message),
		"sender",
		address,
		"encryption",
		encryption,
	];

	btoaArray.map((e) => {
		console.log(e);
		inputArray.push(btoa(e));
	});
	console.log(inputArray);
	tx.change(address);
	const myTxOutput = new bsv.Transaction.Output({
		satoshis: 0,
		script: bsv.Script.buildSafeDataOut(inputArray, "base64"),

		// script: bsv.Script.buildSafeDataOut(btoaArray, "base64"),
	});
	tx.addOutput(myTxOutput);
	// const thisFee = Math.ceil(tx._estimateSize() * fee * 0.0001);
	tx.sign([privKey]);

	let b = await broadcast(tx);
	console.log(b);
	if (b.status != 200) {
		console.log("error broadcasting");

		return { status: b.status };
	}
	console.log(tx.hash);
	// document.getElementById("progress").innerHTML = "SUCCESSFULLY PUBLISHED!";
	// document.getElementById("progress").style.color = "green";
	let newUT = {
		txid: tx.hash,
		satoshis: tx.outputAmount,
		script,
		vout: 1,
	};
	console.log(newUT);
	let utArr = [];
	utArr.push(newUT);
	localStorage.setItem("utxo", JSON.stringify(utArr));
	return { txid: tx.hash, status: b.status };
	// } catch (e) {
	// logger.fatal(`Error: ${e.message}`);
	// process.exit(1);
	// wocUTXOS(address);

	// await broadcast(tx);
	// }
};
