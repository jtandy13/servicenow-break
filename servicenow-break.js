/**
 * Break on ServiceNow form field changes!
 * This script will detect and break on any and all DOM changes
 * to the chosen field.
 */

 /** 
  * Usage:
  * --------------------
  *
  * 1. Run the script in the JavaScript console on any ServiceNow form
  * 2. Call the following code in the JavaScript console:
  *          breakNow.breakOnChange('enter your field name here', true);
  *
  * Example on the incident form:
  *          breakNow.breakOnChange('incident.state', true);
  *
  * If you're looking to break on changes of other DOM elements,
  * then set the second parameter of the breakOnChange function to false,
  * and use a CSS selector for the first parameter.
  *
  * Example:
  *          breakNow.breakOnChange('#add_icon', false);
  *
  */

var breakNow = (() => {

  function getTargetWindow(){
    var targetWin;
    if (window.g_form) {
      targetWin = window;
      return targetWin;
    } else if (document.getElementById('gsft_main')) {
      targetWin = document.getElementById('gsft_main').contentWindow
      return targetWin;
    } else {
      return window;
    }
  }

  // Callback to execute on DOM changes
  var callback = function (mutationList) {
    for (var mutation of mutationList) {
      debugger;
    }
  }

  var observer = new MutationObserver(callback);

  function breakOnChange(selector, formField) {
    //Since we need to detect any and all DOM changes . . . bring in the MutationObserver!
    var targetWindow = getTargetWindow();
    if(formField){
      var targetNode = targetWindow.document.getElementById(`element.${targetWindow.g_form.tableName}.${selector}`);
    } else {
      var targetNode = targetWindow.document.querySelector(selector);
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
  }

})();


