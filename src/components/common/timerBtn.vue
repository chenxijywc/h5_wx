<template>
    <button type="button" class="btn-timer" :class="{'disabled':time > 0}"  :disabled="time > 0" @click="send">{{ text }}</button>
</template>
<script>
	import * as Common  from "../../utils/common";
    export default {
            props: {
                second: {
                    type: Number,
                    default: 60
                },
                btntext: {
                    type: String
                },
                phone: {
                    type: String
                }
            },
            data() {
                return {
                    time: 0
                }
            },
            watch:{
　　　　　　　　phone(newVal, oldVal){
　　　　　　　　　　this.phone = newVal;
　　　　　　　　}
　　　　　　},
            methods: {
                send() {
                	if (!Common.testPhone(this.phone)) {
						this.$toast({
							message: "请输入正确的手机号！"
						});
						return ;
					}
					let paramObj =  {
		    			'userPhone': this.phone.trim(),
		    		};
		    		this.$ajax.post('/service/sms/getCaptcha4NewUserRecieveCoupon', paramObj).then(res => {
						let data = res;
						this.$toast({
							message: "验证码发送成功！"
						});
				    }, res => {
						this.$toast({
							message: "验证码发送失败！"
						});
				    });
                	
                    this.time = this.second;
                    this.timer();
                },
                timer() {
                    if (this.time > 0) {
                        this.time = this.time - 1;                  
                        setTimeout(this.timer, 1000)
                    }
                }
            },
            computed: {
                text() {
                    return this.time > 0 ? this.time + 's后再次获取' : this.btntext;
                }
            }
        }

</script>
<style lang="scss">
	.btn-timer {
		height: rem(55/2);
		line-height: rem(55/2);
		border: 0;
		outline: 0;
		background: transparent;
		padding: 0 rem(20/2);
		font-size: rem(24/2);
		color: #8f8d8d;
		&.disabled {
			color: #ffffff;
			background: gray;
		}
	}
</style>