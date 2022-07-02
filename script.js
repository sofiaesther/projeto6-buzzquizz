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
    <input type="submit" class="ButtonContinue" onclick="GoQuestionCreate()" value="Prosseguir pra criar perguntas"/>
    </form> 
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
    console.log( UrlCreateItem)
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
                <input class="QuestionColorCreate" type="color" pattern="#([a-zA-Z0-9]){6}" placeholder="Cor de fundo da pergunta" required>
 
                <div class="LabelInfoCreate">
                    <h1>Resposta correta</h1>
                    <ion-icon name="create-outline"></ion-icon>
                </div>
                <input class="CorrectAnswerCreate"  type="text" placeholder="Resposta correta" required>
                <input class="CorrectURLCreate" type="url" pattern="https?://.+" placeholder="URL da imagem" required>

                <div class="LabelInfoCreate">
                    <h1>Respostas incorretas</h1>
                    <ion-icon name="create-outline"></ion-icon>
                </div>

                <input class="IncorrectAnswerCreate"  type="text" placeholder="Resposta incorreta" required>
                <input class="IncorrectURLCreate" type="url" pattern="https?://.+" placeholder="URL da imagem" required>

                <input class="IncorrectAnswerCreate" type="text" placeholder="Resposta incorreta">
                <input class="IncorrectURLCreate" type="url" pattern="https?://.+" placeholder="URL da imagem">

                <input class="IncorrectAnswerCreate" type="text" placeholder="Resposta incorreta">
                <input class="IncorrectURLCreate" type="url" pattern="https?://.+" placeholder="URL da imagem">
            </div>
        </fieldset>`

        document.querySelector("form").innerHTML += DomCreateQuestion
    }
    let DOMSubmit = `
    <input type="submit" class="ButtonContinue" onclick="GoLevelCreate()" value="Prosseguir pra criar os níveis" >`;
    document.querySelector("form").innerHTML += DOMSubmit
}}}

const CorrectAnswers = [];
const IncorrectAnswers = [];
const CorrectAnswersURL = [];
const IncorrectAnswersURL = [];
const QuestionTitle = [];
const QuestionColor = [];

function GoLevelCreate(){
    if (ValidateInput()){

        let QuestionTitleCollection = document.getElementsByClassName(".QuestionTitleCreate");
        for (let i=0; i<QuestionTitleCollection.length;i++){
            CorrectAnswers.push(QuestionTitleCollection[i].value)
        }
        let QuestionColorCollection = document.getElementsByClassName(".QuestionColorCreate");
        for (let i=0; i<QuestionColorCollection.length;i++){
            QuestionColor.push(QuestionColorCollection[i].value)
        }

        let CorrectAnswersCollection = document.getElementsByClassName(".CorrectAnswerCreate");
        for (let i=0; i<CorrectAnswersCollection.length;i++){
            CorrectAnswers.push(CorrectAnswersCollection[i].value)
        }
        let CorrectURLCollection = document.getElementsByClassName(".CorrectURLCreate");
        for (let i=0; i<CorrectURLCollection.length;i++){
            CorrectAnswersURL.push(CorrectURLCollection[i].value)
        }

        let fieldsetSelector = document.getElementsByTagName("fieldset");

        for (let i=0; i< fieldsetSelector.length;i++){
            let incorrectalternatives =[];
            IncorrectAnswersCollection = fieldsetSelector[i].getElementsByClassName(".IncorrectAnswerCreate");
            for (let j=0; j<IncorrectAnswersCollection.length;j++){
                incorrectalternatives.push(IncorrectAnswersCollection[j].value)
            }
            IncorrectAnswers.push(incorrectalternatives)
        }

        for (let i=0; i< fieldsetSelector.length;i++){
            let incorrecturlalternatives =[];
            IncorrectURLAnswersCollection = fieldsetSelector[i].getElementsByClassName(".IncorrectURLCreate");
            for (let j=0; j<IncorrectURLAnswersCollection.length;j++){
                incorrecturlalternatives.push(IncorrectURLAnswersCollection[j].value)
            }
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
    let DOMSubmit = ` <input type="submit" class="ButtonContinue" onclick="FinishCreate()" value="Finalizar o quizz" >`;
    document.querySelector("form").innerHTML += DOMSubmit
    }

}

function FinishCreate(){
    console.log(CorrectAnswers,CorrectAnswersURL,IncorrectAnswers,IncorrectAnswersURL)
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