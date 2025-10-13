const addClickEventHandler = function(element, callback) {
    element.addEventListener('click', (e) => {
        callback();
    });
}