
const time=document.getElementById("time"),
	greeting=document.getElementById("greeting"),
	name=document.getElementById("name"),
	focus=document.getElementById("focus");

var list = null;
var myItems="";
var listItemsKey="listItems";
var nameKey = "name";

var morningUlColor1 = "#B7904F";
var morningUlColor2 = "#C9B47D";
var morningButton = "#B7904F";
var afternoonUlColor1 = "#D2EEFC";
var afternoonUlColor2 = "#A2CBE1"; 
var afternoonButton = "#B1D6E8";
var nightUlColor1 = "#006BB9";
var nightUlColor2 = "#008DDD";
var nightButton = "#B1D6E8";

var currentUlColor1 = "";
var currentUlColor2 = "";
var currentButton = "";
// var today = new Date(2019, 6, 10, 22, 10, 30);



function showTime() {
	let today=new Date(),
	hour=today.getHours(),
	min=today.getMinutes(),
	sec=today.getSeconds();
	//set Am or PM
	const ampm=hour<=12 ? "AM" : "PM";

	//12 hours format
	hour=hour % 12 || 12;

	//output time
	time.innerHTML=`${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}${ampm}`;
	setTimeout(showTime,1000);
}




//addZero
function addZero(number) {
	return (parseInt(number,10) <10 ? '0' : '' )+ number;
}


// set background and greetings
function setBgGreetings() {
	let today=new Date(),
	 hour=today.getHours();

	if(hour<12) {
		// morning
		document.body.style.backgroundImage="url('https://i.ibb.co/7vDLJFb/morning.jpg')"
		greeting.textContent="Good Morning";
		$("button").css("background-color", morningButton);
	}else if(hour<18) {
		//afternoon
		document.body.style.backgroundImage="url('https://i.ibb.co/3mThcXc/afternoon.jpg')"
		greeting.textContent="Good Afternoon";
		$("button").css("background-color", afternoonButton);
	}else {
		//evening
		document.body.style.backgroundImage="url('https://i.ibb.co/924T2Wv/night.jpg')"
		greeting.textContent="Good Evening";
		document.body.style.color="white";
		$("button").css("background-color", nightButton);
	}
}

// set color variables
function setColorVar() {
	var today=new Date(),
	hour=today.getHours();
	if(hour<12) {
		currentUlColor1 = morningUlColor1;
		currentUlColor2 = morningUlColor2;
		//currentButton = morningButton;
	}else if(hour<18){
		currentUlColor1 = afternoonUlColor1;
		currentUlColor2 = afternoonUlColor2;
		//currentButton = afternoonButton;
	}else {
		currentUlColor1 = nightUlColor1;
		currentUlColor2 = nightUlColor2;
		//currentButton = nightButton;
	}

}


//update CSS
function updateCssColor() {
	$("ul li").css("background-color", currentUlColor1);
	$("li:nth-child(odd)").css("background-color", currentUlColor2);
	//$("button").css("background-color", currentButton);
}

//get name
function getName() {
	if(localStorage.getItem(nameKey)===null) {
		name.textContent="[Enter Name]";
	
	}else {
		name.textContent=localStorage.getItem(nameKey);
	}
}

//set name
function setName(e) {
	if(e.target.innerText==="[Enter Name]"){			
		$(e.target).text(" ");
	}


	if(e.type==="keypress") {
		//make sure you enter
		if(e.which==13 || e.keyCode==13) {
			// if text = "enter name", remove "enter name" from localstorage
			if(e.target.innerText==="[Enter Name]"){
				localStorage.removeItem(nameKey, "[Enter Name]");
				name.blur();
			// if text is empty, remove empty from localstorage
			}else if(e.target.innerText===""){
				localStorage.removeItem(nameKey, "");
				name.blur();
				e.target.innerText="[Enter Name]";
			// neither enter name or empty, save text in localstorage
			}else{
				localStorage.setItem(nameKey, e.target.innerText);
				name.blur();
			}
			
		}
	}else {
		if(e.target.innerText==="[Enter Name]") {
			localStorage.removeItem(nameKey, "[Enter Name]");
		}else if(e.target.innerText===""){
			localStorage.removeItem(nameKey, "");
			e.target.innerText="[Enter Name]";
		}else{
			//set name into input name
			localStorage.setItem(nameKey, e.target.innerText);
		}
	}
}



function add(){
	var itemTitle = document.getElementById("focus").textContent;
	myItems += itemTitle + ":"
	localStorage.setItem(listItemsKey, myItems);
	// Make a new <li> and add to list
	var listItem = $('<li><input type="checkbox"><span class="title"> ' + itemTitle + '</span></li>')[0];
	list.append(listItem);

	// Reset textfield
	document.getElementById('focus').textContent = "";
	updateCssColor();
	
}

function del() {
	var selectedItems=$('input:checked');
	for(var i = 0; i < selectedItems.length; i++) {
		selectedItems[i].parentElement.remove();
	}
	rebuildItemString();
}


function rebuildItemString() {
	//get all the elements that has classname "title"
	var items=$('.title');
	//reset myitems string
	var myItems="";
	for (var i = 0; i < items.length; i++) {
		//console.log(items[i].innerHTML);
		myItems += items[i].innerHTML+':';
	}
	localStorage.setItem(listItemsKey, myItems);
}



//set focus
function setFocus(e) {
	if(e.target.innerText==="[Enter Focus]"){			
		$(e.target).text(" ");
	}

	if(e.type==="keypress") {

		//make sure you enter
		if(e.which==13 || e.keyCode==13) {
			// if text = "enter focus", remove "enter focus" from localstorage
			if(e.target.innerText==="[Enter Focus]"){
				focus.blur();
			// if text is empty, remove empty from localstorage
			}else if(e.target.innerText===""){
				focus.blur();
				e.target.innerText="[Enter Focus]";
			// neither enter focus or empty, save text in localstorage
			}else{
				
				add();
				focus.blur();
				e.target.innerText="[Enter Focus]";
				
			}
			
		}
	}else {
		e.target.innerText="[Enter Focus]";
		
	}
}




$(document).ready(function(){
	setBgGreetings();
	setColorVar();
	list = document.getElementById("mylist");
	var storageItems = localStorage.getItem(listItemsKey);
	if(storageItems != null) {
		var itemTitles = storageItems.split(":");
		for (var i = 0; i < itemTitles.length; i++) {
			var itemTitle = itemTitles[i];
			if (itemTitle.length > 0) {
				myItems += itemTitle + ":";
				var listItem = $('<li><input type="checkbox"><span class="title"> ' + itemTitle + '</span></li>')[0];
				list.append(listItem);
				updateCssColor();
			}
		}
	}
	name.addEventListener("onfocus", setName);
	name.addEventListener("keypress", setName);
	name.addEventListener("blur", setName);
	focus.addEventListener("onfocus", setFocus);
	focus.addEventListener("keypress", setFocus);
	focus.addEventListener("blur", setFocus);
	showTime();	
	getName();
});
 
