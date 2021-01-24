<template>
  <div id="QuestionMain">

    <h2 class="not-margin">
      #Question
    </h2>
    <p style="text-align:left;">{{ question.question }}</p>
    <vs-row align="center">
      <vs-col w="9">

        <vs-input
          v-model="answer"
          placeholder="Your answer"
          class="submitElement"
          :loading="loading"
        />
      </vs-col>
      <vs-col w="3">

        <vs-button
          block
          class="submitElement"
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
  props: ['question', 'loading', 'SubmitAnswer'],
  methods: {
    ForwardAnswer () {
      this.SubmitAnswer(this.answer)
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
  min-height: calc(100vh - 70px);
  /* width: 100%; */
}
</style>

<style lang="css" scoped>
.submitElement {
  padding: 3px 10px;
}
</style>
