
require('./index.css');
var _user = require('service/user')
var _cart = require('service/cart')
var _util = require('util');

var nav = {
	init:function(){
		this.bindEvent();
		this.loadUsername();
		this.loadeCartCount();
		return this;
	},
	bindEvent:function(){
		$('#logout').on('click',function(){
			_user.logout(function(result){
				window.location.reload();
			},function(message){
				_util.showErrorMsg(message)
			});
		});
	},
	loadUsername:function(){
		_user.getUsername(function(user){
			$('.not-login').hide();
			$('.login')
			.show()
			.find('.username')
			.text(user.username)
		})
	},
	loadeCartCount:function(){
		_cart.getCartCount(function(count){
			$('.nav-list .cart-num').text(count || 0)
		},function(msg){
			$('.nav-list .cart-num').text(0)
		})
	}
}

module.exports = nav.init();