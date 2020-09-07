document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("file-open").addEventListener("click", function(){
        const fileElem = document.createElement("input");
        fileElem.setAttribute("type", "file");
        fileElem.setAttribute("accept", "text/markdown");

        fileElem.addEventListener("change", function(e){
            const fileReader = new FileReader();
            fileReader.onload = function(){
                document.getElementById("document").innerHTML = `<div style="height:100%";>下にスクロール</div>` + DOMPurify.sanitize(marked(fileReader.result)) + `<div style="height:200px;"></div>`;
                renderMathInElement(document.getElementById("document"), {
                    delimiters: [
                        {
                            left:"$", right:"$", display: false
                        }
                    ]
                });
                document.getElementById("file-name").textContent = e.currentTarget.files[0].name;
            }
            fileReader.readAsText(e.currentTarget.files[0]);

        });

        fileElem.click();
    });
});