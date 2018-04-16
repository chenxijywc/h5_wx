<template>
	<div class="index-wrap">
		<div class="header" @click="sendSmsCode">
			<mt-swipe :show-indicators="true">
			  <mt-swipe-item class="item1" >1</mt-swipe-item>
			  <mt-swipe-item class="item2">2</mt-swipe-item>
			  <mt-swipe-item class="item3">3</mt-swipe-item>
			</mt-swipe>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'index',
		data() {
			return {
				mobile: "18317046229",
				code: "123456"
			}
		},
		methods: {
			/**
			* 手机号校验
			 */
			testMobile: function () {
				let mobileRegx = /^1[3|4|5|7|8|9][0-9]{9}$/;
				let mobile = this.mobile.trim();
		        if (mobileRegx.test(mobile)) {
		        	return true;
		        }else {
		        	return false;
		        };
			},
			/**
			* 验证码校验
			 */
			testCode: function () {
				let codeRegx = /^[0-9]{6}$/;
				let code = this.code.trim();
		        if (codeRegx.test(code)) {
		        	return true;
		        }else {
		        	return false;
		        };
			},
			/**
			*发送验证码
			*/
			sendSmsCode: function () {
				if (!this.testMobile()) {
					this.$toast({
						message: "请输入正确的手机号！"
					});
					return ;
				}
				let paramObj =  {
	    			'mobilePhone': this.mobile,
					"userId": this.shareUid
	    		};
	    		console.log("$ajax", this.$ajax);
				this.$ajax.get('/service/sms/getCaptcha4NewUserRecieveCoupon', {params: paramObj}).then(res => {
					let data = res,
						result = data.result,
						msgCode = data.errorCode,
						msgObj,
						msg;
					msgObj = {
						"101": "手机号不能为空！",
						"102": "验证码发送失败！",
						"1013": "呃~无法领取自己发放的礼包！",
						"1014": "抱歉~您已经是注册用户无法领取该礼包！"
					};
			        if(result == 1) {
			        	this.$refs.timerBtn.send();
						this.$Toast({
							message: "验证码发送成功！"
						});
			        } else {
						msg = msgObj[msgCode];
						this.$Toast({message: msg});
			        }
			    }, function (res) {
					this.$Toast({
						message: "验证码发送失败！"
					});
			    });
			}
		}
	}
</script>

<style lang="scss">
	.index-wrap {
		height: rem(600);
		background: #e8e8e8;
		.header {
			height: rem(300);
			.item1 {
				background: red;
			}
			.item2 {
				background: yellow;
			}
			.item3 {
				background: green;
			}
		}
	}
</style>