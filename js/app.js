// DESENVOLVIDO POR: 
// 

const questionNumber = document.querySelector('.numeroPerguntas');
const questionText = document.querySelector('.perguntas');
const optionContainer = document.querySelector('.opcoes');
const indicadorResposta = document.querySelector(".indicador");

const resultBox =  document.querySelector(".resultado-box");
const quizBox =  document.querySelector(".quiz-box");

const homeBox =  document.querySelector('.homebox');


let questionCounter = 0;
let curretQuestion;
let avalableQuestion = [];
let avalableOptions = [];
let corretAnswers = 0;
let attemp = 0;


function setAvalableQuestion(){
	const totalquestions = quiz.length;

	for(let i = 0; i < totalquestions; i++) {
	 avalableQuestion.push(quiz[i]);
	}
	
}




function getNewQuestion(){
	questionNumber.innerHTML = 'Questão '+(questionCounter + 1); // +' de ' + quiz.length;


	const questionIndex = avalableQuestion[Math.floor(Math.random() * avalableQuestion.length)];
	curretQuestion = questionIndex;
	questionText.innerHTML = curretQuestion.q;

	const index1 = avalableQuestion.indexOf(questionIndex);

	avalableQuestion.splice(index1, 1);





	const optionLen = curretQuestion.options.length;
	
	for (let i = 0; i < optionLen; i++) {
		
		avalableOptions.push(i);
	}


	let animationDelay = 0.2;
		optionContainer.innerHTML = '';
	for (let i = 0; i <  optionLen; i++) {

		const optonIndex = avalableOptions[Math.floor(Math.random() * avalableOptions.length)];


		const index2 = avalableOptions.indexOf(optonIndex);

		avalableOptions.splice(index2, 1);
		const option = document.createElement("div");
		
		option.innerHTML = curretQuestion.options[optonIndex];
		option.id = optonIndex;
		option.className = "option";
		option.style.animationDelay = animationDelay + 's';
		animationDelay = animationDelay + 0.2;
		optionContainer.appendChild(option);
		option.setAttribute("onclick", "getResult(this)");

	}

	questionCounter++;
	
}

function getResult(element){
	const id = parseInt(element.id);



// Respostas se acertou ou não!
	if (id === curretQuestion.answer) {


		element.classList.add("correta");

		// adicionando indicador de resultado
		updateAnswerIndicator("correta");

		corretAnswers++;

	} 



	else {

		element.classList.add("Errada");
		// adicionando indicador de resultado
		updateAnswerIndicator("Errada");

		// se a resposta estiver errada, pinta a certa e sai do jogo!


		const optionLen = optionContainer.children.length;

		for (let i = 0; i < optionLen; i++){

			if(parseInt(optionContainer.children[i].id) === curretQuestion.answer){
				optionContainer.children[i].classList.add("correta");

				const bts1 =  document.querySelector('.s1');
				const bts2 =  document.querySelector('.s2');
				
				




				quizBoxs = setTimeout(function() {
				  quizBox.classList.add("hide");
				  
				}, 2000);


				resultBox = setTimeout(function() {
				  resultBox.classList.remove('hide');
				  quizResult();
				}, 2000);
			}
		}


	}
	attemp++;
	unclickableOptions();
}


// função para não selecionar duas

 	function unclickableOptions(){
 		const optionLen = optionContainer.children.length;

 		for (let i = 0; i < optionLen; i++) {
 			optionContainer.children[i].classList.add("already-answered");
 			

 		}
 	}

 	// função para indicar as questoes certas

 	function respostaCerta(){
 		indicadorResposta.innerHTML = '';
 		const totasPerguntas = quiz.length;

 		for (let i = 0; i < totasPerguntas; i++) {
 			const indicador = document.createElement("nav");
 			indicadorResposta.appendChild(indicador);
 		}
 	}
 	// funcao incorreta


 	function updateAnswerIndicator(markType){
 		indicadorResposta.children[questionCounter-1].classList.add(markType);

 	}

 	// Quando o jogo terminar.

	function next(){
		if(questionCounter === quiz.length) {
			console.log("quiz over");
			quizOver();
		}
		else{
			getNewQuestion();
		}
	}
	
	// CRIANDO A FUNÇÃO PARA TERMINAR O QUIZ
	function quizOver(){
		quizBox.classList.add("hide");
		resultBox.classList.remove('hide');
		quizResult();
	}


// Resultados
	function quizResult(){
		resultBox.querySelector(".total-acertados").innerHTML = '1'; 
		resultBox.querySelector(".total-attempt").innerHTML =  attemp;
		const percetagem = (corretAnswers/quiz.length)*100;
		resultBox.querySelector(".total-percentagens").innerHTML =  percetagem.toFixed(2) + '%';
	}

	// botao voltar

	function resetQuiz(){
		 questionCounter = 0;
		 corretAnswers = 0;
		 attemp = 0;
	}



	function repetir(){
		
		resultBox.classList.add('hide');

		quizBox.classList.remove("hide");
		resetQuiz();
		iniciarJogo();
	}



	function inicial(){
		resultBox.classList.add('hide');

		homeBox.classList.remove('hide');
		 resetQuiz();

	}

// Iniciar O Jogo



	function iniciarJogo(){
		// ocultar o jog
		homeBox.classList.add('hide');

		quizBox.classList.remove('hide');

		respostaCerta();

		setAvalableQuestion();

		getNewQuestion();
	}




//  window.onload = function(){

//  	respostaCerta();
// 	setAvalableQuestion();
// 	getNewQuestion();
// }