<template>
  <div id="QuestionMain">

    <div class="questionHeader">

      <h2 class="not-margin QuestionNumber">
        #Question_{{questionNumber}}
      </h2>
    </div>
    <div class="QuestionString">{{ question.question }}</div>
    <vs-row align="center">
      <vs-col w="9">

        <vs-input
          v-model="answer"
          placeholder="Your answer"
          class="submitElement"
          :loading="loading"
          ref="singleInput"
          @keyup.enter="ForwardAnswer"
        />
      </vs-col>
      <vs-col w="3">

        <vs-button
          block
          class="submitElement buttonElement"
          :loading="loading"
          @click="ForwardAnswer"
        >
          Submit
        </vs-button>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      answer: ''
    }
  },
  props: ['question', 'loading', 'SubmitAnswer', 'questionNumber', 'bus'],
  mounted () {
    this.bus.$on('reset', this.reset)
    const inputElement = document.querySelector('.submitElement input')
    inputElement.focus()
  },
  methods: {
    ForwardAnswer () {
      this.SubmitAnswer(this.answer)
    },
    reset () {
      this.answer = ''
    }
  }
}
</script>

<style lang="css">
.form input {
  width: 100%;
}

.h-100 {
  min-height: calc(100vh - 100px);
  /* width: 100%; */
}
#QuestionMain > div.vs-row > div.vs-col.vs-col--w-9.vs-col--offset-0.vs-col--lg-0.vs-col--sm-0.vs-col--xs-0 > div > div {
  padding: 0 3rem 0 0;
}
.vs-input__loading {
  margin: 1rem;
}
.QuestionString {
  text-align: left;
  margin: 5px 15px 10px 15px;
  font-size: 1.2rem;
}
.QuestionNumber {
  font-size: 1.8rem;
}
</style>

<style lang="css" scoped>
.buttonElement {
  padding: 0 0.1rem;
}

</style>
