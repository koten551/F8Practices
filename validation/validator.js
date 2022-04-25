
selectorRules = {}

function validator(options) {

    //hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorMessage;
        for (const course of selectorRules[rule.selector]) {
            switch(inputElement.type) {
                case 'radio':
                case 'checkbox':
                case 'button': {
                    errorMessage = course(formElement.querySelector(`${rule.selector}:checked`))
                    break
                }
                default: {
                    errorMessage = course(inputElement.value)
                    break

                }
            }
            if(errorMessage) break;
        }
        var parentElement = inputElement.closest(`.${options.formGroupSelector}`);
        var errorElement = parentElement.querySelector(`.${options.errorSelector}`)
        if(errorMessage) {
           errorElement.innerText = errorMessage
           parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = ''
            parentElement.classList.remove('invalid');
        }
        return !errorMessage;
    }

    //lấy element của form
    var formElement = document.querySelector(options.form);
    if(formElement) {
        //xử lý khi submit 
        formElement.onsubmit = function(e) {
            e.preventDefault();
            var formValid = true;
            options.rules.forEach(function(rule) {
                var inputElement = document.querySelector(rule.selector);
                var isValid = validate(inputElement,rule);
                if(!isValid) {
                    formValid = false;
                }
            })
           // nếu các input đều đúng
            if(formValid) {
                if(typeof options.onSubmit === 'function') { // submit với js
                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])')
                    var formValues = Array.from(enableInputs).reduce(function(values, input) {
                        var inputType = input.type;
                        switch (inputType) {
                            // lấy giá trị đối với tick input
                            case 'checkbox': {
                                if(input.matches(':checked')) {
                                    if(values[input.name]) {
                                        values[input.name].push(input.value);
                                    } else {
                                        values[input.name] = [input.value];
                                    }
                                } else {
                                    values[input.name] = [];
                                } 
                                break;
                            }

                            case 'radio': if(input.matches(':checked')) {
                                values[input.name] = input.value;
                            } break;
                            
                            // input là file 
                            case 'file': {
                                values[input.name] = input.files
                            }
                            // lấy giá trị với các input nhập thông thường 
                            default: {
                                values[input.name] = input.value;
                                break;
                            }
                        }

                        return values;
                    }, {})
                    options.onSubmit(formValues)
                } else { // submit mặc định (không có option.onSubmit)
                    formElement.submit()
                }   
            }

        }
        // lap qua mỗi rule và xử lý
        options.rules.forEach(function(rule) {
            
            //lưu lại validator của các input
            
            if(Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            } 

            var inputElements = document.querySelectorAll(rule.selector);
            for(const inputElement of inputElements) {
                // xử lý trường hợp blur khỏi input
                inputElement.onblur = function() {
                    validate(inputElement,rule);
                }
                // xử lý khi người dùng nhập
                inputElement.oninput = function() {
                    var parentElement = inputElement.closest(`.${options.formGroupSelector}`);
                    var errorElement = parentElement.querySelector(`.${options.errorSelector}`)
                    parentElement.classList.remove('invalid');
                    errorElement.innerText = '';
                }
            }
        })
    }
}

validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            var inputType = document.querySelector(selector).type;
            if((inputType !== 'checkbox') && (inputType !== 'radio') && (inputType !== 'button')) {
                value = value.trim();
            }
            return value ? undefined : message || 'vui lòng nhập trường này';
        }
    }   
}

validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'vui lòng nhập email';
        }
    }
}

validator.isPassword = function(selector, message, length) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
            return regex.test(value) ? undefined : message || 'Mật khẩu không hợp lệ. Mật khẩu phải bao gồm ít nhất 1 kí tự hoa, 1 số và không chứa kí tự đặc biệt';
        }
    }
}

validator.confirmation = function(selector, confirmationValue, message) {
    return {
        selector: selector,
        test: function(value) {
            return value === confirmationValue() ? undefined : message || 'giá trị nhập vào không chính xác'
        }
    }
}