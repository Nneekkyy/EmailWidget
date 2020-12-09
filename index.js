const container = document.querySelector('#email-editor')
container.addEventListener('changeList', function(event){
  console.log("test event listeners", event.detail)
});

const options = {
  name: "Board name",
  inputPlaceholder: "add more people...",
  showButtonsPanel: true,
};

const testEmailEditor = new EmailsEditor({container, ...options})
testEmailEditor.setEmails(["1@gmail.com"]);
console.log("test getEmailList: ", testEmailEditor.getEmailList());

function EmailsEditor(atrs) {
    const items = new Map();

    const mainContainer = document.createElement("div");
    mainContainer.className = "main-container";

    const boardName = document.createElement("b");
    boardName.className = "main-container__boardName";
    boardName.innerHTML = atrs.name;

    const header = document.createElement("h2");
    header.className = "main-container__header";
    header.append("Share ", boardName, " with other");

    const emailsContainer = document.createElement("div");
    emailsContainer.className = "emails-container";

    const placeholder = document.createElement("span");
    placeholder.innerHTML = atrs.inputPlaceholder;
    placeholder.className = "emails-container__placeholder";

    const input = document.createElement("input");
    input.className = "emails-container__input";
    input.onfocus = () => {
        placeholder.className = "invisible";
    };

    input.onblur = () => {
        placeholder.className = "emails-container__placeholder";
        addItems(input.value);
        input.value = "";
    };

    input.onkeyup = event => {
        if (event.keyCode === 8 && input.value === "" && items.size) {
            const lastItemKey = Array.from(items.keys())[items.size - 1];
            deleteItem(lastItemKey);
        }
        if (
            event.keyCode === 13 ||
            (input.value && input.value[input.value.length - 1] === ",")
        ) {
            addItems(input.value);
            input.value = "";
        }
    };

    input.onpaste = () => {
        setTimeout(() => {
            addItems(input.value);
            input.value = "";
        }, 0);
    };

    emailsContainer.append(placeholder, input);
    emailsContainer.onclick = () => {
        input.focus();
    };

    mainContainer.append(header, emailsContainer);

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

    const deleteItem = key => {
        emailsContainer.removeChild(items.get(key).element);
        const isChange = items.get(key).isValid;
        items.delete(key);
        isChange && dispatchChangeListEvent();
    };

    const deleteAllItems = () => {
        let isChange = false;

        if (items.size) {
            for(let key of items.keys()) {
                emailsContainer.removeChild(items.get(key).element);
                isChange = items.get(key).isValid;
                items.delete(key);
            }
        }

        isChange && dispatchChangeListEvent();
    }

    const emailValidator = email => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    };

    const addRandomEmail = () => {
        const numberInName = Math.round(Math.random() * 10) + 3;
        const numberInDomain = Math.round(Math.random() * 6) + 3;
        const randomEmail =
            Math.random()
                .toString(36)
                .substring(2, numberInName) +
            "@" +
            Math.random()
                .toString(36)
                .substring(2, numberInDomain) +
            ".com";
        addItems(randomEmail);
    };

    const getEmailCount = () => {
        let count = 0;
        for (let item of items.values()) {
            item.isValid && count++;
        }
        alert(count);
    };

    this.setEmails = emailList => {
        deleteAllItems();
        emailList.forEach(item => {
            addItems(item);
        });
    };

    this.getEmailList = () => {
        const list = [];
        for (let item of items) {
            item[1].isValid && list.push(item[0]);
        }
        return list;
    };

    const dispatchChangeListEvent = () => {
        const widgetEvent = new CustomEvent("changeList", {
            bubbles: true,
            detail: this.getEmailList()
        });
        atrs.container.dispatchEvent(widgetEvent);
    };

    const addEmailButton = document.createElement("button");
    addEmailButton.className = "main-button";
    addEmailButton.textContent = "Add email";
    addEmailButton.onclick = addRandomEmail;

    const getCountButton = document.createElement("button");
    getCountButton.className = "main-button";
    getCountButton.textContent = "Get email count";
    getCountButton.onclick = getEmailCount;

    let buttonsContainer = "";
    if (atrs.showButtonsPanel) {
        buttonsContainer = document.createElement("div");
        buttonsContainer.className = "buttons-container";
        buttonsContainer.append(addEmailButton, getCountButton);
    }

    atrs.container.append(mainContainer, buttonsContainer);
}
