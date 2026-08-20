(function ($) {

    'use strict';

    $(document).ready(function () {
        
        var $hamburger = $(".hamburger");
        $hamburger.on("click", function(e) {
            $hamburger.toggleClass("is-active");
        });

        getHeight();
          
        if(jQuery('.owl-carousel').length > 0){
            
            if( /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ) {
                
                $( ".full-video" ).remove();
            
                var owl = $('.owl-carousel');              
                owl.owlCarousel({
                    items: 1,
                    loop: true,
                    nav:true,
                    video: true,
                    autoplay: true,
                    autoplayTimeout: 6000
                });
                
            } else {
                
                var owl = $('.owl-carousel');              
                owl.owlCarousel({
                    items: 1,
                    loop: true,
                    nav:true,
                    video: true,
                    autoplay: false
                });
                

                $('.owl-item.active video').get(0).play();           

                                
                document.getElementById('bgvid').addEventListener('ended',myHandler,false);
                function myHandler(e) {
                    setTimeout(function(){
                            owl.trigger('next.owl.carousel');
                    }, 500) 
                }

                owl.on('translate.owl.carousel',function(e){
                    $('.owl-item video').each(function(){
                        $(this).get(0).pause();

                    });               
                });

                
                owl.on('translated.owl.carousel',function(e){               
                    if(jQuery('.owl-item.active video').length > 0){
                        $('.owl-item.active video').get(0).play();

                    }else {
                        setTimeout(function(){
                            owl.trigger('next.owl.carousel');
                        }, 6000)
                    }
                });

            }
            
        
            var mmuteButtons = $('.mute-button');
            var munmuteButtons = $('.unmute-button');

            mmuteButtons.click(function() {
                $(this).closest('.full-video').find("video").prop('muted', true);
                $(this).hide();
                $(this).closest('.full-video').find('.unmute-button').show();
            })

            munmuteButtons.click(function() {
                $(this).closest('.full-video').find("video").prop('muted', false);
                $(this).hide();
                $(this).closest('.full-video').find('.mute-button').show();
            }) 
            
            $('.fp_slide').matchHeight();

        }

        // Forms
        $('select, input[type=text], input[type=email], input[type=password], textarea').addClass('form-control');
        $('input[type=submit]').addClass('btn btn-primary');

        // Pagination fix for ellipsis

        $('.pagination .dots').addClass('page-link').parent().addClass('disabled');

        // You can put your own code in here

        $('.match').matchHeight();

        
        
        // Add smooth scrolling to all links
        $('.anchorLink').click(function() {
            var offset = -80; // <-- change the value here
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top + offset
                    }, 1000);
                    return false;
                }
            }
        });
        
        if(jQuery('.contact-content').length > 0){
            $.get('https://settlucas.com/wp-content/themes/sett_lucas/loops/ct_tab-hk.php', function(data) {
                $('#hongkong').html(data);
            });
        };
        
        $('[data-toggle="tab"]').click(function(e) {
            var $this = $(this),
                loadurl = $this.attr('href'),
                targ = $this.attr('data-target');

            $.get(loadurl, function(data) {
                $(targ).html(data);
            });

            $this.tab('show');
            return false;
        });
        /*
        var $loading = $('#loadingDiv').hide();
        $(document)
            .ajaxStart(function () {
                $loading.show();
            })
           .ajaxStop(function () {
                $loading.hide();
            });       
        */
    });
    
    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox({
            alwaysShowClose: true,
        });
    });
    
    $(window).resize(function() {
        getHeight();
    });


    function getHeight (){
        var winHeight = $(window).height();
        $('.fp_slide').css("min-height", $(window).height() + "px");
        $('#navbarNavDropdown').css("max-height", $(window).height()-30 + "px");
    }
    
    $(".cit-open").click(function () {
        $(this).text(function(i, text){
            return text === "Close story" ? "Read more" : "Close story";
        })
    });
       
    $(".cit-close").click(function () {
        $(this).closest(".item").find(".cit-open").text("Read more")
    });

}(jQuery));
