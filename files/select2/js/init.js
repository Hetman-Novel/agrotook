$(document).ready(function () { // Make sure the DOM is fully loaded before initializing Select2
    
   $('select').each(function () {
      $(this).select2(); // Initialize Select2
      $(this).on('select2:select', function (e) { // Handler for the value selection event
         const selectedValue = e.params.data.text; // Get the text of the selected value
         const parentBlock = $(this).closest('.wrap-select-form'); // Parent block
         const hiddenField = parentBlock.find('input[type="hidden"]').first(); // Hidden field above select

         // If a hidden field is found, write the selected value into it
         if (hiddenField.length) {
            hiddenField.val(selectedValue);
         }
      });
   });

   $('#where-are-you-moving-from').select2({
      placeholder: "10001, New York, NY",
      theme: 'where-are-you-moving-from'
   });
   $('#where-are-you-moving-to').select2({
      placeholder: "10001, New York, NY",
      theme: 'where-are-you-moving-from'
   });
   $('#get-matched-where-are-you-moving-from').select2({
      placeholder: "10001, New York, NY",
      theme: 'where-are-you-moving-from'
   });
   $('#get-matched-where-are-you-moving-to').select2({
      placeholder: "10001, New York, NY",
      theme: 'where-are-you-moving-from'
   });
   $('#how-much-needs-to-be-moved').select2({
      placeholder: "Move Size",
      theme: 'where-are-you-moving-from'
   });
   $('#where-are-you-moving-from2').select2({
      placeholder: "10001, New York, NY",
      theme: 'where-are-you-moving-from'
   });
   $('#where-are-you-moving-to2').select2({
      placeholder: "10001, New York, NY",
      theme: 'where-are-you-moving-from'
   });
   $('#get-matched-where-are-you-moving-from2').select2({
      placeholder: "10001, New York, NY",
      theme: 'where-are-you-moving-from'
   });
   $('#get-matched-where-are-you-moving-to2').select2({
      placeholder: "10001, New York, NY",
      theme: 'where-are-you-moving-from'
   });
   $('#how-much-needs-to-be-moved2').select2({
      placeholder: "Move Size",
      theme: 'where-are-you-moving-from'
   });

   // Calculator
   $('#calculator-where-are-you-moving-from').select2({
      placeholder: "10001, New York, NY",
      theme: 'where-are-you-moving-from'
   });
   $('#calculator-where-are-you-moving-to').select2({
      placeholder: "10001, New York, NY",
      theme: 'where-are-you-moving-from'
   });
   $('#calculator-how-much-needs-to-be-moved').select2({
      placeholder: "Move Size",
      theme: 'where-are-you-moving-from'
   });
});
