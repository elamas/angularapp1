function Category(){
	this.items = new Array();
}

Category.prototype =
{
	id : null,
	name : null,
	image : null,
	items: null,
	
	parseFromObject : function( obj ){
		this.id = obj.id;
		this.name = obj.name;
		this.image = obj.image;
		var item;
		for(var i in obj.items){
			item = new Item( obj.items[i] );
			if(item != null){
				this.items.push(item);
			}
			item = null;
		}
	},
	
	getItem : function(itemId){
		var item;
		for(var i in this.items){
			item = this.items[i];
			if(item.id == itemId){
				return item;
			}
		}
	}
	
}

