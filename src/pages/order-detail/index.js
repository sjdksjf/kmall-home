
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')

var _util = require('util');
var _order = require('service/order');
var _side = require('pages/common/side');

var tpl = require('./index.tpl')

var page = {
	Params:{	
		page:_util.getParamFromUrl('page') || 1,
	},
	init:function(){
		this.onload();
		this.loadorderInfo();
		this.loadorderList();
	},
	
	onload:function(){
		_side.render('order-center')
	},
	loadorderInfo:function(){
		_order.getUserInfo(function(order){
			var html = _util.render(tpl,order);
			$('.order-content').html(html)
		})
	},
	loadorderList:function(){
	   
		_order.getorderList(this.Params,function(result){

			var html = _util.render(tpl,{
				list:result
			});
			$('.order-box').html(html)
            
		},function(msg){
			_util.showErrorMsg(msg)
		}) 
	}
	
}

$(function(){
	page.init();
})