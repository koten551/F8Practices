const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const tabs = document.querySelectorAll('.tag-item')
const panels = document.querySelectorAll('.tag-panel')
console.log(tabs,panels);
tabs.forEach((tab, index) => {
    tab.onclick = function() {
        alert('')
        console.log(this)
    }
})