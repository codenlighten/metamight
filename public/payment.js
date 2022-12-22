const payment = async () => {
	// alert("payment");
	const r = await fetch("/payFees", {
		method: "POST",
		body: JSON.stringify({
			hcauth: localStorage.hcauth,
			// payload: chatArr,
			action: "payment",
			description: "hc payment",
			recipients: ["gregward@handcash.io"],
		}),
	});
	const res = await r.json();
	if (res) {
		console.log(res);
	}
};
// payment();
