require("dotenv").config();
const bsv = require("bsv");
const express = require("express");
const app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
const {
	HandCashPurse,
	Environments,
	HandCashConnect,
} = require("@handcash/handcash-connect");

app.use(
	express.urlencoded({
		limit: "50mb",
		extended: true,
	})
);
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, Content-Type");
	next();
});
app.use(
	express.json({
		type: ["application/json", "text/plain"],
		limit: "50mb",
		limit: "50mb",
		extended: true,
	})
);
app.use(express.static("public"));
app.use(express.static("assets"));

const handCashConnect = new HandCashConnect({
	appId: process.env.HCAPPID,
	appSecret: process.env.HCAPPSECRET,
});

app.get("/", (req, res) => {
	res.send("index.html", { root: __dirname });
});

app.post("/hcaccount", async (req, res) => {
	const { hcauth } = req.body;
	console.log({ hcauth });
	if (hcauth) {
		const cloudAccount = await handCashConnect.getAccountFromAuthToken(hcauth);
		const { publicProfile } = await cloudAccount.profile.getCurrentProfile();
		console.log(publicProfile);
		res.send(publicProfile);
	}
});

app.post("/hcpost", async (req, res) => {
	const { hcauth, payload, action } = req.body;
	let hexArray = [];
	console.log(payload);
	payload.map((e) => {
		hexArray.push(Buffer.from(e).toString("hex"));
	});
	console.log(payload, hexArray);
	try {
		const cloudAccount = await handCashConnect.getAccountFromAuthToken(hcauth);
		const paymentParameters = {
			// appAction: action,
			description: "Metameet Message",
		};
		if (payload) {
			paymentParameters.attachment = { format: "hexArray", value: hexArray };
			paymentParameters.payments = [
				{ to: "smartledger", currencyCode: "BSV", sendAmount: 0.00005 },
				{ to: "sdot", currencyCode: "BSV", sendAmount: 0.00005 },
				{ to: "bryan", currencyCode: "BSV", sendAmount: 0.00005 },
				{ to: "evara", currencyCode: "BSV", sendAmount: 0.00005 },
				{ to: "gregward", currencyCode: "BSV", sendAmount: 0.00005 },
			];
		}
		const paymentResult = await cloudAccount.wallet.pay(paymentParameters);
		console.log(paymentResult);
		res.send(paymentResult);
	} catch (e) {
		console.log(e);
	}
});

app.post("/payFees", async (req, res) => {
	const { hcauth, recipients, description } = req.body;
	console.log(hcauth, recipients, description);
	// const handcashPurse = HandCashPurse.fromAuthToken(
	// 	hcauth,
	// 	Environments.prod,
	// 	process.env.HCAPPSECRET,
	// 	process.env.HCAPPID
	// );
	// console.log(
	// 	handcashPurse.handCashConnectService.httpRequestFactory.privateKey
	// );
	const privateKey = bsv.PrivateKey.fromWIF(hcauth);
	const address = bsv.Address.fromPrivateKey(privateKey);
	console.log(address.toString());
	res.send({ address: address.toString() });
});

const payment = async (handle) => {
	const account = handCashConnect.getAccountFromAuthToken(
		process.env.HCAUTHTOKEN
	);
	const paymentParameters = {
		description: "MetaMeet",
		payments: [
			{ to: handle, currencyCode: "BSV", sendAmount: 0.00009 },
			{
				to: "smartledger@simply.cash",
				currencyCode: "BSV",
				sendAmount: 0.00009,
			},
			{
				to: "gregward@simply.cash",
				currencyCode: "BSV", //pay in bsv
				sendAmount: 0.00009,
			},
			{
				to: "gregward",
				currencyCode: "USD", //pay in usd
				sendAmount: 0.00009,
			},
		],
		//add data in attachment if you like
		// attachment: { format: "hex", value: "0011223344556677889900AABBCCDDEEFF" },
		// attachment: { format: "base64", value: "ABEiM0RVZneImQCqu8zd7v8=" },
		// attachment: {
		// 	format: "json",
		// 	value: { param1: "value1", param2: "value2" },
		// },
	};
	const paymentResult = await account.wallet.pay(paymentParameters);
	console.log(paymentResult);
};
// payment("bryan");

// signaling
io.on("connection", function (socket) {
	console.log("a user connected");

	socket.on("create or join", function (room) {
		console.log("create or join to room ", room);

		var myRoom = io.sockets.adapter.rooms[room] || { length: 0 };
		var numClients = myRoom.length;

		console.log(room, " has ", numClients, " clients");

		if (numClients == 0) {
			socket.join(room);
			socket.emit("created", room);
		} else if (numClients == 1) {
			socket.join(room);
			socket.emit("joined", room);
		} else {
			socket.emit("full", room);
		}
	});

	socket.on("ready", function (room) {
		socket.broadcast.to(room).emit("ready");
	});

	socket.on("candidate", function (event) {
		socket.broadcast.to(event.room).emit("candidate", event);
	});

	socket.on("offer", function (event) {
		socket.broadcast.to(event.room).emit("offer", event.sdp);
	});

	socket.on("answer", function (event) {
		socket.broadcast.to(event.room).emit("answer", event.sdp);
	});

	socket.on("toggleAudio", function (event) {
		socket.broadcast.to(event.room).emit("toggleAudio", event.message);
	});
});

// listener
const port = process.env.PORT || 3000;

http.listen(port, function () {
	console.log(`listening on ${port}`);
});
