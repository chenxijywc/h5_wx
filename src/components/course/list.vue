<template>
	<div class="list-wrap">
		<div class="header">
			<ul class="list">
				<li class="item flex">
					<div class="item-wrap course-time">
						<label class="label">课程时间：</label>
						<input class="input name" v-model="userPhone"/>
					</div>
					<div class="search">
						查询
					</div>
				</li>
			</ul>
		</div>
		<div class="body">
			<table class="list">
				<tr class="item head"><td>时间</td><td>课程名称</td><td>地点</td><td>点击报名</td></tr>
				
				<tr class="item" v-for="(course, index) in courseList">
					<td>{{course.time}}</td>
					<td>{{course.name}}</td>
					<td>{{course.address}}</td>
					<td><div class="btn">报名</div></td>
				</tr>
			</table>
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
				verifyCode: "123456",
				courseList: [
					{
						time: "2018.05.02",
						name: "化学",
						address: "上海市交通大学1"
					},
					{
						time: "2018.05.02",
						name: "化学",
						address: "上海市交通大学2"
					},
					{
						time: "2018.05.02",
						name: "化学",
						address: "上海市交通大学3"
					},
					{
						time: "2018.05.02",
						name: "化学",
						address: "上海市交通大学4"
					}
				]
			}
		},
		components: {timerBtn},
		created (){
			
		},
		methods: {
			/**
			 * 登录
			 */
			search() {
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
	.list-wrap {
		height: 100%;
		background: #ffffff url(../../assets/login/images/bg.jpg) center center no-repeat;
		background-size: 100% 100%;
		position: relative;
		overflow: hidden;
		.header {
			padding: 0 rem(70/2);
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
					}
					.course-time {
						width: rem(490/2);
					}
					.search {
						width: rem(100/2);
						height: rem(50/2);
						line-height: rem(50/2);
						border-radius: rem(16/2);
						background: #d30404;
						text-align: center;
						font-size: rem(32/2);
						color: #ffffff;
						&:active {
							opacity: 0.8;
						}
					}
					&.flex {
						display: flex;
						justify-content: space-between;
						align-items: center;
					}
				}
			}
		}
		.body {
			margin: 0 auto;
			margin-top: rem(140/2);
			width: rem(625/2);
			.list {
				width: 100%;
				border-collapse: collapse;
				text-align: center;
				.item {
					
					font-size: rem(24/2);
					color: #747474;
					&.head {
						font-size: rem(28/2);
						color: #747474;
						td {
							padding: rem(15/2) 0;
						}
					}
					td {
						padding: rem(15/2) 0;
						.btn {
							margin: 0 auto;
							width: rem(80/2);
							height: rem(40/2);
							line-height: rem(40/2);
							border-radius: rem(10/2);
							background: #d30404;
							text-align: center;
							font-size: rem(32/2);
							color: #ffffff;
							&:active {
								opacity: 0.8;
							}
						}
					}
				}
				td {
					border: 1px solid #747474;
				}
			}
		}
	}
</style>