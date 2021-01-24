<template>
  <div
    id="LoginMain"
    class="grid"
  >
    <vs-row
      class="flex-Center h-100"
      align="center"
      justify="center"
    >
      <vs-col
        w="6"
        vs-type="flex"
        justify="center"
        align="center"
        class="form"
      >

        <h2 class="not-margin">
          Welcome to <b>Icebreaker</b>
        </h2>
        <div class="con-form">
          <vs-input
            v-model="displayName"
            placeholder="Name"
            class="inputMargin"
          >
            <template #icon>
              🧑🏻‍🦱
            </template>
          </vs-input>
          <vs-input
            v-model="email"
            placeholder="Email"
            class="inputMargin"
          >
            <template #icon>
              @
            </template>
          </vs-input>
          <vs-input
            type="password"
            v-model="password"
            placeholder="Password"
            class="inputMargin"
          >
            <template #icon>
              <!-- <i class='bx bxs-lock'></i> -->
              🔒
            </template>
          </vs-input>
          <!-- <div class="flex">
        <vs-checkbox v-model="remember">Remember me</vs-checkbox>
        <a href="#">Forgot Password?</a>
      </div> -->
        </div>
        <vs-row>
          <vs-col
            w="8"
            class="buttonWrapper"
          >
            <vs-button
              block
              class="buttonMargin"
              @click="emailLogin"
            >
              Sign In
            </vs-button>
          </vs-col>

          <vs-col
            w="4"
            class="buttonWrapper"
          >
            <vs-button
              block
              class="buttonMargin"
              @click="googles"
            >
              Google Sign in
            </vs-button>
          </vs-col>
        </vs-row>

        <!-- <div class="new">
        New Here? <a href="#">Create New Account</a>
      </div> -->
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import firebaseApp from '@/firebase_config.js'
export default {
  data () {
    return {
      email: 'sgkul2000@gmail.com',
      password: 'helloworld',
      displayName: 'Shreesh Kulkarni'
    }
  },
  methods: {
    emailLogin () {
      firebaseApp.auth.createUserWithEmailAndPassword(this.email, this.password).then(async (data) => {
        // console.log({
        //   displayName: this.displayName,
        //   email: this.email,
        //   id: data.user.uid
        // })
        await firebaseApp.db.doc('users/' + data.user.uid).set({
          displayName: this.displayName,
          email: this.email,
          id: data.user.uid,
          completed: false,
          completedTime: null,
          progress: 0
        })
        this.userLoggedIn(data.user.uid)
        // localStorage.setItem('logged', true)
        // localStorage.setItem('uid', data.user.uid)
      }).catch(error => {
        console.log(error)
        if (error.message === 'The email address is already in use by another account.') {
          firebaseApp.auth.signInWithEmailAndPassword(this.email, this.password)
            .then((data) => {
              this.userLoggedIn(data.user.uid)
            })
            .catch((err) => {
              console.error(err)
            })
        }
      })
    },
    googles () {
      var provider = new firebase.auth.GoogleAuthProvider()
      firebaseApp.auth.signInWithPopup(provider).then(data => {
        firebaseApp.db.collection('users').doc(data.user.uid).set({
          displayName: data.user.displayName,
          email: data.user.email,
          id: data.user.uid,
          completed: false,
          completedTime: null,
          progress: 0
        }).then(() => {
          this.userLoggedIn(data.user.uid)
        }).catch(err => {
          console.error(err)
        })
        // localStorage.setItem('uid', data.user.uid)
        // localStorage.setItem('logged', true)
      }).catch(error => {
        console.error(error)
      })
    },
    userLoggedIn (payload) {
      this.$store.dispatch('FETCH_USER', payload)
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style lang="css">
.h-100 {
  height: calc(100vh - 70px);
  /* width: 100%; */
}

.form input {
  width: 100%;
}
</style>

<style lang="css" scoped>
.inputMargin {
  margin: 0.75rem 0;
}
.buttonMargin {
  margin: 0.7rem 0;
}
.buttonWrapper {
  padding: 3px 10px;
}
</style>
