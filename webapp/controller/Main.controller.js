sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("revolucao.controller.Main", {
            onInit: function () {
                var ImageList = {
                    Images: [
                        {
                        }
                    ]
                };

                var ImageModel = new JSONModel(ImageList);

                this.getView().setModel(ImageModel, "ModeloImagem"); // Assim é feita a passagem de modelo para o controller
            },
            onPressBuscar: function(){
                //alert("Começou a revolução do SAP FIORI!");
                var oInputBusca = this.byId("inpBusca"); // 'o' indica OBJETO
                var sQuery = oInputBusca.getValue(); // 's' indica STRING
                //alert(sQuery);
                $.ajax({
                    //cabeçalho
                    url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI", // link da API
                    method: "GET",
                    async: true,
                    crossDomain: true,
                    jsonpCallback: "getJSON",
                    contentType: "application/json",
                    headers: { // sua licensa, conseguida via cadastro
                        "X-RapidAPI-Key": "fc6a7b9234mshaf7980dccd3b955p1cf28bjsnd8fb6f8d7e3e",
                        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                    },
                    //corpo
                    data:{
                        "q": sQuery, // input da tela
                        "pageNumber": 1,
                        "pageSize": 30,
                        "autoCorrect": true,
                        "safeSearch": true,
                    },
                    //retorno em caso de sucesso
                    success: function(data, textStatus){
                        var oImageModel = this.getView().getModel("ModeloImagem"); //Buscar a instancia do model
                        var oDadosImagem = oImageModel.getData();   // Buscar a referencia dos dados do modelo

                        oDadosImagem = { // passar vazio para os dados
                            Images:[],
                        };

                        oImageModel.setData(oDadosImagem);// atribuir dados vazios ao modelo
                        //debugger

                        var listaResultados = data.value; // atribuir os dados de retorno da busca a uma variavel
                        var newItem; // variavel de controle de itens de busca

                        for(var i = 0; i < listaResultados.length; i++ ){
                            newItem = listaResultados[i];
                            oDadosImagem.Images.push(newItem); // preenche a lista com os itens de retorno da busca
                        };

                        oImageModel.refresh();

                    }.bind(this), // atribuida ao controller
                    //retorno em caso de erro
                    error: function(data, textStatus){

                    }.bind(this), // atribuida ao controller
                });// fim $ajax
            }
        });
    });
