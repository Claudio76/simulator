Vue.component('modal', {
    template: '#modal-template'
  });

Vue.component('select2', {
    props: ['options', 'value'],
    template: '#select2-template',
    mounted: function () {
      var vm = this
      $(this.$el)
        .val(this.value)
        // init select2
        .select2({ data: this.options })
        // emit event on change.
        .on('change', function () {
          vm.$emit('input', this.value)
        })
    },
    watch: {
      value: function (value) {
        // update value
        $(this.$el).val(value)
      },
      options: function (options) {
        // update options
        $(this.$el).select2({ data: options })
      }
    },
    destroyed: function () {
      $(this.$el).off().select2('destroy')
    }
  })

new Vue({
    el: "#prestamos",

    created: function(){
        this.$http.get("./src/config/properties.json").then(response =>{
            var data = response.body;
            this.temIvaOutConvenio = data.temIvaOutConvenio;
            this.cantSueldBrutoConvenio = data.cantSueldBrutoConvenio;
            this.cantSueldBrutoOutConvenio = data.cantSueldBrutoOutConvenio;
            this.porcMaxSueldoConvenio = data.porcMaxSueldoConvenio;
            this.porcMaxSueldoOutConvenio = data.porcMaxSueldoOutConvenio;
            this.interestLower = data.interestLower;
            this.interestUpper = data.interestUpper;
            this.limitInterestLower = data.limitInterestLower;
        });
    },

    data: {
        textTest : "Texto de prueba para VueJs", //Este tiene que volar.
        
        //Vienen de properties.
        temIvaConvenio: 3,
        temIvaOutConvenio: 3,
        cantSueldBrutoConvenio: 6,
        cantSueldBrutoOutConvenio: 7,
        porcMaxSueldoConvenio: 0,
        porcMaxSueldoOutConvenio: 0,

        interestLower : 0.1,
        interestUpper : 0.2,
        limitInterestLower : 24,

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
        montoOutConvenioStatus: '',
        tnaConvenioScreen: Number.parseFloat(0.435 * 100).toFixed(2),

        selected:''
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
            if(Number.parseFloat(this.valorCuota) < Number.parseFloat(this.topeMaxConvenio)){
                return this.importeValidConv = true;
            }else{
                return this.importeValidConv = false;
            }
        },

        importeOutConvIsValid: function(){
            if(Number.parseFloat(this.valorCuota) < Number.parseFloat(this.topeMaxOutConvenio)){
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

    watch:{
        plazo: function(){
            if(this.plazo <= this.limitInterestLower){
                this.tnaConvenioScreen = Number.parseFloat(this.interestLower * 100).toFixed(2);
                this.tnaOutConvenioScreen = Number.parseFloat(this.interestLower * 100).toFixed(2);
            }else{
                this.tnaConvenioScreen = Number.parseFloat(this.interestUpper * 100).toFixed(2);
                this.tnaOutConvenioScreen = Number.parseFloat(this.interestUpper * 100).toFixed(2);
            }
        }
    },

    computed:{
        interestAnual : function(){
            return this.tnaConvenioScreen / 100;
        },

        interestValue : function(){
            return this.interestAnual / 12;
        },

        power : function(){
            return Math.pow(1 + this.interestValue, this.plazo);
        },

        valorCuota:function(){
            return Number.parseFloat((this.capitalSolic * this.interestValue * this.power) / (this.power - 1)).toFixed(2);
        },

        totalIntereses:function(){
            return this.valorCuota * this.plazo - this.capitalSolic;
        },

        importeOutConvenio: function(){
            return Number.parseFloat(this.cuotaMensualConv = (1 + ((this.tnaOutConvenioScreen / 100) / 12)) * (this.capitalSolic / this.plazo)).toFixed(2);
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