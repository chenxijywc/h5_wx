<template>
	<div class="index-wrap">
		<div class="header">
		</div>
		<div class="body">
			<ul class="list">
				<li class="item">
					<div class="item-wrap">
						<label class="label">手机：</label>
						<input class="input name" v-model="userPhone"/>
					</div>
				</li>
				<li class="item">
					<div class="item-wrap">
						<label class="label">验证码：</label>
						<input class="input name" v-model="verifyCode"/>
						<timer-btn :phone="userPhone" :second="30" :btntext="'获取验证码'" ref="timerBtn"></timer-btn>
					</div>
				</li>
			</ul>
			<div class="btn" @click="submit">
				
			</div>
		</div>
	</div>
</template>

<script>
	import Url  from 'url';
	import QueryString from 'querystring';
	import * as Common  from "../../utils/common";
	import timerBtn  from '../common/timerBtn.vue';
	export default {
		name: 'index',
		data() {
			return {
				userPhone: "18317046229",
				verifyCode: "123456"
			}
		},
		components: {timerBtn},
		created (){
			
		},
		methods: {
			/**
			 * 登录
			 */
			submit() {
				if (!Common.testPhone(this.userPhone)) {
					this.$toast({
						message: "请输入正确的手机号！"
					});
					return ;
				}
				if (!Common.testVerifyCode(this.verifyCode)) {
					this.$toast({
						message: "请输入正确的验证码！"
					});
					return ;
				}
				let paramObj =  {
	    			'userPhone': this.userPhone,
					"verifyCode": this.verifyCode
	    		};
	    		this.$http.POST('yuechanxin/httpreq/userlogin', paramObj, {
	    			xxx: '000',
	    			headers: {
			        'sessionId':  "sessionId",
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
						this.$toast({
							message: "验证码发送成功！"
						});
			        } else {
						msg = msgObj[msgCode];
						this.$toast({message: msg});
			        }
			    }, function (res) {
					this.$toast({
						message: "验证码发送失败！"
					});
			    });
			}
		}
	}
</script>

<style lang="scss">
	.index-wrap {
		height: 100%;
		background: #ffffff url(../../assets/login/images/bg.jpg) center center no-repeat;
		background-size: 100% 100%;
		position: relative;
		overflow: hidden;
		.header {
			position: absolute;
			top: rem(115/2);
			left: 50%;
			transform: translate(-50%, 0);
			width: rem(357/2);
			height: rem(145/2);
			background: transparent url(../../assets/login/images/header.png) center center no-repeat;
			background-size: contain;
		}
		.body {
			margin: 0 auto;
			margin-top: rem(380/2);
			width: rem(500/2);
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
						overflow: hidden;
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
			.btn {
				margin: 0 auto;
				margin-top: rem(183/2);
				width: rem(490/2);
				height: rem(60/2);
				background: transparent url(../../assets/login/images/btn-login.png) center center no-repeat;
				background-size: contain;
				&:active {
					opacity: 0.8;
				}
			}
		}
	}
</style>