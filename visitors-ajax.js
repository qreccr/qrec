(function ($) {
    $.fn.lc = function () {
        var lcUrl = document.getElementById('s1').src;
        for (var i = 0; i < this.length; i++) {
            var lc = $(this[i]).attr('class');
            var d = lc.split(" ");
            var target = '.' + d[0];
//          Get subscriber Id
            var sid = d[1];
//          Create Url For getting Button code
            var $url = lcUrl.substr(0, (lcUrl.length - 3));
            $(target).html(butttonCode(target, $url, sid));
        }
        function butttonCode(target, $url, sid) {
            $.ajax({
                async: false,
                contentType: 'application/json',
                type: 'GET',
                url: $url + '?callback=mycallback',
                data: {subscriber_id: sid, referer_url: window.location.href},
                dataType: 'jsonp',
                success: function (data) {
                    //chat button
                    if (data.button_code) {
                        $(target).html(data.button_code);
                    }
                    //form popup show if form generated
                    if (data.form_code) {
                        //local storage handling pages
                        var url = window.location.href
                        if (!localStorage.getItem(url)) {
                            localStorage.setItem(url, 1);
                        }
                        var lastname = localStorage.getItem("showForms");
                        if (localStorage.getItem(url) == 1) {
                            $(".form12345").html(data.form_code);
                            setTimeout(function () {
                                $('#popupFormModel').addClass('show');
                                $('#popupFormModel').removeClass('hide');
                            }, 1000 * data.display_after);
                        }

                    }

                }
            });
        }
    };
}(jQuery));


///https://for checking scroll in loading of trigger 
$(window).bind('scroll', function (e) {
    var wintop = $(window).scrollTop();
    var docheight = $(document).height();
    var winheight = $(window).height();
    //console.log(wintop+' //// '+docheight+' ///  '+winheight);
    var data = {
        'type': 'scroll',
        'data': (wintop / (docheight - winheight)) * 100
    };

    try {
        send_data_to_servers(data)
    } catch (err) {
        console.log(err)
    }

});

//function to solve loading issue send custom field 
for (let i = 2; i < 40; i++) {
    task(i);
}
function task(i) {
    setTimeout(function () {
        try {
            customfield();
        } catch (err) {
            console.log('error in sending custom field')
            console.log(err)
        }
    }, 2000 * i);
}