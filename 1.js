const container = document.querySelector('#email-editor')
container.addEventListener('changeList', function(event){
  console.log("test event listeners", event.detail)
});

const options = {
  name: "Board name",
  inputPlaceholder: "add more people...",
  showButtonsPanel: true
};



const testEmailEditor = new EmailsEditor({container, ...options});
// testEmailEditor.setEmails(["1@gmail.com"]);
// console.log("test getEmailList: ", testEmailEditor.getEmailList());

function EmailsEditor(elem) {
    const items = new Map();

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
            addItems(input.value);
            input.value = "";
        }
    };
    emailsContainer.onclick = () => {
        input.focus();
    };

    input.onblur = () => {
        document.getElementById('emails__placeholder').style.display = '';
        addItems(input.value);
        input.value = "";
    };

    emailsContainer.append(placeholder, input);

    mainContainer.append(headerTitle, emailsContainer);

    const addItems = emails => {
        const emailList = emails
            .split(",")
            .map(item => item.trim())
            .filter(item => item);

        let isChanged = false;

        emailList.forEach(item => {
            if (items.has(item)) {
                return;
            }

            const isValid = emailValidator(item);
            isChanged = isValid;

            const elementContainer = document.createElement("span");
            elementContainer.className = `email${
                isValid ? "" : " email--wrong"
            }`;

            const elementContent = document.createElement("span");
            elementContent.textContent = item;
            elementContent.className = "email__content";

            const deleteButton = document.createElement("span");
            deleteButton.className = "email__delete-button";
            deleteButton.onclick = (key => {
                return event => {
                    event.stopPropagation();
                    deleteItem(key);
                };
            })(item);

            elementContainer.append(elementContent, deleteButton);

            items.set(item, {
                isValid,
                element: elementContainer
            });
            emailsContainer.insertBefore(elementContainer, placeholder);
        });
        isChanged && dispatchChangeListEvent();
    };

    const emailValidator = email => {
        const valid = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
        return valid.test(String(email).toLowerCase());
    };
    const addEmailButton = document.createElement("button");
    addEmailButton.id = "button_add";
    addEmailButton.textContent = "Add email";


    const getEmailButton = document.createElement("button");
    getEmailButton.id = "button_get";
    getEmailButton.textContent = "Get emails count";


    let buttonsContainer = "";
    if (elem.showButtonsPanel) {
        buttonsContainer = document.createElement("div");
        buttonsContainer.className = "buttons-container";
        buttonsContainer.append(addEmailButton, getEmailButton);
    }

    elem.container.append(mainContainer, buttonsContainer);
    //css стили для элементов
    //виджет
    document.getElementById('email-editor').style.backgroundColor = '#DCDCDC';
    document.getElementById('email-editor').style.width = '600px';
    document.getElementById('email-editor').style.border = '3px solid black';
    //окно и заголовок

    document.getElementById('window__header').style.fontSize = '25px';
    document.getElementById('window__header').style.marginLeft = '50px';
    document.getElementById('window__header').style.fontWeight = 'normal';
    document.getElementById('window__header').style.marginTop = '0';
    document.getElementById('window__header').style.paddingTop = '20px';
    //Окно ввода емэйлов
    document.getElementById('emails').style.width = '450px';
    document.getElementById('emails').style.marginLeft  = '50px';
    document.getElementById('emails').style.height = '100px';
    document.getElementById('emails').style.border = '2px solid black';
    document.getElementById('emails').style.backgroundColor = 'white';
    document.getElementById('emails__input').style.width = '100px';
    document.getElementById('emails__input').style.outline = 'none';
    document.getElementById('emails__input').style.border = '0';
    document.getElementById('emails__placeholder').style.color = 'gray';
    document.getElementById('emails__placeholder').style.marginLeft = '3px';
    //кнопки
    document.getElementById('button_add').style.backgroundColor = '#87CEFA';
    document.getElementById('button_get').style.backgroundColor = '#87CEFA';
    document.getElementById('button_add').style.width = '150px';
    document.getElementById('button_get').style.width = '150px';
    document.getElementById('button_add').style.height = '40px';
    document.getElementById('button_get').style.height = '40px';
    document.getElementById('button_add').style.marginLeft = '50px';
    document.getElementById('button_get').style.marginLeft = '30px';
    document.getElementById('button_add').style.marginTop = '10px';
    document.getElementById('button_get').style.marginTop = '10px';
    document.getElementById('button_add').style.marginBottom = '10px';
    document.getElementById('button_get').style.marginBottom = '10px';
    document.getElementById('button_add').style.borderRadius = '8px';
    document.getElementById('button_get').style.borderRadius = '8px';
    document.getElementById('button_add').style.border = 'none';
    document.getElementById('button_get').style.border = 'none';
}
