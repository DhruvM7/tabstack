var lda = require('./lda');

function getText() {
    var text = [];
    document.querySelectorAll('p').forEach((p) => {
        text.push(p.innerText);
    })

    return text;
}

function lda() {

}