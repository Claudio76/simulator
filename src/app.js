new Vue({
    el: "#prestamos",

    created: function(){
        this.$http.get("./src/config/properties.json").then(response =>{
            var data = response.body;
            this.tnaConvenio = data.tnaConvenio;
            this.tnaOutConvenio = data.tnaOutConvenio;
            this.temIvaConvenio = data.temIvaConvenio;
            this.temIvaOutConvenio = data.temIvaOutConvenio;
            console.log(response.body);
        });
    },

    data: {
        textTest : "Texto de prueba para VueJs",
        tnaConvenio: 2,
        tnaOutConvenio: 2,
        temIvaConvenio: 3,
        temIvaOutConvenio: 3,
        cuotaMensualConv: 4,
        cuotaMensualOutConv: 4,
        seguroConvenio: 5,
        seguroOutConvenio: 5,
        capitalSolic: 1000,
        sueldoBruto: 10000,
        plazo:2,
        convenio: 0,
        outConvenio: 0,
        cantSueldBrutoConvenio: 6,
        cantSueldBrutoOutConvenio: 7
    },

    methods:{
        validarCapitalSolicitadoConv: function(){
            let capitalMaximo = this.sueldoBruto * cantSueldBrutoConvenio;
            if(capitalMaximo < this.capitalSolic){
                return true;
            }else{
                return false;
            }
        },

        validarCapitalSolicitadoOutConv: function(){
            let capitalMaximo = this.sueldoBruto * cantSueldBrutoOutConvenio;
            if(capitalMaximo < this.capitalSolic){
                return true;
            }else{
                return false;
            }
        },

        validarImporteConvenio: function(){
            //let importeMensual = (1 + (tnaConvenio / 12)) * (this.capitalSolic / this.plazo);
        },

        validarImporteOutConvenio: function(){},

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

        validarCapitalSolicitadoOutConv: function(){
            let capitalMaximo = this.sueldoBruto * cantSueldBrutoOutConvenio;
            if(capitalMaximo < this.capitalSolic){
                return true;
            }else{
                return false;
            }
        }
        
    }
});