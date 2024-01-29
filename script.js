// some inspiration provided by Xpert, an AI Learning Assistant for EdX
const timeDisplayEl = $('#currentDay');
const timeBlock = document.querySelectorAll('.time-block');
const classesToRemove = ['.past','.present','.future'];
const buttons = document.querySelectorAll('.saveBtn');

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {

  function handleClick(event) {
    let parentElement = this.parentNode;
    let textareaElement = parentElement.querySelector(".description");
    
    let parentElementId = parentElement.id;
    let textareaValue = textareaElement.value;

    localStorage.setItem(parentElementId, textareaValue);
  }

  function loadStorage(buttonList) {
    buttonList.forEach(button => {
    let parentElement = button.parentNode;
    let textareaElement = parentElement.querySelector(".description");
    let parentElementId = parentElement.id;
    textareaElement.value = "";
    textareaElement.value = localStorage.getItem(parentElementId);
    });
  }

function checkHourChange() {
  // Find the difference between now and the end of the hour
  const timeUntilNextHour = dayjs().endOf('hour').add(1, 'hour').diff(dayjs(), 'millisecond');
  // call our class change function
  addClassBasedOnTime();
  timeDisplayEl.text(dayjs().format('dddd, MMMM D'));
  // Call the function again after the time remaining until the next hour
  setTimeout(checkHourChange, timeUntilNextHour);
}

  function addClassBasedOnTime() {
    let currentHour = parseInt(dayjs().format('H'));
    timeBlock.forEach(element => {
      classesToRemove.forEach(className => {
        element.classList.remove(className);
      });
    });
    for (let hour = 1; hour < 25; hour++) {
      elementId = `hour-${hour}`;
      if (hour < currentHour) {
        $(`#${elementId}`).addClass('past');
      } else if (hour === currentHour) {
        $(`#${elementId}`).addClass('present')
      } else {
        $(`#${elementId}`).addClass('future')
      }
    }
  }

  timeDisplayEl.text(dayjs().format('dddd, MMMM D'));

  loadStorage(buttons);
  checkHourChange();

  buttons.forEach(button => {
    button.addEventListener('click', handleClick);
  });
});
