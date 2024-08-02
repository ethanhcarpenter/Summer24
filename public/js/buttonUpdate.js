const nav=document.getElementById("classButtons");
const config = { childList: true };
const callback = function(mutationsList, observer) {
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach(node => {
                node.addEventListener("click",()=>{
                    const parentWindow=window.top.document;
                    const iframe = parentWindow.getElementById("openPage")
                    iframe.setAttribute("src","../html/people.html")
                    fetch("http://localhost:3001/createPeople", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ id: node.id}),
                    });
                });
            });
        }
    }
};
const observer = new MutationObserver(callback);
observer.observe(nav, config);

