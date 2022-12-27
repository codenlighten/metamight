const { JungleBusClient } = require("@gorillapool/js-junglebus");

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
};
// const onStatus = function (message) {
// 	if (message.statusCode === ControlMessageStatusCode.BLOCK_DONE) {
// 		console.log("BLOCK DONE", message.block);
// 	} else if (message.statusCode === ControlMessageStatusCode.WAITING) {
// 		console.log("WAITING FOR NEW BLOCK...", message);
// 	} else if (message.statusCode === ControlMessageStatusCode.REORG) {
// 		console.log("REORG TRIGGERED", message);
// 	} else if (message.statusCode === ControlMessageStatusCode.ERROR) {
// 		console.error(message);
// 	}
// };
const onError = function (err) {
	console.error(err);
};
const onMempool = function (tx) {
	console.log("TRANSACTION", tx);
};

(async () => {
	await client.Subscribe(
		"fd846dde53ca7fb9feaed6f9ac7081c926757d826ee4898c939ee6472a8bbd27",
		// "fd846dde53ca7fb9feaed6f9ac7081c926757d826ee4898c939ee6472a8bbd27",
		700000,
		onPublish,
		// onStatus,
		onError,
		onMempool
	);
})();
