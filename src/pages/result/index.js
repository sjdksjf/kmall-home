
require('pages/common/logo')
require('pages/common/footer')
require('./index.css')

var _util = require('util');

$(function(){
	var type = _util.getParamFromUrl('type') || 'default';

	if(type == 'payment'){
		var orderNo = _util.getParamFromUrl('orderNo');
		var href = $('.order-detail').attr('href');
		var newHref = href + orderNo;
		$('.order-detail').attr('href',newHref);
	}


	$("."+type).show();
})