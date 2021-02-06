<template>
  <div class="home">

    <div
      class="grid"
      v-if="!loadingState && question !== null"
    >
      <vs-row
        class="flex-Center h-100"
        align="center"
        justify="space-around"
      >
        <vs-col
          lg="5"
          w="6"
          sm="8"
          xs="11"
          vs-type="flex"
          justify="center"
          align="center"
          class="form"
          v-if="isImage"
        >
          <img id="questionImage" v-bind:src="require(`@/assets/${question.image}`)" alt="Question image">

        </vs-col>
        <vs-col
          :lg="isImage ? 4 : 7"
          :w="isImage ? 5 : 8"
          sm="8"
          xs="11"
          vs-type="flex"
          justify="center"
          align="center"
          class="form"
        >

          <SingleInput :bus="ChildInput" ref="ChildInput" v-if="question.type === 'single-input'" :SubmitAnswer="SubmitAnswer" :loading="loading" :question="question" :questionNumber="user.progress+1"/>
          <Crossword  :bus="ChildInput" ref="ChildInput" v-if="question.type === 'crossword'" :SubmitAnswer="SubmitAnswer" :loading="loading" :question="question"  :questionNumber="user.progress+1"/>

        </vs-col>
      </vs-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SingleInput from '@/components/SingleInput.vue'
import Crossword from '@/components/Crossword.vue'
import firebaseApp from '@/firebase_config'
import { mapGetters } from 'vuex'
import Vue from 'vue'
export default {
  name: 'Home',
  data () {
    return {
      question: null,
      loading: false,
      ChildInput: new Vue()
    }
  },
  components: {
    SingleInput,
    Crossword
  },
  computed: {
    ...mapGetters({
      user: 'GET_USER',
      admin: 'GET_ADMIN',
      loadingState: 'GET_LOADING'
    }),
    isImage () {
      return this.question !== null && typeof this.question.image !== 'undefined'
    }
  },
  mounted () {
    if (this.user.progress >= this.admin.questionCount) {
      this.QuizCompleted()
    }
    this.GetQuestion()
  },
  methods: {
    GetQuestion () {
      this.$store.commit('CHANGE_LOADING', true)
      firebaseApp.db.collection('questions')
        .doc(`question_${this.user.progress + 1}`)
        .get().then((val) => {
          this.question = val.data()
          this.$store.commit('CHANGE_LOADING', false)
        }).catch(err => {
          console.error(err)
          this.ErrorHandler(err)
          this.$store.commit('CHANGE_LOADING', false)
        })
    },
    // returns true or false
    SubmitAnswer (payload) {
      this.loading = true
      this.$axios.post('', {
        question: `question_${this.user.progress + 1}`,
        answer: payload,
        type: this.question.type
      }).then(({ data }) => {
        if (data.success === true && data.submission === true) {
          if (this.question.show === true) {
            this.notifyInsta()
          }
          this.CorrectAnswerHandler()
          this.ChildInput.$emit('reset')
        } else if (data.success === true && data.submission === false) {
          this.WrongAnswerHandler()
        } else {
          return new Error('Something went wrong')
        }
      }).catch(err => {
        console.error(err)
        this.ErrorHandler(err)
      })
    },
    ErrorHandler (error) {
      this.loading = false
      this.$vs.notification({
        progress: true,
        color: 'danger',
        position: 'top-center',
        title: 'An error occured!',
        text: error.message
      })
    },
    QuizCompleted () {
      firebaseApp.db.collection('users').doc(this.user.id).update({
        completed: true,
        completedTime: new Date()
      }).then(() => {
        this.loading = false
        this.$store.commit('QUIZ_COMPLETED')
        this.$router.push({ name: 'Leaderboard' })
      }).catch(err => {
        console.error(err)
        this.ErrorHandler(err)
      })
    },
    CorrectAnswerHandler () {
      if (this.user.progress + 1 === this.admin.questionCount || this.user.progress >= this.admin.questionCount) {
        this.QuizCompleted()
      } else {
        firebaseApp.db.collection('users').doc(this.user.id).update({
          progress: this.user.progress + 1
        }).then(() => {
          this.loading = false
          this.$vs.notification({
            progress: true,
            color: 'success',
            position: 'top-center',
            title: 'Lets go!!',
            text: 'Correct answer.'
          })
          this.$store.commit('INCREMENT_PROGRESS')
          this.GetQuestion()
        }).catch(err => {
          this.loading = false
          console.error(err)
          this.ErrorHandler(err)
        })
      }
    },
    WrongAnswerHandler () {
      this.loading = false
      this.$vs.notification({
        progress: true,
        color: 'danger',
        position: 'top-center',
        title: 'Oops!',
        text: 'Wrong answer.'
      })
    },
    notifyInsta () {
      this.$vs.notification({
        title: '<span class="instagramLink" >@bot_binod</span>, who you may know is on instagram, would you like to view their profile?',
        duration: 'none',
        position: 'top-center',
        icon: '<i class="bx bxs-user-pin" ></i>',
        square: true,
        onClick: () => {
          window.open('https://www.instagram.com/bot_binod/', '_blank')
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
#questionImage {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
