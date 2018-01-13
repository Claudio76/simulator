new Vue({
    el: "#prestamos",

    created: function(){
        this.$http.get("./src/config/properties.json").then(response =>{
            var data = response.body;
            this.tnaConvenio = 23;
            console.log(response.body);
        });
    },

    data: {
        textTest : "Texto de prueba para VueJs",
        tnaConvenio: 2
    },

    methods:{}
});