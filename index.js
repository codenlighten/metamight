require("dotenv").config();
const bsv = require("bsv");
const express = require("express");
const {
	HandCashPurse,
	Environments,
	HandCashConnect,
} = require("@handcash/handcash-connect");
const app = express();

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

const handCashConnect = new HandCashConnect({
	appId: "639b712b489d787a921032d6",
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
				{ to: "smartledger", currencyCode: "BSV", sendAmount: 0.0001 },
				{ to: "sdot", currencyCode: "BSV", sendAmount: 0.0001 },
				{ to: "bryan", currencyCode: "BSV", sendAmount: 0.0001 },
				{ to: "evara", currencyCode: "BSV", sendAmount: 0.0001 },
				{ to: "gregward", currencyCode: "BSV", sendAmount: 0.0001 },
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
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`listening on ${port}`);
});
