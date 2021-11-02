var TxtRotate = function(el, toRotate, period) {  //In JavaScript, functions are first-class objects, because they can have properties and methods just like any other object. What distinguishes them from other objects is that functions can be called. In brief, they are Function objects.
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  //Comment at the end explains why "this" is used everywhere.
  //used "this" everywhere so that the properties can be used inside the method this.tick(). "this" use nahi karoge toh the method wont be able to access the properties. SEE https://javascript.info/object-methods
  //ADDING METHODS TO A FUNCTION OBJECT. 
  //The simplest approach is to create a constructor function and define methods that are assigned to its prototype, where each method returns 
  //In javascript, the best way to create instance methods is using a prototype. This is why we declare the function this.tick() outside the function body by using TxtRotate.prototype.tick

  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var delta = 300 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    var that = this;
    
    setTimeout(function() {
      that.tick();
    }, delta);
      //we need to use "that" because setTimeout executes the function with "this" pointing to the global object. the most common way to solve this problem is to save a reference to the context where the setTimeout function call is made.
  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      console.log(JSON.parse(toRotate));  //When using the JSON.parse() on a JSON derived from an array (data-rotate is an array in index.html) , the method will return a JavaScript array, instead of a JavaScript object.
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS for the cursor beside the text.
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  };


/*
In JavaScript, the convention (and this is only a convention) is that any function that begins with a capital letter is to be used as a constructor. Then, one would call the function with the new operator to create an instance of the function.
https://stackoverflow.com/questions/1963357/this-inside-function
EG:
var Foo() = function()  //constructor function
{
   this.foo = "bar"; // <- What is "this" here?
}
var foo = new Foo() and this would refer to the newly created object that is about to be referenced by foo. So,we need to use "this" to refer to the properties of the newly created function object.

Of course, there is nothing stopping you from calling Foo() on its own, in which case this would then refer to the object from which the function was called. To avoid confusion, that is not recommended.

*/