/*
 * poposliders - v1.0.0 - 2015-06-10
 * http://po-po.github.io/
 *
 * Copyright (c) 2015 popo;
 * Licensed under the MIT license
 */
(function($) {
    $.fn.poposlides = function(options) {

        var settings = $.extend({
            auto:false,
            nav:true,
            playspeed:3500,
            fadespeed:500,
            loop:true,
            pagination:true,
			pagecenter:true,
            prev:".prev",
            next:".next"
            }, options);

        return this.each(function() {

            var $this = $(this),
                slide = $this.children(),
                index = 0;
                len = slide.length-1,
                slideWidth = $this.width(),
                prev = settings.prev,
                next = settings.next;

            //鍒濆闅愯棌鍏跺畠椤碉紝鏄剧ず褰撳墠椤�
			if(!navigator.userAgent.match(/mobile/i)){
				slide.hide();
				slide.eq(index).show();
			}else{
				slide.css({
					"opacity":"0"
				});
				slide.eq(index).css({
					"opacity":"1"
				});
			};


            slideFadeIn = function(){
				if(!navigator.userAgent.match(/mobile/i)){
					slide.fadeOut(settings.fadespeed);
					slide.eq(index).fadeIn(settings.fadespeed);
				}else{
					slide.css({
						"opacity":"0",
						"-webkit-transition": settings.fadespeed/1000+"s"
					});
					slide.eq(index).css({
						"opacity":"1",
						"-webkit-transition": settings.fadespeed/1000+"s"
					});
				};
            };


            slideAdd = function() {
            	if(settings.loop){
					index == len?index=0:index++;
				}else{
					index == len?index=len:index++;
				};
        		slideFadeIn();
            };


            slideMinus = function() {
            	if(settings.loop){
					index == 0?index=len:index--;
				}else{
					index == 0?index=0:index--;
				};
        		slideFadeIn();
            };




            pageActive = function(){
				$(".pagination li a").removeAttr("class")
            	$(".pagination li a").eq(index).addClass("active");
			}


            if(settings.nav) {
				var navStr = "<a href='javascript:void(0)' class="+ prev.substring(1) +"></a>" +
							 "<a href='javascript:void(0)' class="+ next.substring(1) +"></a>";
				$this.after(navStr);

                $(next).click(function(){
                	slideAdd();
                });

                $(prev).click(function(){
                	slideMinus();
                })
			};

			if(settings.pagination) {
				pagnation();
				$(prev).click(function(){ pageActive();});
				$(next).click(function(){ pageActive();});

                $(".pagination li").click(function(){
                	var idx = $(this).index()-1;
                	index = idx;
                	slideAdd();
                	pageActive();
                });
			};


			if(settings.pagecenter){
				var pw = $(".pagination").width();
				$(".pagination").css({
					"position":"absolute",
					"left":"50%",
					"bottom":"5px",
					"margin-left":-pw/2,
					"z-index": "99"
				})
			};

			if(settings.auto){
		        var play = setInterval(function(){
		        	slideAdd();
		        	pageActive();
		        },settings.playspeed);
		        $this.nextAll().hover(function () {
		            clearInterval(play);
		        },
		        function(){
		        	play = setInterval(function(){
		        		slideAdd();
		        		pageActive();
		        	},settings.playspeed);
		        });
            };

        });
    };

})(jQuery);
