document.addEventListener('DOMContentLoaded', (event) => {
    const peopleItems = document.querySelectorAll('.person-item');
    const testItems = document.querySelectorAll('.test-item');

    const addTestButtons = document.querySelectorAll('.add-test-button');
    addTestButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            
        });
    });
    
    peopleItems.forEach(personItem => {
        personItem.addEventListener('click', (e) => {

            const testList = personItem.querySelector('.test-list');
            if (testList) {
                const isVisible = testList.style.display === 'block';
                testList.style.display = isVisible ? 'none' : 'block';
                
                if (!isVisible) {
                    const allQuestionLists = personItem.querySelectorAll('.question-list');
                    allQuestionLists.forEach(questionList => {
                        questionList.style.display = 'none';
                    });
                }
            }
        });
    });

    testItems.forEach(testItem => {
        testItem.addEventListener('click', (e) => {
            e.stopPropagation(); 
            const questionList = testItem.querySelector('.question-list');
            if (questionList) {
                const isVisible = questionList.style.display === 'block';
                questionList.style.display = isVisible ? 'none' : 'block';
            }
        });
    });
});
