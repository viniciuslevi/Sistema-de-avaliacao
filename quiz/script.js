//------------------------LOAD------------------------------\\
    function start(){
        let xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function(){

            if(this.status == 200 && this.readyState == 4){
                 obj = JSON.parse(this.responseText);
                
                randomQuestions(obj);
           };
        };
        

        xmlhttp.open("GET", "questions.json", true);
        xmlhttp.send();
    };
    

    // CONSTANTS
    const questions = [];
    const AnswerChoices = [];
    const correctAnswer = [];

    let value = []; // Value will storage the numbers already randomized

    randomQuestions = (obj) => {

    
        while(value.length != obj.results.length) { //includes numbers not selected yet
            let random = Math.floor(Math.random() * obj.results.length);

            if(!value.includes(random)){
            value.push(random);
            questions.push(obj.results[random].question);
            //FAZER AS RESPOSTAS FICAREM ALEATORIAS
            AnswerChoices.push(obj.results[random].answer_choices);
            correctAnswer.push(obj.results[random].correct_answer);
    };
        };
        console.log(questions, AnswerChoices, correctAnswer, obj.results.length);

        writteAlternatives()
    };

//----------------------SHOW------------------------------\\
    let quest = document.querySelector('.question');
    let label = document.querySelectorAll('.answer label');
    let answ = document.querySelectorAll('.answer input');
    let plac = document.querySelector('.placar')
    let name = document.querySelector('#name').value

    let currentQuestion = 0;
    let pontuation = 0;
    
nextQuestion = () => {

    showPlacar() // The function showPlacar 'll be called just by the nextQuestion
    // isGameOver()
    writteAlternatives() // 'll be called by the randomQuestions, but also by the nextQuestion after showPlacar()
}
showPlacar = () => {
    for(i in label){

        if(answ[i].checked){
            if(label[i].textContent == correctAnswer[currentQuestion-1]){
                pontuation++
            };
        };
    };
    
    plac.innerHTML = pontuation
    console.log("The pontuation is: " + pontuation)
};

writteAlternatives = () => {
    quest.innerHTML = questions[currentQuestion]
    for( i in label){
        label[i].innerHTML = AnswerChoices[currentQuestion][i]
    };
    currentQuestion++
    console.log("Question "+currentQuestion)
};


            /*
//-------------------RESULTS------------------------------\\
    atEndOfTheDay = () => {
        console.log('hello world!')
        if(value.length == 3){
            if(confirm('OK para repetir as questões!')){
                value = [];
                currentQuestion = 0;

            };
        };
    };
            
            for(i in answ){
            if(answ[i].marked){
                console.log(correctAnswer)
                console.log(currentQuestion) 
                if(quest[i].textContent == correctAnswer[currentQuestion]){
                    pontuation++;
                }; 
            }
                console.log(pontuation)
            };*/

        // CHAMAR UMA OUTRA PAGINA
        isOver = () =>  {
            value = [];
            currentQuestion = 0;
            pontuation = 0;
            showPlacar()
        };
    
