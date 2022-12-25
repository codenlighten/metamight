var subscriptions = [];
let subscribe = () => {
	let subscription = document.getElementById("subscription").value;
	subscriptions.push(subscription);
	localStorage.subscriptions = subscriptions;
};
function playSound() {
	const audio = new Audio(ding3);
	audio.volume = 0.3;
	audio.play();
}
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
		let data2 = message.data.vout[0];
		let d = message.data.vout;
		let txid = message.data.txid;
		const messageList = document.getElementById("messages");
		d.map(async (data) => {
			let val = data.value;
			// let txid = message.data.txid;
			let scriptPubKey = data.scriptPubKey;
			let hex = scriptPubKey.hex;
			let asm = scriptPubKey.asm;
			// console.log(message);
			if (hex.includes(hexPhrase)) {
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
					asmArray.forEach((e, i) => {
						let convert = hexConvert(e);
						hexArr.push(convert);
						console.log(convert, i);
					});
					const f1 = hexArr[0];
					let f2 = hexArr[1];
					const f3 = hexArr[2];
					const f4 = hexArr[3];
					const url = `<a target="_blank" href="https://whatsonchain.com/tx/${txid}">${txid}</a>`;
					const hash = hexArr[14];
					let paymail = hexArr[12];
					const encryption = hexArr[16];
					const encryptHash = hexArr[18];
					const localHash = await sha256(localStorage.decryption);
					// let checked = document.getElementById("roomCheck").checked;
					// console.log(checked);
					if (encryption == "true" && encryptHash == localHash) {
						try {
							const messageItem = document.createElement("h5");
							f2 = await decrypt(localStorage.decryption, f2);
							paymail = await decrypt(localStorage.decryption, paymail);
							messageItem.innerHTML = `${new Date().toString()}</br>$${paymail}: ${f2}`;
							messageList.prepend(messageItem);
							document.getElementById(
								"mem"
							).innerHTML = `<h4>Sender:<br/>$${paymail}</h4><h2>Message:</br>${f2}</h2><h2>TXID:</br>${url}</h2>`;
							document.getElementById("mem").style.padding = "5px";
							document.getElementById("messages").style.padding = "5px";

							playSound();
						} catch (e) {
							console.log(e);
						}
					}
				}
			}
		});
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
