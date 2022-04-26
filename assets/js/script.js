
const mainSection =  document.getElementById("main");
const startContainer =  document.getElementById("banner");
const startBtn =  document.getElementById("startBtn");
// declear my question array
const questions = [
    {
        question:"what would you like to eat?",
        answers:["chicken","cake","drink","anything"],
        correctAnswer:"chicken"
},{
    
}]
const removeStartSection = () => {
    mainSection.removeChild(startContainer);
};
      
const renderQuestionSection = () => {
    // use HTML as guide and build in JS
    // append section to main
    // add click event listener on #question-section
  };

const startQuiz = () => {
    removeStartSection();
    // start timer
    // render timer section
    // render question section
    
  };
  
  // add event listeners
  // add document on load event listener
  // add start button click event listener
  
  startBtn.addEventListener("click",startQuiz);