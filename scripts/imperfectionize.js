// INSTRUCTIONS =====================================

/*

0. Include this file (imperfectionize.js) in your html.
1. Add the class "imperfectionize" to all text containers you'd like to imperfect. 
   Also add the class "imperfectionize-word" to all text containers you'd like to break up by word but not by letter.
2. Use the settings below to finesse the effect.

*/


// SETTINGS ==================================

var max_rotation       = 14;    // 0 is none, 60 is a lot
var vertical_spacing   = 1.5;  // 0 is none, 1.5 is a lot
var horizontal_spacing = 0.5;  // 0 is none, 0.5 is a lot
var drift              = true; // A value of true causes the text to drift
var auto_correct       = true; // A value of true causes the text to become unaltered automatically
var hover_correct      = false; // A value of true causes the text to become unaltered whlie hovering with the mouse


// CODE ======================================

$(document).ready(function(){

  // Break strings into arrays and redistribute as spans

  var $imperfectionize = $(".imperfectionize");

  $imperfectionize.each(function(){
    var fontSize = parseInt($(this).css("font-size"));

    if ($(this).hasClass("imperfectionize-word")){
      var $thisWordArray = $(this).text().split(" ");
      $(this).empty();
      for (var i=0; i<$thisWordArray.length; i++){
        if (i<=0){
          $(this).append('<span>'+$thisWordArray[i]+'</span>');
        } else {
          $(this).append('<span>&nbsp;'+$thisWordArray[i]+'</span>');
        }
      }
    } else {
      var $thisWordArray = $(this).text().split(" ");
      $(this).empty();
      for (var i=0; i<$thisWordArray.length; i++){
        if (i<=0){
          $(this).append('<span>'+$thisWordArray[i]+'</span>');
        } else {
          $(this).append('<span>&nbsp;'+$thisWordArray[i]+'</span>');
        }
        var $thisCharArray = $(this).text().split("");
        $(this).empty();
        for (var j=0; j<$thisCharArray.length; j++){
          $(this).append('<span>'+$thisCharArray[j]+'</span>');
        }
      }
    }
  });


  // set style for spans

  var $imperfectionizeSpan = $(".imperfectionize > span");

  $imperfectionizeSpan.each(function(){
    var fontSize = parseInt($(this).css("font-size"));
    var vSpacing = Math.random()*(fontSize*vertical_spacing)-((fontSize*vertical_spacing)/2);
    var hSpacing = Math.random()*(fontSize*horizontal_spacing)-((fontSize*horizontal_spacing)/2);
    var rotation = Math.random()*max_rotation-max_rotation/2;
    $(this).css({
      'display' : 'inline-block',
      'position' : 'relative',
      'left' : '0',
      '-ms-transformtransform' : 'rotate('+rotation+'deg) translate('+hSpacing+'px, '+vSpacing+'px)',
      '-moz-transform' : 'rotate('+rotation+'deg) translate('+hSpacing+'px, '+vSpacing+'px)',
      '-webkit-transform' : 'rotate('+rotation+'deg) translate('+hSpacing+'px, '+vSpacing+'px)',
      'transform' : 'rotate('+rotation+'deg) translate('+hSpacing+'px, '+vSpacing+'px)'
    });
  });


  // initiate drift

  if (drift){
    $imperfectionizeSpan.each(function(){
      var fontSize = parseInt($(this).css("font-size"));
      var vSpacing = Math.random()*(fontSize*vertical_spacing)-((fontSize*vertical_spacing)/2);
      var hSpacing = Math.random()*(fontSize*horizontal_spacing)-((fontSize*horizontal_spacing)/2);
      var rotation = Math.random()*max_rotation-max_rotation/2;
      $(this).css({
        '-ms-transformtransform' : 'rotate('+rotation+'deg) translate('+hSpacing+'px, '+vSpacing+'px)',
        '-moz-transform' : 'rotate('+rotation+'deg) translate('+hSpacing+'px, '+vSpacing+'px)',
        '-webkit-transform' : 'rotate('+rotation+'deg) translate('+hSpacing+'px, '+vSpacing+'px)',
        'transform' : 'rotate('+rotation+'deg) translate('+hSpacing+'px, '+vSpacing+'px)',
        '-webkit-transition' : 'all '+fontSize/5+'s',
        'transition' : 'all '+fontSize/5+'s'
      });
    });
  }

  // auto correct

  if (auto_correct){
    $imperfectionizeSpan.each(function(){
      var fontSize = parseInt($(this).css("font-size"));
      $(this).css({
        '-ms-transformtransform' : 'rotate(0deg) translate(0px, 0px)',
        '-moz-transform' : 'rotate(0deg) translate(0px, 0px)',
        '-webkit-transform' : 'rotate(0deg) translate(0px, 0px)',
        'transform' : 'rotate(0deg) translate(0px, 0px)',
        '-webkit-transition' : 'all '+fontSize/20+'s',
        'transition' : 'all '+fontSize/20+'s'
      });
    });
  }

  // correct on hover

  if (hover_correct){
    $imperfectionize.mouseenter(function(){
      $(this).find('span').each(function(){
        var fontSize = parseInt($(this).css("font-size"));
        $(this).css({
          '-ms-transformtransform' : 'rotate(0deg) translate(0px, 0px)',
          '-moz-transform' : 'rotate(0deg) translate(0px, 0px)',
          '-webkit-transform' : 'rotate(0deg) translate(0px, 0px)',
          'transform' : 'rotate(0deg) translate(0px, 0px)',
          '-webkit-transition' : 'all '+fontSize/50+'s',
          'transition' : 'all '+fontSize/50+'s'
        });
      });
    });

    // initiate drift after hover

    $imperfectionize.mouseleave(function(){
      $(this).find('span').each(function(){
        var fontSize = parseInt($(this).css("font-size"));
        var vSpacing = Math.random()*(fontSize*vertical_spacing)-((fontSize*vertical_spacing)/2);
        var hSpacing = Math.random()*(fontSize*horizontal_spacing)-((fontSize*horizontal_spacing)/2);
        var rotation = Math.random()*max_rotation-max_rotation/2;
        $(this).css({
          '-ms-transformtransform' : 'rotate('+rotation+'deg) translate('+hSpacing+'px, '+vSpacing+'px)',
          '-moz-transform' : 'rotate('+rotation+'deg) translate('+hSpacing+'px, '+vSpacing+'px)',
          '-webkit-transform' : 'rotate('+rotation+'deg) translate('+hSpacing+'px, '+vSpacing+'px)',
          'transform' : 'rotate('+rotation+'deg) translate('+hSpacing+'px, '+vSpacing+'px)',
          '-webkit-transition' : 'all '+fontSize/3+'s',
          'transition' : 'all '+fontSize/3+'s'
        });
      });
    });
  }

});