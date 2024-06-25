var $ = jQuery.noConflict();

$(document).ready(function($) {
	"use strict";

	/*-------------------------------------------------*/
	/* =  Input & Textarea Placeholder
	/*-------------------------------------------------
	$('input[type="text"], textarea').each(function(){
		$(this).attr({'data-value': $(this).attr('placeholder')});
		$(this).removeAttr('placeholder');
		$(this).attr({'value': $(this).attr('data-value')});
	});

	$('input[type="text"], textarea').focus(function(){
		$(this).removeClass('error');
		if($(this).val().toLowerCase() === $(this).attr('data-value').toLowerCase()){
			$(this).val('');
		}	
	}).blur( function(){ 
		if($(this).val() === ''){
			$(this).val($(this).attr('data-value'));
		}
	});  */

	/*-------------------------------------------------*/
	/* =  Dropdown Menu - Superfish
	/*-------------------------------------------------*/
	try {
		$('ul.sf-menu').superfish({
			delay: 400,
			autoArrows: false,
			speed: 'fast',
			animation: {opacity:'show', height:'show'}
		});
	} catch (err){

	}

	/*-------------------------------------------------*/
	/* =  Portfolio Img Hover
	/*-------------------------------------------------*/
	$('.portfolio-item .img').each(function(){
		$(this).append('<div class="hover"><a href="'+ $(this).attr('data-preview') +'" class="preview" data-title="'+ $(this).parent('.portfolio-item').find('.title').text() +'"></a><a href="'+ $(this).attr('data-info') +'" class="info"></a></div>');
	});

	/*-------------------------------------------------*/
	/* =  Mobile Menu
	/*-------------------------------------------------*/
	// Create the dropdown base
    $("<select />").appendTo("#nav");
    
    // Create default option "Go to..."
    $("<option />", {
		"selected": "selected",
		"value"   : "",
		"text"    : "Go to..."
    }).appendTo("#nav select");
    
    // Populate dropdown with menu items
    $(".sf-menu a").each(function() {
		var el = $(this);
		$("<option />", {
			"value"   : el.attr("href"),
			"text"    : el.text()
		}).appendTo("#nav select");
    });

    $("#nav select").change(function() {
		window.location = $(this).find("option:selected").val();
    });

	/*-------------------------------------------------*/
	/* =  Fancybox Images
	/*-------------------------------------------------*/
	try {
		$(".zoom-in.photo").fancybox({
			nextEffect	: 'fade',
			prevEffect	: 'fade',
			openEffect	: 'fade',
			closeEffect	: 'fade',
				helpers: {
				title : {
					type : 'float'
				}
			}
		});
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* =  Fancybox Videos
	/*-------------------------------------------------*/
	try {
		$('.zoom-in.video').fancybox({
			maxWidth	: 800,
			maxHeight	: 600,
			fitToView	: false,
			width		: '75%',
			height		: '75%',
			type		: 'iframe',
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'fade',
			closeEffect	: 'fade'
		});
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* =  Scroll to TOP
	/*-------------------------------------------------*/
	$('a[href="#top"]').click(function(){
		$('html, body').animate({scrollTop: 0}, 'slow');
		return false;
    });

    /* ---------------------------------------------------------------------- */
	/*	Contact Map
	/* ---------------------------------------------------------------------- */
	var contact = {"lat":"-37.815206", "lon":"144.963937"}; //Change a map coordinate here!

	try {
		$('#map').gmap3({
			action: 'addMarker',
			latLng: [contact.lat, contact.lon],
			map:{
				center: [contact.lat, contact.lon],
				zoom: 14,
				mapTypeControl: false,
				navigationControl: false,
				scrollwheel: false
				}
			},
			{action: 'setOptions', args:[{scrollwheel:true}]}
		);
	} catch(err) {

	}
	
	/* ---------------------------------------------------------------------- */
	/*	Contact Form
	/* ---------------------------------------------------------------------- 
	$('#submit').on('click', function(e){
		e.preventDefault();

		var $this = $(this);
		
		$.ajax({
			type: "POST",
			url: 'contact.php',
			dataType: 'json',
			cache: false,
			data: $('#contact').serialize(),
			success: function(data) {
				if(data.info !== 'error'){
					$this.parents('form').find('input[type=text],textarea,select').filter(':visible').val('');
					$('#msg').hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				} else {
					$('#msg').hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				}
			}
		});
	});

	/* ---------------------------------------------------------------------- */
	/*	BxSlider
	/* ---------------------------------------------------------------------- */
	try { //fade effect
		$('.bxslider.fade').bxSlider({
			adaptiveHeight: true,
			mode: 'fade',
			pager: false
		});
	} catch(err) {

	}

	try { //clients
		$('.bxslider.clients').bxSlider({
			minSlides: 2,
			maxSlides: 6,
			slideWidth: 100,
			slideMargin: 25,
			pager: false
		});
	} catch(err) {

	}

	try { //portfolio - singlework
		$('.bxslider.portfolio-items').bxSlider({
			minSlides: 2,
			maxSlides: 6,
			slideWidth: 118,
			slideMargin: 25,
			pager: false
		});
	} catch(err) {

	}

	//Portfolio Filter
	var $container = $('.portfolio-items');

	$('.portfolio-filter a').click(function(){
		if($(this).hasClass('selected')){
			return false;
		}

        $('.portfolio-filter a').removeClass('selected');
        $(this).addClass('selected');

        $container.find('.portfolio-item').hide();

        var selector = $(this).attr('data-filter');
        $container.find(selector).fadeIn("slow");

        return false;
    });

	//Skills animate
	$('.skill-bar-content').each(function(){
		$(this).delay(300).animate({'width': $(this).attr('data-value') + '%'}, 800);
	});

	//Toggle - FAQs
	$('.toggle-title').on('click', function(e){
		e.preventDefault();

		if($(this).parent('.toggle').hasClass('open')){
			$(this).parent('.toggle').removeClass('open');
		} else {
			$(this).parent('.toggle').addClass('open');
		}

		$(this).parent('.toggle').find('.toggle-content').slideToggle("fast");
	});
});