function validator(formSelector) {

    var _this = this

    var formRules = {}
    function getParent(element, selector) {
        return element.closest(selector);
    }
    /*quy ước: 
        -nếu có lỗi thì return message lỗi
        - nếu không có lỗi return undefined
    */ 
    var validatorRules = {
        required: function(value) {
            return value ? undefined : 'vui lòng nhập trường này'
        },
        email: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'vui lòng nhập email'
        },
        password: function(value) {
            var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{1,}$/
            return regex.test(value) ? undefined : 'mật khẩu không đúng dịnh dạng'
        },
        min: function(minLength) {
            return function(value) {
                return value.length >= minLength ? undefined : `vui lòng nhập nhiều hơn ${minLength} kí tự`
            }
        }
        
    }
    var formElement = document.querySelector(formSelector)

    if(formElement) {
       
        var inputs = document.querySelectorAll('[name][rules]')
        for(const input of inputs) {

            // tách các rule trong Atribute rules
            var rules = input.getAttribute('rules').split('|')
            var ruleArray
            var ruleHasValue
            for(var rule of rules) {
                ruleHasValue = rule.includes(':')
                if(ruleHasValue) {
                    ruleArray = rule.split(':')
                    rule = ruleArray[0]
                }
                // chuyển các rule thành function validate và lưu vào formRules
                var ruleFunc = validatorRules[rule]
                if(ruleHasValue) {
                    ruleFunc = ruleFunc(ruleArray[1])
                }
                
                if(Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc)
                } else {
                    formRules[input.name] = [ruleFunc]
                }
            } 

            // lắng nghe sự kiện để validate
            input.onblur = handelValidate
            input.oninput = handelClearValidate
        }
        
    }
    // xử lý khi blur
    function handelValidate(event) {
        var rules = formRules[event.target.name]
        var errorMessage
        for(var rule of rules) {
            errorMessage = rule(event.target.value)
            if(errorMessage) break
        }
        var parentElement = getParent(event.target,'.form-group')
        if(errorMessage) {
            parentElement.classList.add('invalid')
            parentElement.querySelector('.form-message').innerText = errorMessage
        }
        return !errorMessage
    }

    // xử lý khi nhập
    function handelClearValidate(event) {
        var parentElement = getParent(event.target,'.form-group')
        if(parentElement.classList.contains('invalid')) {
            parentElement.classList.remove('invalid')
            parentElement.querySelector('.form-message').innerText = ''

        } 
    }
    // xử lý submit form
    formElement.onsubmit = function(e) {
        e.preventDefault()
        var inputs = document.querySelectorAll('[name][rules]')
        var formValid = true
        for(const input of inputs) {
            var isValid = handelValidate({target: input})
            if(!isValid) {
                formValid = false
            }
        }
        if(formValid) {
            if(typeof _this.onSubmit === 'function') { // submit với js
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
                _this.onSubmit(formValues)
            } else { // submit mặc định (không có option.onSubmit)
                formElement.submit()
            }   
        }
       
    }
}