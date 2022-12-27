const { JungleBusClient } = require("@gorillapool/js-junglebus");
const bsv = require("bsv");
const { hexConvert, decrypt, sha256 } = require("./crypt");
const decryptionKey = "6560dc70-f36e-4a6a-aead-fbc4a89cc6f4";
const getDetails = async (txid) => {
	const response = await fetch(
		`https://junglebus.gorillapool.io/v1/transaction/get/${txid}`
	);
	let hexArr = [];

	if (response) {
		const res = await response.json();
		const outputs = res.outputs;
		outputs.map((e) => {
			const script = new bsv.Script(e);
			let asm = script.toASM();
			let asmArray = asm.split(" ");
			asmArray.splice(0, 2);

			asmArray.forEach((e, i) => {
				let convert = hexConvert(e);
				hexArr.push(convert);
				console.log(convert, i);
			});
		});
	}
	// console.log(hexArr);
	parseMeta(hexArr);
};

const client = new JungleBusClient("junglebus.gorillapool.io", {
	useSSL: true,
	onConnected(ctx) {
		console.log("CONNECTED", ctx);
	},
	onConnecting(ctx) {
		console.log("CONNECTING", ctx);
	},
	onDisconnected(ctx) {
		console.log("DISCONNECTED", ctx);
	},
	onError(ctx) {
		console.error(ctx);
	},
});

const onPublish = function (tx) {
	console.log("TRANSACTION", tx);
	const txid = tx.id;
	const details = getDetails(txid);
};
// const onStatus = function (message) {
// if (message.statusCode === ControlMessageStatusCode.BLOCK_DONE) {
// 	console.log("BLOCK DONE", message.block);
// } else if (message.statusCode === ControlMessageStatusCode.WAITING) {
// 	console.log("WAITING FOR NEW BLOCK...", message);
// } else if (message.statusCode === ControlMessageStatusCode.REORG) {
// 	console.log("REORG TRIGGERED", message);
// } else if (message.statusCode === ControlMessageStatusCode.ERROR) {
// 	console.error(message);
// }
// 	if (message.statusCode != 200) {
// 		console.log(message.statusCode);
// 	}
// };
const onError = function (err) {
	console.error(err);
};
const onMempool = function (tx) {
	console.log("TRANSACTION", tx);
	const txid = tx.id;
	const details = getDetails(txid);
};

(async () => {
	await client.Subscribe(
		"45669ee3b92ce8197d6c216e5f13d9a4d9968e7b70486ba2cc85117c805d6356",
		// "fd846dde53ca7fb9feaed6f9ac7081c926757d826ee4898c939ee6472a8bbd27",
		772070,
		onPublish,
		// onStatus,
		onError,
		onMempool
	);
})();

const parseMeta = async (hexArr) => {
	let message = hexArr[1];
	const f3 = hexArr[2];
	const f4 = hexArr[3];
	// const url = `<a target="_blank" href="https://whatsonchain.com/tx/${txid}">${txid}</a>`;
	const hash = hexArr[14];
	let paymail = hexArr[12];
	const encryption = hexArr[16];
	const encryptHash = hexArr[18];
	const myHash = await bsv.crypto.Hash.sha256(
		Buffer.from(decryptionKey)
	).toString("hex");
	// console.log("hash", myHash);
	if (myHash == encryptHash) {
		console.log("match");
		message = decrypt(decryptionKey, message);
		paymail = decrypt(decryptionKey, paymail);
	}
	console.log(message, paymail, encryptHash, myHash);
	return { message, paymail, encryptHash };
};
