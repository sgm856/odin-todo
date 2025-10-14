export const showModal = function (modalID) {
    const modalDialog = document.querySelector(`#${modalID}`);
    modalDialog.showModal();
}

export const showEditModal = function(item, editableFields) {
    const modal = document.querySelector('#edit-modal');
    const fieldsContainer = document.querySelector('#modal-fields');
  
    fieldsContainer.innerHTML = '';
  
    editableFields.forEach(field => {
        fieldsContainer.appendChild(createFieldElement(field, item[field]));
    });
  
    modal.showModal();
    return modal;
}

const createFieldElement = function(fieldName, value) {
  const container = document.createElement('div');
  container.className = 'field-group';
  
  const label = document.createElement('label');
  label.textContent = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  label.htmlFor = fieldName;
  
  const input = document.createElement('input');
  input.id = fieldName;
  input.name = fieldName;
  input.value = value || '';
  
  container.append(label, input);
  return container;
}

