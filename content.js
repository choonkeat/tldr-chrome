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
            if ($(that).data('topicsentence-parent')) {
              $(that).find('[data-topicsentence-show]').css({ visibility: '' }).find('*').unwrap();
              $(that).data('topicsentence-parent', false).css({ visibility: '' });
              return false; // break $.each
            } else if (match) {
              range.setEnd(this, match.index + 1);
              var newNode = document.createElement("span");
              range.surroundContents(newNode);
              $(newNode).attr('data-topicsentence-show', true);
              $(that).data('topicsentence-parent', true).css({ visibility: 'hidden' });
              $('[data-topicsentence-show], [data-topicsentence-show] *').css({ visibility: 'visible' });
              return false; // break $.each
            }
          }
        });
      });
    }
  }
);
