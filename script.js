let json 
//------------------------LOAD------------------------------\\
    function start(){
        let xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function(){

            if(this.status == 200 && this.readyState == 4){
                json = JSON.parse(this.responseText);
                
                randomQuestions(json);
           };
        };
        

        xmlhttp.open("GET", "questions.json", true);
        xmlhttp.send();
    };
    

    // CONSTANTS
    let questions = [];
    let AnswerChoices = [];
    let correctAnswer = [];

    let value = []; // Value will storage the numbers already randomized

    randomQuestions = (json) => {

    
        while(value.length != json.results.length) { //includes numbers not selected yet
            let random = Math.floor(Math.random() * json.results.length);

            if(!value.includes(random)){
            value.push(random);
            //FAZ A QUESTÃO FICAR ALEATORIA
            questions.push(json.results[random].question);
            //FAZ AS RESPOSTAS FICAREM ALEATORIAS
            AnswerChoices.push(json.results[random].answer_choices);
            correctAnswer.push(json.results[random].correct_answer);
    };
        };
        console.log(questions, AnswerChoices, correctAnswer, json.results.length);

        writteAlternatives()
    };

//----------------------SHOW------------------------------\\
    let quest = document.querySelector('.question');
    let label = document.querySelectorAll('.answer label');
    let answ = document.querySelectorAll('.answer input');
    let plac = document.querySelector('.placar')
    let name = document.querySelector('#name')

    //CONTADORES
    let currentQuestion = 0;
    let pontuation = 0;
    
nextQuestion = () => {
    showPlacar() // The function showPlacar 'll be called just by the nextQuestion
    // isGameOver()
    isItOver()
    writteAlternatives() // 'll be called by the randomQuestions, but also by the nextQuestion after showPlacar()
}
showPlacar = () => {
    for(i in label){

        if(answ[i].checked){
            if(label[i].textContent == correctAnswer[currentQuestion-1]){
                pontuation++;
            };
        };
    };
    
    plac.innerHTML = pontuation
    console.log("The pontuation is: " + pontuation)
};

writteAlternatives = () => {
    quest.innerHTML = questions[currentQuestion];
    for( i in label){
        label[i].innerHTML = AnswerChoices[currentQuestion][i];
    };
    currentQuestion++;
    console.log("Question "+currentQuestion);
};


            
//-------------------RESULTS------------------------------\\
    isItOver = () => {
        if(currentQuestion == json.results.length){
            if(confirm('OK para repetir as questões!')){
                value = [];
                currentQuestion = 0;
                pontuation = 0;
                 questions = [];
                 AnswerChoices = [];
                 correctAnswer = [];
                 value = [];
                    start();
                    showPlacar();
            };
        };
    };

    
