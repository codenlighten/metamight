// getting dom elements
var divSelectRoom = document.getElementById("selectRoom");
var divConferenceRoom = document.getElementById("conferenceRoom");
var btnGoBoth = document.getElementById("goBoth");
var btnGoVideoOnly = document.getElementById("goVideoOnly");
var localVideo = document.getElementById("localVideo");
var remoteVideo = document.getElementById("remoteVideo");
var btnMute = document.getElementById("mute");
var listAudioEvents = document.getElementById("audioEvents");

// variables
var roomNumber = localStorage.decryption || "general";
var localStream;
var remoteStream;
var rtcPeerConnection;
var iceServers = {
	iceServers: [
		{
			url: "stun:stun.services.mozilla.com",
		},
		{
			url: "stun:stun.l.google.com:19302",
		},
	],
};
var streamConstraints;
var isCaller;

// Let's do this
var socket = io();
var callStatus = false;
btnGoBoth.onclick = async () => {
	let id = "";
	if (!localStorage.decryption) {
		id = await getUUID();
		localStorage.decryption = id;
	}
	if (callStatus == false) {
		id = localStorage.decryption;
		navigator.clipboard.writeText(`https://metameet.icu/?key=${id}&audio=true`);
		alert(
			`Congrats!! ID copied to clipboard: https://metameet.icu/?key=${id}&audio=true Share with your friend`
		);
		initiateCall(true);
		callStatus = true;
		btnGoBoth.innerHTML = "End Call";
	} else {
		location.reload();
	}
	btnMute.onclick = toggleAudio;
};

function initiateCall(audio, roomNum) {
	streamConstraints = {
		// video: true,
		audio: audio,
	};
	if (roomNum != null && roomNum != undefined) {
		roomNumber = roomNum;
	}
	socket.emit("create or join", roomNumber);
	// divSelectRoom.style = "display: none;";
	// divConferenceRoom.style = "display: block;";
	btnMute.style.display = "";
}

// message handlers
socket.on("created", function (room) {
	console.log(room);
	navigator.mediaDevices
		.getUserMedia(streamConstraints)
		.then(function (stream) {
			addLocalStream(stream);
			isCaller = true;
		})
		.catch(function (err) {
			console.log("An error ocurred when accessing media devices");
		});
});

socket.on("joined", function (room) {
	navigator.mediaDevices
		.getUserMedia(streamConstraints)
		.then(function (stream) {
			addLocalStream(stream);
			socket.emit("ready", roomNumber);
		})
		.catch(function (err) {
			console.log("An error ocurred when accessing media devices");
		});
});

socket.on("candidate", function (event) {
	var candidate = new RTCIceCandidate({
		sdpMLineIndex: event.label,
		candidate: event.candidate,
	});
	rtcPeerConnection.addIceCandidate(candidate);
});

socket.on("ready", function () {
	if (isCaller) {
		createPeerConnection();
		let offerOptions = {
			offerToReceiveAudio: 1,
		};
		rtcPeerConnection
			.createOffer(offerOptions)
			.then((desc) => setLocalAndOffer(desc))
			.catch((e) => console.log(e));
	}
});

socket.on("offer", function (event) {
	if (!isCaller) {
		createPeerConnection();
		rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event));
		rtcPeerConnection
			.createAnswer()
			.then((desc) => setLocalAndAnswer(desc))
			.catch((e) => console.log(e));
	}
});

socket.on("answer", function (event) {
	rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event));
	// var constraintsObject = { echoCancellation: constraint };

	// constraintsObject.echoCancellation = constraint;
});

socket.on("toggleAudio", function (event) {
	addAudioEvent(event);
});

// handler functions
function onIceCandidate(event) {
	if (event.candidate) {
		console.log("sending ice candidate");
		socket.emit("candidate", {
			type: "candidate",
			label: event.candidate.sdpMLineIndex,
			id: event.candidate.sdpMid,
			candidate: event.candidate.candidate,
			room: roomNumber,
		});
	}
}

function onAddStream(event) {
	remoteVideo.srcObject = event.stream;
	remoteStream = event.stream;
	if (remoteStream.getAudioTracks().length > 0) {
		addAudioEvent("Remote user is sending Audio");
	} else {
		addAudioEvent("Remote user is not sending Audio");
	}
}

function setLocalAndOffer(sessionDescription) {
	rtcPeerConnection.setLocalDescription(sessionDescription);
	socket.emit("offer", {
		type: "offer",
		sdp: sessionDescription,
		room: roomNumber,
	});
}

function setLocalAndAnswer(sessionDescription) {
	rtcPeerConnection.setLocalDescription(sessionDescription);
	socket.emit("answer", {
		type: "answer",
		sdp: sessionDescription,
		room: roomNumber,
	});
}

//utility functions
function addLocalStream(stream) {
	localStream = stream;
	localVideo.srcObject = stream;

	if (stream.getAudioTracks().length > 0) {
		btnMute.style = "display: block";
	}
}

function createPeerConnection() {
	rtcPeerConnection = new RTCPeerConnection(iceServers);
	rtcPeerConnection.onicecandidate = onIceCandidate;
	rtcPeerConnection.onaddstream = onAddStream;
	rtcPeerConnection.addStream(localStream);
}

function toggleAudio() {
	localStream.getAudioTracks()[0].enabled =
		!localStream.getAudioTracks()[0].enabled;
	socket.emit("toggleAudio", {
		type: "toggleAudio",
		room: roomNumber,
		message: localStream.getAudioTracks()[0].enabled
			? "Remote user's audio is unmuted"
			: "Remote user's audio is muted",
	});
}

function addAudioEvent(event) {
	var p = document.createElement("p");
	p.appendChild(document.createTextNode(event));
	listAudioEvents.appendChild(p);
}
