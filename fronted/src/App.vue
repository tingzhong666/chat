<script setup>
import { io } from 'socket.io-client'
import config from '@/../../config.js'

const ss = io(config.ss.server())

// ss.on('hello', msg => {
//   console.log(msg)
// })

ss.on('connect', () => {
  console.log(678)
})

</script>

<template>
  <div id="view">
    <div class="in">
      <div class="container">
        <input type="text">
        <button id="submit">发送</button>
      </div>
    </div>

    <div id="show_chat">
      <ul class="container">

      </ul>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li {
  list-style: none;
}

#view > div {
  margin-top: 20px;
}

.container {
  width: 1000px;
  margin: 0 auto;
}

#show_chat .container {
  width: 1000px;
  height: 500px;
  background-color: #eee;
}
</style>
