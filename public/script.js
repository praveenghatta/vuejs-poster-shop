
var PRICE=9.99;
var LOAD_NUM = 10;

new Vue({
    el : '#app',
    data : {
        total : 0,
        results : [],
        items : [],
        cart : [],
        newSearch : 'anime',
        lastSearch:'',
        loading : false,
        price : PRICE
    },
    methods :{
        appendItems : function(){
            if(this.items.length < this.results.length){
                var append = this.results.slice(this.items.length, this.items.length+LOAD_NUM);
                this.items = this.items.concat(append);
            }
        },
        onSubmit:function(){
            this.loading = true;
            this.items = [];
            this.$http
                .get('/search/'.concat(this.newSearch))
                .then(function(res){
                    this.lastSearch = this.newSearch;
                    this.results = res.data;
                    this.appendItems();
                    this.loading = false;
                })
            ;
        },
        addItem : function(index){
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
    },

    mounted : function(){
        this.onSubmit();

        var vueInstance = this;
        var elem = document.getElementById('product-list-bottom');
        var watcher = scrollMonitor.create(elem);
        watcher.enterViewport(function(){
            vueInstance.appendItems();
        });
    }
});

