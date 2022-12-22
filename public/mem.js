var subscriptions = [];
let subscribe = () => {
	let subscription = document.getElementById("subscription").value;
	subscriptions.push(subscription);
	localStorage.subscriptions = subscriptions;
};

const mem = () => {
	const centrifuge = new Centrifuge("wss://socket.whatsonchain.com/mempool");

	centrifuge.on("publish", function (message) {
		// console.log("Data: " + JSON.stringify(message.data, null, 2));
	});

	centrifuge.on("disconnect", function (ctx) {
		console.log(
			"Disconnected: " +
				ctx.reason +
				(ctx.reconnect ? ", will try to reconnect" : ", won't try to reconnect")
		);
	});

	centrifuge.on("connect", function (ctx) {
		console.log(
			"Connected with client ID " + ctx.client + " over " + ctx.transport
		);
	});

	centrifuge.connect();
};
// mem();
const getMem = (phrase) => {
	const centrifuge = new Centrifuge("wss://socket.whatsonchain.com/mempool");
	const hexPhrase = toHex(phrase);
	console.log(hexPhrase);
	centrifuge.on("publish", async function (message) {
		let data = message.data.vout[0];
		let val = data.value;
		let txid = message.data.txid;
		let scriptPubKey = data.scriptPubKey;
		let hex = scriptPubKey.hex;
		let asm = scriptPubKey.asm;
		// console.log(message);
		let encryption = false;
		if (asm.includes(hexPhrase)) {
			console.log("found meet");
		}
		if (val == 0) {
			if (hex.includes(hexPhrase)) {
				const script = new bsv.Script(hex);
				let asm = script.toASM();
				// console.log(asm);
				let asmArray = asm.split(" ");

				asmArray.splice(0, 2);
				console.log(hexConvert(asmArray));
				let hexArr = [];
				let message = "";
				asmArray.forEach((e, i) => {
					let convert = hexConvert(e);
					hexArr.push(convert);
					console.log(convert, i);
				});
				let f1 = hexArr[0];
				let f2 = hexArr[1];
				let f3 = hexArr[2];
				let f4 = hexArr[3];
				let hash = hexArr[14];
				let paymail = hexArr[12];
				let encryption = hexArr[16];
				// let checked = document.getElementById("roomCheck").checked;
				// console.log(checked);
				if (encryption == "true") {
					try {
						f2 = decrypt(localStorage.decryption, f2);
					} catch (e) {
						console.log(e);
					}
					if (f2 != "") {
						document.getElementById(
							"mem"
						).innerHTML = `<h2>Message:</br>${f2}</h2><h2>Sender:<br/>${paymail}</h2><h2>AppID: ${f1}</h2><h2>Hash:</br>${hash}</h2>`;
					}
				}
			}
		}
	});

	centrifuge.on("disconnect", function (ctx) {
		console.log(
			"Disconnected: " +
				ctx.reason +
				(ctx.reconnect ? ", will try to reconnect" : ", won't try to reconnect")
		);
	});

	centrifuge.on("connect", function (ctx) {
		console.log(
			"Connected with client ID " + ctx.client + " over " + ctx.transport
		);
	});

	centrifuge.connect();
};
getMem("metameet");