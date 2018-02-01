var PRICE=9.99;

new Vue({
    el : '#app',
    data : {
        total : 0,
        items : [
            {id: 1, title : 'Item 1'},
            {id: 2, title : 'Item 2'},
            {id: 3, title : 'Item 3'},
            {id: 4, title : 'Item 4'}
        ],
        cart : []
    },
    methods :{
        addItem : function(index){
            //this.cart.push(this.items[index]);
            this.total += 9.29;
            var item = this.items[index];
            var found = false;
            for( var k=0; k<this.cart.length; k++){
                if(this.cart[k].id == item.id){
                    found = true;
                    this.cart[k].qty++;
                }
            }
            if(!found){
                this.cart.push({
                    id : item.id,
                    title : item.title,
                    qty : 1,
                    price : PRICE
                });
            }
        },
        inc : function(item){

        },
        dec : function(item){

        }
    },

    filters : {
        currency : function(value){
            return '$'.concat(value.toFixed(2));
        }
    }
});