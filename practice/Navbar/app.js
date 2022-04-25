const app = function() {
    const $ = document.querySelector.bind(document);
    const toggleBtn = $('.toggle')
    const navElement = $('.nav')
    const modar = $('.modar')
    toggleBtn.onclick = () => {
        navElement.classList.toggle('active') 
        modar.classList.toggle('enabled')
    }

    modar.onclick = () => {
        modar.classList.toggle('enabled')
        navElement.classList.toggle('active') 
    }
}

app()