EventLogger.initLogger();
console.log(LDA);
var text = TextExtract.getText();
// console.log(LDA(TextExtract.getText()));
 
var sentences = []

// Extract sentences.
text.forEach(text => {
    var match = text.match( /[^\.!\?]+[\.!\?]+/g );
    if(match) {
        sentences = sentences.concat(match);
    }
})

 
// Run LDA to get terms for 2 topics (5 terms each).
var result = LDA(sentences, 2, 5);

console.log(result);
