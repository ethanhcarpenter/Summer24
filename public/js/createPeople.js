function createPerson(firstname, surname) {
    const outerDiv = document.createElement("div");
    outerDiv.setAttribute("class", "person-item");
    outerDiv.setAttribute("id", firstname + " " + surname);

    const info = document.createElement("div");
    info.setAttribute("class", "person-info");

    const personNameSpan = document.createElement("span");
    personNameSpan.setAttribute("class", "person-name");
    personNameSpan.innerText = surname + ", " + firstname;

    const newTestButton = document.createElement("button");
    newTestButton.setAttribute("class", "add-test-button");
    newTestButton.setAttribute("id", firstname + " " + surname + " Button");
    newTestButton.innerText = "+ Test";

    const testList = document.createElement("div");
    testList.setAttribute("class", "test-list");

    info.appendChild(personNameSpan);
    info.appendChild(newTestButton);
    outerDiv.appendChild(info);
    outerDiv.appendChild(testList);

    const peopleContainer = document.querySelector(".people-container");
    peopleContainer.appendChild(outerDiv);
}

document.addEventListener("DOMContentLoaded", function() {
    for (let index = 0; index < 300; index++) {
        createPerson("John", "Doe");
    }
});
