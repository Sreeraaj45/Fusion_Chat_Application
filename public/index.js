// SIDEBAR
const menuItems = document.querySelectorAll('.menu-item');

// MESSAGES
const messagesNotification = document.querySelector('#messages-notification');
const messages = document.querySelector('.messages');
const message = messages.querySelectorAll('.message');
const messageSearch = document.querySelector('#message-search');

// THEMES
const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customize-theme');
const fontSizes = document.querySelectorAll('.choose-size span');
var root = document.querySelector(':root');
const colorPalette = document.querySelectorAll('.choose-color span');
const Bg1 =document.querySelector('.bg-1');
const Bg2 =document.querySelector('.bg-2');
const Bg3 =document.querySelector('.bg-3');




// ----------------------------  SIDEBAR  ----------------------------

// remove active class from all menu items
const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    })
}

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');
        if(item.id != 'notifications'){
            document.querySelector('.notifications-popup').style.display = 'none';
        } else{
            document.querySelector('.notifications-popup').style.display = 'block';
            document.querySelector('#notifications .notification-count').style.display = 'none';
        }
    })
});

// ----------------------  MESSAGES  ------------------------
// searches chats
const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    message.forEach(chat => {
      let nameElem = chat.querySelectorAll('h5');
      if (nameElem.length > 0) {
        let name = nameElem[0].textContent.toLowerCase();
        if (name.indexOf(val) !== -1) {
          chat.style.display = 'flex';
        } else {
          chat.style.display = 'none';
        }
      }
    });
  };
  
// search chat
messageSearch.addEventListener('keyup', searchMessage)

// Highlight messages when clicked on messages bar on sidebar
messagesNotification.addEventListener('click', () => {
    messages.style.boxShadow = '0 0 1rem var(--color-primary)';
    messagesNotification.querySelector('.notification-count').style.display = 'none';
    setTimeout(() => {
        messages.style.boxShadow = 'none';
    }, 2000);
})

// -----------------------------  Theme Customization  ------------------------
// opens modal
const openThememodal = () => {
    themeModal.style.display = 'grid';
}

// closes modal
const closeThemeModal = (e) => {
    if(e.target.classList.contains('customize-theme')){
        themeModal.style.display = 'none';
    }
}


// closes modal
themeModal.addEventListener('click', closeThemeModal)

theme.addEventListener('click', openThememodal)




// ------------------------------------  Fonts -------------------------

// removeactive class from spans or font size selectors
const removeSizeSelector = () => {
    fontSizes.forEach(size => {
        size.classList.remove('active');
    })
}

fontSizes.forEach(size => {
    size.addEventListener('click', () => {
        removeSizeSelector();
        let fontSize;
        size.classList.toggle('active');

        if(size.classList.contains('font-size-1')){
            fontSize ='10px';
            root.style.setProperty('--sticky-top-left', '5.4rem')
            root.style.setProperty('--sticky-top-right', '5.4rem')
        } else if (size.classList.contains('font-size-2')){
            fontSize ='13px';
            root.style.setProperty('--sticky-top-left', '5.4rem')
            root.style.setProperty('--sticky-top-right', '-7rem')
        } else if (size.classList.contains('font-size-3')){
            fontSize ='16px';
            root.style.setProperty('--sticky-top-left', '-2rem')
            root.style.setProperty('--sticky-top-right', '-17rem')
        } else if (size.classList.contains('font-size-4')){
            fontSize ='19px';
            root.style.setProperty('--sticky-top-left', '-5rem')
            root.style.setProperty('--sticky-top-right', '-25rem')
        } else if (size.classList.contains('font-size-5')){
            fontSize ='22px';
            root.style.setProperty('--sticky-top-left', '-10rem')
            root.style.setProperty('--sticky-top-right', '-33rem')
        }

        // change font size of the root html element
    document.querySelector('html').style.fontSize = fontSize;

    })

})


// remove active class from colors
const changeActiveColorClass = () => {
    colorPalette.forEach(colorPicker => {
        colorPicker.classList.remove('active');
    })
}

// change primary colors
colorPalette.forEach(color => {
    color.addEventListener('click', () => {
        let primaryHue;
        // remove active class from colors
        changeActiveColorClass();


        if(color.classList.contains('color-1')){
            primaryHue = 48;
            
        } else if(color.classList.contains('color-2')){
            primaryHue = 252;
        }else if(color.classList.contains('color-3')){
            primaryHue = 352;
        }else if(color.classList.contains('color-4')){
            primaryHue = 152;
        }else if(color.classList.contains('color-5')){
            primaryHue = 202;
        }
        color.classList.add('active');

        root.style.setProperty('--primary-color-hue',primaryHue)

    })
})

// theme BACKGROUND values
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

// change background color
const changeBG = () => {
    root.style.setProperty('--light-color-lightness',lightColorLightness);
    root.style.setProperty('--white-color-lightness',whiteColorLightness);
    root.style.setProperty('--dark-color-lightness',darkColorLightness);
}

Bg1.addEventListener('click' ,() => {
    // add active class
    Bg1.classList.add('active');
    // remove active class from others
    Bg2.classList.remove('active');
    Bg3.classList.remove('active');
    window.location.reload();
});

Bg2.addEventListener('click' ,() => {
    darkColorLightness = '95%';
    whiteColorLightness = '20%';
    lightColorLightness = '15%';

    // add active class
    Bg2.classList.add('active');
    // remove active class from others
    Bg1.classList.remove('active');
    Bg3.classList.remove('active');
    changeBG();
});

