<template>
  <div id="QuestionMain">

    <div class="questionHeader">

      <h2 class="not-margin">
        #Question_{{questionNumber}}
      </h2>
    </div>
    <div style="text-align:left;margin: 5px 15px 10px 15px;">{{ question.question }}</div>
    <vs-row align="center">
      <vs-col w="12" v-for="(i,index) in answer" :key="index">

        <vs-input
          v-model="answer[index].answer"
          :placeholder="i.placeholder"
          class="submitElement"
          :loading="loading"
        />
      </vs-col>
      <vs-col w="12">

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
      answer: [
        {
          placeholder: '1 across',
          answer: ''
        },
        {
          placeholder: '2 down',
          answer: ''
        },
        {
          placeholder: '3 down',
          answer: ''
        },
        {
          placeholder: '4 across',
          answer: ''
        },
        {
          placeholder: '5 down',
          answer: ''
        },
        {
          placeholder: '6 down',
          answer: ''
        },
        {
          placeholder: '7 across',
          answer: ''
        },
        {
          placeholder: '8 across',
          answer: ''
        },
        {
          placeholder: '9 across',
          answer: ''
        },
        {
          placeholder: '10 down',
          answer: ''
        }
      ]
    }
  },
  props: ['question', 'loading', 'SubmitAnswer', 'questionNumber', 'bus'],
  mounted () {
    this.bus.$on('reset', this.reset)
  },
  methods: {
    ForwardAnswer () {
      this.SubmitAnswer(this.answer.map(element => element.answer))
    },
    reset () {
      this.answer = [
        {
          placeholder: '1 across',
          answer: ''
        },
        {
          placeholder: '2 down',
          answer: ''
        },
        {
          placeholder: '3 down',
          answer: ''
        },
        {
          placeholder: '4 across',
          answer: ''
        },
        {
          placeholder: '5 down',
          answer: ''
        },
        {
          placeholder: '6 down',
          answer: ''
        },
        {
          placeholder: '7 across',
          answer: ''
        },
        {
          placeholder: '8 across',
          answer: ''
        },
        {
          placeholder: '9 across',
          answer: ''
        },
        {
          placeholder: '10 down',
          answer: ''
        }
      ]
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
  margin: 5px 0;
}
</style>
