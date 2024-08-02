function sizeBar(container, scrollbarID, main) {
    const embedDocument=iframe.contentDocument;
    let bar = scrollbarID === "scrollBarMain2" ? embedDocument.getElementById(scrollbarID) : document.getElementById(scrollbarID);

    function updateScrollbar() {
        const viewHeight = window.innerHeight;
        const totalHeight = container.scrollHeight;
        const scrollbarHeight = ((viewHeight - 40) ** 2) / totalHeight;

        if (totalHeight < viewHeight) {
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
        const difference = mouseY - clickPosition - barTop;
        let top = bar.offsetTop + difference;
        const bottomOffset=(scrollbarID==="scrollBarMain2")?60:20;
        let constrainedTop = Math.max(20, Math.min(window.innerHeight - parseFloat(bar.style.height) - bottomOffset, top));
        bar.style.top = `${constrainedTop}px`;
        clickPosition = e.clientY - constrainedTop;
        let percentageMoved = (constrainedTop - 20) / ((window.innerHeight - 20-bottomOffset) - parseFloat(bar.style.height));
        const scrollAmount = (container.scrollHeight - window.innerHeight + bottomOffset) * percentageMoved;
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
        const bottomOffset=(scrollbarID==="scrollBarMain2")?60:20;
        let percentageScrolled = scrollTop / (container.scrollHeight - window.innerHeight + bottomOffset);
        let barTop = 20 + percentageScrolled * ((window.innerHeight - 20-bottomOffset) - parseFloat(bar.style.height));
        bar.style.top = `${barTop}px`;
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


