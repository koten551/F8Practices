const result = document.querySelector('.result')
const decreaseBtn = document.querySelector('.decrease')
const increaseBtn = document.querySelector('.increase')
const resetBtn = document.querySelector('.reset')

let counter = 0;
function setCounter(number) {
    result.innerText = number

        if(counter == 0) {
            result.style.color = '#333'
        }
        else if(counter > 0) {
            result.style.color = 'green'
        }
        else {
            result.style.color = 'red'
        }
}

decreaseBtn.onclick = function() {
    setCounter(--counter)
}

increaseBtn.onclick = function() {
    setCounter(++counter)
}

resetBtn.onclick = function() {
    counter = 0
    setCounter(counter)
}
