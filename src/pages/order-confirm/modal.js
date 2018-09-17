
var _util = require('util');

var _cities = require('util/cities');
var _shipping = require('service/shipping')
var modalTpl = require('./modal.tpl');

var formErr = {
    show:function(msg){
        $('.error-item')
        .show()
        .find('.error-msg')
        .text(msg)
    },
    hide:function(){
        $('.error-item')
        .hide()
        .find('.error-msg')
        .text('')           
    }
}

var _modal = {
    show:function(options){
         this.$box = $('.modal-box');
         this.options = options;
         this.loadModal();
         this.bindEvent();
    },
    bindEvent:function(){
        var _this = this;
        //关闭窗口
        this.$box.find('.close').on('click',function(){
               _this.hide();
        })
        this.$box.find('.modal-container').on('click',function(e){
            e.stopPropagation()
        }) 
        //省份和城市的联动
        //第三步 把省份的值传到城市中，通过调用_cities里面的方式找到对应数组中的值 
        var $provinceSelect =  this.$box.find('.province-select');
        $provinceSelect.on('change',function(){
            //第四步调用loadCities方法把省份传到城市中
              _this.loadCities($provinceSelect.val())
        });

        //提交事件
        $('#btn-submit').on('click',function(){
            _this.submit();
        })
        $('input').on('keyup',function(e){
            if(e.keyCode == 13){
                _this.submit();
            }
        })
    },
    submit:function(){
        var _this = this;
        //1.获取数据
        var formData = {
            name:$.trim($('[name="name"]').val()),
            province:$.trim($('[name="province"]').val()),
            city:$.trim($('[name="city"]').val()),
            address:$.trim($('[name="address"]').val()),
            phone:$.trim($('[name="phone"]').val()),
            zip:$.trim($('[name="zip"]').val()),
        }
        //2.验证数据
        var validateResult =  this.validate(formData);
        //3.提交
        //验证通过
        if(validateResult.status){
            formErr.hide(); 
            
            //编辑地址
           if(this.options.data){
                formData.shippingId = this.options.data._id;
                _shipping.editShipping(formData,function(shippings){
                    _util.showSuccessMsg('编辑地址成功');
                    _this.hide()
                    _this.options.success(shippings)
                },function(){
                    formErr.show(message)
                })
            //新增地址
            }else{
                _shipping.addShipping(formData,function(shippings){
                    _util.showSuccessMsg('添加地址成功');
                    _this.hide()
                    _this.options.success(shippings)
                },function(){
                    formErr.show(message)
                })
            }
        }
        //验证失败
        else{
            formErr.show(validateResult.msg);
        }
    },
    validate:function(formData){
        var result = {
            status:false,
            msg:''
        }
        //验证收件人姓名不能为空
        if(!_util.validate(formData.name,'require')){
            result.msg = '收件人姓名不能为空';
            return result;
        }
        //验证省份不能为空
        if(!_util.validate(formData.province,'require')){
            result.msg = '请选择您要送往的省份';
            return result;
        }
        //验证城市不能为空
        if(!_util.validate(formData.city,'require')){
            result.msg = '请选择您要送往的城市';
            return result;
        }
        //验证详细地址
        if(!_util.validate(formData.address,'require')){
            result.msg = '详细地址不能为空';
            return result;
        }
        //验证手机号不能为空
        if(!_util.validate(formData.phone,'require')){
            result.msg = '收件人手机号不能为空';
            return result;
        }
        //验证手机号格式
        if(!_util.validate(formData.phone,'phone')){
            result.msg = '手机号格式错误';
            return result;
        }     

        result.status = true;
        return result;
    },
    loadModal:function(){ 
        //新增地址 
        $('.shipping-add').on('click',function(){
            var html = _util.render(modalTpl);
            $('.modal-box').html(html);
        })
    	
        this.loadProvinces();
    },
    //省份和城市的函数，第一步获取_cities中的城市值传到前端
    loadProvinces:function(){
    	//获取地址传到前台 
    	var provinces = _cities.getProvinces();
        var gitCities = this.getSelectOptions(provinces);
        $('.modal-box').find('.province-select').html(gitCities);
/*        //省份的回填
        if(this.options.data && this.options.data.province){
            this.$box.find('.province-select').val(this.options.data.province);
            this.loadCities(this.options.data.province);
        }*/
    },
    //第五步通过第四步的联动拿到用户选择的省份
    loadCities:function(provinceName){
        //获取_cities省份对应数组中的值回填到前台数据中
        var cities = _cities.getCities(provinceName);
        var citiesSelectOptions = this.getSelectOptions(cities);
        this.$box.find('.city-select').html(citiesSelectOptions);   
/*        //城市的回填
        if(this.options.data && this.options.data.city){
            this.$box.find('.cities-select').val(this.options.data.city);
        }*/
    },
    //第二步把loadCities函数中的值拿到回填到页面
    getSelectOptions:function(arr){
        let html = '<option value="">请选择</option>';
        for(var i = 0;i<arr.length;i++){
            html += '<option value="'+arr[i]+'">'+arr[i]+'</option>';
        }
        return html;
    },
    hide:function(){
         this.$box.empty();
    }
	 
}

module.exports = _modal;