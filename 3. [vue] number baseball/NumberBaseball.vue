<template>
  <div>
    <h1>{{result}}</h1>
    <form @submit.prevent="onSubmitForm">
      <input ref="answer" minlength="4" maxlength="4" v-model="value" />
      <button type="submit">입력</button>
    </form>
    <div>시도: {{tries.length}}</div>
    <ul>
      <li v-for="t in tries">
        <div>{{t.try}}</div>
        <div>{{t.result}}</div>
      </li>
    </ul>    
  </div>
</template>

<script>
  const getNumbers = () => {
    let random = parseInt(Math.random() * (10000 - 1000) + 1000);
    return random.toString().split('')
  };

  export default {
    data() {
      return {
        answer: getNumbers(),
        tries: [],
        value: '',
        result: '',
      }
    },
    methods: {
      onSubmitForm() {
        if (this.value === this.answer.join('')) {
          this.tries.push({
            try: this.value,
            result: '홈런',
          });
          this.result = '홈런';
          alert('정답! 게임을 다시 실행합니다.')
          this.answer = getNumbers();
          this.tries = [];
        } else {
          if (this.tries.length >= 9) {
            this.result = `10번 동안 못 맞춤!! 답은 ${this.answer.join('')}`;
            this.answer = getNumbers();
            this.tries = [];
          } else {
            let strike = 0;
            let ball = 0;
            const submitArray = this.value.split('')
            submitArray.forEach((item, index) => {
              if (item === this.answer[index]) strike += 1;
              else if (this.answer.includes(item)) ball += 1;
            })
            this.tries.push({
              try: this.value,
              result: `${strike} 스트라이크, ${ball} 볼 입니다.`
            })
          }
        }
        this.$refs.answer.focus();
        this.value = '';
      }
    }
  }
</script>

<style>

</style>