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
            this.porcMaxSueldoConvenio = data.porcMaxSueldoConvenio;
            this.porcMaxSueldoOutConvenio = data.porcMaxSueldoOutConvenio;
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
        porcMaxSueldoConvenio: 0,
        porcMaxSueldoOutConvenio: 0,

        cuotaMensualConv: 4,
        cuotaMensualOutConv: 4,

        showIcon: false,
        showModal: false,
        importeValidConv: false,
        importeValidOutConv: false,
        
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
        capitalSoliConvIsValid: function(){
            let capitalMaximo = this.sueldoBruto * this.cantSueldBrutoConvenio;
            if(capitalMaximo < this.capitalSolic){
                this.montoConvenioStatus = false;
            }else{
                this.montoConvenioStatus = true;
            }
        },

        capitalSoliOutConvIsValid: function(){
            let capitalMaximo = this.sueldoBruto * this.cantSueldBrutoOutConvenio;
            if(capitalMaximo < this.capitalSolic){
                this.montoOutConvenioStatus = false;
            }else{
                this.montoOutConvenioStatus = true;
            }
        },

        importeConvIsValid: function(){
            if(Number.parseFloat(this.importeConvenio) < Number.parseFloat(this.topeMaxConvenio)){
                return this.importeValidConv = true;
            }else{
                return this.importeValidConv = false;
            }
        },

        importeOutConvIsValid: function(){
            if(Number.parseFloat(this.importeOutConvenio) < Number.parseFloat(this.topeMaxOutConvenio)){
                return this.importeValidOutConv = true;
            }else{
                return this.importeValidOutConv = false;
            }
        },
        
        validar: function(){
            this.capitalSoliConvIsValid();
            this.capitalSoliOutConvIsValid();
            this.importeConvIsValid();
            this.importeOutConvIsValid();
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
            return Number.parseFloat(this.sueldoBruto * this.cantSueldBrutoConvenio).toFixed(2);
        },

        seguroConv: function(){
            return Number.parseFloat((this.capitalSolic/100)* 0.5).toFixed(2);
        },

        seguroOutConv: function(){
            return Number.parseFloat((this.capitalSolic/100)* 0.5).toFixed(2);
        },

        topeMaxConvenio: function(){
            return Number.parseFloat((this.sueldoBruto / 100) * (this.porcMaxSueldoConvenio * 100)).toFixed(2);
        },

        topeMaxOutConvenio: function(){
            return Number.parseFloat((this.sueldoBruto / 100) * (this.porcMaxSueldoOutConvenio * 100)).toFixed(2);
        }
        
    }
});