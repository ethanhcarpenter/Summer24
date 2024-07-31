
function sizeBar(){
    const a=document.getElementById("dfs");
    const container=document.querySelector(".people-container");
    const bar=document.querySelector(".custom-scrollbar");
    const viewHeight=window.innerHeight;
    const totalHeight=container.scrollHeight;
    const scrollbarHeight=(viewHeight**2)/totalHeight;
    if (totalHeight < viewHeight) {
        bar.style.display = 'none';
    } else {
        bar.style.display = 'block'; 
        bar.style.height = `${scrollbarHeight}px`;
    }
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
        const main = document.querySelector(".main");
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
}

function dragElement(elmnt) {
    var pos2 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    function dragMouseDown(e) {
      e.preventDefault();
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
      e.preventDefault();
      pos2 = pos4 - e.clientY;
      pos4 = e.clientY;
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    }
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }






window.addEventListener("resize",sizeBar);
window.addEventListener("mouseup",()=>{
    const container=document.querySelector(".people-container");
    container.style.userSelect="all";
});
document.addEventListener("DOMContentLoaded",sizeBar);