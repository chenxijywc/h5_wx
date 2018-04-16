<template>
  <div class="hello">
  </div>
</template>

<script>
export default {
  name: 'toast',
  data () {
    return {
      msg: 'Welcome to'
    }
  }
}
</script>

<style lang="scss" scoped>
@function rem($px){
	    @return $px / 37.5 * 1rem;
	}
	.index-wrap {
		height: rem(60);
		background: red;
	}
	
</style>
