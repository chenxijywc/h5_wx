<template>
	<div class="detail-wrap">
		<div class="header">
			<img src="../../assets/user/detail/images/user-photo.png"/>
		</div>
		<div class="body">
			<ul class="list">
				<li class="item">
					<div class="item-wrap">
						<label class="label">姓名：</label>
						<input class="input" />
					</div>
				</li>
				<li class="item">
					<div class="item-wrap">
						<label class="label">生日：</label>
						<input class="input" />
					</div>
				</li>
				<li class="item">
					<div class="item-wrap">
						<label class="label">会员ID码：</label>
						<input class="input" />
					</div>
				</li>
				<li class="item">
					<div class="item-wrap">
						<label class="label">手机号码：</label>
						<input class="input" />
					</div>
				</li>
				<li class="item">
					<div class="item-wrap">
						<label class="label">联系地址：</label>
						<input class="input" />
					</div>
				</li>
				<li class="item">
					<div class="item-wrap">
						<label class="label">邮政编码：</label>
						<input class="input" />
					</div>
				</li>
				<li class="item">
					<div class="item-wrap">
						<label class="label">电子邮箱：</label>
						<input class="input" />
					</div>
				</li>
			</ul>
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

<style lang="scss">
	.detail-wrap {
		height: 100%;
		background: #ffffff url(../../assets/register/images/bg.jpg) center center no-repeat;
		background-size: 100% 100%;
		position: relative;
		overflow: hidden;
		.header {
			position: absolute;
			top: rem(40/2);
			left: 50%;
			transform: translate(-50%, 0);
			width: rem(170/2);
			height: rem(170/2);
			img {
				display: block;
				width: 100%;
				height: 100%;
				border-radius: 999px;
			}
		}
		.body {
			margin: 0 auto;
			margin-top: rem(290/2);
			width: rem(624/2);
			.list {
				width: 100%;
				.item {
					margin-top: rem(55/2);
					&::nth-of-type(1) {
						margin-top: rem(0);
					}
					.item-wrap {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						background: #ffffff;
						border-radius: rem(16/2);
						box-shadow: 1px 1px 3px rgba(164, 164, 164, 0.8) inset;
						.label {
							height: rem(55/2);
							line-height: rem(55/2);
							padding-left: rem(22/2);
							white-space: nowrap;
							font-size: rem(28/2);
							color: #7b7878;
						}
						.input {
							flex: 1;
							height: rem(55/2);
							line-height: rem(55/2);
							outline: none;
							border: 0;
							background: transparent;
							font-size: rem(28/2);
							color: #7b7878;
							&.name {
								width: rem(166/2);
							}
							&.sex {
								width: rem(100/2);
							}
						}
						.button {
							height: rem(55/2);
							line-height: rem(55/2);
							border: 0;
							outline: 0;
							background: transparent;
							padding: 0 rem(20/2);
							font-size: rem(24/2);
							color: #8f8d8d;
						}
					}
					&.flex {
						display: flex;
						justify-content: space-between;
						align-items: center;
					}
				}
			}
			.tip {
				
				margin-top: rem(40/2);
				text-align: center;
				font-size: rem(28/2);
				color: #9a9999;
				
			}
			.btn {
				margin: 0 auto;
				margin-top: rem(85/2);
				width: rem(490/2);
				height: rem(60/2);
				background: transparent url(../../assets/register/images/btn-rigister.png) center center no-repeat;
				background-size: contain;
				&:active {
					opacity: 0.8;
				}
			}
		}
	}
</style>