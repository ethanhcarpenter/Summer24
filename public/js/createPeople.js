function createPerson(firstname, surname, tests) {
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
    
    for(const i in tests){
        const test=tests[i]
        const testItem = document.createElement("div");
        testItem.setAttribute("class", "test-item");

        const testNameSpan = document.createElement("span");
        testNameSpan.innerText=test.name;

        const qList = document.createElement("div");
        qList.setAttribute("class", "question-list");

        for(const j in test.questions){
            const qm=test.questions[j]
            const qItem = document.createElement("div");
            qItem.setAttribute("class", "question-item");
            
            const question = document.createElement("span");
            question.innerText=qm.question;

            const mark = document.createElement("span");
            mark.innerText=qm.mark;

            qItem.appendChild(question);
            qItem.appendChild(mark);
            qList.appendChild(qItem);

        }
        testItem.appendChild(testNameSpan);
        testItem.appendChild(qList);
        testList.appendChild(testItem);
        




    }

    info.appendChild(personNameSpan);
    info.appendChild(newTestButton);
    outerDiv.appendChild(info);
    outerDiv.appendChild(testList);

    const peopleContainer = document.querySelector(".people-container");
    peopleContainer.appendChild(outerDiv);
}
window.createPerson = createPerson;


// document.addEventListener("DOMContentLoaded",async ()=>{

//     const response = await fetch("/getPeople");
//     const peopleData = await response.json();

//     console.log(peopleData);

// });








//courtesy of gpt
const tests = [
    {
        name: "Biology",
        questions: [
            { question: "What is the powerhouse of the cell?", mark: "4/5" },
            { question: "What is the process of photosynthesis?", mark: "3/6" },
            { question: "What are the components of DNA?", mark: "4/4" }
        ]
    },
    {
        name: "Physics",
        questions: [
            { question: "What is Newton's first law of motion?", mark: "5/5" },
            { question: "What is the speed of light?", mark: "4/4" },
            { question: "Explain the theory of relativity.", mark: "3/6" }
        ]
    },
    {
        name: "Chemistry",
        questions: [
            { question: "What is the chemical formula for water?", mark: "5/5" },
            { question: "What are the states of matter?", mark: "4/6" },
            { question: "Explain the periodic table.", mark: "4/4" }
        ]
    },
    {
        name: "Mathematics",
        questions: [
            { question: "What is the Pythagorean theorem?", mark: "4/5" },
            { question: "What is the quadratic formula?", mark: "5/5" },
            { question: "Explain the concept of calculus.", mark: "3/6" }
        ]
    },
    {
        name: "History",
        questions: [
            { question: "Who was the first President of the United States?", mark: "5/5" },
            { question: "What was the cause of World War I?", mark: "4/4" },
            { question: "Describe the French Revolution.", mark: "3/6" }
        ]
    }
];
createPerson("carl","marx",tests)