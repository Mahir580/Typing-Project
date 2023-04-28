const typingText = document.querySelector(".typing-text p")
InputField = document.querySelector(".box .input-field")
timerTag = document.querySelector(".time span b")
mistakeTag = document.querySelector(".mistake span")
wpmTag = document.querySelector(".wpm span")
cpmTag = document.querySelector(".cpm span")
RestartBtn = document.querySelector("button")

let Timer, maxTime = 30, timeLeft = maxTime, charIndex = mistakes = isTyping = 0;

function randomParagraph(){

    let RandomIndex = Math.floor(Math.random() * paragraphs.length)
    typingText.innerHTML = "";
    paragraphs[RandomIndex].split("").forEach(span =>{
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    
    })
    typingText.querySelectorAll("span")[0].classList.add("active")

    document.addEventListener("keydown", () => InputField.focus())
    typingText.addEventListener("click", () => InputField.focus())
}

function initTyping(){
    const characters = typingText.querySelectorAll("span");
    let TypedChar = InputField.value.split("")[charIndex];
    
    if(charIndex < characters.length - 1 && timeLeft > 0){
        if(!isTyping){
            timer = setInterval(initTimer, 1000)
            isTyping = true;
        }
    
        if(TypedChar == null){
            charIndex--;
            if(characters[charIndex].classList.contains("incorrect")){
                mistakes--;
            }
            characters[charIndex].classList.remove("correct","incorrect")
    
        }else{
    
            if(characters[charIndex].innerText === TypedChar){
                characters[charIndex].classList.add("correct")
            }else{
                mistakes++;
                characters[charIndex].classList.add("incorrect")
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"))
        characters[charIndex].classList.add("active")
    
        
        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60)
    
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
        wpmTag.innerText = wpm;
    }
    else{
        InputField.value = ""
        clearInterval(timer)
            document.querySelector(".content").style.top = "0%"; 
    }
}

function initTimer(){
    if(timeLeft > 0){
        timeLeft--;
        timerTag.innerText = timeLeft;
    }else{
        clearInterval(timer)
    }
}
function resetTest(){
    randomParagraph()
    InputField.value = "";
    clearInterval(timer);
    timeLeft = maxTime, charIndex = mistakes = isTyping = 0;
    timerTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = 0;
    wpmTag.innerText = 0;
}

randomParagraph();
InputField.addEventListener("input", initTyping)
RestartBtn.addEventListener("click", resetTest)