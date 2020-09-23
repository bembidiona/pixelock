
var appName = "p■x■l◘ck";
var version = '0.7';
var imgOriginal;
var imgExist = false;
var img;
var numCode;
var txtCode;
var currentCode = 0; 
var stepNum = 0;
var input, buttonSave, buttonReset, buttonRight, buttonLeft;
var kun,bini;
var code;
var x, y;
var driftSteps = 10;
var invertSteps = 1;
var rightKey = ">";
var leftKey = "<";
var uiSizeW = 200;
var uiSizeH = 60;
var canDecode;
var fuckingFirefoxFile;
var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
var buttonLeftXOrg;
var buttonRightXOrg;
var plsWait;


var sequenceMenu = ["\
ABOUT:\n\
Image encryption tool with net-arty intentions.\n\
Currently at v."+version+"\
","\
HOW TO BASIC:\n\
1. Drag and drop an image into the canvas.\n\
2. If you want, change the Key in the top field.\n\
3. Click arrow button or press ENTER to encode.\
","\
TIPS:\n\
-You can change the key beetween steps.\n\
-If you encode forward, you can decode going backwards with the same key.\n\
-Works specially well on pure black and white images.\
","\
SHORTCUTS:\n\
[►] or [ENTER]:\n\
Encrypt forward.\n\
[◄]:\n\
Encrypt backwards.\n\
[ESC]:\n\
Reset image.\
","\
KNOW BUGS & WORKAROUNDS:\n\
-In Firefox the drag'n'drop feature is pretty hacked. If the first time the image don't show up, drop it again and it will work for sure.\
"]
var sequence = sequenceMenu;

var tween;
var tweenFade = {a: 255};
var flashing = false;

var tweenArrows;
var tweenArrowsX = {l: 0, r: 0, y:-50, colorTxt:150};

var tweenFeedback;
var tweenFeedbackProp = {colorDrag:150};

var colorTop = "#21d0ad";
var colorBG = "#efefef";

function setup() {
  
  //drop
  var c = createCanvas(windowWidth, windowHeight);
  c.drop(gotFileHack); 


  input = createInput();  
  input.value('✧**secretKey**✧');
  input.elt.autofocus = true;
  //input.elt.class = "focus";
  input.elt.id = "Consolas";

  buttonSave = createButton('save');  
  buttonSave.mousePressed(saveImg);
  buttonSave.class("myButton");
  buttonSave.class("save");
  

  buttonReset = createButton('reset');  
  buttonReset.mousePressed(resetImg);
  buttonReset.class("myButton");
  
  buttonRight = createButton('>');  
  buttonRight.mousePressed(encodePls);
  buttonRight.class("myButton");

  buttonLeft = createButton('<');  
  buttonLeft.mousePressed(decodePls);
  buttonLeft.class("myButton");

  textFont("Consolas");

  txtToNum(input.value());

  kun = createA("https://www.facebook.com/sisterrsisterr","Kun", "_blank");
  bini = createA("https://www.jeremiasbabini.com","bini", "_blank");

  buttonLeftXOrg = windowWidth/2 - 159 + uiSizeW/2;
  buttonRightXOrg = windowWidth/2 + 120 + uiSizeW/2;
}

