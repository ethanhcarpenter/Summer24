function showTest(test){
    const outerDiv=document.createElement("div");
    outerDiv.setAttribute("class","test-item");
    outerDiv.setAttribute("id",`${test.name}`)

    const info= document.createElement("div");
    info.setAttribute("class","test-info")

    const testNameSpan=document.createElement("div");
    testNameSpan.setAttribute("class","test-name");
    testNameSpan.innerText=test.name

    const changeTestButton=document.createElement("button");
    changeTestButton.setAttribute("class","change-test-button")
    changeTestButton.setAttribute("id",`${test.name} Button`)
    changeTestButton.innerText="Change Test"

    const qList=document.createElement("div");
    qList.setAttribute("class","question-list")

    for(const i in test.questions){
        const question=test.questions[i];
        const qItem=document.createElement("div");
        qItem.setAttribute("class","question-item");

        const questionSpan=document.createElement("span");
        questionSpan.innerText=question.question

        const mark = document.createElement("span");
        mark.innerText=question.mark;

        const feedbackList=document.createElement("div");
        feedbackList.setAttribute("clas","feedback-list")

        qItem.appendChild(questionSpan);
        qItem.appendChild(mark);
        qList.appendChild(qItem);
    }
    info.appendChild(testNameSpan);
    info.appendChild(changeTestButton);
    outerDiv.appendChild(info);
    outerDiv.appendChild(qList);

    const testContainer=document.querySelector(".test-container");
    testContainer.appendChild(outerDiv);
}
window.showTest=showTest;






const test1 =
    {
        name: "Biology",
        questions: [
            { question: "What is the powerhouse of the cell?", mark: "5" },
            { question: "What is the process of photosynthesis?", mark: "6" },
            { question: "What are the components of DNA?", mark: "4" }
        ]
    };
const test2={
        name: "Physics",
        questions: [
            { question: "What is Newton's first law of motion?", mark: "5" },
            { question: "What is the speed of light?", mark: "4" },
            { question: "Explain the theory of relativity.", mark: "6" }
        ]
    };
const test3={
        name: "Chemistry",
        questions: [
            { question: "What is the chemical formula for water?", mark: "5" },
            { question: "What are the states of matter?", mark: "6" },
            { question: "Explain the periodic table.", mark: "4" }
        ]
    };
const test4={
        name: "Mathematics",
        questions: [
            { question: "What is the Pythagorean theorem?", mark: "5" },
            { question: "What is the quadratic formula?", mark: "5" },
            { question: "Explain the concept of calculus.", mark: "6" }
        ]
    };
const test5={
        name: "History",
        questions: [
            { question: "Who was the first President of the United States?", mark: "5" },
            { question: "What was the cause of World War I?", mark: "4" },
            { question: "Describe the French Revolution.", mark: "6" }
        ]
    };

    showTest(test1)
    showTest(test2)
    showTest(test3)
    showTest(test4)
    showTest(test5)