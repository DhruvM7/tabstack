var TextExtract = new function() {
    this.getText = function() {
        var text = [];
        document.querySelectorAll('p').forEach((p) => {
            if (p.style.display !== "none")
                {
                    text.push(p.innerText);
                }
        });
        return text;
    }
};