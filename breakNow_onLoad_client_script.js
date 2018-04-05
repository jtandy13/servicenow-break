/**
 * Break on ServiceNow form field changes!
 * This script will detect and break on any and all DOM changes
 * to the chosen field.
 */

/** 
 * Usage:
 * --------------------
 *
 * Create an onLoad client script on the form that you are trying to debug.
 * Make sure that the "order" field on the client script is the lowest of any
 * current onLoad client scripts on the table. This ensures that the breakNow
 * function will run an catch and modifications to the field your want to watch.
 * 
 * At the end of the script replace the "state" field with any field that you are 
 * trying to watch:
 * 
 * breakNow.breakOnChange('your_field_name', true);
 * 
 * If you need to watch something in the DOM other than an ServiceNow field, you 
 * can use a CSS selector to choose the DOM element.
 * 
 * breakNow.breakOnChange('#add_icon', false);
 *
 */

function onLoad() {
  var breakNow = (function () {

    // Callback to execute on DOM changes
    var callback = function (mutationList) {
      mutationList.forEach(function (mutation) {
        debugger;
      });
    };

    var observer = new MutationObserver(callback);

    function breakOnChange(selector, formField) {
      //Since we need to detect any and all DOM changes . . . bring in the MutationObserver!
      var targetNode;
      if (formField) {
        targetNode = document.getElementById('element.' + g_form.tableName + '.' + selector);
      } else {
        targetNode = document.querySelector(selector);
      }
      var config = { attributes: true, childList: true, characterData: true, subtree: true };
      observer.observe(targetNode, config);
    }

    function disableBreakPoint() {
      if (observer) observer.disconnect();
    }

    return {
      breakOnChange: breakOnChange,
      disableBreakPoint: disableBreakPoint
    };

  })();

  //Replace 'state' with any field that you are trying to watch
  breakNow.breakOnChange('state', true);
}


