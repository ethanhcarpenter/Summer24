const nav=document.getElementById("classButtons");
const embed=document.getElementById("openPage");
const config = { childList: true };
const callback = function(mutationsList, observer) {
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach(node => {
                node.addEventListener("click",()=>{
                    embed.setAttribute("src",`html/${node.id}.html`)
                });
            });
        }
    }
};
const observer = new MutationObserver(callback);
observer.observe(nav, config);
