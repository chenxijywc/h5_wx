<template>
	<div class="list-wrap">
		<div class="header">
			<div  class="category-box">
				<div class="item all" @click="search('all')">全部</div>
				<div class="item" v-for="(category, index) in categoryList" @click="search('sub')">
					{{category.name}}
				</div>
			</div>
		</div>
		<div class="body">
			<table class="list">
				<tr class="item head"><td>时间</td><td>课程名称</td><td>地点</td><td>点击报名</td></tr>
				
				<tr class="item" v-for="(course, index) in courseList">
					<td>{{course.time}}</td>
					<td>{{course.name}}</td>
					<td>{{course.address}}</td>
					<td><div class="btn" @click="search">报名</div></td>
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
				categoryList: [
					{
						name: "九大体质课程",
					},
					{
						name: "产品课程",
					},
					{
						name: "视频",
					},
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
			search(type) {
				let paramObj =  {
	    			
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
			padding-top: rem(20/2);
			.category-box {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 0 rem(40/2);
				.item {
					text-align: center;
					font-weight: 800;
					&.all {
						height: rem(50/2);
						line-height: rem(50/2);
						padding: 0 rem(50/2);
						border-radius: rem(16/2);
						background: #dd0000;
						font-size: rem(31/2);
						color: #ffffff;
					}
					height: rem(50/2);
					line-height: rem(50/2);
					margin-left: rem(30/2);
					border-radius: rem(16/2);
					background: #eae9e7;
					font-size: rem(31/2);
					color: #454444;
				}
			}
		}
		.body {
			margin: 0 auto;
			margin-top: rem(140/2);
			width: rem(625/2);
			.list {
				width: 100%;
				
			}
		}
	}
</style>