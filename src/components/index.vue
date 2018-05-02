<template>
	<div class="index-wrap">
		<div class="header" @click="sendSmsCode">
			<div class="user-box">
				<img class="user-photo" src="../assets/index/images/user-photo.png"/>
				<div class="user-name"><span>剑雨无车</span><span>，早上好！</span></div>
				<div class="user-grade">
					<img class="img" src="../assets/index/images/grade.png"/>
				</div>
			</div>
			<mt-swipe :show-indicators="true" :auto="3000">
			  <mt-swipe-item>
			  	<a class="item-wrap">
			  		<img class="img" src="../assets/index/images/swipe-01.jpg"/>
			  	</a>
			  </mt-swipe-item>
			  <mt-swipe-item>
			  	<a class="item-wrap">
			  		<img class="img" src="../assets/index/images/swipe-02.jpg"/>
			  	</a>
			  </mt-swipe-item>
			  <mt-swipe-item>
			  	<a class="item-wrap">
			  		<img class="img" src="../assets/index/images/swipe-03.jpg"/>
			  	</a>
			  </mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="body">
			<div class="list">
				<div class="item">
					<img class="img" src="../assets/index/images/index-item-01.png"/>
				</div>
				<div class="item">
					<img class="img" src="../assets/index/images/index-item-02.png"/>
				</div>
				<div class="item">
					<img class="img" src="../assets/index/images/index-item-03.png"/>
				</div>
			</div>
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
	    		this.$ajax.post('/service/sms/getCaptcha4NewUserRecieveCoupon', paramObj, {
	    			xxx: '000',
	    			headers: {
			        'Content-Type': 'application/x-www-form-urlencoded',
			        'sessionId':  "sessionId",
			        'authKey': "authKey",
			    }}).then(res => {
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
				this.$ajax.get('/service/sms/getCaptcha4NewUserRecieveCoupon', {params: paramObj}, {xxx: '000'}).then(res => {
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

<style lang="scss" scoped>
	.index-wrap {
		height: 100%;
		background: #f7f6f0 url(../assets/index/images/bg.jpg) center center no-repeat;
		background-size: 100% 100%;
		position: relative;
		overflow: hidden;
		.header {
			position: relative;
			padding-top: rem(83/2);
			.user-box {
				box-sizing: border-box;
				position: relative;
				height: rem(90/2);
				padding-left: rem(150/2);
				padding-top: rem(20/2);
				
				margin-bottom: rem(34/2);
				.user-photo {
					position: absolute;
					top: 0;
					left: rem(50/2);
					width: rem(90/2);
					height: rem(90/2);
					border-radius: 999px;
				}
				.user-grade {
					.img {
						height: rem(28/2);
						width: rem(24/2);
					}
				}
			}
			.mint-swipe {
				height: rem(348/2);
				.item-wrap {
					display: block;
					width: 100%;
					height: rem(348/2);
					.img {
						display: block;
						width: 100%;
						height: 100%;
					}
				}
			}
			
			
		}
		.body {
			width: 100%;
			margin-top: rem(90/2);
			.list {
				width: 100%;
				.item {
					margin-top: rem(24/2);
					&:nth-of-type(1) {
						margin-top: 0;
					}
					img {
						display: block;
						height: rem(167/2);
					}
				}
			}
		}
	}
</style>