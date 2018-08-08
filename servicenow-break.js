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

  const getTargetFrame = (context) => {
    let tFrame;
    if (context.hasOwnProperty('g_form')) {
      tFrame = context;
      return tFrame;
    } else if (document.getElementById('gsft_main')) {
      tFrame = document.getElementById('gsft_main').contentWindow
      return tFrame;
    } else {
      return context;
    }
  }

  // Callback to execute on DOM changes
  const breakOnMutation = (mutationList) => {
    for (let mutation of mutationList) {
      debugger;
    }
  }

  const observer = new MutationObserver(breakOnMutation);

  const breakOnChange = (selector, formField) => {
    //Since we need to detect any and all DOM changes . . . bring in the MutationObserver!
    let targetWindow = getTargetFrame(window);
    let targetNode = null;
    if(formField){
      targetNode = targetWindow.document.getElementById(`element.${targetWindow.g_form.tableName}.${selector}`);
    } else {
      targetNode = targetWindow.document.querySelector(selector);
    }
    let config = { attributes: true, childList: true, characterData: true, subtree: true };
    observer.observe(targetNode, config);
  }

  const disableBreakPoint = () => {
    if (observer) observer.disconnect();
  }

  return {
    breakOnChange: breakOnChange,
    disableBreakPoint: disableBreakPoint
  }

})();


