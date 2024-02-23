function compileSourceCode() {
    let sourceCode = document.getElementById("source-code");
    let sourceCodeLine = sourceCode.value.split("\n");
    let result = "";

    for (let i = 0; i < sourceCodeLine.length; i++) {
        result += sourceCodeLine[i] + "\n";
    }

    let downloadSource = document.createElement("a");

    downloadSource.setAttribute("download", "source.c");
    downloadSource.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(result));
    document.body.appendChild(downloadSource);
    downloadSource.click();
    document.body.removeChild(downloadSource);

    delete downloadSource;
}