$(document).ready(function(){
  
  var $panel = $(".panel");
  var min_col_width = 300;
  var max_col_width = 500;
  var panel_content_array = [];

  $panel.each(function(){
    panel_content_array.push($(this).html());
  });

  adjustColumns();

  $(window).resize(function(){
    adjustColumns();
  });

  function adjustColumns(){
    $panel.empty();

    var window_height = $(window).height();
    var window_width = $(window).width();
    var left_margin = parseInt($panel.css("padding-left"));
    var h_margin = parseInt($panel.css("padding-left"))+parseInt($panel.css("padding-right"));
    var v_margin = parseInt($panel.css("padding-top"))+parseInt($panel.css("padding-bottom"));
    var active_width = window_width-h_margin;
    var active_height = window_height-v_margin;
    var column_count = Math.floor(active_width/min_col_width);
    var column_width = (active_width/column_count)*0.96;
    var column_total_width = column_width*column_count;
    var alley_count = column_count-1;
    var alley_width = (active_width-column_total_width)/alley_count;

    if (column_count < 1){
      column_count = 1;
    }

    // Create columns
    for (var i=0; i<column_count; i++){
      $panel.each(function(){
        $(this).append('<div class="column"></div>');
      });
    }

    // Distribute content
    $panel.each(function(i){
      var column_content_array = panel_content_array[i].split("<!--col-breakpoint-->");
      if (!$(this).hasClass('push-right')){
        if (column_count == 1){
          for (var j=0; j<column_content_array.length; j++){
            $(this).find('.column').append(column_content_array[j]);
          }
        } else if (column_count >= column_content_array.length){
          for (var j=0; j<column_content_array.length; j++){
            $(this).find('.column:eq('+j+')').html(column_content_array[j]);
          }
        } else {
          var base_content_per_column = Math.floor(column_content_array.length/column_count);
          var leftover_content_per_column = column_content_array.length%column_count;
          for (var j=0; j<leftover_content_per_column; j++){
            for (var k=(base_content_per_column+1)*j; k<((base_content_per_column+1)*j)+(base_content_per_column+1); k++){
              $(this).find('.column:eq('+j+')').append(column_content_array[k]);
            }
          }
          for (var j=leftover_content_per_column; j<column_count; j++){
            for (var k=(base_content_per_column+1)*leftover_content_per_column; k<((base_content_per_column+1)*j)+(base_content_per_column); k++){
              $(this).find('.column:eq('+j+')').append(column_content_array[k]);
            }
          }
        }
      } else {
        if (column_count == 1){
          for (var j=0; j<column_content_array.length; j++){
            $(this).find('.column').append(column_content_array[j]);
          }
        } else if (column_count >= column_content_array.length){
          column_content_array.reverse();
          for (var j=0; j<column_content_array.length; j++){
            $(this).find('.column:eq('+(column_count-1-j)+')').html(column_content_array[j]);
          }
        } else {
          column_content_array.reverse();
          var base_content_per_column = Math.floor(column_content_array.length/column_count);
          var leftover_content_per_column = column_content_array.length%column_count;
          for (var j=0; j<leftover_content_per_column; j++){
            for (var k=(base_content_per_column+1)*j; k<((base_content_per_column+1)*j)+(base_content_per_column+1); k++){
              $(this).find('.column:eq('+(column_count-1-j)+')').prepend(column_content_array[k]);
            }
          }
          for (var j=leftover_content_per_column; j<column_count; j++){
            for (var k=(base_content_per_column+1)*leftover_content_per_column; k<((base_content_per_column+1)*j)+(base_content_per_column); k++){
              $(this).find('.column:eq('+(column_count-1-j)+')').prepend(column_content_array[k]);
            }
          }
        }
      }
      $(this).find($(".background")).prependTo($(this));
    });


    // Resize columns and panels
    if (column_width < active_width){ 
      $('.column').width(column_width);
    } else {
      $('.column').width(active_width);
    }

    $panel.each(function(){
      $(this).height(active_height);
      for (var i=0; i<column_count; i++){
        var $this_column = $(this).find('.column:eq('+i+')');
        if ($this_column.height() > active_height){
          $(this).height($this_column.height());
        } else {
          $this_column.height(active_height);
        }
        $(this).find(".column:eq("+i+")").css("left",((column_width*i)+(alley_width*i)+left_margin)+"px");
      }
    });

    var $breakout = $(".breakout");
    $breakout.each(function(){
      if (column_count > 1){
        var this_left = parseInt($(this).parent().css("left"));
        $(this).css({
          "max-height": $(this).parent().css("height"),
          "min-height": window_width-this_left-h_margin/2+"px",
          "width": window_width-this_left-h_margin/2+"px"
        });
      } else {
        var $this_column = $(this).parent(".column");
        var $this_panel = $this_column.parent(".panel");

        $this_column.height($this_column.height()+$(this).height());
        $this_panel.height($this_column.height());
        $(this).css({
          "left": -left_margin+"px",
          "position": "relative",
          "top": left_margin,
          "width": window_width+"px"
        });
        //$(this).removeClass('breakout');
      }
    });

  }

});