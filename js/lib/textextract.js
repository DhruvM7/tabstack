var TextExtract = new function() {
    this.getText = function() {
        var text = [];
        document.querySelectorAll('p').forEach((p) => {
            text.push(p.innerText);
        })
    
        return text;
    }
};