<div class="detail-box">
	<h2 class="panel-header">订单详情</h2>
    <div class="pandel-body">
		<ul class="detail-item" data-detail-id="{{detail._id}}">
            <li class="order-orderNo">
	             <span>订单号：</span>
	             <span>5655413135</span>
            </li>
            <li class="order-payment">
	             <span>支付方法：</span>
	             <span>支付宝</span>
            </li>
            <li class="order-paymentType">
	             <span>支付金额：</span>
	             <span class="money">$108000</span>
            </li>
            <li class="order-state">
	             <span>支付状态：</span>
	             <span>未支付</span>
            </li>
            <li class="order-paymentType">
	             <span>收件人：</span>
	             <span>嘀嘀嘀</span>
            </li>
			<li class="product-dizhi">
				<span>收件地址：</span>
	            <span>河南六区 战神</span>
			</li>
			<li class="product-phone">
				<span>手机号：</span>
	            <span>13343604558</span>
			</li>
			<li class="order-payment">
				<a href="javascript:;" class="btn">继续购物</a>
				<a href="javascript:;" class="btn payment">到游戏中取货</a>
			</li>
		</ul>
	</div> 	
</div>
{{#notEmpty}}
<div class="panel">
	<h2 class="panel-header">商品清单</h2>
	<div class="pandel-body">
		<ul class="product-title clearfix">
			<li class="product-info">
				商品
			</li>
			<li class="product-price">
				单价
			</li>
			<li class="product-count">
				数量
			</li>
			<li class="product-totalPrice">
				小计
			</li>
		</ul>
		{{#cartList}}
		<ul class="product-item" data-product-id="{{product._id}}">
			<li class="product-info">
				<a href="./detail.html?productId={{product._id}}" class="link" target="_blank">
					<img src="{{product.image}}" alt="">
					<span>{{product.name}}</span>
				</a>
			</li>
			<li class="product-price">
				￥{{product.price}}
			</li>
			<li class="product-count">
				{{count}}
			</li>
			<li class="product-totalPrice">
				￥{{totalPrice}}
			</li>	
		</ul>
		{{/cartList}}
		<ul class="product-footer">
			<li class="product-submit">
				<span class="total-price-text">总价:</span>
			 	<span class="total-price">￥{{totalCartPrice}}</span>
			</li>
		</ul>		
	</div>
</div>
{{/notEmpty}}
{{^notEmpty}}
<p class="empty-message">您还没有订单!!!</p>
{{/notEmpty}}