<template>
  <div class="home">

    <div
      class="grid"
      v-if="!loadingState && question !== null"
    >
      <vs-row
        class="flex-Center h-100"
        align="center"
        justify="center"
      >
        <vs-col
          w="7"
          sm="8"
          xs="11"
          vs-type="flex"
          justify="center"
          align="center"
          class="form"
        >

          <SingleInput :SubmitAnswer="SubmitAnswer" :loading="loading" :question="question" />

        </vs-col>
      </vs-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SingleInput from '@/components/SingleInput.vue'
import firebaseApp from '@/firebase_config'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      question: null,
      loading: false
    }
  },
  components: {
    SingleInput
  },
  computed: {
    ...mapGetters({
      user: 'GET_USER',
      admin: 'GET_ADMIN',
      loadingState: 'GET_LOADING'
    })
  },
  mounted () {
    if (this.user.progress + 1 === this.admin.questionCount || this.user.progress >= this.admin.questionCount) {
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
      console.log(payload)
      setTimeout(() => {
        console.log(this.user.progress + 1 === this.admin.questionCount)
        if (this.user.progress + 1 === this.admin.questionCount || this.user.progress >= this.admin.questionCount) {
          this.QuizCompleted()
        } else {
          firebaseApp.db.collection('users').doc(this.user.id).update({
            progress: this.user.progress + 1
          }).then(() => {
            this.loading = false
            this.$store.commit('INCREMENT_PROGRESS')
            this.GetQuestion()
          }).catch(err => {
            this.loading = false
            console.error(err)
            this.ErrorHandler(err)
          })
        }
      }, 3000)
    },
    ErrorHandler (error) {
      this.$vs.notification({
        progress: true,
        color: 'danger',
        position: 'top-center',
        title: 'An error occured!',
        description: error.message
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
        this.loading = false
        console.error(err)
        this.ErrorHandler(err)
      })
    }
  }
}
</script>
