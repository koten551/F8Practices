function app() {
    const infomation = [
        {
             name: 'Susan Smith',
             job: 'web development',
             image: 'url(./image/dep-tua-tinh-dau-hot-girl-nga-lam-netizen-tan-chay-la-ai-hinh-2.jpeg)',
             details:"Sharpen your JavaScript skills by building 15 projects using plain JavaScript without frameworks. In this tutorial course, you will be taught step-by-step how to build JavaScript projects."
        },
        {   
            name: 'Farah',
            job: 'designer',
            image: 'url(./image/avt.jpg)',
            details:"I can't express how much you are helping my learning journey. I was feeling so frustrated not being able to grasp JavaScript concepts. This video is just amazing and can't thank you enough for sharing it. "
        },
        {
            name: 'Brian Smyth',
            job: 'Support',
            image: 'url(./image/girl-xinh-2-480x600.jpg)',
            details:"Really versatile lessons here. Thanks for the resource and high praise to John Smilga for the clear and concise, yet well-paced tutorials. 5-star rating!"
        }
    ]
    var count = 0;
    const prevBtn = document.querySelector('.prev')
    const nextBtn = document.querySelector('.next')
    const icon = document.querySelector('.icon')
    const nameElement = document.querySelector('.name')
    const jobElement = document.querySelector('.job')
    const detailsElement = document.querySelector('.details')
    const surpriseBtn = document.querySelector('.surprise')
    function setData(data) {
        icon.style.backgroundImage = data.image
        nameElement.innerText = data.name
        jobElement.innerText = data.job
        detailsElement.innerText = data.details
    }
    prevBtn.onclick = () => {
        if(count === 0 ) {
           count = infomation.length - 1 
        } else {
            --count
        }
        setData(infomation[count])
    }
    nextBtn.onclick = () => {
        if(count === infomation.length - 1) {
            count = 0
         } else {
             ++count
         }
        setData(infomation[count])
    }

    surpriseBtn.onclick = () => {
        let randomCount = Math.floor(Math.random() * infomation.length)
        while (randomCount === count) {
            randomCount = Math.floor(Math.random() * infomation.length)
        }      
        count = randomCount
        setData(infomation[count])
    }
}

app()