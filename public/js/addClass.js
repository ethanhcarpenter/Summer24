const form=document.querySelector("form");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const fd=new FormData(form);
    const urlEncoded=new URLSearchParams(fd).toString();
    fetch("http://localhost:3001/addClass",{
        method:"POST",
        body:fd,
        
    })
    const className=document.getElementById("newClassName").value;
    const parentWindow=window.top.document;
    const navbar=parentWindow.getElementById('classButtons');
    const newButton=parentWindow.createElement("button");
    newButton.textContent=className.toUpperCase();
    newButton.id=className.toUpperCase();
    navbar.appendChild(newButton);
})



