const TypeWritter = function (txtElement, words, wait = 1000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = ''; //by default words which will be on the screen
    this.wordIndex = 0; //Index of words during the effect
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false; //Deleted words = false
}
// Type Method
TypeWritter.prototype.type = function () {
    //Current index of word
    const current = this.wordIndex % this.words.length;

    //Get full text of current word
    const fullTxt = this.words[current];

    //check if deleting
    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        //Add Character
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    //Insert Text Into Element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //Initial TypeSpeed
    let TypeSpeed = 100;
    if (this.isDeleting) {
        TypeSpeed /= 2;
    }

    //If Word is Complete
    if (!this.isDeleting && this.txt === fullTxt) {
        //make pause at the end
        TypeSpeed = this.wait;
        //Set isDeleting = true
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        //Move to next Word
        this.wordIndex++;
        //Pause before start typing
        TypeSpeed = 500;
    }


    setTimeout(() => this.type(), TypeSpeed)
}

//InIt on DOM load
document.addEventListener('DOMContentLoaded', init);

//init app
function init() {
    const txtElement = document.querySelector(".txt-type");
    const words = JSON.parse(txtElement.getAttribute('data-words')); //JSON is a method for parsing all the words
    const wait = txtElement.getAttribute('data-wait');

    //init typewriter
    new TypeWritter(txtElement, words, wait);
}