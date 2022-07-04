//Initial Page
let quizzContent = document.querySelector('.allQuizzes > ul')
let quizzes = []

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
                    <div class="imageApi" id="${id}" style="background-image: url('${image}')">
                        <div class="degrade">
                            <h4>${titulo}</h4>
                        </div>

                    </div>
                </li>
            `
        }
    })
}
getQuizzesApi();

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


    console.log (TitleCreateItem)
    console.log(UrlCreateItem)
    console.log(QuestionCountCreateItem)
    console.log(LevelCountCreateItem)

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
            console.log(IncorrectAnswersCollection, "incorrect collection");
            console.log(IncorrectURLAnswersCollection, "incorrect collection url");

            console.log(IncorrectAnswersCollection.length)
            for (let j=0; j<IncorrectAnswersCollection.length;j++){
                if(IncorrectAnswersCollection[j].value!=""){
                    console.log(IncorrectAnswersCollection[j].value, "incorrect collection j");
                    console.log(IncorrectURLAnswersCollection[j].value, "incorrect collection j");
                    incorrectalternatives.push(IncorrectAnswersCollection[j].value) 
                    incorrecturlalternatives.push(IncorrectURLAnswersCollection[j].value)          
                }
        
            }
            IncorrectAnswers.push(incorrectalternatives)
            IncorrectAnswersURL.push(incorrecturlalternatives)

            console.log(incorrectalternatives, "incorrect alt")
            console.log(incorrecturlalternatives,"inco url alt")
        }
        console.log(IncorrectAnswers, "incorrect")
        console.log(IncorrectAnswersURL,"inco url")
    

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

let QuizzFullAPI = CreateQuizzAPI()
const PostCreateQuizz = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', QuizzFullAPI)

PostCreateQuizz.then(PostCreateQuizzSucess);
PostCreateQuizz.catch(PostCreateQuizzError);

}else if(!LevelPercentageCheck.includes("0")){
    alert("Pelo menos um nível deve ter 0% de percentual mínimo de acertos");
}
}

function PostCreateQuizzSucess(){
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

function PostCreateQuizzError(){
    alert("Aconteceu um erro. Por favor tente de novo :(")

}
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
    let QuestionsAPI=``;
    let LevelsAPI=``;
    for (i=0;i<QuestionCountCreateItem;i++){
        QuestionsAPI+=`
        {

        title: "${QuestionTitle[i]}",
                color: "${QuestionColor[i]}",
                answers: [
        {
            text: "${CorrectAnswers[i]}",
            image: "${CorrectAnswersURL[i]}",
            isCorrectAnswer: true
        }
        
        `
        let IncorrectAnswersItem=IncorrectAnswers[i];
        let IncorrectAnswersURLItem=IncorrectAnswersURL[i];
        for(j=0;j<IncorrectAnswersItem.length;j++){
            QuestionsAPI+=`
            ,
                    {
                        text: "${IncorrectAnswersItem[j]}",
                        image: "${IncorrectAnswersURLItem[j]}",
                        isCorrectAnswer: false
                    }
            `
        }

        if (i+1!=(QuestionCountCreateItem)){
            QuestionsAPI+= `]},`
        }

    }


    for (i=0;i<LevelCountCreateItem;i++){
        if (i!==0){
            LevelsAPI+= `,`
        }
        LevelsAPI+= `{
            title: "${LevelTitle[i]}",
            image: "${LevelURL[i]}",
            text: "${LevelDescription[i]}",
            minValue: ${LevelPercentage[i]}
        }`


    }
    let QuizzDefinition =`
    {
        title: "${TitleCreateItem}",
        image: "${UrlCreateItem}",
        questions: [
            ${QuestionsAPI}
                ]}] ,
           
        levels: [
            ${LevelsAPI}
        ]
    }
    `
    return QuizzDefinition;
}

function ValidateInput(){

    let AllInputs= document.getElementsByTagName('input')

    let valid=true;
    let i=0;
    while (i<AllInputs.length && valid===true){
        const inpObj = AllInputs[i];
        console.log(inpObj)
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