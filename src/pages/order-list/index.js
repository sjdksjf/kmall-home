
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
		this.initPagination();
		this.loadorderList();
	},
	initPagination:function(){
		var _this = this;
		/*	
		var $pagination = $('.pagination-box');
		$pagination.on('page-change',function(e,value){
			_this.listParams.page = value;
			_this.loadorderList();
		});
		$pagination.pagination();
		*/
	},
	onload:function(){
		_side.render('order-center')
	},
	loadorderInfo:function(){
		/*
		_order.getUserInfo(function(order){
			var html = _util.render(tpl,order);
			$('.order-content').html(html)
		})
		*/
	},
	loadorderList:function(){

		var html = _util.render(tpl);
	    $('.order-box').html(html)
		/*
		this.listParams.categoryId 
		? (delete this.listParams.keyword)
		: (delete this.listParams.categoryId);
		*/
        /*
		_order.getorderList(this.Params,function(result){

			var html = _util.render(tpl,{
				list:list
			});
			$('.order-box').html(html)
             //分页
			$('.pagination-box').pagination('render',{
				current:result.current,
				total:result.total,
				pageSize:result.pageSize,
			})

		},function(msg){
			_util.showErrorMsg(msg)
		})
		*/ 
	}
}

$(function(){
	page.init();
})