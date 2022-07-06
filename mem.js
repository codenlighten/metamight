var subscriptions = [];
let subscribe = () => {
	let subscription = document.getElementById("subscription").value;
	subscriptions.push(subscription);
	localStorage.subscriptions = subscriptions;
};

const hexConvert = (str1) => {
	console.log(str1);
	var hex = str1.toString();
	var str = "";
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
};
const getMem = () => {
	const centrifuge = new Centrifuge("wss://socket.whatsonchain.com/mempool");

	centrifuge.on("publish", async function (message) {
		let data = message.data.vout[0];
		let val = data.value;
		let txid = message.data.txid;
		if (val == 0) {
			let scriptPubKey = data.scriptPubKey;
			let hex = scriptPubKey.hex;
			let asm = scriptPubKey.asm;
			if (
				hex.includes(
					"3137457578424e466751764e394d64514b664a444447636171637239735457637a74"
				)
			) {
				let asmArray = asm.split(" ");
				asmArray.splice(0, 2);
				console.log(asmArray);

				let f1 = asmArray[0] != undefined ? hexConvert(asmArray[0]) : "";
				let f2 = asmArray[1] != undefined ? hexConvert(asmArray[1]) : "";
				let f3 = asmArray[2] != undefined ? hexConvert(asmArray[2]) : "";
				let f4 = asmArray[3] != undefined ? hexConvert(asmArray[3]) : "";
				let fieldArray = [f1, f2, f3, f4];
				fieldArray.map((e) => {
					document.getElementById(
						"mem"
					).innerHTML = `<h2>Message: <br/>  ${f3}</h2><br/>AppID: ${f1}<br/>UserID:  ${f2}<br/><br/>Hash: ${f4}<br/>`;
				});
			}
			if (
				hex.includes(
					"31395a64566a4e656971635576537533326e4a336f544b794e6d6671775a736e6566"
				)
			) {
				console.log("encryption alert");
				let asmArray = asm.split(" ");
				asmArray.splice(0, 2);
				let f1 = hexConvert(asmArray[0]);
				let f2 = hexConvert(asmArray[1]);
				let f3 = hexConvert(asmArray[2]);
				let f4 = hexConvert(asmArray[3]);
				let f5 = asmArray[4] != undefined ? hexConvert(asmArray[4]) : "";
				let fieldArray = [f1, f2, f3, f4, f5];
				let decryptedMessage = decrypt(localStorage.decryption, f5);
				fieldArray.map((e) => {
					document.getElementById(
						"memDecrypt"
					).innerHTML = `<h2>EncryptedMessage: <br/>  ${decryptedMessage}</h2><br/>AppID: ${f1}<br/>UserID:  ${f2}<br/>Hash: ${f4}`;
				});
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
getMem();
