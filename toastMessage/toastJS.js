function toast(options) {
    const main = document.getElementById('toast');
    const icons = {
        success: 'fa-solid fa-circle-check',
        info: 'fa-solid fa-circle-info',
        warning: 'fa-solid fa-triangle-exclamation',
        error: 'fa-solid fa-triangle-exclamation'
    }
    if(main) {
        const toastElement = document.createElement('div');
        const delay = (options.duration /1000).toFixed(2);
        const timeOut = options.duration + 1100;
        //tự động xóa toast 
        const autoDeleteId =  setTimeout(function() {                              
                                        main.removeChild(toastElement);
                                },timeOut)

        // xử lý khi click vào toast close button
        toastElement.onclick = (e) => {
            const closeBtn = e.target.closest('.toast_close');
            if(closeBtn) {
                main.removeChild(toastElement);
                clearTimeout(autoDeleteId);
            }
            
        }


        //xử lý hoạt ảnh
        toastElement.style.animation = `slideIn ease 0.5s, fadeOut linear 1s ${delay}s forwards`
        toastElement.classList.add('toast', `toast--${options.type}`);
        toastElement.innerHTML = `
            <div class="toast_icon">
                <i class="${icons[options.type]}"></i>
            </div>
            <div class="toast_body">
                <div class="toast-title">${options.title}</div>
                <div class="toast-message">${options.message}</div>
            </div>
            <div class="toast_close">
                <i class="fa-solid fa-xmark"></i>
            </div>`;
         main.appendChild(toastElement);
    }
}