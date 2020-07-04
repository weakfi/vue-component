(function(global){
    let $modal = document.querySelector('.modal');
    let $mask = document.querySelector('.modal-mask');
    function _initEl(){
        $mask = document.createElement('div');
        $mask.classList.add('modal-mask');
        $mask.innerHTML = `
            <div class="modal">
                <div class="modal-inner">
                    <div class="title"></div>
                    <div class="content"></div>
                </div>
            </div>
        `;
        $mask.addEventListener('click',(e) => {
            if(e.target === $mask){
                $mask.style.display = 'none';
            }
        });
        document.body.appendChild($mask);
        return $mask.querySelector('.modal');
    }
    function _enableDragDrop($el){
        let diffX = 0;
        let diffY = 0;
        let isDown = false;
        $el.addEventListener('mousedown',(e) => {
            diffX = e.x - $modal.offsetLeft;
            diffY = e.y - $modal.offsetTop;
            isDown = true;
            $el.style.cursor = 'move';
        });
        window.addEventListener('mousemove', (e) => {
            if(!isDown){
                return false;
            }
            let offsetX = e.x - diffX;
            let offsetY = e.y - diffY;
            offsetX = Math.max(offsetX,0);
            offsetX = Math.min(offsetX,window.innerWidth - $modal.offsetWidth);
            offsetY = Math.max(offsetY,0);
            offsetY = Math.min(offsetY,window.innerHeight - $modal.offsetHeight);
            $modal.style.left = offsetX + 'px';
            $modal.style.top = offsetY + 'px';
        });
        $el.addEventListener('mouseup', (e) => {
            isDown = false;
            $el.style.cursor = 'pointer';
        });
    }
    function dialog(args){
        const title = args.title || '';
        const content = args.content || '';
        let isInit = false;
        if(!$modal){
            $modal = _initEl();
            isInit = true;
        }
        // 先显示出来才能获取$modal元素的width/height
        $mask.style.display = 'block';
        const $title = $modal.querySelector(".title");
        const $content = $modal.querySelector(".content");
        // 初始化元素后默认居中显示，并且绑定拖拽事件
        if(isInit){
            let offsetLeft = (window.innerWidth - $modal.offsetWidth)/2;
            let offsetTop = (window.innerHeight - $modal.offsetHeight)/2;
            $modal.style.top = offsetTop + 'px';
            $modal.style.left = offsetLeft + 'px';
            _enableDragDrop($title);
        }
        $title.innerText = title;
        $content.innerText = content;
    }
    global.dialog = dialog;
})(window);
