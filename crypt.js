const decrypt = (password, ciphertext) => {
	// Decrypt
	let bytes = CryptoJS.AES.decrypt(ciphertext, password);
	let originalText = bytes.toString(CryptoJS.enc.Utf8);
	// console.log("orig", originalText);
	purse = originalText;
	return originalText;
};
const encrypt = (password, message) => {
	var ciphertext = CryptoJS.AES.encrypt(message, password).toString();
	// var ciphertextObject = CryptoJS.AES.encrypt(
	// 	JSON.stringify(message),
	// 	password
	// ).toString();
	// console.log("ciphertext", ciphertext); // 'my message'
	// decrypt(password, ciphertext); //test decrypt out
	return ciphertext;
};
