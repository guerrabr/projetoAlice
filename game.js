const question = document.querySelector('#question');
const questionImage = document.querySelector('#questionImage');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const professbarfull = document.querySelector('#professbarfull');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Ácido etanóico e metanoato de metila são isômeros de:',
        image: '/img/preto.png',
        choice1:'Função',
        choice2:'Cadeia',
        choice3: 'Posição',
        choice4: 'Geométrica',
        answer:2,
    },
    {
        question: 'Qual o tipo de isomeria existente entre as estruturas abaixo?',
        image: '/img/2.jpg',
        choice1:'Função',
        choice2:'Cadeia',
        choice3: 'Posição',
        choice4: 'Óptica',
        answer:3,
    },
    {
        question: 'As estruturas abaixo possuem diferença em seus radicais que caracterizam serem isômeros de:',
        image: '/img/3.jpg',
        choice1:'Função',
        choice2:'Cadeia',
        choice3: 'Posição',
        choice4: 'Óptica',
        answer:4,
    },
    {
        question: 'Os dois compostos abaixo são um par de isômeros:',
        image: '/img/4.jpg',
        choice1:'Cis – Trans',
        choice2:'E – Z',
        choice3: 'D – L',
        choice4: 'D2 – L2',
        answer:1,
    },
    {
        question: 'Qual o nome do composto abaixo? ',
        image: '/img/5.jpg',
        choice1:'Z-3 metil penteno-2',
        choice2:'E-3 metil penteno-2',
        choice3: 'Cis-3 metil penteno-2;',
        choice4: 'Trans-3 metil penteno-2',
        answer:3,
    },
    {
        question: 'Quantos Carbonos assimétricos e isômeros ópticos ativos a figura abaixo possui?',
        image: '/img/6.jpg',
        choice1:'3 e 8',
        choice2:'4 e 16',
        choice3:'2 e 4',
        choice4:'1 e 2',
        answer:1,
    },
    {
        question: 'Quantos isômeros ópticos ativos e inativos a estrutura abaixo possui?',
        image: '/img/7.jpg',
        choice1:'2 e 1',
        choice2:'2 e 2',
        choice3:'4 e 4',
        choice4:'8 e 4',
        answer:2,
    },
    {
        question: 'Qual o tipo de isomeria mostrado abaixo? ',
        image: '/img/8.jpg',
        choice1:'Tautomeria',
        choice2:'Metameria',
        choice3:'Cis – Trans',
        choice4:'E – Z',
        answer:1,
    },
    {
        question: 'Marque a alternativa em que os compostos apresentam isomeria espacial:',
        image: '/img/9.png',
        choice1:'I e II',
        choice2:'II e III',
        choice3:'I e IV',
        choice4:'II e IV',
        answer:2,
    },
    {
        question: 'A formula C4H8 possui alguns isômeros. A sequência correta de cima para baixo é:',
        image: '/img/10.jpg',
        choice1:'1,2,3,4',
        choice2:'2,1,4,3',
        choice3:'1,3,2,4',
        choice4:'3,2,1,4',
        answer:4,
    },
    {
        question: 'O par de compostos abaixo possui a isomeria do tipo:',
        image: '/img/11.jpg',
        choice1:'Tautomeria',
        choice2:'Metameria',
        choice3:'Cadeia',
        choice4:'Função',
        answer:2,
    },
    {
        question: 'Quantos isômeros estruturais e geométricos são previstos com a formula C3H5Cl?',
        image: '/img/preto.png',
        choice1:'2',
        choice2:'5',
        choice3:'3',
        choice4:'4',
        answer:2,
    },
    {
        question: 'A substituição de um H por um etil em um C secundário do butano resulta em um isômero do:',
        image: '/img/preto.png',
        choice1:'2-metilbutano',
        choice2:'2-metilpentano',
        choice3:'3-metilpentano',
        choice4:'hexano',
        answer:3,
    },
    {
        question: 'Em relação as substâncias I e II assinale a alternativa correta?',
        image: '/img/14.jpg',
        choice1:'I e II tem carbonos quirais',
        choice2:'I e II são isômeros de função',
        choice3:'I e II podem formar ligações de hidrogênio; ',
        choice4:'Somente I admite isômeros ópticos',
        answer:1,
    },
    {
        question: 'Isômeros são compostos:',
        image: '/img/preto.png',
        choice1:'De mesma formula molecular e estrutural;',
        choice2:'De mesma formula estrutural e molecular diferentes; ',
        choice3:'De mesma formula molecular e estrutural diferentes; ',
        choice4:'Mesma formula mínima',
        answer:2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 15

startGame = () =>{
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score)

        return window.location.assign('/end.html')
    }
    questionCounter ++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    professbarfull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question
    questionImage.src = currentQuestion.image // Adiciona a imagem da questão atual
    
    choices.forEach(choice =>{
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex,1)
    acceptingAnswers = true
}

choices.forEach(choice => {

    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() =>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },1000)
    })

})

incrementScore = num =>{
    score +=num
    scoreText.innerText = score
}

startGame()