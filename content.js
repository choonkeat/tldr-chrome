chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "clicked_browser_action" ) {
      if (! $('style[data-topicsentence-style')[0]) {
        var css = [
              ".topicsentence-parent { visibility: hidden !important; }",
              ".topicsentence-parent .topicsentence { visibility: visible !important; }",
            ].join("\n"),
            head = document.head || document.body,
            style = document.createElement('style');

        style.type = 'text/css';
        $(style).attr('data-topicsentence-style', true);
        style.appendChild(document.createTextNode(css));
        head.appendChild(style);
      }

      $('p[data-topicsentence-parent]').each(function(index, that) {
        $(that).toggleClass('topicsentence-parent');
      });
      $('p:not([data-topicsentence-parent])').each(function(index, that) {
        $.each(that.childNodes, function() {
          if (this.nodeName == '#text') {
            var match = this.nodeValue && this.nodeValue.match(
              /[^\.]\w\.\s/
              // do not treat acronym periods as sentence period

            );
            if (match) {
              var range = new Range();
              range.setStart(that, 0);
              range.setEnd(this, match.index + 3); // skip past to include the "." in topic sentence
              var newNode = document.createElement("span");
              range.surroundContents(newNode);
              $(newNode).addClass('topicsentence');
              $(that).addClass('topicsentence-parent').attr('data-topicsentence-parent', 'on');
              return false; // break $.each childNodes
            }
          }
        });
      });
    }
  }
);
