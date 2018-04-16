<template>
	<div class="index-wrap">
		首页
	</div>
</template>

<script>
	export default {
		name: 'index',
		data() {
			return {
				msg: 'App'
			}
		}
	}
</script>

<style scoped>
	@function rem($px){
	    @return $px / 37.5 * 1rem;
	}
	.index-wrap {
		height: rem(60);
		background: red;
	}
</style>