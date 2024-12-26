document.addEventListener("DOMContentLoaded", function () {
   var parentTabs = document.querySelectorAll('.chat__asideButtons .chat__asideButton');
   parentTabs.forEach(function (parentTab) {
      parentTab.addEventListener('click', function () {
         var parentTabId = this.getAttribute('data-chat-tab');
         var correspondingParentTabContent = document.querySelector('.chat__list-contacts[data-chat-tabcontent="' + parentTabId + '"]');

         // Remove active classes from all parent tabs and contents
         document.querySelectorAll('.chat__asideButtons .chat__asideButton').forEach(function (tab) {
            tab.classList.remove('action');
         });
         document.querySelectorAll('.chat__list-contacts').forEach(function (content) {
            content.classList.remove('list-contacts-active');
         });

         // Add active classes to the selected parent tab and content
         this.classList.add('action');
         correspondingParentTabContent.classList.add('list-contacts-active');
      });
   });
   var subTabs = document.querySelectorAll('.chat__user-wrap-content, .show-messages');
   subTabs.forEach(function (subTab) {
      subTab.addEventListener('click', function (event) {
         event.stopPropagation(); // Stop event bubbling

         var subTabId = this.getAttribute('data-tab');
         var correspondingSubTabContent = document.querySelector('.chat__item .chat__wrap-message[data-tabcontent="' + subTabId + '"]');

         // Remove active classes from all sub-tabs and contents
         document.querySelectorAll('.chat__user-wrap-content, .show-messages').forEach(function (subTab) {
            subTab.classList.remove('chat__wrap-message');
         });
         document.querySelectorAll('.chat__wrap-message').forEach(function (content) {
            content.classList.remove('active-message');
         });

         // Add active classes to the selected sub-tab and content
         //this.classList.add('subTab-active');
         correspondingSubTabContent.classList.add('active-message');
      });
   });

   // Adding class user-sms-before-author
   const smsBlocks = document.querySelectorAll('.user-sms');
   smsBlocks.forEach((block, index) => {
      if (block.classList.contains('author') && index > 0) {
         const prevBlock = smsBlocks[index - 1];
         if (!prevBlock.classList.contains('author')) {
            prevBlock.classList.add('user-sms-before-author');
         }
      }
   });

   // When a scroll appears, the scroll-appeared class is added
   function checkOverflowInActiveMessage() { // Function to check for content overflow
      const activeBlock = document.querySelector('.chat__wrap-message.active-message');
      if (!activeBlock) return;
      // Check all messages inside the active block
      const messages = activeBlock.querySelectorAll('.chat__wrap-message-message');
      messages.forEach(message => {
         if (message.scrollHeight > message.clientHeight) {
            message.classList.add('scroll-appeared');
         } else {
            message.classList.remove('scroll-appeared');
         }
      });
   }
   const classObserver = new MutationObserver(mutations => { // Class change observer (to track active-message changes)
      mutations.forEach(mutation => {
         if (mutation.attributeName === 'class') {
            checkOverflowInActiveMessage();
         }
      });
   });
   const contentObserver = new MutationObserver(mutations => { // Watch for content changes (to track new messages being added)
      mutations.forEach(mutation => {
         if (mutation.type === 'childList' || mutation.type === 'subtree') {
            checkOverflowInActiveMessage();
         }
      });
   });
   // Watch all chat__wrap-message blocks
   const chatWrapMessages = document.querySelectorAll('.chat__wrap-message');
   chatWrapMessages.forEach(block => {
      classObserver.observe(block, { attributes: true }); // Track attribute changes (active-message)
      contentObserver.observe(block, { childList: true, subtree: true }); // Track content changes
   });
   window.addEventListener('resize', checkOverflowInActiveMessage); // Recheck when window resizes
   checkOverflowInActiveMessage(); // Initialization on boot

   // Generate SMS block
   function addMessage(inputField) { 
      const message = inputField.value.trim();
      if (!message) return; // If the field is empty, do not send the message
      const parentBlock = inputField.closest('.chat__wrap-message');
      const messageContainer = parentBlock.querySelector('.chat__wrap-message-message');
      // Create a new message element
      const messageBlock = document.createElement('div');
      messageBlock.classList.add('user-sms', 'author');
      const messageText = document.createElement('p');
      messageText.classList.add('user-sms-text');
      messageText.textContent = message;
      const messageTime = document.createElement('span');
      messageTime.classList.add('user-sms-time');
      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      messageTime.textContent = formattedTime;
      // Add SVG icon (if needed)
      const svgIcon = ` <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.8"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.5115 2.96526C11.7722 2.64339 11.7227 2.17111 11.4008 1.91039C11.0789 1.64968 10.6066 1.69925 10.3459 2.02112L4.38829 9.3761L1.95729 6.96111C1.66343 6.66919 1.18855 6.67075 0.896631 6.96461C0.604707 7.25847 0.606277 7.73335 0.900137 8.02527L3.92003 11.0253C4.07051 11.1748 4.27725 11.2535 4.48905 11.2421C4.70084 11.2307 4.8979 11.1301 5.0314 10.9653L11.5115 2.96526ZM16.4938 2.98631C16.7662 2.6742 16.7339 2.20042 16.4218 1.9281C16.1097 1.65577 15.6359 1.68803 15.3636 2.00014L8.90609 9.40117L8.45379 8.9577C8.15803 8.6677 7.68318 8.67238 7.39318 8.96814C7.10319 9.26391 7.10787 9.73876 7.40363 10.0288L8.42353 11.0288C8.57096 11.1733 8.77147 11.2507 8.97779 11.2427C9.18411 11.2346 9.37799 11.1419 9.51374 10.9863L16.4938 2.98631Z" fill="#090909"/></g></svg>`;
      messageTime.innerHTML += svgIcon;
      // Add elements to the message
      messageBlock.appendChild(messageText);
      messageBlock.appendChild(messageTime);
      messageContainer.appendChild(messageBlock); // Add message to container
      messageContainer.scrollTop = messageContainer.scrollHeight; // Scroll down to the last message
      inputField.value = ''; // Clear the input field
      // Remove 'the-field-is-not-empty' class from the parent block after adding the message
      const messageFooter = inputField.closest('.chat__wrap-message-footer');
      messageFooter.classList.remove('the-field-is-not-empty');
   }
   document.querySelectorAll('.chat__message-field').forEach(input => { // Handler for Enter key and mobile send button
      input.addEventListener('keypress', (e) => {
         if (e.key === 'Enter') {
            addMessage(input);
         }
      });
      input.addEventListener('input', (e) => { // For mobile send button
         if (e.inputType === 'insertLineBreak') {
            addMessage(input);
         }
      });
   });
   document.querySelectorAll('.send-sms').forEach(button => { // Handler for all send-sms buttons
      button.addEventListener('click', () => {
         const inputField = button.closest('.chat__wrap-message-footer').querySelector('.chat__message-field'); // Get the input field from the same parent
         addMessage(inputField); // Add the message
      });
   });

   // Generate SMS block with image
   const fileInputs = document.querySelectorAll('.chat__wrap-message-footer .wrap-select-file input[type="file"]');
   fileInputs.forEach(input => {
      input.addEventListener('change', (event) => {
         const file = event.target.files[0];
         if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
               const imageUrl = e.target.result;
               const messageBlock = document.createElement('div');
               messageBlock.classList.add('user-sms', 'img-author');
               messageBlock.innerHTML = `
                  <img src="${imageUrl}" alt="Uploaded Image">
                  <span class="user-sms-time">${getCurrentTime()}</span>
               `;
               const messageContainer = input.closest('.chat__wrap-message').querySelector('.chat__wrap-message-message');
               messageContainer.appendChild(messageBlock);
               requestAnimationFrame(() => { // Scroll down while waiting for DOM to update
                  messageContainer.scrollTop = messageContainer.scrollHeight;
               });
               input.value = ''; // Clean up the input
            };
            reader.readAsDataURL(file);
         }
      });
   });
   function getCurrentTime() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
   }

   // Adding the active-message class when changing screen orientation (for screens larger than 861px)
   const chatWrapMessage = document.querySelector('.chat__wrap-message.no-chat-selected');
   const handleScreenOrientation = () => { // Function to check screen width and add/remove class
      if (window.innerWidth > 860) { // Add active-message class if screen width > 860px
         if (chatWrapMessage) {
            chatWrapMessage.classList.add('active-message');
         }
      } else { // Remove the active-message class if the screen width is <= 860px
         if (chatWrapMessage) {
            chatWrapMessage.classList.remove('active-message');
         }
      }
   };
   window.addEventListener('resize', handleScreenOrientation); // Track screen orientation changes
   handleScreenOrientation(); // Call it immediately for initial loading

   // Removing the active-message class when clicking on a button with the chat__wrap-message-close class (for screens up to 860px)
   const closeButtons = document.querySelectorAll('.chat__wrap-message-close');
   closeButtons.forEach(button => {
      button.addEventListener('click', () => {
         if (window.innerWidth <= 860) {
            const parentMessage = button.closest('.chat__wrap-message');
            if (parentMessage) {
               parentMessage.classList.remove('active-message');
            }
         }
      });
   });

   // Add class the-field-is-not-empty to parent if chat__message-field is not empty
   document.querySelectorAll('.chat__message-field').forEach((messageField) => {
      const checkFieldContent = () => { // Function to check the contents of the field
         const parentElement = messageField.closest('.chat__wrap-message-footer'); // Find the parent block
         if (messageField.value.trim() !== '') {
            parentElement.classList.add('the-field-is-not-empty'); // Add the class if the field is not empty
         } else {
            parentElement.classList.remove('the-field-is-not-empty'); // Remove the class if the field is empty
         }
      };
      messageField.addEventListener('input', checkFieldContent); // Track text input in the field
      checkFieldContent(); // Check initially in case there's already content in the field
   });
});

