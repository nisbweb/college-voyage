<template>
  <div id="main">
    <h3>#Leaderboard</h3>
    <div id="listWrapper">
      <vs-table>
        <template #thead>
          <vs-tr>
            <vs-th>
              Name
            </vs-th>
            <vs-th>
              Email
            </vs-th>
            <vs-th>
              Time
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr
            :key="i"
            v-for="(tr, i) in leaderboard"
            :data="tr"
          >
            <vs-td>
              {{ tr.displayName }}
            </vs-td>
            <vs-td>
              {{ tr.email }}
            </vs-td>
            <vs-td>
              {{ tr.completedTime }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script>
import firebaseApp from '@/firebase_config'
import moment from 'moment'

export default {
  data () {
    return {
      participants: []
    }
  },
  mounted () {
    firebaseApp.db.collection('users').where('completed', '==', true).onSnapshot((snapshot) => {
      this.participants = []
      snapshot.forEach(element => {
        this.participants.push(element.data())
      })
    })
  },
  computed: {
    leaderboard () {
      let temp = this.participants

      temp.sort((ele1, ele2) => {
        return ele1.completedTime.seconds - ele2.completedTime.seconds
      })
      temp = temp.map((obj) => {
        obj.completedTime = moment(obj.completedTime.toDate()).format('hh : mm A')
        return obj
      })
      return temp
    }
  }
}

</script>

<style>
</style>
