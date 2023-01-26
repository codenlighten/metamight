import {
	JungleBusClient,
	ControlMessageStatusCode,
} from "@gorillapool/js-junglebus";
// const centrifuge = new Centrifuge("wss://junglebus.gorillapool.io");

const client = new Centrifuge("wss://junglebus.gorillapool.io", {
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
};
const onStatus = function (message) {
	if (message.statusCode === ControlMessageStatusCode.BLOCK_DONE) {
		console.log("BLOCK DONE", message.block);
	} else if (message.statusCode === ControlMessageStatusCode.WAITING) {
		console.log("WAITING FOR NEW BLOCK...", message);
	} else if (message.statusCode === ControlMessageStatusCode.REORG) {
		console.log("REORG TRIGGERED", message);
	} else if (message.statusCode === ControlMessageStatusCode.ERROR) {
		console.error(message);
	}
};
const onError = function (err) {
	console.error(err);
};
const onMempool = function (tx) {
	console.log("TRANSACTION", tx);
};

(async () => {
	await client.Subscribe(
		"45669ee3b92ce8197d6c216e5f13d9a4d9968e7b70486ba2cc85117c805d6356",
		720000,
		onPublish,
		onStatus,
		onError,
		onMempool
	);
})();
