function Item(){

}

Item.prototype =
{
	id : null,
	name : null,
	image : null,
	price : null,
	
	parseFromObject : function( obj ){
		this.id = obj.id;
		this.name = obj.name;
		this.image = obj.image;
		this.price = obj.price;
	}
}

