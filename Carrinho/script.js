$(document).ready(function(){
    //recupera o carrinho do local storage
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

    //elemento da lista
    const listElement = $("#lista")

    //elemento de total
    const totalElement = $("#total")

    function exibirCarrinho(){
        listElement.empty()

        //variavel para acumular preco
        let totalPreco = 0

        //Iteracao sobre os elementos do carrinho
        $.each(carrinho, function(index, item){
            //cria um elemento de lista para cada item
            const listItem = $("<li>").text(
                `${item.descricao} - Preço: $${item.preco.toFixed(2)}`
            )

            const removeButton = $("<button>")
            .text("❌")
            .css("margin-left", "10px")
            .click(function(){
                removerItemDoCarrinho(index)
            })
            listItem.append(removeButton)
            listElement.append(listItem)
            totalPreco += item.preco;
        })
        totalElement.text(`Total: R$ ${totalPreco.toFixed(2)}`)
    }
    function removerItemDoCarrinho(index){
        carrinho.splice(index, 1)
        localStorage.setItem("carrinho", JSON.stringify(carrinho))
        exibirCarrinho()
    }

    exibirCarrinho()
})

function gerarDocumentoWord(){
    const listElement = document.getElementById("lista")
    const totalElement = document.getElementById("total")

    //clona a lista para evitar as modficacoes diretas na original
    const listaClone = listElement.cloneNode(true)

    //remover o botao de remove do word
    $(listaClone).find("button").remove()

    const listaHtml = listaClone.innerHTML
    const totalHtml = totalElement.innerHTML

    const conteudoHtml = `
        <html>
            <head>
            <meta charset="UTF-8" />
            <style>
                body{
                    display: "flex";
                    flex-direction: "column";
                    gap: "2vh";
                    justify-content: "center";
                    align-items: "center";

                }
                </style>
            </head>
            <body>
                <h1>PEDIDO CONFIRMADO</h1>
                <h3>Agradecemos a sua preferencia</h3>
                <br/>
                ${listaHtml}
                <br/><br/>
                ${totalHtml}
            </body>
        </html>
    `

    const blob = new Blob([conteudoHtml], {type: "application/msword" })
    const link = document.createElement("a")

    link.href = URL.createObjectURL(blob)
    link.download = "carrinho.doc";
    link.click();
    document.getElementById("pedido").style.display ="block"


}

function successClose(){
        $("#pedido").css("display", "none",)
}