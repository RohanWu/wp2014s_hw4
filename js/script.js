
// JavaScript Document

window.fbAsyncInit = function() {
	// Initialize the FB JS SDK
	FB.init({
		appId      : '1458954511014492',    // App ID from the app dashboard
		cookie     : true,                  // Allowed server-side to fetch fb auth cookie
		status     : true,                  // Check Facebook Login status
		xfbml      : true,                  // Look for social plugins on the page
		version    : 'v2.0'
	});
	
	// Additional initialization code such as adding Event Listeners goes here
	FB.getLoginStatus(function(response) {
   		statusChangeCallback(response);
    });
};


// Load the SDK asynchronously
(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/zh_TW/sdk.js#xfbml=1&appId=1458954511014492&version=v2.0";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function statusChangeCallback(response) {
	console.log('statusChangeCallback');
	console.log(response);
	// The response object is returned with a status field that lets the app know the current login status of the person.
	if (response.status === 'connected') {
		// Logged into your app and Facebook.
		photoAPI();
		document.getElementById('status').innerHTML = '';
	}
	else if (response.status === 'not_authorized') {
		// The person is logged into Facebook, but not your app.
		document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
	}
	else {
		// The person is not logged into Facebook.
		document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
	}
}


function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}


function photoAPI() {
	FB.api('/me/picture?width=250', function(response) {
		var my_picture_url = response.data.url;
		$("#my-profile-picture").attr('src', my_picture_url);
	});
}
