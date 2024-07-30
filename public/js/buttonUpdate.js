const nav=document.getElementById("classButtons");

const embed=document.getElementById("openPage");
const config = { childList: true };
const callback = function(mutationsList, observer) {
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach(node => {
                node.addEventListener("click",()=>{
                    const parentWindow=window.top.document;
                    const embed = parentWindow.getElementById("openPage")
                    fetch("http://localhost:3001/createPeople", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ id: node.id,embed: embed}),
                    });
                });
            });
        }
    }
};
const observer = new MutationObserver(callback);
observer.observe(nav, config);
