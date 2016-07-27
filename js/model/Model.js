function Model(){
	this.categories = new Array();
	this.order = new Order();
}


Model.prototype =
{
	categories : null,
	order : null,
	
	parseFromObject : function( obj ){
		var category;
		for(var i in obj.categories){
			category = new Category( obj.categories[i] );
			if(category != null){
				this.categories.push(category);
			}
			category = null;
		}
		this.order = new Order(obj.order);
	},
	
	getCategory : function(categoryId){
		var category;
		for(var i in this.categories){
			category = this.categories[i];
			if(category.id == categoryId){
				return category;
			}
		}
	}
}