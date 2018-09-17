<div class="panel">
	<h2 class="panel-header">送货地址</h2>
	<div class="pandel-body">
		{{#shippings}}
		{{#isActive}}
		<div class="shipping-item active" data-shipping-id={{_id}}>
		{{/isActive}}
		{{^isActive}}
		<div class="shipping-item" data-shipping-id={{_id}}>
		{{/isActive}}
			<h2 class="shipping-title">{{province}} {{city}} {{name}}</h2>
			<p class="shipping-detail">{{address}} {{phone}} {{zip}}</p>
			<div class="shipping-footer">
				<span class="link shipping-edit">编辑</span>
				<span class="link shipping-delete">删除</span>
			</div>
		</div>
		{{/shippings}}					
		<div class="shipping-add">
			<i class="fa fa-plus"></i>
			<p class="shipping-add-text">添加新地址</p>
		</div>
	</div>
</div>