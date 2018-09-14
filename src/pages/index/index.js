
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')

require('util/carousel')

require('./index.css')

var _util = require('util');
var keywordsTpl = require('./keywords.tpl')
var carouselTpl = require('./carousel.tpl')
var floorTpl = require('./floor.tpl')

var page = {
	keywords:[
		{item:[{name:'手机'},{name:"电脑"}]},
		{item:[{name:'女装'},{name:"连衣裙"}]},
		{item:[{name:'家电'},{name:"冰箱"}]},
		{item:[{name:'女装'},{name:"连衣裙"}]},
		{item:[{name:'童装'},{name:"童鞋"}]},
		{item:[{name:'食品'},{name:"小吃"}]},
		{item:[{name:'电器'},{name:"电脑"}]},
		{item:[{name:'电器'},{name:"相机"}]},
		{item:[{name:'游戏'},{name:"斗鱼"}]},
		{item:[{name:'娱乐'},{name:"小游戏"}]},
	],
	carousel:[
		{categoryId:'5b84b36c50f099037f316c64',image:require('images/carousel/carousel-01.jpg')},
		{categoryId:'5b84b36c50f099037f316c64',image:require('images/carousel/carousel-02.jpg')},
		{categoryId:'5b84b36c50f099037f316c64',image:require('images/carousel/carousel-03.jpg')}
	],
	floor:[
		{
			title:'F1 家用电器',
			item:[
				{image:require('images/flooter/flooter01-01.jpg'),text:'冰箱洗衣机',categoryId:'5b84b36c50f099037f316c64'},
				{image:require('images/flooter/flooter01-02.jpg'),text:'热水器',categoryId:'5b84b36c50f099037f316c64'},
				{image:require('images/flooter/flooter01-03.jpg'),text:'平板电视',categoryId:'5b84b36c50f099037f316c64'},
				{image:require('images/flooter/flooter01-04.jpg'),text:'空调',categoryId:'5b84b36c50f099037f316c64'},
				{image:require('images/flooter/flooter01-05.jpg'),text:'智能影音',categoryId:'5b84b36c50f099037f316c64'},
			]
		},	
		{
			title:'F2 智能数码',
			item:[
				{image:require('images/flooter/flooter02-01.jpg'),text:'相机频道',categoryId:'5b84b36c50f099037f316c64'},
				{image:require('images/flooter/flooter02-02.jpg'),text:'智能频道',categoryId:'5b84b36c50f099037f316c64'},
				{image:require('images/flooter/flooter02-03.jpg'),text:'单反相机',categoryId:'5b84b36c50f099037f316c64'},
				{image:require('images/flooter/flooter02-04.jpg'),text:'平衡车',categoryId:'5b84b36c50f099037f316c64'},
				{image:require('images/flooter/flooter02-05.jpg'),text:'汽车用品',categoryId:'5b84b36c50f099037f316c64'},
			]
		},
		{
			title:'F3 生活家电',
			item:[
				{image:require('images/flooter/flooter03-01.jpg'),text:'生活家电',categoryId:'5b84b36c50f099037f316c64'},
				{image:require('images/flooter/flooter03-02.jpg'),text:'日用家纺',categoryId:'5b84b36c50f099037f316c64'},
				{image:require('images/flooter/flooter03-03.jpg'),text:'厨具频道',categoryId:'5b84b36c50f099037f316c64'},
				{image:require('images/flooter/flooter03-04.jpg'),text:'个护健康',categoryId:'5b84b36c50f099037f316c64'},
				{image:require('images/flooter/flooter03-05.jpg'),text:'卫浴馆',categoryId:'5b84b36c50f099037f316c64'},
			]
		},					
	],
	init:function(){
		this.loadKeywords();
		this.loadCarousel();
		this.loadFloor();
	},
	loadKeywords:function(){
		var html = _util.render(keywordsTpl,{
			keywords:this.keywords
		});
		$('.keywords').html(html)
	},
	loadCarousel:function(){
		var html = _util.render(carouselTpl,{
			carousel:this.carousel
		})
		
		$('.carousel').html(html);

		var $caroulsel = $('.carousel').unslider({
			dots: true,
			keys: true
		});

		$('.arrow').on('click',function(){
			let direction = $(this).hasClass('next') ? 'next' : 'prev';
			$caroulsel.data('unslider')[direction]();
		})
	},
	loadFloor:function(){
		var html = _util.render(floorTpl,{
			floor:this.floor
		});
		$('.floor-wrap').html(html)
	},	
}

$(function(){
	page.init();
})