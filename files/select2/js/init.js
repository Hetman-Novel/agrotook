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

   $('#sidebar-filters-categories').select2({
      placeholder: "Category",
      theme: 'sidebar-filters'
   });
   $('#sidebar-filters-address').select2({
      placeholder: "Address",
      theme: 'sidebar-filters'
   });
});
