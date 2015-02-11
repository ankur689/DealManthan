// Custom Alert Dialog
var Alert = new CustomAlert();

jQuery(function($) {'use strict',

	//#main-slider
	$(function(){
		$('#main-slider.carousel').carousel({
			interval: 8000
		});
	});


	// accordian
	$('.accordion-toggle').on('click', function(){
		$(this).closest('.panel-group').children().each(function(){
		$(this).find('>.panel-heading').removeClass('active');
		 });

	 	$(this).closest('.panel-heading').toggleClass('active');
	});

	//Initiat WOW JS
	new WOW().init();

	// portfolio filter
	$(window).load(function(){'use strict';
		var $portfolio_selectors = $('.portfolio-filter >li>a');
		var $portfolio = $('.portfolio-items');
		$portfolio.isotope({
			itemSelector : '.portfolio-item',
			layoutMode : 'fitRows'
		});
		
		$portfolio_selectors.on('click', function(){
			$portfolio_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$portfolio.isotope({ filter: selector });
			return false;
		});
	});

	// Contact form
	var form = $('#main-contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: $(this).attr('action'),

			beforeSend: function(){
				form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
			}
		}).done(function(data){
			form_status.html('<p class="text-success">' + data.message + '</p>').delay(3000).fadeOut();
		});
	});

	
	//goto top
	$('.gototop').click(function(event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $("body").offset().top
		}, 500);
	});	

	//Pretty Photo
	$("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false
	});	
});


function sendMessage(){

	var name = document.getElementById("name").value;
	var email = document.getElementById("email").value;
	var subject = document.getElementById("subject").value;
	var message = document.getElementById("message").value;
	var phone = document.getElementById("number").value;
	var company = document.getElementById("company").value;

	if(name && email && subject && message){

		var body = "Name: "+name+", "+"Email: "+email+", "+"Message: "+message;

		if(phone){
		var body = "Name: "+name+", "+"Email: "+email+", "+"Phone: "+phone+", "+"Message: "+message;
		}

		if(company){
		var body = "Name: "+name+", "+"Email: "+email+", "+"Company: "+company+", "+"Message: "+message;
		}

		if(phone && company){
		var body = "Name: "+name+", "+"Email: "+email+", "+"Phone: "+phone+", "+"Company: "+company+", "+"Message: "+message;
		}

		var url = "mailto:devenpawar18@gmail.com?subject="+subject+"&body="+body;

		window.open(url);

		var name = document.getElementById("name").value = '';
		var email = document.getElementById("email").value = '';
		var phone = document.getElementById("number").value = '';
		var company = document.getElementById("company").value = '';
		var subject = document.getElementById("subject").value = '';
		var message = document.getElementById("message").value = '';

	} else {
       Alert.render('Please fill the required fields!!!');
    }

}

// Method that prepares custom Alert Box
function CustomAlert(){
    this.render = function(dialog){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH+"px";
        dialogbox.style.left = (winW/2) - (550 * .5)+"px";
        dialogbox.style.top = "100px";
        dialogbox.style.display = "block";
        document.getElementById('dialogboxhead').innerHTML = "Information:";
        document.getElementById('dialogboxbody').innerHTML = dialog;
        document.getElementById('dialogboxfoot').innerHTML = '<button class="btn btn-primary" onclick="Alert.ok()">OK</button>';
    }
    this.ok = function(){
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
    }
}

// Method that prepares custom Alert Box
function CustomAlert(){
    this.render = function(dialog){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH+"px";
        dialogbox.style.left = (winW/2) - (550 * .5)+"px";
        dialogbox.style.top = "100px";
        dialogbox.style.display = "block";
        document.getElementById('dialogboxhead').innerHTML = "Information:";
        document.getElementById('dialogboxbody').innerHTML = dialog;
        document.getElementById('dialogboxfoot').innerHTML = '<button class="btn btn-primary" onclick="Alert.ok()">OK</button>';
    }
    this.ok = function(){
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
    }
}


function search_query(){

	var isPresent = 0;
	var searched_query = document.getElementById("keyword").value;

    localStorage.setItem("product", searched_query);
	
	//	var frequency_list = localStorage.frequency_list;
	
	//var frequency_list = [{"text":"study","size":40},{"text":"motion","size":15},{"text":"forces","size":10}];

	//localStorage.setItem("frequency_list", JSON.stringify(frequency_list));

	//localStorage.frequency_list = frequency_list;

	var frequency_list = JSON.parse(localStorage.getItem(localStorage.userID));

	if(!frequency_list){
		frequency_list = [];
	}

	alert(frequency_list);

	for (var key in frequency_list) {
    var obj = frequency_list[key];
    	if(obj.text == searched_query){
    		obj.size++;
    		isPresent = 1;
    	} 
	}

	if(isPresent == 0){
		var element = {"text":searched_query,"size":1};
		frequency_list.push(element);
	}
	
	localStorage.setItem(localStorage.userID, JSON.stringify(frequency_list));

}

function setSession(){
	localStorage.userID = document.getElementById("email").value;
}

function resetSession(){
	localStorage.userID = "";
}

function checkLogin(){

	if(localStorage.userID){
		document.getElementById("nav_menu").children[0].style.display="none";
	document.getElementById("nav_menu").children[1].style.display="block";
	document.getElementById("nav_menu").children[2].style.display="block";
	document.getElementById("nav_menu").children[5].style.display="block";

	} else {
	document.getElementById("nav_menu").children[0].style.display="block";
	document.getElementById("nav_menu").children[1].style.display="none";
	}
}

