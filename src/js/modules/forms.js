const forms = (state) => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        phoneInputs = document.querySelectorAll('input[name="user_phone"]');

    function validatePhoneNumber(phoneNumber) {
        // Удаляем все символы, кроме цифр
        let cleanedNumber = phoneNumber.replace(/\D/g, '');

        // Проверяем, что номер состоит из 10 цифр
        if (cleanedNumber.length === 10) {
            // Добавляем пробелы или дефисы для форматирования номера
            let formattedNumber = cleanedNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            return formattedNumber;
        } else {
            return "Неверный формат номера";
        }
    }


    phoneInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/g, '')
        });
        item.addEventListener('change', () => {
            item.value = validatePhoneNumber(item.value)
        });
    })

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
        return res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    }

    const isInputsCorrect = () => {
        let answer = true
        inputs.forEach(item => {
            if (item.value === 'Неверный формат номера')
                answer = false
        });
        return answer
    }

    form.forEach( item => {

        item.addEventListener('submit', (e) => {
            e.preventDefault();
            if (isInputsCorrect()) {
                let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                item.appendChild(statusMessage);
                const formData = new FormData(item);
                if (item.getAttribute("data-calc") === 'end') {
                    for (let key in state) {
                        formData.append(key, state[key]);
                    }
                }
                postData('assets/server.php', formData)
                    .then(res => {
                        console.log("point 1");
                        console.log(res);
                        statusMessage.textContent = message.success;
                    })
                    .catch(() => statusMessage.textContent = message.failure)
                    .finally(() => {
                        clearInputs();
                        setTimeout(
                            () => {
                                statusMessage.remove();
                            }, 5000
                        )
                    })
            }
        })

    })


}
export default forms;