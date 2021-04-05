// "el" in all these functions refers to the element. i.e which element has been passed as parameter to the function.
  
//Easy selector helper function
  function select(el, all = false){
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  //Easy event listener function
  function on(type, el, callback, all = false){     //adds an event listener of "type" with callback function "callback" to elements recognised by "el" i.e the elements whose id/class is el.
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, callback))
      } else {
        selectEl.addEventListener(type, callback)
      }
    }
  }

  function onscroll(el, callback){    //adds an event listener to the element el of type scroll,with callback function callback.
    el.addEventListener('scroll', callback)
  }


  // Toggle .header-scrolled class to #header when page is scrolled
  let selectHeader = select('#header')
  if (selectHeader) {
    function headerScrolled(){
      if (window.scrollY > 672) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)   /*The window object represents an open window in a browser.If a document contain frames (<iframe> tags), the browser creates one window object for the HTML document, and one additional window object for each frame.
    The "load" event is fired when the whole page has loaded, including all dependent resources such as stylesheets and images.
    Basically,I add an event listener of type "load" i.e when the webpage has loaded. The callback function called is headerScrolled(),which as you see just sees how much the user has scrolled,and accordingly adds/removes the header-scrolled class to the element.
    */
    onscroll(document, headerScrolled)
  }

  //Back to top button
  let backtotop = select('.back-to-top')
  if (backtotop) {
    function toggleBacktotop(){
      if (window.scrollY > 660) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)  /*The window object represents an open window in a browser.If a document contain frames (<iframe> tags), the browser creates one window object for the HTML document, and one additional window object for each frame.
    The "load" event is fired when the whole page has loaded, including all dependent resources such as stylesheets and images.
    Basically,I add an event listener of type "load" i.e when the webpage has loaded. The callback function called is toggleBacktotop(),which as you see just sees how much the user has scrolled,and accordingly adds/removes the active class from the backtotop button.
    */
    onscroll(document, toggleBacktotop)
  }

  //Mobile nav toggle    RESPONSIBLE FOR TOGGLING THE NAVBAR ON THE RIGHT!
  on('click', '.mobile-nav-toggle', function(e) {           
    select('#navbar').classList.toggle('navbar-mobile') //will add the class navbar-mobile to the whole nav id="navbar" element.
  })
