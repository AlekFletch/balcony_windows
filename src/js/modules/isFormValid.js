const isFormValid = (selector) => {
    let isValid = true;
    if (selector === '.popup_calc_profile' || selector === '.popup_calc_end') {
        const selects = document.querySelectorAll('[data-selector="modal_first"]');
        selects.forEach(function (select) {
            if (select.value === '') {
                isValid = false;
                select.style.border = '2px solid red';
            } else {
                select.style.removeProperty('border');
            }
        });

    }

    return isValid;
}
export default isFormValid;