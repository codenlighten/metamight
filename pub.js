var previousTXID = "genesis";
var dataArray = [];
const run = new Run({ network: "main" });
// console.log(run);
var dataCount = 0;
// const pub = async (theData, previousTXID, myCount) => {
// 	const privKey = bsv.PrivateKey.fromWIF(localStorage.myKey);

// 	myCount = dataCount || 0;

// 	const inputAddress = bsv.Address.fromPrivateKey(privKey);
// 	const tx = new bsv.Transaction();
// 	tx.feePerKb(50);

// 	// Build tx consumming utxos for current key
// 	const utxos = await run.blockchain.utxos(inputAddress.toString());

// 	for (const utxo of utxos) {
// 		tx.from({
// 			txid: utxo.txid,
// 			vout: utxo.vout,
// 			script: bsv.Script.fromHex(utxo.script),
// 			satoshis: utxo.satoshis,
// 		});
// 	}
// 	console.log(bsv);
// 	// Send change to the same key.
// 	tx.change(inputAddress);
// 	if (dataCount == 0) {
// 		dataArray = chunkArray(theData);
// 		console.log(dataArray);
// 		dataArray = counter(dataArray);
// 	}

// 	const myTxOutput = new bsv.Transaction.Output({
// 		satoshis: 0,
// 		script: bsv.Script.buildSafeDataOut([previousTXID, dataArray[dataCount]]),
// 	});

// tx.addOutput(myTxOutput);
// privKey=bsv.PrivateKey.fromWIF('')
// console.log(privKey);
// Build and sign tx.
// tx.sign([privKey]);

// Broadcast

// try {
// 	await broadcast(tx);
// } catch (e) {
// logger.fatal(`Error: ${e.message}`);
// process.exit(1);
// 	console.log(e);
// }
// console.log(tx.hash);
// dataCount++;
// pub(dataArray[dataCount], tx.hash, dataCount);
// return tx.hash;
// };

async function broadcast(tx) {
	const response = await fetch(
		`https://api.whatsonchain.com/v1/bsv/main/tx/raw`,
		{
			method: "POST",
			mode: "no-cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				txhex: tx.uncheckedSerialize(),
			}),
		}
	);
	if (!response.ok) {
		const body = await response.json();
		console.log(Object.keys(body));
		console.log(body.message);
		throw new Error("Problem broadcasting transaction.");
	}
}

const toHex = (txt) => {
	const encoder = new TextEncoder();
	return Array.from(encoder.encode(txt))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
};

function chunkArray(str) {
	let size = 1000000;
	let myArray = [];
	const numChunks = Math.ceil(str.length / size);
	const chunks = new Array(numChunks);

	for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
		chunks[i] = str.substr(o, size);
	}
	myArray.push(chunks);
	return myArray;
}

const counter = (myData) => {
	let newArray = [];
	myData.map((e) => {
		let count = 0;
		console.log(count);
		newArray.push(e);
		count++;
	});
	dataArray = newArray;
	console.log(newArray);
	return newArray;
};

const pub2 = async (message, encryption) => {
	console.log("pubtest", message, address);
	const privKey = bsv.PrivateKey.fromWIF(localStorage.myKey);
	// console.log(privKey);

	const inputAddress = bsv.Address.fromPrivateKey(privKey);
	const tx = new bsv.Transaction();
	tx.feePerKb(50);

	// Build tx consumming utxos for current key
	const utxos = await run.blockchain.utxos(inputAddress.toString());

	for (const utxo of utxos) {
		tx.from({
			txid: utxo.txid,
			vout: utxo.vout,
			script: bsv.Script.fromHex(utxo.script),
			satoshis: utxo.satoshis,
		});
	}
	console.log(encryption);
	// Send change to the same key.
	tx.change(inputAddress);
	const myTxOutput = new bsv.Transaction.Output({
		satoshis: 0,
		script: bsv.Script.buildSafeDataOut([
			"17EuxBNFgQvN9MdQKfJDDGcaqcr9sTWczt",
			address,
			message,
			encryption ? encryption : "",
		]),
	});

	tx.addOutput(myTxOutput);

	tx.sign([privKey]);

	// Broadcast
	try {
		await broadcast(tx);
	} catch (e) {
		// logger.fatal(`Error: ${e.message}`);
		// process.exit(1);
		console.log(e.message);
	}
	console.log(tx.hash);

	return tx.hash;
};

async function broadcast(tx) {
	const response = await fetch(
		`https://api.whatsonchain.com/v1/bsv/main/tx/raw`,
		{
			method: "POST",
			mode: "no-cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				txhex: tx.uncheckedSerialize(),
			}),
		}
	);
	if (!response.ok) {
		const body = await response.json();
		console.log(Object.keys(body));
		console.log(body.message);
		throw new Error("Problem broadcasting transaction.");
	}
}
