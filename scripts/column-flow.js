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
    var top_margin = parseInt($panel.css("padding-top"));
    var h_margin = parseInt($panel.css("padding-left"))+parseInt($panel.css("padding-right"));
    var v_margin = parseInt($panel.css("padding-top"))+parseInt($panel.css("padding-bottom"));
    var active_width = window_width-h_margin;
    var active_height = window_height-v_margin;
    var column_count = Math.floor(active_width/min_col_width);
    var column_width = (active_width/column_count)*0.96;
    var column_total_width = column_width*column_count;
    var alley_count = column_count-1;
    var alley_width = ((active_width-column_total_width)/alley_count);

    if (column_count < 1){
      column_count = 1;
    }

    // Create columns and fill with content ============================

    $panel.each(function(h){
      for (var i=0; i<column_count; i++){
        if (i == 0){
          $(this).append('<div class="column" data-index="'+i+'"></div>');
        } else {
          $(this).append('<div class="alley"></div><div class="column" data-index="'+i+'"></div>');
        }
      }
      $(this).append('<div class="clear"></div>');
    });


    // Set column width =======================================

    if (column_count == 1){ 
      $('.column').width(active_width);
    } else {
      $('.column').width(column_width-1);
      $('.alley').width(alley_width-1);
    }


    // Distribute content ===========================================
    
    $panel.each(function(i){
      var column_content_array = panel_content_array[i].split("<!--breakpoint 1/"+column_count+"-->");
      for (var j=0; j<column_count; j++){ 
        if (column_content_array.length == 1){
          column_content_array = panel_content_array[i].split("<!--breakpoint 1/"+(column_count-j)+"-->");
        } else {
          break;
        }
      }
      if (column_count == 1){
        for (var j=0; j<column_content_array.length; j++){
          $(this).find('.column').append(column_content_array[j]);
        }
      } else {
        if (!$(this).hasClass("push-right")){
          if (column_count >= column_content_array.length){
            for (var j=0; j<column_content_array.length; j++){
              $(this).find('.column:eq('+j+')').html(column_content_array[j]);
            }
          } else {
            var base_content_per_column = Math.floor(column_content_array.length/column_count);
            var leftover_content_per_column = column_content_array.length%column_count;
            var content_counter = 0;
            while (content_counter < column_content_array.length){
              for (var j=0; j<leftover_content_per_column; j++){
                for (var k=0; k<base_content_per_column+1; k++){ 
                  $(this).find('.column:eq('+j+')').append(column_content_array[content_counter]);
                  content_counter++;
                }
              }
              for (var j=leftover_content_per_column; j<column_count; j++){
                for (var k=0; k<base_content_per_column; k++){ 
                  $(this).find('.column:eq('+j+')').append(column_content_array[content_counter]);
                  content_counter++;
                }
              }
            }
          }
        } else {
          column_content_array.reverse();
          if (column_count >= column_content_array.length){
            for (var j=0; j<column_content_array.length; j++){
              $(this).find('.column:eq('+(column_count-1-j)+')').html(column_content_array[j]);
            }
          } else {
            var base_content_per_column = Math.floor(column_content_array.length/column_count);
            var leftover_content_per_column = column_content_array.length%column_count;
            var content_counter = 0;
            while (content_counter < column_content_array.length){
              for (var j=0; j<leftover_content_per_column; j++){
                for (var k=0; k<base_content_per_column+1; k++){ 
                  $(this).find('.column:eq('+j+')').append(column_content_array[content_counter]);
                  content_counter++;
                }
              }
              for (var j=leftover_content_per_column; j<column_count; j++){
                for (var k=0; k<base_content_per_column; k++){ 
                  $(this).find('.column:eq('+j+')').append(column_content_array[content_counter]);
                  content_counter++;
                }
              }
            }
          }
        }
      } 
      $(this).find($(".background")).prependTo($(this));
    });


    // Text-span ======================================================

    var $text_span = $(".column-span");
    $text_span.each(function(){
      var column_count_half = Math.ceil(column_count/2);
      if ($(this).hasClass('span-half')){
        $(this).width((column_width*column_count_half)+(alley_width*(column_count_half-1)));
      } else if ($(this).hasClass('span-full')){
        $(this).width((column_width*column_count)+(alley_width*(column_count-1)));
      }
      var this_width = $(this).width();
      var this_line_array = $(this).html().split("<br>");
      for (var i=0; i<this_line_array.length; i++){ 
        this_line_array[i] = this_line_array[i].split("");
      }
      var longest_line_index = 0;
      for (var i=0; i<this_line_array.length-1; i++){
        for (var j=i+1; j<this_line_array.length; j++){
          if (this_line_array[i].length >= this_line_array[j].length){
            longest_line_index = i;
          } else {
            longest_line_index = j;
            break;
          }
        }
      }
      var text_vw = ((this_width/(window_width/100))/this_line_array[longest_line_index].length)*1.75;
      var $this_column = $(this).parent(".column");
      var this_column_index = $this_column.data('index');
      var $this_panel = $this_column.parent(".panel");
      $(this).css({
        "font-size": text_vw+"vw",
        "line-height": text_vw+"vw"
      });
      var this_height = $(this).height();
      if ($(this).hasClass('span-half')){
        column_count_half = Math.ceil(column_count/2);
        for (var i=1; i<column_count_half; i++){
          var $other_column =  $this_panel.find($('.column[data-index='+(this_column_index+i)+']'));
          $other_column.css('padding-top', parseInt($other_column.css('padding-top'))+this_height+'px');
        }
      } else if ($(this).hasClass('span-full')){
        for (var i=1; i<column_count; i++){
          var $other_column =  $this_panel.find($('.column[data-index='+(this_column_index+i)+']'));
          $other_column.css('padding-top', parseInt($other_column.css('padding-top'))+this_height+'px');
        }
      }
    });


    // Set Image Bleed =================================================

    var $bleed = $("img.bleed");
    if (column_count > 1){

      $bleed.wrap("<div class='bleed-wrapper'></div>");
      var $bleed_wrapper = $(".bleed-wrapper");
      $bleed_wrapper.each(function(){
        var $this_wrapper = $(this);
        var $this_column = $this_wrapper.parent()
        var $this_panel = $this_column.parent()
        var this_column_index = $this_panel.find(".column").index($this_column);
        var $this_img = $(this).find("img.bleed");

        if ($this_img.hasClass('bleed-left')) {
          // Bleed left
          var this_left = left_margin+(column_width*this_column_index)+(alley_width*this_column_index);
          $this_wrapper.css({
            "height": active_height+"px",
            "transform": "translate("+(-this_left)+"px ,0)",
            "width": this_left+column_width+1+"px"
          });
        } else if ($this_img.hasClass('bleed-right')){
          // Bleed right
          var this_left = left_margin+(column_width*this_column_index)+(alley_width*this_column_index);
          $this_wrapper.css({
            "height": active_height+"px",
            "width": window_width-this_left+this_column_index*2+"px"
          });
        } else if ($this_img.hasClass('bleed-full-left')){
          // Bleed full left
          var this_left = left_margin+(column_width*this_column_index)+(alley_width*this_column_index);
          $this_wrapper.css({
            "height": $this_panel.height()+v_margin+2+"px",
            "position": "absolute",
            "transform": "translate("+(-this_left-1)+"px ,"+(-top_margin-1)+"px)",
            "width": this_left+column_width+1+"px"
          });
        } else if ($this_img.hasClass('bleed-full-right')){
          // Bleed full right
          var this_left = left_margin+(column_width*this_column_index)+(alley_width*this_column_index);
          $this_wrapper.css({
            "height": $this_panel.height()+v_margin+2+"px",
            "position": "absolute",
            "transform": "translate(0,"+(-top_margin)+"px)",
            "width": window_width-this_left+this_column_index*2+"px"
          });
        } else if ($this_img.hasClass('bleed-fill')) {
          // Bleed vertical
          $this_wrapper.css({
            "height": window_height+1+"px",
            "position": "relative",
            "width": column_width+"px"
          });
        }


        // set image size in wrapper
        var this_wrapper_ratio = $this_wrapper.width()/$this_wrapper.height();
        var this_img_ratio = $this_img.width()/$this_img.height();
        if (this_img_ratio > this_wrapper_ratio){
          $this_img.css({
            "height": "100%",
            "width": "auto"
          });
        } else {
          $this_img.css({
            "height": "auto",
            "width": "100%"
          });
        }

        if ($this_img.width() > $this_wrapper.width()){
          console.log(($this_img.width()/2)-($this_wrapper.width()/2));
          $this_img.css('transform','translate('+(-(($this_img.width()/2)-($this_wrapper.width()/2)))+'px ,0)')
        }
      });

    } else {
      $bleed.css({
        "transform": "translate("+(-left_margin-1)+"px, 0)",
        "width": window_width+1+"px"
      });
    }

  }

});