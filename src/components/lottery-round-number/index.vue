<template>
  <div class="lottery-round-number-wrapper">
    {{LotteryNumber}}
  </div>
</template>

<script>
export default {
  name: 'LotteryRoundNumber',
  props: {
      lotteryNumber: {
          type: string,
          required: true
      }
  }
}
</script>
