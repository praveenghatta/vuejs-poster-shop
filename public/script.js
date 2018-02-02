var PRICE=9.99;

new Vue({
    el : '#app',
    data : {
        search : '',
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
        onSubmit:function(){
            console.log("Search: " + this.search);
            console.log(this.$http);
        },
        addItem : function(index){
            //this.cart.push(this.items[index]);
            this.total += 9.29;
            var item = this.items[index];
            var found = false;
            for( var k=0; k<this.cart.length; k++){
                if(this.cart[k].id == item.id){
                    found = true;
                    this.cart[k].qty++;
                    break;
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
            item.qty++;
            this.total += PRICE;
        },
        dec : function(item){
            item.qty--;
            this.total -= PRICE;
            if(item.qty <= 0){
                for(var p=0; p<this.cart.length; p++){
                    if(this.cart[p].id == item.id){
                        this.cart.splice(p, 1);
                        break;
                    }
                }
            }

        }
    },

    filters : {
        currency : function(value){
            return '$'.concat(value.toFixed(2));
        }
    }
});