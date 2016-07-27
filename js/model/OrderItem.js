function OrderItem(){

}

OrderItem.prototype =
{
	item : null,
	quantity : null,
	
	parseFromObject : function( obj ){
		this.item = new Item(obj.item);
		this.quantity = obj.quantity;
	}
}