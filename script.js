//Initial Page
let quizzContent = document.querySelector('.allQuizzes > ul')
let quizzes = []
let currentQuizz = {}

function getQuizzesApi (){
    let promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')

    promise.then(response => {
        quizzes = response.data;
        document.querySelector('.allQuizzes > ul').innerHTML = "";

        for (let i = 0; i < quizzes.length; i++){
            let image = quizzes[i].image
            let titulo = quizzes[i].title
            let id = quizzes[i].id
            document.querySelector('.allQuizzes > ul').innerHTML += `
                <li>
                    <div class="imageApi" onclick="playQuizz(this)" id="${id}" style="background-image: url('${image}')">
                        <div class="degrade">
                            <h4>${titulo}</h4>
                        </div>

                    </div>
                </li>
            `
        }
    })
}
getQuizzesApi ()

function playQuizz(quizz){
    let start = document.querySelector('.initialPage');
    start.classList.add("invisible");
    let pageTwo = document.querySelector('.quizzPage')
    pageTwo.classList.remove("invisible");

    const quizzId = quizz.getAttribute("id")

    let promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzId}`)
    
    promise.then(response => {
        currentQuizz = response.data
        startQuizz()
    })
}

function startQuizz(){
    document.querySelector('.quizzPage').innerHTML = `
        <ul class="quizzTitle" style="background-image: url(${currentQuizz.image})">
            <div class="opacityFilter">
                <h1>
                    ${currentQuizz.title}
                </h1>
            </div>
        </ul>
    `
    let quizzOptions = currentQuizz.questions;
    
    for (let i=0; i < quizzOptions.length; i++){
        
        let questionBox = `
            <div class="quizzQuestion" style="background-color:${quizzOptions[i].color}">
                <h1>${quizzOptions[i].title}</h1>
            </div>
        `

        let answerBox = "";
        const answer = quizzOptions[i].answers;

        for (let i=0; i < answer.length; i++){
            if (answer[i].isCorrectAnswer){
                answerBox += `
                <li onclick="showAnswer(this)" class="options">
                    <img src="${answer[i].image}"/>
                    <h1 class="right">${answer[i].text}</h1>
                </li>
                `
            }else{
                answerBox += `
                <li onclick="showAnswer(this)" class="options">
                    <img src="${answer[i].image}"/>
                    <h1 class="wrong">${answer[i].text}</h1>
                </li>
                `
            }


        }
        
        document.querySelector(".quizzPage").innerHTML += `
            <div class="questionBox">
                ${questionBox}
                <ul>${answerBox}</ul>
            </div>
        `
    }

    document.querySelector(".quizzPage").innerHTML+=`
        <div class="resultBox invisible">
            <div class="percentage">
                <h1>este é o seu resultado</h1>
            </div>

            <div class="textImage">
                <div class="resultImage"></div>
                    <div class="resultText">
                        <h6>Parabéns</h6>
                    </div>
            </div>
        </div>
            <button onclick="restartQuizz()" class="restart">
                <h1>Reiniciar quizz</h1>
            </button>
            <button onclick="backHome()" class="back"
                <h1>Voltar pra home</h1>
            </button>
    `
}

function showAnswer(clickQuestion){

    clickQuestion.parentNode.querySelector(".right").classList.add("green");

    let wrong = clickQuestion.parentNode.querySelectorAll(".wrong")

    for(let i=0; i < wrong.length; i++){
        wrong[i].classList.add("red");
    }

    let clickQuestions = clickQuestion.parentNode.querySelectorAll(".options")

    for(let i=0; i < clickQuestions.length; i++){
        clickQuestions[i].classList.add("opacity");
        clickQuestions[i].removeAttribute("onclick");
    }

    clickQuestion.classList.remove("opacity");
    
    scrollar()

}

function scrollar(){
    setTimeout(function (){
        let questions = document.querySelectorAll(".questionBox");
        for (let i=0; i < questions.length; i++){
            let containsGreen = questions[i].querySelector("li").classList.contains("green");
            let containsRed = questions[i].querySelector("li").classList.contains("red");

            if(!(containsGreen || containsRed)){
                questions[i].scrollIntoView();
                break;
            }
        }

        quizzResult()

    }, 2000);
}

function quizzResult(){
    let ask = document.querySelectorAll(".questionBox")
    let answerRight = document.querySelectorAll(".questionBox .green")

    if (ask.length === answerRight.length){
       document.querySelector(".resultBox").classList.remove("invisible");
       document.querySelector(".resultBox").scrollIntoView();

       let hitPercentage = calculateScore();

       let levels = currentQuizz.levels;
       let userLevel;

       for (let i=0; levels.length-1; i++){
           if (hitPercentage < levels[i+1].minValue){
               userLevel = levels[i];
           }

           if (hitPercentage === 100){
               userLevel = levels[levels.length-1];
           }
       }

       document.querySelector(".percentage > h1").innerHTML =`
        ${hitPercentage}% de acerto: ${userLevel.title}.
       `
       document.querySelector(".textImage > .resultText").innerHTML=`
        <img src="${userLevel.image}">
       `
       document.querySelector(".textImage > .resultText > h6").innerHTML=`
        ${userLevel.text}
       `
    }
}

function calculateScore(){
    let anyQuestion = document.querySelector(".questionBox").length;
    let anyQuestionWrong = document.querySelector(".questionBox .green .opacity").length;
    let anyQuestionRight = (anyQuestion - anyQuestionWrong);


    let percentageRight = Math.floor(100*anyQuestionRight/anyQuestion);
    return percentageRight;
}

function backHome(){
    document.querySelector(".quizzPage").classList.add("invisible");
    document.querySelector(".initialPage").classList.remove("invisible");
}

function restartQuizz(){
    document.querySelector(".quizzPage").scrollIntoView();

    startQuizz()
}

function GoCreateQuizz(){
    let DomCreateQuizz =`
    <div class="ContentCreate">
    <h1>Comece pelo começo</h1>
    <form> 
    <div class="BoxItensCreate">
        <input class="TitleCreate" type="text" minlength="20" maxlength="65" placeholder="Título do seu quizz" required>
        <input class="UrlCreate" pattern="https?://.+" type="url" placeholder="URL da imagem do seu quizz"required>
        <input class="QuestionCountCreate"  type="number" min="3" value="3" step="1" placeholder="Quantidade de perguntas do quizz" required>
        <input class="LevelCountCreate" type="number" min="2" value="2" step="1" placeholder="Quantidade de níveis do quizz" required>
    </div>
    </form> 
    <div class="ButtonContinue" onclick="GoQuestionCreate()"> 
    <h3>"Prosseguir pra criar as perguntas" </h3>
    </div>
