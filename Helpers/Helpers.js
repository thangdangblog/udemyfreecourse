const Helpers = {
  replaceSpecificCharacter(textInput) {
    let textOutput = textInput.split("&#8211;").join("-");
    textOutput = textOutput.split("&#8220;").join("\"");
    textOutput = textOutput.split("&#8221;").join("\"");
    return textOutput;
  },


  stripHtml(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

};

export default Helpers;