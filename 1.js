const container = document.querySelector('#email-editor')
container.addEventListener('changeList', function(event){
  console.log("test event listeners", event.detail)
});

const options = {
  name: "Board name",
  inputPlaceholder: "add more people...",
  showButtonsPanel: true,
};
document.getElementById('email-editor').style.backgroundColor = '#DCDCDC';
document.getElementById('email-editor').style.width = '600px';
document.getElementById('email-editor').style.border = '3px solid black';


const testEmailEditor = new EmailsEditor({container, ...options});
testEmailEditor.setEmails(["1@gmail.com"]);
console.log("test getEmailList: ", testEmailEditor.getEmailList());

function EmailsEditor(elem) {
    const items = new Map();

    const mainContainer = document.createElement("div");
    mainContainer.id = "window";

    const boardName = document.createElement("b");
    boardName.id = "window__board";
    boardName.innerHTML = elem.name;

    const header = document.createElement("h2");
    header.className = "main-container__header";
    header.append("Share ", boardName, " with other");

    const emailsContainer = document.createElement("div");
    emailsContainer.className = "emails-container";

    const placeholder = document.createElement("span");
    placeholder.innerHTML = elem.inputPlaceholder;
    placeholder.className = "emails-container__placeholder";

    const input = document.createElement("input");
    input.className = "emails-container__input";
    input.onfocus = () => {
        placeholder.className = "invisible";
    };


    emailsContainer.append(placeholder, input);
    emailsContainer.onclick = () => {
        input.focus();
    };

    mainContainer.append(header, emailsContainer);

    const addEmailButton = document.createElement("button");
    addEmailButton.className = "main-button";
    addEmailButton.textContent = "Add email";


    const getCountButton = document.createElement("button");
    getCountButton.className = "main-button";
    getCountButton.textContent = "Get email count";
  

    let buttonsContainer = "";
    if (elem.showButtonsPanel) {
        buttonsContainer = document.createElement("div");
        buttonsContainer.className = "buttons-container";
        buttonsContainer.append(addEmailButton, getCountButton);
    }

    elem.container.append(mainContainer, buttonsContainer);
    document.getElementById('window').style.backgroundColor = 'white';
}