</div>`;
    document.querySelector(".PageContent").innerHTML = DomCreateQuizz;
}

let TitleCreateItem;
let UrlCreateItem;
let QuestionCountCreateItem;
let LevelCountCreateItem;

function GoQuestionCreate(){

    if (ValidateInput()){

    TitleCreateItem = document.querySelector('input.TitleCreate').value
    UrlCreateItem = document.querySelector('input.UrlCreate').value
    QuestionCountCreateItem = document.querySelector('input.QuestionCountCreate').value
    LevelCountCreateItem = document.querySelector('input.LevelCountCreate').value


    if (TitleCreateItem==null){
        alert("Insira um valor válido para o Título");
    } else if (UrlCreateItem==null){
        alert('Insira um valor válido para a imagem'); 
    }else {

    let HearderQuestionCreate = `       
    <div class="ContentCreate">
        <h1>Crie suas perguntas</h1>
            <form> 

            </form>

    </div>`;
    document.querySelector(".PageContent").innerHTML = HearderQuestionCreate


    for (let i=1; i<=QuestionCountCreateItem; i++){
        let DomCreateQuestion =
        `<fieldset class="BoxItensCreate">
            <div class="LabelInfoCreate">
                    <h1>Pergunta ${i}</h1>
                    <ion-icon name="create-outline"  onclick="OpenQuestionForm(this.parentElement)"></ion-icon>
            </div>
            <div class="QuestionNOTCreating">
                <input class="QuestionTitleCreate" type="text" minlength="20" placeholder="Texto da pergunta" required>
                <input class="QuestionColorCreate" type="color" pattern="#([a-zA-Z0-9]){6}" placeholder="Cor de fundo da pergunta">
 
                <div class="LabelInfoCreate">
                    <h1>Resposta correta</h1>
                    <ion-icon name="create-outline"></ion-icon>
                </div>
                <input class="CorrectAnswerCreate"  type="text" placeholder="Resposta correta" required>
                <input class="CorrectURLCreate" type="url" pattern="https?://.+" placeholder="URL da imagem">

                <div class="LabelInfoCreate">
                    <h1>Respostas incorretas</h1>
                    <ion-icon name="create-outline"></ion-icon>
                </div>

                <input class="IncorrectAnswerCreate"  type="text" placeholder="Resposta incorreta" required>
                <input class="IncorrectURLCreate" type="url" pattern="https?://.+" placeholder="URL da imagem">

                <input class="IncorrectAnswerCreate" type="text" placeholder="Resposta incorreta">
                <input class="IncorrectURLCreate" type="url" pattern="https?://.+" placeholder="URL da imagem">

                <input class="IncorrectAnswerCreate" type="text" placeholder="Resposta incorreta">
                <input class="IncorrectURLCreate" type="url" pattern="https?://.+" placeholder="URL da imagem">
            </div>
        </fieldset>`

        document.querySelector("form").innerHTML += DomCreateQuestion
    }
    let DOMSubmit = `
    <div class="ButtonContinue" onclick="GoLevelCreate()"> 
    <h3>"Prosseguir pra criar os níveis" </h3>
    </div>
    `;
    document.querySelector("form").innerHTML += DOMSubmit
}}}

let CorrectAnswers = [];
let IncorrectAnswers = [];
let CorrectAnswersURL = [];
let IncorrectAnswersURL = [];
let QuestionTitle = [];
let QuestionColor = [];

function GoLevelCreate(){
    if (ValidateInput()){

        let QuestionTitleCollection = document.getElementsByClassName("QuestionTitleCreate");
        for (let i=0; i<QuestionTitleCollection.length;i++){
            QuestionTitle.push(QuestionTitleCollection[i].value)
        }
        let QuestionColorCollection = document.getElementsByClassName("QuestionColorCreate");
        for (let i=0; i<QuestionColorCollection.length;i++){
            QuestionColor.push(QuestionColorCollection[i].value)
        }

        let CorrectAnswersCollection = document.getElementsByClassName("CorrectAnswerCreate");
        for (let i=0; i<CorrectAnswersCollection.length;i++){
            CorrectAnswers.push(CorrectAnswersCollection[i].value)
        }
        let CorrectURLCollection = document.getElementsByClassName("CorrectURLCreate");
        for (let i=0; i<CorrectURLCollection.length;i++){
            CorrectAnswersURL.push(CorrectURLCollection[i].value)
        }

        let fieldsetSelector = document.getElementsByTagName("fieldset");

        for (let i=0; i<fieldsetSelector.length;i++){
            let incorrecturlalternatives =[];
            let incorrectalternatives =[];
            let IncorrectAnswersCollection = fieldsetSelector[i].getElementsByClassName("IncorrectAnswerCreate");
            let IncorrectURLAnswersCollection = fieldsetSelector[i].getElementsByClassName("IncorrectURLCreate");



            for (let j=0; j<IncorrectAnswersCollection.length;j++){
                if(IncorrectAnswersCollection[j].value!=""){
                    incorrectalternatives.push(IncorrectAnswersCollection[j].value) 
                    incorrecturlalternatives.push(IncorrectURLAnswersCollection[j].value)          
                }
        
            }
            IncorrectAnswers.push(incorrectalternatives)
            IncorrectAnswersURL.push(incorrecturlalternatives)
        }
    

        let HearderLevelCreate = `
        <div class="ContentCreate">
            <h1>Agora, decida os níveis!</h1>
            <form> 
            </form>

    </div>`;
    document.querySelector(".PageContent").innerHTML = HearderLevelCreate

    for (let i=1; i<=LevelCountCreateItem; i++){
        let DomCreateLevel =
        `<fieldset class="BoxItensCreate">
            <div class="LabelInfoCreate">
                    <h1>Nível ${i}</h1>
                    <ion-icon name="create-outline"  onclick="OpenQuestionForm(this.parentElement)"></ion-icon>
            </div>
            <div class="QuestionNOTCreating">
                <input class="LevelTitleCreate" type="text" minlength="10" placeholder="Título do nível" required>
                <input class="LevelPercentageCreate" type="number" min="0" max="100" placeholder="% de acerto mínima" required>
                <input class="LevelURLCreate" type="url" pattern="https?://.+" placeholder="URL da imagem do nível" required>
                <input class="LevelDescriptionCreate" type="text" minlength="30" placeholder="Descrição do nível" required>
            </div>
        </fieldset>`

        document.querySelector("form").innerHTML += DomCreateLevel
    }
    let DOMSubmit = 
    `
    <div class="ButtonContinue" onclick="FinishCreate()"> 
    <h3>"Finalizar o quizz" </h3>
    </div>
    `;
    document.querySelector("form").innerHTML += DOMSubmit
    }



}
let LevelTitle =[];
let LevelPercentage=[];
let LevelURL=[];
let LevelDescription=[];

function FinishCreate(){
    let LevelPercentageCheck=[];
    let LevelPercentageCollection = document.getElementsByClassName("LevelPercentageCreate");
    for (let i=0; i<LevelPercentageCollection.length;i++){
        LevelPercentageCheck.push(LevelPercentageCollection[i].value)
    }


    if (ValidateInput() && LevelPercentageCheck.includes("0")){
        LevelPercentage = LevelPercentageCheck;
        let LevelTitleCollection = document.getElementsByClassName("LevelTitleCreate");
        for (let i=0; i<LevelTitleCollection.length;i++){
            LevelTitle.push(LevelTitleCollection[i].value)
        }

        let LevelURLCollection = document.getElementsByClassName("LevelURLCreate");
        for (let i=0; i<LevelURLCollection.length;i++){
            LevelURL.push(LevelURLCollection[i].value)
        }

        let LevelDescriptionCollection = document.getElementsByClassName("LevelDescriptionCreate");
        for (let i=0; i<LevelDescriptionCollection.length;i++){
            LevelDescription.push(LevelDescriptionCollection[i].value)
        }

    CreateQuizzAPI();
     PostCreateQuizz = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', QuizzDefinition);

    PostCreateQuizz.then(PostCreateQuizzSucess);
    PostCreateQuizz.catch(PostCreateQuizzError);

}else if(!LevelPercentageCheck.includes("0")){
    alert("Pelo menos um nível deve ter 0% de percentual mínimo de acertos");
}
}
let IdQuizzCreated;
const LocalStorageUser = localStorage.getItem("id");
const ListIDStorage = JSON.parse(LocalStorageUser);

function PostCreateQuizzSucess(response){
    IdQuizzCreated = response.data.id
    let SerialListIDStorage =[];
    if (ListIDStorage!=null){
    ListIDStorage.push(IdQuizzCreated)
    SerialListIDStorage = JSON.stringify(ListIDStorage);
    } else{
    SerialListIDStorage = JSON.stringify([IdQuizzCreated]);
    }
    localStorage.setItem("ID", SerialListIDStorage);


    let HearderFinishCreate = `
    <div class="ContentCreate">
        <h1>Seu quizz está pronto!</h1>
        <div class="FinishCreate" style="background-image: url('${UrlCreateItem}')">
            <div class="FinishCreateTitle degrade">
                <h3>${TitleCreateItem}</h3>
            </div>
        </div>

        <div class="ButtonContinue" onclick="CreateQuizzAPI()"> 
            <h3>"Finalizar o quizz" </h3>
        </div>
        <div onclick="GoBackHome()">
            <h1>Voltar pra home</h1>
        </div>
    </div>`;
document.querySelector(".PageContent").innerHTML = HearderFinishCreate
}

function PostCreateQuizzError(response){
    alert("Aconteceu um erro. Por favor tente de novo :(", response)
}
let QuizzDefinition;
function OpenQuestionForm(element){
    const openedquestion = document.querySelectorAll('.QuestionCreating');
    if(openedquestion != null){
        for (let i=0; i< openedquestion.length;i++){
        openedquestion[i].classList.remove("QuestionCreating")
        openedquestion[i].classList.add("QuestionNOTCreating")
        }
    }
    element.nextElementSibling.classList.add("QuestionCreating")
    element.nextElementSibling.classList.remove("QuestionNOTCreating")
}

function CreateQuizzAPI(){
    let QuestionsAPI=[];
    let LevelsAPI =[];
    for (i=0;i<QuestionCountCreateItem;i++){
        let APIIncorrect=[];
        let IncorrectAnswersItem=IncorrectAnswers[i];
        let IncorrectAnswersURLItem=IncorrectAnswersURL[i];

        APIIncorrect.push(
            {
                text: `${CorrectAnswers[i]}`,
                image: `${CorrectAnswersURL[i]}`,
                isCorrectAnswer: true
            }
        )

        for(j=0;j<IncorrectAnswersItem.length;j++){
            APIIncorrect.push(
            
                    {
                        text: `${IncorrectAnswersItem[j]}`,
                        image: `${IncorrectAnswersURLItem[j]}`,
                        isCorrectAnswer: false
                    }
            )
        }

        QuestionsAPI.push(
        {

        title: `${QuestionTitle[i]}`,
                color: `${QuestionColor[i]}`,
                answers: APIIncorrect
        }
        )
    }

    for (i=0;i<LevelCountCreateItem;i++){

        LevelsAPI.push( {
            title: `${LevelTitle[i]}`,
            image: `${LevelURL[i]}`,
            text: `${LevelDescription[i]}`,
            minValue: LevelPercentage[i]
        }
        )

    }
    QuizzDefinition =
    {
        title: `${TitleCreateItem}`,
        image: `${UrlCreateItem}`,
        questions: QuestionsAPI,
        levels: LevelsAPI
    }
    
    return QuizzDefinition;
}

function ValidateInput(){

    let AllInputs= document.getElementsByTagName('input')

    let valid=true;
    let i=0;
    while (i<AllInputs.length && valid===true){
        const inpObj = AllInputs[i];

        if (!inpObj.checkValidity()) {
            if (!inpObj.parentElement.classList.contains("QuestionCreating")){
                let openedquestion = document.querySelectorAll('.QuestionCreating');
                for (let n=0; n< openedquestion.length;n++){
                    openedquestion[n].classList.remove("QuestionCreating")
                    openedquestion[n].classList.add("QuestionNOTCreating")
                    }
                inpObj.parentElement.classList.add("QuestionCreating")
                inpObj.parentElement.classList.remove("QuestionNOTCreating")
            }
            valid=false;
            alert(inpObj.validationMessage);
         } 
            i+=1;
        } 
    return valid;
}

function GoBackHome(){
    window.location.reload()
}