
const time=document.getElementById("time"),
	greeting=document.getElementById("greeting"),
	name=document.getElementById("name"),
	focus=document.getElementById("focus");

var list = null;
var myItems="";
var mykey="mykey";


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
	}else if(hour<18) {
		//afternoon
		document.body.style.backgroundImage="url('https://i.ibb.co/3mThcXc/afternoon.jpg')"
		greeting.textContent="Good Afternoon";
	}else {
		//evening
		document.body.style.backgroundImage="url('https://i.ibb.co/924T2Wv/night.jpg')"
		greeting.textContent="Good Evening";
		document.body.style.color="white";
	}
}



//get name
function getName() {
	if(localStorage.getItem("name")===null) {
		name.textContent="[Enter Name]";

		
	}else {
		name.textContent=localStorage.getItem("name");
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
				localStorage.removeItem("name", "[Enter Name]");
				name.blur();
			// if text is empty, remove empty from localstorage
			}else if(e.target.innerText===""){
				localStorage.removeItem("name", "");
				name.blur();
				e.target.innerText="[Enter Name]";
			// neither enter name or empty, save text in localstorage
			}else{
				localStorage.setItem("name", e.target.innerText);
				name.blur();
			}
			
		}
	}else {
		if(e.target.innerText==="[Enter Name]") {
			localStorage.removeItem("name", "[Enter Name]");
		}else if(e.target.innerText===""){
			localStorage.removeItem("name", "");
			e.target.innerText="[Enter Name]";
		}else{
			//set name into input name
			localStorage.setItem("name", e.target.innerText);
		}
	}
}




//get focus
function getFocus() {
	if(localStorage.getItem("focus")===null) {
		focus.textContent="[Enter Focus]";
	}else {
		focus.textContent=localStorage.getItem("focus");
	}
}


//set focus
function setFocus(e) {
	if(e.target.innerText==="[Enter Focus]"){			
		$(e.target).text(" ");
	}


	if(e.type==="keypress") {
		//make sure you enter
		if(e.which==13 || e.keyCode==13) {
			// if text = "enter name", remove "enter name" from localstorage
			if(e.target.innerText==="[Enter Focus]"){
				localStorage.removeItem("focus", "[Enter Focus]");
				name.blur();
			// if text is empty, remove empty from localstorage
			}else if(e.target.innerText===""){
				localStorage.removeItem("focus", "");
				name.blur();
				e.target.innerText="[Enter Focus]";
			// neither enter name or empty, save text in localstorage
			}else{
				localStorage.setItem("focus", e.target.innerText);
				name.blur();
			}
			
		}
	}else {
		if(e.target.innerText==="[Enter Focus]") {
			localStorage.removeItem("focus", "[Enter Focus]");
		}else if(e.target.innerText===""){
			localStorage.removeItem("focus", "");
			e.target.innerText="[Enter Focus]";
		}else{
			//set name into input name
			localStorage.setItem("focus", e.target.innerText);
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
setBgGreetings();
getName();
getFocus();

$(document).ready(function(){
	



});