function draw() {  

	TWEEN.update();
	background(colorBG);

	stroke("#12120f");
	line(uiSizeW +3, 0, uiSizeW + 3, windowHeight);
	noStroke();
	
	

	noStroke();
	fill("#12120f");
	rect(0, 0, uiSizeW, windowHeight);	
	
	fill(colorTop);
	rect(0, 0, windowWidth, uiSizeH);
	stroke(colorTop);
	line(0, uiSizeH + 3, windowWidth, uiSizeH + 3);	

	input.position(windowWidth/2 - input.width/2 + uiSizeW/2, 7);
	buttonLeft.position(buttonLeftXOrg + tweenArrowsX.l, tweenArrowsX.y);
	buttonRight.position(buttonRightXOrg + tweenArrowsX.r, 10);
	buttonSave.position(windowWidth - buttonSave.width - 28, 10);
	buttonReset.position(windowWidth - buttonReset.width - 109, 10);



	fill("#12120f");
	noStroke();
	textSize(12);
	textAlign(RIGHT);
	text('by', windowWidth - 54, windowHeight - 10);

	kun.position(windowWidth-56, windowHeight-21);
	bini.position(windowWidth-36, windowHeight-21);
	

	
	noStroke();
	textSize(45);
	textAlign(LEFT);
	fill(255,0,0,50);
	text(appName, 8+2, 42+2);
	fill("#1cc4a2");
	text(appName, 8-2, 42-2);
	fill(colorBG);
	text(appName, 8, 42);

	for(var i = 0; i < 15; i++){
		gX = numCode[i % numCode.length];
		gX = gX%6 -3;

		gY = numCode[i % numCode.length];		
		gY = gY%(uiSizeH-20)+10;

		gSize = numCode[i % numCode.length];
		gSize = gSize%2 + 1;
		
		glitch = get(0,gY,800,gSize);
		image(glitch,gX,gY,glitch.width,glitch.height);
	}

	if(imgExist){
		x = ceil(windowWidth/2 - img.width/2 + uiSizeW/2);
		y = ceil(windowHeight/2 - img.height/2 + uiSizeH/2);

		noStroke();
		fill(0,50);		
		rect(x+6, y+6, img.width+6, img.height+6);
		strokeWeight(14);
		stroke(150);
		rect(x, y, img.width, img.height);
		strokeWeight(12);
		stroke(255);
		rect(x, y, img.width, img.height);
		
		image(img, x, y, img.width, img.height);	

		if(flashing){
			noStroke();
			fill(255,tweenFade.a);
			rect(x, y, img.width, img.height);
		}

		if(plsWait){
			noStroke();
			fill(colorBG);
			rect(x, y, img.width, img.height);

			noStroke();
			textSize(60);
			textAlign(CENTER);
			var plsTxt = "◔";			
			fill(220);
			text(plsTxt, windowWidth/2 + uiSizeW/2 + 19, windowHeight/2 + uiSizeH/2 + 20);
		}
	}
	else{
		noStroke();
		textSize(24);
		textAlign(CENTER);
		fill(220);
		text('drag images here!', windowWidth/2 + uiSizeW/2 +1, windowHeight/2 + uiSizeH/2 + 1);
		fill(tweenFeedbackProp.colorDrag , 150, 150);
		text('drag images here!', windowWidth/2 + uiSizeW/2, windowHeight/2 + uiSizeH/2);

	}

	fill(200);
	noStroke();
	textSize(12);
	textAlign(LEFT);
	
	
	var maxChars = uiSizeH/2 - 2;
	textLeading(11);
	var breaks = 0;
	if(stepNum == 0){				
		for(var i = 0; i < sequenceMenu.length; i++){
			text(sequenceMenu[i], 10, uiSizeH+15  + breaks*11 + i*50, uiSizeW-9, windowHeight);

			breaks += ceil(sequenceMenu[i].length/maxChars);	
			if(i == 0) breaks -= 2;
			else if(i == 1)breaks -= 2;
			else if(i == 2)breaks -= 1;
		}		
	}
	else{
		for(var i = 0; i < sequence.length; i++){
			var txt = sequence[i];
			txt = txt.substr(0, 1) + " " + txt.substr(1);

			while(txt.length > maxChars){
				lineToPrint = txt.substr(0, maxChars);
				txt = txt.substr(maxChars);

				text(lineToPrint, 10, 20*(i+1) + 11*breaks +65);

				breaks++;
			}
			text(txt, 10, 20*(i+1) + 11*breaks + uiSizeH+15);	
		}
	} 
}

function gotFile(file) {  	

	if (file.type === 'image') {    
		if(imgExist){
			tweenArrows = new TWEEN.Tween(tweenArrowsX)
						.to({y: -50}, 250)						
						.easing(TWEEN.Easing.Quadratic.InOut )
			tweenArrows.start();

			canDecode = false;
		}

		var imgDropped = createImg(file.data);		
		imgDropped.hide();

		imgDroppedW = imgDropped.width;
		imgDroppedH = imgDropped.height;				

		var maxW = windowWidth - uiSizeW - 40;
		var maxH =  windowHeight - uiSizeH - 30;

		noStroke();
		fill(255);

		if(imgDroppedW > maxW || imgDroppedH > maxH){
			if(imgDroppedW > imgDroppedH){
				if(imgDroppedW > maxW){			
					rect(0,0,maxW, (imgDroppedH*maxW)/imgDroppedW);
					image(imgDropped, 0, 0, maxW, (imgDroppedH*maxW)/imgDroppedW);
					img = get(0,0,maxW, (imgDroppedH*maxW)/imgDroppedW);

					if(img.height > maxH){
						imgDropped = img;
						imgDroppedW = imgDropped.width;
						imgDroppedH = imgDropped.height;

						rect(0,0,(imgDroppedW*maxH)/imgDroppedH, maxH);
						image(imgDropped, 0, 0, (imgDroppedW*maxH)/imgDroppedH, maxH);
						img = get(0,0,(imgDroppedW*maxH)/imgDroppedH, maxH);
					} 
				}
			}
			else {
				rect(0,0,(imgDroppedW*maxH)/imgDroppedH, maxH);
				image(imgDropped, 0, 0, (imgDroppedW*maxH)/imgDroppedH, maxH);
				img = get(0,0,(imgDroppedW*maxH)/imgDroppedH, maxH);
			}
		}		
		else{
			rect(0,0,imgDroppedW,imgDroppedH);
			image(imgDropped, 0, 0, imgDroppedW, imgDroppedH);			
			img = get(0,0,imgDroppedW,imgDroppedH);
		} 		

		imgOriginal = img;
		imgExist = true;
		sequence = [];
		stepNum = 0;		

	} else {
		println('Not an image file!');
	}	
}
function gotFileHack(file){
	fuckingFirefoxFile = file;
	if(isFirefox){
		setTimeout(function() {gotFile(fuckingFirefoxFile) ;}, 100);
		if(!imgExist) setTimeout(function() {gotFile(fuckingFirefoxFile) ;}, 200);
	}

	gotFile(file);	 
}

