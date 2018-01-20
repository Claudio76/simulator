Vue.component('modal', {
    template: '#modal-template'
  });

new Vue({
    el: "#prestamos",

    created: function(){
        this.$http.get("./src/config/properties.json").then(response =>{
            var data = response.body;
            this.tnaConvenio = data.tnaConvenio;
            this.tnaOutConvenio = data.tnaOutConvenio;
            this.temIvaConvenio = data.temIvaConvenio;
            this.temIvaOutConvenio = data.temIvaOutConvenio;
            this.cantSueldBrutoConvenio = data.cantSueldBrutoConvenio;
            this.cantSueldBrutoOutConvenio = data.cantSueldBrutoOutConvenio;
            console.log(response.body);
        });
    },

    data: {
        textTest : "Texto de prueba para VueJs", //Este tiene que volar.
        
        //Vienen de properties.
        tnaConvenio: 2,
        tnaOutConvenio: 2,
        temIvaConvenio: 3,
        temIvaOutConvenio: 3,
        cantSueldBrutoConvenio: 6,
        cantSueldBrutoOutConvenio: 7,

        cuotaMensualConv: 4,
        cuotaMensualOutConv: 4,

        seguroConvenio: 5, //Hay que calcularlo
        seguroOutConvenio: 5, //Hay que calcularlo

        showIcon: false,
        showModal: false,
        
        //Campos a completar por el usuario.
        capitalSolic: 1000, 
        sueldoBruto: 10000,
        plazo:2,

        convenio: 0,
        outConvenio: 0,

        montoConvenioStatus: '',
        montoOutConvenioStatus: ''
    },

    methods:{
        validarCapitalSolicitadoConv: function(){
            let capitalMaximo = this.sueldoBruto * this.cantSueldBrutoConvenio;
            if(capitalMaximo < this.capitalSolic){
                this.montoConvenioStatus = false;
            }else{
                this.montoConvenioStatus = true;
            }
        },

        validarCapitalSolicitadoOutConv: function(){
            let capitalMaximo = this.sueldoBruto * this.cantSueldBrutoOutConvenio;
            if(capitalMaximo < this.capitalSolic){
                this.montoOutConvenioStatus = false;
            }else{
                this.montoOutConvenioStatus = true;
            }
        },

        validar: function(){
            this.validarCapitalSolicitadoConv();
            this.validarCapitalSolicitadoOutConv();
            this.showIcon = true;
        }
    },

    computed:{
        importeConvenio: function(){
            return Number.parseFloat(this.cuotaMensualConv = (1 + (this.tnaConvenio / 12)) * (this.capitalSolic / this.plazo)).toFixed(2);
        },

        importeOutConvenio: function(){
            return Number.parseFloat(this.cuotaMensualConv = (1 + (this.tnaConvenio / 12)) * (this.capitalSolic / this.plazo)).toFixed(2);
        },

        tnaConvenioScreen: function(){
            return Number.parseFloat(this.tnaConvenio * 100).toFixed(2);
        },

        tnaOutConvenioScreen: function(){
            return Number.parseFloat(this.tnaOutConvenio * 100).toFixed(2);
        },

        calculaImporteMaximoConvenio: function(){
            return this.sueldoBruto * this.cantSueldBrutoConvenio;
        }
        
    }
});