function app() {
    const $ = document.querySelector.bind(document)
    const container = $('.container')
    const btn = $('.click__me')
    const mainBar = $('.Center__bar p')
    const simpleHex = $('.simple__Hex')
    const randomColor = () => {
        let n = (Math.random() * 0xfffff * 1000000).toString(16);
        return '#' + n.slice(0, 6);
    }
    function SetColor(isColor) {
        container.style.backgroundColor = isColor
        mainBar.innerText = isColor
    }

    btn.onclick = () => {
        SetColor(randomColor())
    }
    simpleHex.onclick = () => {
        SetColor('#F1f5f8')
    }
}

app()