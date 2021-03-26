// Saves options to chrome.storage
var latest_items = null;
var username_dom = document.getElementById('username');
var student_id_dom = document.getElementById('student_id');
var password_dom = document.getElementById('password');
function save_options() {
	var username = username_dom.value;
	var student_id = student_id_dom.value;
	var password = password_dom.value;
	chrome.storage.local.set({
		"username": username,
		"student_id": student_id,
		"password": password
	}, function() {
		var status = document.getElementById('status');
		status.textContent = '';

		latest_items.username = username;
		latest_items.student_id = student_id;
		latest_items.password = password;
	});
}

function reset_fields() {
	username_dom.value = '';
	student_id_dom.value = '';
	password_dom.value = '';
	status_changed(new KeyboardEvent("keyup", {keyCode: 0}));
}

function status_changed(e) {
	if(e.keyCode !== 13) {
		var status = document.getElementById('status');
		if(username_dom.value !== latest_items.username
		|| student_id_dom.value !== latest_items.student_id
		|| password_dom.value !== latest_items.password) {
			status.textContent = '*';
		} else {
			status.textContent = '';
		}
	}
}

function load_options() {
	chrome.storage.local.get(["username", "student_id", "password"], function(items) {
		latest_items = items;
		if(items.username != "undefined")
			username_dom.value = items.username;

		if(items.student_id != "undefined")
			student_id_dom.value = items.student_id;

		if(items.password != "undefined")
			password_dom.value = items.password;
	});
}
document.addEventListener('DOMContentLoaded', load_options);
document.querySelectorAll("input[type=text], input[type=password]").forEach(
	x => x.addEventListener('keyup', status_changed)
);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('reset').addEventListener('click', reset_fields);