function keyPressed() {
	if (keyCode === RIGHT_ARROW) {	
		encodePls();
	}	
	else if (keyCode === ENTER) {	
		encodePls();
	}
	else if (canDecode && keyCode === LEFT_ARROW) {
		decodePls();		
	}	
	else if (keyCode === ESCAPE) {
		resetImg();			
	}	
}


function encodePls(){
	plsWait = true;
	setTimeout(encode, 20);
}
function decodePls(){
	plsWait = true;
	setTimeout(decode, 20);
}
function startCode(){
	if(!imgExist){
		tweenFeedbackProp.colorDrag = 150;
		tweenFeedback = new TWEEN.Tween(tweenFeedbackProp)
						.to({colorDrag: 255}, 100)						
						.yoyo( true )
						.repeat( 11 )
						.easing(TWEEN.Easing.Quadratic.InOut )
		tweenFeedback.start();

		return false;
	}
	else if(flashing) return false;

	txtToNum(input.value() );
	currentCode = 0;
	stepNum++;

	plsWait = false;

	return true;
}
function encode(){
	if(!startCode()) return;

	if(stepNum == 1){
		tweenArrows = new TWEEN.Tween(tweenArrowsX)
					.to({y: 10}, 250)						
					.easing(TWEEN.Easing.Quadratic.InOut )
		tweenArrows.start();

		canDecode = true;		
	}

	tweenArrowsX.r = 0;
	tweenArrows = new TWEEN.Tween(tweenArrowsX)
					.to({r: 10}, 50)						
					.yoyo( true )
					.repeat( 1 )
					.easing(TWEEN.Easing.Quadratic.InOut )
	tweenArrows.start();

	println("ENCODE");  			
	sequence.push(rightKey+input.value());
	
	//driff		
	image(img, x, y, img.width, img.height); // plswaitSafe
	for(var i = 0; i < driftSteps; i++){			
		var driftX = numCode[i % numCode.length] * numCode[i % numCode.length] ;
		driftX = driftX%img.width;

		var driftY = numCode[i % numCode.length] * numCode[i % numCode.length] ;
		driftY = driftY%img.height;

		var driftOffset = numCode[i % numCode.length] * numCode[i % numCode.length] ;
		driftOffset = driftOffset%img.width;

		var driftSize = 50;

		newImg1 = img.get(0, driftY, driftOffset, driftSize);
		newImg2 = img.get(driftOffset, driftY, img.width - driftOffset, driftSize);
		image(newImg1, x + img.width - driftOffset, y + driftY, driftOffset, driftSize);
		image(newImg2, x, y + driftY, img.width - driftOffset, driftSize);		
	}
	img = get(x, y, img.width, img.height);

	

	
	img.loadPixels();   
	//pixel colors
	for (var i = 0; i < 4*(img.width*img.height); i+=4) {
		encodePixel(i);
		encodePixel(i+1);
		encodePixel(i+2);			
	}
	img.updatePixels();


	//invert
	//invertPixels();
		

	img.updatePixels();

	endCode();
}
function decode(){
	if(!startCode()) return;

	tweenArrowsX.l = 0;
	tweenArrows = new TWEEN.Tween(tweenArrowsX)
					.to({l: -10}, 50)						
					.yoyo( true )
					.repeat( 1 )
					.easing(TWEEN.Easing.Quadratic.InOut )
	tweenArrows.start();

	println("DECODE");	
	sequence.push(leftKey+input.value());	

	
	img.loadPixels(); 	
	//invertPixels();

	for (var i = 0; i < 4*(img.width*img.height); i+=4) {
		decodePixel(i);
		decodePixel(i+1);
		decodePixel(i+2);			
	}	

	img.updatePixels();	

	//driff			
	image(img, x, y, img.width, img.height); // plswaitSafe
	for(var i = 0; i < driftSteps; i++){
		var driftX = numCode[i % numCode.length] * numCode[i % numCode.length] ;
		driftX = driftX%img.width;

		var driftY = numCode[i % numCode.length] * numCode[i % numCode.length] ;
		driftY = driftY%img.height;

		var driftOffset = numCode[i % numCode.length] * numCode[i % numCode.length] ;
		driftOffset = driftOffset%img.width;

		var driftSize = 50;
		
		newImg1 = img.get(0 + img.width - driftOffset, driftY, driftOffset, driftSize);
		newImg2 = img.get(0, driftY, img.width - driftOffset, driftSize);				

		image(newImg1, x, y + driftY, driftOffset, driftSize);
		image(newImg2, x + driftOffset, y + driftY, img.width - driftOffset, driftSize);				
	}

	img = get(x, y, img.width, img.height);	

	endCode();
}
function endCode(){
	if(sequence.length > 1 && sequence[sequence.length-1].substr(0,1) != sequence[sequence.length-2].substr(0,1)){
		if(sequence[sequence.length-1].substr(1) == sequence[sequence.length-2].substr(1)){
			sequence.pop();
			sequence.pop();
		}
	}

	if(sequence.length == 0) {		
		stepNum = 0;	
	} 

	println(sequence);

	flash();
}
function invertPixels(){
	img.loadPixels();   
		
	for(var i = 0; i < invertSteps; i++){
		var chan = 0;
		var chanX = (numCode[(i + stepNum) % numCode.length]*10000) % img.width;
		var chanXOrig = chanX;
		var chanY = (numCode[(i + stepNum) % numCode.length]*10000) % img.height;;
		var invSizeX = 200//numCode[(i + stepNum)*100 % numCode.length] % (img.width - chanX) ;
		var invSizeY = 200//numCode[(i + stepNum)*100 % numCode.length] % (img.height - chanY) ;
		while(chanY <= invSizeY){
			while(chanX <= invSizeX){
				invertPixel(chan);
				invertPixel(chan+1);
				invertPixel(chan+2);				

				chanX += 1;
				chan = chanX*4 + img.width*4*chanY; 
			}
			chanX = chanXOrig;
			chanY += 1;
		}
	}

	img.updatePixels();
}
function invertPixel(n){	
	img.pixels[n] = 0//255 - img.pixels[n];		
}

