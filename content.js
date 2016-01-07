chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "clicked_browser_action" ) {
      $('p').each(function() {
        var that = this;
        var range = new Range();
        range.setStart(that, 0);
        $.each(that.childNodes, function() {
          if (this.nodeName == '#text') {
            var match = this.nodeValue && this.nodeValue.match(/\.\s/);
            if ($(that).data('tldr-parent')) {
              $(that).find('[data-tldr-show] *').unwrap();
              $(that).data('tldr-parent', false)
                     .css({ visibility: '', color: '' })
                     .find('*')
                     .css({ visibility: '', color: '' });
              return false; // break $.each
            } else if (match) {
              range.setEnd(this, match.index);
              var newNode = document.createElement("span");
              range.surroundContents(newNode);
              var color = $(that).css('color');
              $(newNode).attr('data-tldr-show', color);

              var nums = color.split(/\D+/);
              var newcolor = 'rgba(' + nums[1] + ',' + nums[2] + ',' + nums[3] + ', 0.2)';
              $(that).data('tldr-parent', color)
                     .css({ visibility: 'hidden', color: newcolor })
                     .find('*:not([data-tldr-show])')
                     .css({ visibility: 'hidden', color: newcolor });
              $('[data-tldr-show], [data-tldr-show] *').css({ visibility: '', color: color });
              return false; // break $.each
            }
          }
        });
      });
    }
  }
);