Bg3.addEventListener('click' ,() => {
    darkColorLightness = '95%';
    whiteColorLightness = '10%';
    lightColorLightness = '0%';

    // add active class
    Bg2.classList.add('active');
    // remove active class from others
    Bg1.classList.remove('active');
    Bg2.classList.remove('active');
    changeBG();
});



// animation after liking a button
let likeButtons = document.querySelectorAll('.like-button');

likeButtons.forEach(likeButton => {
  let likeIcon = likeButton.querySelector('i');
  let likeCount = likeButton.querySelector('.like-count');

  let liked = false;
  let count = parseInt(likeCount.innerText);

  likeButton.addEventListener('click', () => {
    if (!liked) {
      likeIcon.classList.add('clicked');
      
      likeCount.innerText = ++count;
      liked = true;
    } else {
      likeIcon.classList.remove('clicked');
      
      likeCount.innerText = --count;
      liked = false;
    }

  });
});






const logoutIcon = document.querySelector('.uil-signout');
logoutIcon.addEventListener('click', showLogoutModal);

function showLogoutModal() {
    // Create the modal container element
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');
  
    // Create the modal content element
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
  
    // Create the modal message element
    const modalMessage = document.createElement('p');
    modalMessage.textContent = 'Are you sure you want to log out?';
  
    // Create the confirm button element
    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirm Logout';
    confirmButton.classList.add('confirm-button');
    confirmButton.addEventListener('click', logout);
  
    // Append the modal message and confirm button to the modal content
    modalContent.appendChild(modalMessage);
    modalContent.appendChild(confirmButton);
  
    // Append the modal content to the modal container
    modalContainer.appendChild(modalContent);
  
    // Append the modal container to the document body
    document.body.appendChild(modalContainer);
  
    // Add event listener to modal container to close modal on click outside of modal content
    modalContainer.addEventListener('click', (event) => {
      if (event.target === modalContainer) {
        modalContainer.remove();
      }
    });
  }
  

  function logout() {
    // Perform logout action here
    // For example:
    window.location.href = 'logout.php';
  }
  



const personalMessages = document.getElementById('message-list-personal');
const communitiesMessages = document.getElementById('message-list-communities');
const personalTab = document.getElementById('personal');
const communitiesTab = document.getElementById('communities');

personalTab.addEventListener('click', () => {
  if (!personalTab.classList.contains('active')) {
    personalTab.classList.add('active');
    communitiesTab.classList.remove('active');
    personalMessages.style.display = 'block';
    communitiesMessages.style.display = 'none';
  }
});

communitiesTab.addEventListener('click', () => {
  if (!communitiesTab.classList.contains('active')) {
    communitiesTab.classList.add('active');
    personalTab.classList.remove('active');
    communitiesMessages.style.display = 'block';
    personalMessages.style.display = 'none';
  }
});
 



// Get the button and the form elements
const createCommunityBtn1 = document.querySelector('.create-community h5');
const formPopup1 = document.querySelector('.form-popup');
const closeBtn1 = document.querySelector('.close-btn');
const previewImg = document.getElementById('preview');
// const fileInput = document.getElementById('photo-upload');

// Function to open the form popup
function openForm() {
  formPopup1.style.display = "block";
  document.body.style.overflow = "hidden"; // prevent scrolling in the background
}

// Function to close the form popup
function closeForm() {
  formPopup1.style.display = "none";
  document.body.style.overflow = "auto"; // allow scrolling in the background again
}

// When the "Create Communities" button is clicked, open the form
createCommunityBtn1.addEventListener('click', openForm);

// When the "X" button is clicked, close the form
closeBtn1.addEventListener('click', closeForm);

// When the user clicks outside the form, close the form
window.addEventListener('click', function(event) {
  if (event.target == formPopup1) {
    closeForm();
  }
});

// Preview the selected image
// fileInput.addEventListener('change', function() {
//   const file = fileInput.files[0];
//   const reader = new FileReader();

//   reader.addEventListener('load', function() {
//     previewImg.src = reader.result;
//   });

//   if (file) {
//     reader.readAsDataURL(file);
//   }
// });



// Open chat popup when message notification is clicked
document.querySelector('.message').addEventListener('click', openChat);

function openChat() {
  document.getElementById('myChat').style.display = 'block';
}

// Close chat popup when close button is clicked or when clicked outside of chat box
window.onclick = function(event) {
  if (event.target == document.getElementById('myChat')) {
    document.getElementById('myChat').style.display = 'none';
  }
}

// Send message when send button is clicked
function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value;
  messageInput.value = '';
  if (message != '') {
    const chatMessages = document.querySelector('.chat-messages');
    const newMessage = document.createElement('div');
    newMessage.classList.add('chat-message', 'outgoing');
    newMessage.innerHTML = `
      <div class="message-text">${message}</div>
      <div class="message-time">${getCurrentTime()}</div>
    `;
    chatMessages.appendChild(newMessage);
  }
}

// Get current time in HH:MM format
function getCurrentTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes(); 
  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}




function openChat() {
  document.getElementById('myChat').style.display = 'block';
}

function closeChat() {
  document.getElementById('myChat').style.display = 'none';
  document.body.style.filter = 'none';
}

window.onclick = function(event) {
  if (event.target.matches('.close-btn') || event.target.closest('.close-btn')) {
    closeChat();
  } else if (event.target == document.getElementById('myChat')) {
    closeChat();
  }
}