function encodePixel(n){
	getCode();
	
	if(img.pixels[n] == 255) img.pixels[n] = (img.pixels[n] +  code) % 255 - 1;
	else img.pixels[n] = (img.pixels[n] + code) % 255;	
}

function decodePixel(n){
	getCode();

	var newValor = (img.pixels[n] - code)%255;

	if(newValor < 0) newValor = 255 + newValor;
	img.pixels[n] = newValor;
}

function getCode(){
	currentCode++;
	code = numCode[currentCode % numCode.length];
	code *= 2;

}

function txtToNum(txt){
	numCode = [];

	if(txt.length == 0) txt = " ";
	for(var i = 0; i < txt.length; i++){

		if(txt.charCodeAt(i) == "0" || txt.charCodeAt(i) == " ") numCode.push(0);
		else numCode.push(txt.charCodeAt(i));
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  buttonLeftXOrg = windowWidth/2 - 159 + uiSizeW/2;
  buttonRightXOrg = windowWidth/2 + 120 + uiSizeW/2;
}

function saveImg(){
	var filename = "";	

	for(var i = sequence.length - 1; i >= 0; i--){

		var arrows = "";
		var arrow;
		if(sequence[i].substr(0,1) == ">") arrow = "◄";
		else arrow = "►";
		arrows += arrow;

		for(var j = i; j > 0; j--){

			if(sequence[j] != sequence[j-1]) break;

			i--;
			arrows += arrow;			
		}

		filename += "["+ arrows + sequence[i].substr(1) + "]";	

	}
	println(filename);
	save(img, filename +'.png'); 
}
function resetImg(){
	tweenArrows = new TWEEN.Tween(tweenArrowsX)
						.to({y: -50}, 250)						
						.easing(TWEEN.Easing.Quadratic.InOut )
	tweenArrows.start();

	canDecode = false;

	img = imgOriginal;
	sequence = [];
	stepNum = 0;
	flash();
}

function flash(){
	flashing = true;

	tweenFade = {a: 255};
    tween = new TWEEN.Tween(tweenFade)
					.to({a: 0}, 120)
					.onComplete(function(){
					    flashing = false;
					});

	tween.start();
}


