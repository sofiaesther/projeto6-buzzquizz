function GoCreateQuizz(){
    let DomCreateQuizz =`
    <div class="ContentCreate">
    <h1>Comece pelo começo</h1>
    <div class="BoxItensCreate">
        <input class="TitleCreate" type="text" placeholder="Título do seu quizz">
        <input class="UrlCreate" type="text" placeholder="URL da imagem do seu quizz">
        <input class="QuestionCountCreate" type="text" placeholder="Quantidade de perguntas do quizz">
        <input class="LevelCountCreate" type="text" placeholder="Quantidade de níveis do quizz">
    </div>
    <div class="ButtonContinue" onclick="GoQuestionCreate()">
        <h3>Prosseguir pra criar perguntas</h3>
    </div>
</div>`;
    document.querySelector(".PageContent").innerHTML += DomCreateQuizz;
}
function GoQuestionCreate(){
    
}