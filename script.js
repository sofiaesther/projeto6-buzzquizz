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
    document.querySelector(".PageContent").innerHTML += DomCreateQuizz;
}

let TitleCreateItem;
let UrlCreateItem;
let QuestionCountCreateItem;
let LevelCountCreateItem;


function GoQuestionCreate(){
    let QuestionItemsValue = document.querySelectorAll("input").value;
    TitleCreateItem =QuestionItemsValue[0]
    UrlCreateItem =QuestionItemsValue[1]
    QuestionCountCreateItem = QuestionItemsValue[2]
    LevelCountCreateItem = QuestionItemsValue[3]

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
    document.querySelector(".PageContent").innerHTML += DomCreateQuizz;

    
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
  