// Check for touch device
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
   document.addEventListener('DOMContentLoaded', () => {
      // Handler for elements with class .chat__user
      document.querySelectorAll('.chat__user').forEach(user => {
         user.addEventListener('touchstart', (e) => {
            // Remove the show class from all other .chat__user
            document.querySelectorAll('.chat__user').forEach(otherUser => {
               if (otherUser !== user) {
                  otherUser.classList.remove('show');
               }
            });
            user.classList.add('show'); // Add the show class to the .chat__user element
         });
      });

      // Handler for elements with class .show-messages
      document.querySelectorAll('.show-messages').forEach(showMessage => {
         showMessage.addEventListener('click', (e) => {
            const parentUser = showMessage.closest('.chat__user');
            if (parentUser) {
               parentUser.classList.remove('show'); // Remove the show class from all .chat__user
            }
         });
      });

      // Handler for elements with class .delete-chat
      document.querySelectorAll('.delete-chat').forEach(showMessage => {
         showMessage.addEventListener('click', (e) => {
            const deleteChat = showMessage.closest('.chat__user');
            if (deleteChat) {
               deleteChat.classList.remove('show'); // Remove the show class from all .chat__user
            }
         });
      });

      // Handler for elements with class .saved-chat
      document.querySelectorAll('.saved-chat').forEach(showMessage => {
         showMessage.addEventListener('click', (e) => {
            e.preventDefault();
            const savedChat = showMessage.closest('.chat__user');
            if (savedChat) {
               savedChat.classList.remove('show'); // Remove the show class from all .chat__user
            }
         });
      });
   });
}

// If the touch screen adds class... to...
function addTouchClassToChat() {
   const chatElement = document.querySelector('.main.chat');
   if (!chatElement) return; // Check if the element exists
   if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      chatElement.classList.add('touch-device');
   }
}
document.addEventListener('DOMContentLoaded', addTouchClassToChat); // Run the function after the page loads