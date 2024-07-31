
function sizeBar(container,scrollbarID,main){
    const bar=document.getElementById(scrollbarID);
    const viewHeight=window.innerHeight;
    const totalHeight=container.scrollHeight;
    const scrollbarHeight=((viewHeight-40)**2)/totalHeight;
    if (totalHeight < viewHeight) {
        bar.style.display = 'none';
    } else {
        bar.style.display = 'block'; 
        bar.style.height = `${scrollbarHeight}px`;
    }
    if(bar.offsetTop>viewHeight){bar.style.top = `${viewHeight+20}px`;}
    let isDragging = false;
    let clickPosition=0;
    bar.addEventListener('mousedown', (e) => {
        container.style.userSelect = 'none';
        clickPosition = e.clientY - bar.getBoundingClientRect().top;
        isDragging = true;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
    function onMouseMove(e) {
        if (!isDragging) return;
        const barRect = bar.getBoundingClientRect();
        const mouseY = e.clientY;
        const barTop = barRect.top; 
        const difference = mouseY - clickPosition - barTop; 
        let top = bar.offsetTop + difference;
        let constrainedTop = Math.max(20, Math.min(viewHeight - scrollbarHeight - 20, top));
        bar.style.top = `${constrainedTop}px`;
        clickPosition = e.clientY - constrainedTop;
        let percentageMoved = (constrainedTop-20) / ((viewHeight-40) - scrollbarHeight);
        const scrollAmount = (totalHeight-viewHeight+20) * percentageMoved;
        main.scrollTo({
            top: scrollAmount,
            behavior: 'instant'
        });
    }  
    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
    function onMainScroll() {
        const scrollTop = main.scrollTop; 
        let percentageScrolled = scrollTop / (totalHeight - viewHeight + 20);
        let barTop = 20 + percentageScrolled * ((viewHeight - 40) - scrollbarHeight);
        bar.style.top = `${barTop}px`;
    }
    main.addEventListener('scroll', onMainScroll);
}
const container=document.querySelector(".people-container");
const main=document.querySelector(".main");


window.addEventListener("mouseup",()=>{
    container.style.userSelect="all";
});
const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            sizeBar(container,"scrollBarMain",main);
        }
    }
});

    setInterval(()=>{
        sizeBar(container,"scrollBarMain",main)
    },100)
    
    

observer.observe(container, { childList: true });
window.addEventListener("resize",()=>{
    sizeBar(container,"scrollBarMain",main)
});
document.addEventListener("DOMContentLoaded",()=>{
    sizeBar(container,"scrollBarMain",main)
});