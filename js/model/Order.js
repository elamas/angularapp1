function Order(){
	this.orderItems = new Array();
}

Order.prototype =
{
	orderItems : new Array(),
	
	parseFromObject : function( obj ){
		var orderItem;
		for(var i in obj){
			orderItem = new OrderItem( obj[i] );
			if(orderItem != null){
				this.orderItems.push(orderItem);
			}
			orderItem = null;
		}
	},
	
	addItem : function (item, quantity) {
		var foundOrderItem = null;
		for(var i in this.orderItems){
			var orderItem = this.orderItems[i];
			if (orderItem.item.id == item.id) {
				foundOrderItem = orderItem;
				break;
			}
		}
		if (foundOrderItem != null) {
			foundOrderItem.quantity = quantity;
		} else {
			var newOrderItem = new OrderItem();
			newOrderItem.item = item;
			newOrderItem.quantity = quantity;
			this.orderItems.push(newOrderItem);
		}
	},
	
	removeItem : function (item) {
		console.log("[Order - removeItem]item: " + item);
		console.log("[Order - removeItem]item.id: " + item.id);
		var index = -1;
		for(var i in this.orderItems){
			var orderItem = this.orderItems[i];
			console.log("[Order - removeItem]orderItem: " + orderItem);
			console.log("[Order - removeItem]orderItem.item: " + orderItem.item);
			console.log("[Order - removeItem]orderItem.item.id: " + orderItem.item.id);
			console.log("[Order - removeItem]orderItem.item.id == item.id: " + (orderItem.item.id == item.id));
			if (orderItem.item.id == item.id) {
				index = i;
				break;
			}
		}
		console.log("[Order - removeItem]index: " + index);
		if (index != -1) {
			this.orderItems.splice(index,1);
		}
	},
	
	getNumberOfItems : function () {
		var numItems = 0;
		for(var i in this.orderItems){
			var orderItem = this.orderItems[i];
			numItems += orderItem.quantity;
		}
		return numItems;
	},
	
	getTotalCost : function () {
		var totalCost = 0;
		for(var i in this.orderItems){
			var orderItem = this.orderItems[i];
			totalCost += orderItem.item.price * orderItem.quantity;
		}
		return totalCost;
	}, 

	containsItem : function (itemId) {
		for(var i in this.orderItems){
			var orderItem = this.orderItems[i];
			if (orderItem.item.id == itemId) {
				return true;
			}
		}
		return false;
	},

	getOrderItem : function (itemId) {
		for(var i in this.orderItems){
			var orderItem = this.orderItems[i];
			if (orderItem.item.id == itemId) {
				return orderItem;
			}
		}
		return null;
	},
	
	//cutre, es solo para test
	toJson : function () {	
		var json = '';
		json += '{';
		json += '"orderitems": ';
		json += JSON.stringify(this.orderItems);//esto mete atributos propios, mejor hacer un toJson propio de cada uno
		json += '}';
		return json;
	}
}