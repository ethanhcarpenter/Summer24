document.addEventListener('DOMContentLoaded', (event) => {
    const testItems = document.querySelectorAll('.test-item');
    const qItems = document.querySelectorAll('.question-item');

    const addTestButtons = document.querySelectorAll('.change-test-button');
    addTestButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            
        });
    });
    
    testItems.forEach(testItem => {
        testItem.addEventListener('click', (e) => {

            const testList = testItem.querySelector('.question-list');
            if (testList) {
                const isVisible = testList.style.display === 'block';
                testList.style.display = isVisible ? 'none' : 'block';
                
                if (!isVisible) {
                    const allQuestionLists = testItem.querySelectorAll('.feedback-list');
                    allQuestionLists.forEach(questionList => {
                        questionList.style.display = 'none';
                    });
                }
            }
        });
    });

    qItems.forEach(qItem => {
        qItem.addEventListener('click', (e) => {
            e.stopPropagation(); 
            const questionList = qItem.querySelector('.feedback-list');
            if (questionList) {
                const isVisible = questionList.style.display === 'block';
                questionList.style.display = isVisible ? 'none' : 'block';
            }
        });
    });
});
