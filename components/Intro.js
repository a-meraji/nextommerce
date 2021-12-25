import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
export default function Intro() {
  useEffect(() => {
    AOS.init({
      once: false,
      duration: 2500,
    });
  }, []);

  return (
      <div className="text-secondary curier">
        <div className="h-[100vh]">
          <div className="relative h-screen -top-10 left-0 right-0">
            <img
              data-aos="fade"
              src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F115%2F489%2FHat-front-black__72990.1603748583.png&w=640&q=85"
              className="w-full h-screen object-contain bg-transparent"
            />
            <p
              data-aos="fade-up"
              className="absolute  left-0 right-0 text-center top-[65%] sm:top-[75%] text-lg"
            >
              _a minimal store.
            </p>
          </div>
        </div>
        <div className="h-[50vh]">
          <div className="relative h-[50vh] left-0 right-0">
            <p
              data-aos="fade"
              className="absolute  left-0 right-0 text-center top-1/2 text-4xl"
            >
              but diverce.
            </p>
          </div>
        </div>
        {/* banner */}

        <div className="bg-third animation w-full whitespace-nowrap overflow-scroll scrollbar-hide">
          <div className="first">
            <img
              className="w-full object-contain"
              src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F115%2F491%2FHat-front-white__31525.1602591510.png&w=640&q=85"
            />
          </div>
          <div>
            <img
              className="w-full object-contain"
              src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F116%2F512%2FMen-Jacket-Front-Black__15466.1603283963.png&w=1920&q=85"
            />
          </div>
          <div>
            <img
              className="w-full object-contain"
              src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F117%2F532%2FMen-TShirt-White-Front__99616.1603284781.png&w=640&q=85"
            />
          </div>
          <div>
            <img
              className="w-full object-contain"
              src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F118%2F508%2FSurgical-Mask-Black__89554.1603756821.png&w=750&q=85"
            />
          </div>
          <div>
            <img
              className="w-full object-contain"
              src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F124%2F415%2Fmockup-c2bbbaf4__00019.1601229493.png&w=1920&q=85"
            />
          </div>
          <div>
            <img
              className="w-full object-contain"
              src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F127%2F431%2Fmockup-9fc4c1cf__88683.1601229845.png&w=1920&q=85"
            />
          </div>
          <div>
            <img
              className="w-full object-contain"
              src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F136%2F459%2Fmockup-ae9a83b0__49881.1603746586.png&w=1920&q=85"
            />
          </div>
          <div>
            <img
              className="w-full object-contain"
              src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F115%2F491%2FHat-front-white__31525.1602591510.png&w=640&q=85"
            />
          </div>
          <div>
            <img
              className="w-full object-contain"
              src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F116%2F512%2FMen-Jacket-Front-Black__15466.1603283963.png&w=1920&q=85"
            />
          </div>
          <div>
            <img
              className="w-full object-contain"
              src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F117%2F532%2FMen-TShirt-White-Front__99616.1603284781.png&w=640&q=85"
            />
          </div>
        </div>
      </div>
  );
}

//

/* 
$(window).on('load', function(){
  // Please run it with window.onload, not with document.ready
  initSmoothScrolling('.block','smoothscroll');
});

function initSmoothScrolling(container,animation){
 /*
	* @param {String} container Class or ID of the animation container
	* @param {String} animation Name of the animation, e.g. smoothscroll

	var sliderWidth = 0;	
	var animationWidth = 0;	
	var sliderHeight = $('>div>div:first-of-type',container).outerHeight(false);

	$('>div>div', container).each(function(){				
		animationWidth += $(this).outerWidth(false);		
	});
	
	// detect number of visible slides
	var slidesVisible = $(container).width() / $('>div>div:first-of-type',container).outerWidth(false);	
	slidesVisible = Math.ceil(slidesVisible);

  // count slides to determine animation speed
	var slidesNumber = $('>div>div', container).length;
	var speed = slidesNumber*2;
	
// append the tail	
	$('>div>div',container).slice(0,slidesVisible).clone().appendTo($('>div',container));	

	// Detect the slider width with appended tail
	$('>div>div', container).each(function(){
		sliderWidth += $(this).outerWidth(false);
	});

	// set slider dimensions
	$('>div',container).css({'width':sliderWidth,'height':sliderHeight});
  
// Insert styles to html
	$("<style type='text/css'>@keyframes "+animation+" { 0% { margin-left: 0px; } 100% { margin-left: -"+animationWidth+"px; } } "+$('>div>div:first-of-type',container).selector+" { -webkit-animation: "+animation+" "+speed+"s linear infinite; -moz-animation: "+animation+" "+speed+"s linear infinite; -ms-animation: "+animation+" "+speed+"s linear infinite; -o-animation: "+animation+" "+speed+"s linear infinite; animation: "+animation+" "+speed+"s linear infinite; }</style>").appendTo("head");	

	// restart the animation (e.g. for safari & ie)	
	var cl = $(container).attr("class");
	$(container).removeClass(cl).animate({'nothing':null}, 1, function () {
		$(this).addClass(cl);
	});
}
*/
