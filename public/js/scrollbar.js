function sizeBar(container, scrollbarID, main) {
    const embedDocument=iframe.contentDocument;
    let bar = scrollbarID === "scrollBarMain2" ? embedDocument.getElementById(scrollbarID) : document.getElementById(scrollbarID);

    function updateScrollbar() {
        const viewHeight = main.getBoundingClientRect().height +1;
        const totalHeight = container.scrollHeight;
        const scrollbarHeight = ((viewHeight - 40) ** 2) / totalHeight;
        bar.style.top = `${main.getBoundingClientRect().top+20}px`;
        
        
        if (totalHeight <= viewHeight) {
            bar.style.display = 'none';
        } else {
            bar.style.display = 'block';
            

            bar.style.height = `${scrollbarHeight}px`;
        }

        if (bar.offsetTop > viewHeight) {
            bar.style.top = `${viewHeight + 20}px`;
        }
    }

    let isDragging = false;
    let clickPosition = 0;

    function onMouseMove(e) {
        if (!isDragging) return;
        const barRect = bar.getBoundingClientRect();
        const mouseY = e.clientY;
        const barTop = barRect.top;
        const bottomOffset=(scrollbarID!=="scrollBarMain")?60:20;
        const topOffest=(scrollbarID!=="scrollBarMain")?20:main.getBoundingClientRect().top+20;
        const difference = mouseY - clickPosition - barTop;
        let top = bar.offsetTop + difference;
        
        
        let constrainedTop = Math.max(topOffest, Math.min(main.getBoundingClientRect().top + main.getBoundingClientRect().height - parseFloat(bar.style.height) - bottomOffset, top));
        console.log(constrainedTop)
        bar.style.top = `${constrainedTop}px`;
        clickPosition = e.clientY - constrainedTop;
        constrainedTop=constrainedTop-main.getBoundingClientRect().top
        let percentageMoved = (constrainedTop - 20) / ((main.getBoundingClientRect().height - 20-bottomOffset) - parseFloat(bar.style.height));
        
        const scrollAmount = (container.scrollHeight - main.getBoundingClientRect().height + bottomOffset) * percentageMoved;
        
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

        const bottomOffset=(scrollbarID!=="scrollBarMain")?60:20;
        let percentageScrolled = scrollTop / (container.scrollHeight - main.getBoundingClientRect().height + bottomOffset);
        let barTop = 20 + percentageScrolled * ((main.getBoundingClientRect().height - 20-bottomOffset-main.getBoundingClientRect().top) - parseFloat(bar.style.height));
        let newConstainedTop= ((percentageScrolled)*((main.getBoundingClientRect().height - 20-bottomOffset)-+parseFloat(bar.style.height)))+20
        newConstainedTop=newConstainedTop+main.getBoundingClientRect().top
        console.log(newConstainedTop)
        bar.style.top = `${newConstainedTop}px`;

    }

    function onMouseDown(e) {
        container.style.userSelect = 'none';
        clickPosition = e.clientY - bar.getBoundingClientRect().top;
        isDragging = true;
        if (scrollbarID === "scrollBarMain2") {
            embedDocument.addEventListener('mousemove', onMouseMove);
            embedDocument.addEventListener('mouseup', onMouseUp);
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    bar.addEventListener('mousedown', onMouseDown);
    main.addEventListener('scroll', onMainScroll);
    window.addEventListener('resize', updateScrollbar);
    document.addEventListener('DOMContentLoaded', updateScrollbar);

    const observer = new MutationObserver(updateScrollbar);
    observer.observe(container, { childList: true });

    updateScrollbar();
}
//sidebar
const main = document.querySelector(".scrollArea");
const container = document.getElementById("classButtons");



const iframe=document.getElementById("openPage")
iframe.addEventListener("load",(e)=>{
    if(iframe.getAttribute("src").endsWith("people.html")){
        const embedDocument=iframe.contentDocument;
        const peopleMain=embedDocument.querySelector(".main")
        const peopleContainer=embedDocument.querySelector(".people-container")
        sizeBar(peopleContainer,"scrollBarMain2",peopleMain)
    }
});

//people



window.addEventListener("mouseup", () => {
    container.style.userSelect = "all";
});

document.addEventListener("DOMContentLoaded", () => {
    sizeBar(container, "scrollBarMain", main);
});


