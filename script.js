function GoCreateQuizz(){
    let DomCreateQuizz =`
    <div class="ContentCreate">
    <h1>Comece pelo começo</h1>
    <div class="BoxItensCreate">
        <input class="TitleCreate" onchange="ValidateInput(this)" type="text" placeholder="Título do seu quizz">
        <input class="UrlCreate" onchange="ValidateInput(this)" type="url" placeholder="URL da imagem do seu quizz">
        <input class="QuestionCountCreate" onchange="ValidateInput(this)" type="number" min="3" value="3" step="1" placeholder="Quantidade de perguntas do quizz">
        <input class="LevelCountCreate" onchange="ValidateInput(this)" type="number" min="2" value="2" step="1" placeholder="Quantidade de níveis do quizz">
    </div>
    <div class="ButtonContinue" onclick="GoQuestionCreate()">
        <h3>Prosseguir pra criar perguntas</h3>
    </div>
</div>`;
    document.querySelector(".PageContent").innerHTML = DomCreateQuizz;
}

let TitleCreateItem;
let UrlCreateItem;
let QuestionCountCreateItem;
let LevelCountCreateItem;

function GoQuestionCreate(){

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
            <ul class="BoxItensCreate"> 
            </ul>
    </div>
    <div class="ButtonContinue" onclick="GoLevelCreate()">
        <h3>Prosseguir pra criar os níveis</h3>
    </div>`;
    document.querySelector(".PageContent").innerHTML = HearderQuestionCreate


    for (let i=1; i<=QuestionCountCreateItem; i++){
        let DomCreateQuestion =
        `<li>
            <div class="LabelInfoCreate">
                    <h1>Pergunta ${i}</h1>
                    <ion-icon name="create-outline"  onclick="OpenQuestionForm(this.parentElement)"></ion-icon>
            </div>
            <div class="QuestionNOTCreating">
                <input class="QuestionTitleCreate" onchange="ValidateInput(this)" type="text" placeholder="Texto da pergunta">
                <input class="QuestionColorCreate" onchange="ValidateInput(this)" type="color" placeholder="Cor de fundo da pergunta">
 
                <div class="LabelInfoCreate">
                    <h1>Resposta correta</h1>
                    <ion-icon name="create-outline"></ion-icon>
                </div>
                <input class="CorrectAnswerCreate" onchange="ValidateInput(this)" type="text" placeholder="Resposta correta">
                <input class="CorrectURLCreate" onchange="ValidateInput(this)" type="url" placeholder="URL da imagem">

                <div class="LabelInfoCreate">
                    <h1>Respostas incorretas</h1>
                    <ion-icon name="create-outline"></ion-icon>

                <input class="IncorrectAnswerCreate" onchange="ValidateInput(this)" type="text" placeholder="Resposta incorreta">
                <input class="IncorrectURLCreate" onchange="ValidateInput(this)" type="url" placeholder="URL da imagem">

                <input class="IncorrectAnswerCreate" onchange="ValidateInput(this)" type="text" placeholder="Resposta incorreta">
                <input class="IncorrectURLCreate" onchange="ValidateInput(this)" type="url" placeholder="URL da imagem">

                <input class="IncorrectAnswerCreate" onchange="ValidateInput(this)" type="text" placeholder="Resposta incorreta">
                <input class="IncorrectURLCreate" onchange="ValidateInput(this)" type="url" placeholder="URL da imagem">
            </div>
        </li>`

        document.querySelector("ul").innerHTML += DomCreateQuestion
    }

}}


function GoLevelCreate(){

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



function ValidateInput(element) {
    console.log(element.value);
    let elementContent = element.value;
    switch (element.type) {
        case "text":
            if (elementContent.length<20||elementContent.length>65){
                alert("Por favor insira um nome entre 20 e 65 caracteres");
            }
            break;
        
        case "url":
            regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (!regexp.test(elementContent))
        {
        alert("por favor insira uma URL válida");
        }
            break;
        
        case "number":
            if (elementContent<element.min){
                alert(`Por favor insira um valor acima de ${element.min}`);
            }
            break;
        default:
            break;
    }
  }

  function ValidateInputQuestion(element) {
    console.log(element.value);
    let elementContent = element.value;
    switch (element.type) {
        case "text":
            if (elementContent.length<20){
                alert("Por favor insira uma pergunta com pelo menos 20 caracteres");
            }
            break;
        
        case "url":
            regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (!regexp.test(elementContent))
        {
        alert("por favor insira uma URL válida");
        }
            break;

        
        case "color":
            if (elementContent[0] !== '#'|| elementContent.length!=7)){
                alert(`Por favor insira um valor acima de ${element.min}`);
            }
            break;
        default:
            break;
    }
  }
  