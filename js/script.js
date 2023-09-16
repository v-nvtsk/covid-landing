document.addEventListener('DOMContentLoaded', () => {

  // Phone input init
  const phoneInput = document.querySelector("#phone");
  const iti = intlTelInput(phoneInput, {
    customContainer: 'get-vaccine__phone-input-container',
    initialCountry: "auto",
    utilsScript: '../lib/phone/utils.js',
    nationalMode: 'false',
    autoInsertDialCode: 'true',
    allowDropdown: 'true',
    // separateDialCode: 'true',
    geoIpLookup: function (callback) {
      fetch("https://ipapi.co/json")
        .then(function (res) { return res.json(); })
        .then(function (data) { callback(data.country_code); })
        .catch(function () { callback("ru"); });
    }
  });

  const verifyButton = document.querySelector('.get-vaccine__verify-btn');

  verifyButton.addEventListener('click', (ev) => {
    if (!iti.isPossibleNumber()) {
      phoneInput.classList.add('invalid');
    }
  })
  phoneInput.addEventListener('input', (ev) => {
    phoneInput.classList.remove('invalid');
  })

  // Modal dialogs
  const scheduleSubmitBtn = document.querySelector('.schedule__submit-btn');
  const dialogIsScheduled = document.querySelector('#dialog-is-scheduled');

  scheduleSubmitBtn.addEventListener('click', (ev) => {
    openDialogAndLockScroll(dialogIsScheduled);
  })

  dialogIsScheduled.addEventListener('close', ev => {
    returnScroll();
  })

  dialogIsScheduled.addEventListener("click", closeOnBackDropClick);

  function closeOnBackDropClick({ currentTarget, target }) {
    const dialogElement = currentTarget;
    const isClickedOnBackDrop = target === dialogElement
    if (isClickedOnBackDrop) {
      dialogElement.close();
    }
  }

})

function openDialogAndLockScroll(dialogBlock) {
  dialogBlock.showModal();
  document.body.classList.add("scroll-lock");
}
function returnScroll() {
  document.body.classList.remove("scroll-lock");
}
