/**
 * ServiceNow breakOn functions
 */

 //The breakOn API let's us break on object property changes
 function breakOnValueChange(fieldName){
   var br = breakOn(g_form.getElement(fieldName), 'value');
 }

 function breakOnVisibilityChange(fieldName){
   var br = breakOn(document.getElementById(`element.${g_form.tableName}.${fieldName}`).style, 'visibility');
 }

 function breakOnReadOnlyChange(fieldName) {
   //Since we need to detect changes to a DOM element attribute . . . bring in the MutationObserver!
   var targetNode = document.getElementById(`${g_form.tableName}.${fieldName}`);
   //We're going to be watching attribute changes
   var config = {attributes: true};

   // Callback to execute on attribute changes
   var callback = function(mutationList) {
     for(var mutation of mutationList) {
       if (mutation.attributeName == "readonly") {
         debugger;
       }
     }
   }

   var observer = new MutationObserver(callback);

   observer.observe(targetNode, config);
 }

 function disableSNBreakPoints() {
   if(br) br.disable();
   if(observer) observer.disconnect();
 }

 