import createWidgetLayout from './styles.js'

const container = document.querySelector('#email-editor')
container.addEventListener('changeList', function(event){
  console.log("test event listeners", event.detail)
});

const options = {
  name: "Board name",
  inputPlaceholder: "add more people...",
  showButtonsPanel: true
};

const items = [];

new CreateEmailsField({container, ...options})

createWidgetLayout ();


function CreateEmailsField(elem) {

    const mainContainer = document.createElement("div");
    mainContainer.id = "window";

    const namePlace = document.createElement("b");
    namePlace.id = "window__board";
    namePlace.textContent = elem.name;

    const headerTitle = document.createElement("h2");
    headerTitle.id = "window__header";
    headerTitle.append("Share ", namePlace, " with other");

    const emailsContainer = document.createElement("div");
    emailsContainer.id = "emails";

    const placeholder = document.createElement("span");
    placeholder.textContent = elem.inputPlaceholder;
    placeholder.id = "emails__placeholder";

    const input = document.createElement("input");
    input.id = "emails__input";

    input.onfocus = () => {
        document.getElementById('emails__placeholder').style.display = 'none';
    };
    input.onkeyup = event => {
          if (event.keyCode === 13) {
            addItem(input.value);
            input.value = "";
        }
    };
    emailsContainer.onclick = () => {
        input.focus();
    };

    input.onblur = () => {
        document.getElementById('emails__placeholder').style.display = '';
        addItem(input.value);
        input.value = "";
    };

    emailsContainer.append(placeholder, input);

    mainContainer.append(headerTitle, emailsContainer);


    const addEmailButton = document.createElement("button");
    addEmailButton.id = "button_add";
    addEmailButton.textContent = "Add email";


    const getEmailButton = document.createElement("button");
    getEmailButton.id = "button_get";
    getEmailButton.textContent = "Get emails count";


    let buttonsContainer = document.createElement("div");
    buttonsContainer.id = "buttons";
    buttonsContainer.append(addEmailButton, getEmailButton);

    elem.container.append(mainContainer, buttonsContainer);

  function addItem(item) {
    const emailItem = document.createElement("span");
    emailItem.className = "email";
    emailItem.textContent = item;

    if (emailValidator(item)) {
      emailsContainer.prepend(emailItem);
      emailsContainer.prepend( '   ');
      items.push(item);
    } else if(item === "") {

    }
    else {
      alert('invalid email')
    }


    console.log(item);
    console.log(items);
  }
  function getEmailsCount() {
    getEmailButton.addEventListener('click', function () {
      alert(items.length)
    })
  }
  getEmailsCount();
}
const emailValidator = email => {
    const valid = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
    return valid.test(String(email).toLowerCase());
};


