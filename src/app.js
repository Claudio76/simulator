new Vue({
    el: "#prestamos",

    ready: function(){
        this.$http.get("./src/config/properties.json").then(response =>{
            var data = response.body;
            console.log(response.body);
        });
    },

    data: {
        textTest : "Texto de prueba para VueJs",
        tnaconvenio: 2
    },

    methods:{}
});