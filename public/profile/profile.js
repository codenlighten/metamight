const getHcProfile = async () => {
	const urlParams = new URLSearchParams(location.search);
	const hcauth = urlParams.get("authToken");
	if (hcauth) {
		console.log(hcauth);
		const r = await fetch("/hcaccount", {
			method: "POST",
			body: JSON.stringify({ hcauth }),
		});
		const res = await r.json();
		console.log(res);
		if (res) {
			localStorage.hcauth = hcauth;
			localStorage.paymail = res.paymail;
			localStorage.handle = res.handle;
			localStorage.displayName = res.displayName;
			localStorage.avatarUrl = res.avatarUrl;
			document.getElementById(
				"welcome"
			).innerHTML = `You are now logged in</br>Returning to App...`;
			setTimeout(() => {
				location.href = "../";
			}, 2000);
		}
	}
};
