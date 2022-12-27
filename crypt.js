const CryptoJS = require("crypto-js");

const decrypt = (password, ciphertext) => {
	// Decrypt
	let bytes = CryptoJS.AES.decrypt(ciphertext, password);
	let originalText = bytes.toString(CryptoJS.enc.Utf8);
	// console.log("orig", originalText);
	return originalText;
};
const encrypt = (password, message) => {
	var ciphertext = CryptoJS.AES.encrypt(message, password).toString();
	return ciphertext;
};

const doubleEncrypt = (password, message) => {
	let firstEncrypt = encrypt(password, message);
	let secondEncrypt = encrypt(password, firstEncrypt);
	return secondEncrypt;
};

const toHex = (txt) => {
	const encoder = new TextEncoder();
	return Array.from(encoder.encode(txt))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
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

const decryptPrivKey = async (password, privateKey) => {
	let privKey = await decrypt(password, privateKey);
	let secondDecrypt = await decrypt(password, privKey);
	return secondDecrypt;
};
const decryptor = async (password) => {
	let p = await decrypt(decrypt(localStorage.privKey, password), password);
	console.log(p);
	return p;
};
const arrayToBase64 = (buffer) => {
	var binary = "";
	var bytes = new Uint8Array(buffer);
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	let myBase = window.btoa(binary);
	console.log(myBase);
	return myBase;
};

const getUUID = () => {
	return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
		(
			c ^
			(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
		).toString(16)
	);
};

module.exports = { hexConvert, decrypt };
