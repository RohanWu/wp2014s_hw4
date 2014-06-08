
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
		$("#canvas").attr('src', my_picture_url);
	});
}


//以下為canvas的程式碼，基本上不需多動，依據comments修改即可
	
//起始畫面
var ctx = document.getElementById('canvas').getContext('2d'); //宣告變數找到頁面的canvas標籤的2d內容
ctx.font='20px "Arial"'; //設定字體與大小
ctx.fillText("Click here to start fill with Facebook Profile Picture", 40, 270); //設定預設的開始畫面

var img = new Image();				// 新增圖像1
img.src = "img/overlay.png";		//圖像路徑（路徑自己設，且自己加入想要的圖層）

var img2 = new Image();				//新增圖像2
img2.src = "img/overlayback.png";	//圖像路徑

var img3 = new Image();				//新增圖像3
img3.src = "img/typography.png";	//圖像路徑
	
//宣告基本變數
var canvas=document.getElementById("canvas"); //宣告變數找到canvas標籤
var ctx=canvas.getContext("2d"); //找到2d內容
var canvasOffset=$("#canvas").offset();//找到offset
var offsetX=canvasOffset.left;//左方
var offsetY=canvasOffset.top;//上方
var canvasWidth=canvas.width;//大小
var canvasHeight=canvas.height;//高度
var isDragging=false;//拖拉

function handleMouseDown(e){//滑鼠按下的函數
	canMouseX=parseInt(e.clientX-offsetX);//抓滑鼠游標X
	canMouseY=parseInt(e.clientY-offsetY);//抓滑鼠游標y
	// set the drag flag
	isDragging=true;//宣告拖拉變數
}

function handleMouseUp(e){//滑鼠放掉的函數
	canMouseX=parseInt(e.clientX-offsetX);
	canMouseY=parseInt(e.clientY-offsetY);
	// clear the drag flag
	isDragging=false;
}

function handleMouseOut(e){//滑鼠移開的函數
	canMouseX=parseInt(e.clientX-offsetX);
	canMouseY=parseInt(e.clientY-offsetY);
	// user has left the canvas, so clear the drag flag
	//isDragging=false;
}

function handleMouseMove(e){//滑鼠移動的event
	canMouseX=parseInt(e.clientX-offsetX);
	canMouseY=parseInt(e.clientY-offsetY);
	// if the drag flag is set, clear the canvas and draw the image
	if(isDragging){ //當拖拉為True時
		ctx.clearRect(0,0,canvasWidth,canvasHeight); //移除canvas起始的內容
		var profileIMG = document.getElementById("preview1");//抓html裡預載入的照片
		profileIMG.crossOrigin = "Anonymous"; // 這務必要做，為了讓Facebook的照片能夠crossdomain傳入到你的頁面，CORS Policy請參考https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image 
		//canvas.width = profileIMG.width;//設定canvas的大小需符合profileimg的大小
		//canvas.height = profileIMG.height;
		ctx.drawImage(profileIMG,0,0);//從XY軸0，0值開始畫如profileimg
		ctx.drawImage(img3,canMouseX-128/2,canMouseY-120/2); //劃入img3，並根據你的滑鼠游標移動，你可以自行更換想要移動的圖層，數值會因XY軸向有所不同
		ctx.drawImage(img2,0,0); //劃入img2
		var inputedText = $('#inputed').val();//抓取頁面inputed ID的內容
		ctx.fillStyle = "black"; //字體顏色
		ctx.font='20px "微軟正黑體"'; //字體大小和字形
		ctx.fillText(inputedText, canMouseX-1/2,canMouseY-30/2); //字體也可以依據滑鼠游標移動，所輸入的值可自行調整，若不想移動輸入的字體，可以把它改成（inputedText,0,0)X Y軸 0，0的位置
	}
}

//抓取滑鼠移動的event
$("#canvas").mousedown(function(e){handleMouseDown(e);});
$("#canvas").mousemove(function(e){handleMouseMove(e);});
$("#canvas").mouseup(function(e){handleMouseUp(e);});
$("#canvas").mouseout(function(e){handleMouseOut(e);});

// 以上為canvas的程式碼
