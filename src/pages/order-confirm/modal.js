
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
    show:function(){
         this.$box = $('.modal-box'); 
         this.loadModal();
         this.bindEvent();
    },
    bindEvent:function(){
        var _this = this;
        //关闭窗口
        this.$box.find('.close').on('click',function(){
               _this.hide();
        }) 
        //省份和城市的联动  
        var $provinceSelect = $('.modal-box').find('.province-select');
        $provinceSelect.on('click',function(){
              _this.loadCities($provinceSelect.val())
        });

        $('[name="username"]').on('blur',function(){
            var username = $(this).val();
            if(!_util.validate(username,'require')){
                return;
            }
            if(!_util.validate(username,'username')){
                return;
            }           
            _user.checkUsername(username,function(){
                //该用户名没有注册
                formErr.hide();
            },function(message){
                //该用户名已经注册
                formErr.show(message);
            })
        })

        $('#btn-submit').on('click',function(){
            _this.submit();
        })
        $('input').on('keyup',function(e){
            if(e.keyCode == 13){
                _this.submit();
            }
        })
    },
    loadModal:function(){ 
        //新增地址 
        $('.shipping-add').on('click',function(){
            var html = _util.render(modalTpl);
            $('.modal-box').html(html);
        })
    	
        this.loadProvinces();
    },
    loadProvinces:function(){
    	//获取地址传到前台 
    	var provinces = _cities.getProvinces();
        var gitCities = _cities.getCities(provinces);
        $('.modal-box').find('.province-select').html(gitCities);
    },
    loadCities:function(provinceName){
        //获取_cities数组中的值回填到前台数据中
        var cities = _cities.getCities(provinceName);
        console.log(cities);
        var citiesSelectOptions = this.getSelectOptions(cities);
        this.$box.find('.city-select').html(citiesSelectOptions);   
    },
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