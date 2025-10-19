export const projectCreationDialog = document.querySelector("#project-dialog");
export const taskCreationDialog = document.querySelector("#task-dialog");
export const projectCreationForm = document.querySelector("#project-dialog form");
export const taskCreationForm = document.querySelector("task-creation-dialog form");

// export const showEditModal = function(item, editableFields) {
//     const modal = document.querySelector('#edit-modal');
//     const fieldsContainer = document.querySelector('#modal-fields');
  
//     fieldsContainer.innerHTML = '';
  
//     editableFields.forEach(field => {
//         fieldsContainer.appendChild(createFieldElement(field, item[field]));
//     });
  
//     modal.showModal();
//     return modal;
// }

// const createFieldElement = function(fieldName, value) {
//   const container = document.createElement('div');
//   container.className = 'field-group';
  
//   const label = document.createElement('label');
//   label.textContent = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
//   label.htmlFor = fieldName;
  
//   const input = document.createElement('input');
//   input.id = fieldName;
//   input.name = fieldName;
//   input.value = value || '';
  
//   container.append(label, input);
//   return container;
// }

//upon submitting using a "linked option", FormData Objects will return the object id name
// but will have their text content as some other text
// e.g. a user can click on "orange", but an id will be submitted instead
export const createLinkedOptionElement = function(text, id) {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = text;
    return option;
}

export const fillFormUsingObjectProperties = function(formElement, arbitraryObject) {
    for (const key in arbitraryObject) {
        if (formElement.elements[key]) {
            formElement.elements[key].value = arbitraryObject[key];
        }
    }
}
