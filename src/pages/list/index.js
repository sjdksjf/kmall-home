
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')

require('./index.css')

//引入分页插件
require('util/pagination')

var _util = require('util');
var _product = require('service/product')

var tpl = require('./index.tpl')
 
var page = {
	listParams:{
		keyword:_util.getParamFromUrl('keyword') || '',
		categoryId:_util.getParamFromUrl('categoryId') || '',
		page:_util.getParamFromUrl('page') || 1,
		orderBy:_util.getParamFromUrl('orderBy') || 'default'
	},
	init:function(){
		this.initPagination();
		this.bindEvent();
		this.loadProductList();
	},
	initPagination:function(){
		var _this = this;
		var $pagination = $('.pagination-box');
		$pagination.on('page-change',function(e,value){
			_this.listParams.page = value;
			_this.loadProductList();
		});
		$pagination.pagination();
	},
	bindEvent:function(){
		var _this = this;
		$('.sort-item').on('click',function(){
			var $this = $(this);
			//如果点击的是默认排序
			if($this.hasClass('default')){
				if($this.hasClass('active')){
					return;
				}
				$this.addClass('active')
				.siblings('.sort-item')
				.removeClass('active');
				_this.listParams.orderBy = 'default'
			}
			//按价格排序
			else if($this.hasClass('price')){
				$this.addClass('active')
				.siblings('.sort-item')
				.removeClass('active');	
				if(!$this.hasClass('asc')){
					$this.addClass('asc')
					.removeClass('desc');
					_this.listParams.orderBy = 'price_asc';
				}else{
					$this.addClass('desc')
					.removeClass('asc');
					_this.listParams.orderBy = 'price_desc';					
				}			
			}
			_this.listParams.page = 1;
			_this.loadProductList();

		});
	},
	loadProductList:function(){
		this.listParams.categoryId 
		? (delete this.listParams.keyword)
		: (delete this.listParams.categoryId);
		_product.getProductList(this.listParams,function(result){
            $('.product-list-box').html('<div class="loaning-box"></div>');  
			var list = result.list.map(function(product){
			
				product.image = product.images.split(',')[0];
				/*
				if(product.images){
					product.image = product.images.split(',')[0];
				}else{
					product.image = require('images/product-default.jpg')
				}
				*/
				return product;
			});
			var html = _util.render(tpl,{
				list:list
			});

			$('.product-list-box').html(html)

			$('.pagination-box').pagination('render',{
				current:result.current,
				total:result.total,
				pageSize:result.pageSize,
			})

		},function(msg){
			_util.showErrorMsg(msg)
		}) 
	}
}

$(function(){
	page.init();
})