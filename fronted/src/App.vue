<script setup>
import { io } from 'socket.io-client'
import config from '@/../../config.js'
import { reactive, ref } from 'vue'

const ss = io(config.ss.server())
const data = reactive({
  list: [],
  inp: '',
  title: '大厅',
})

ss.on('connect', () => {
  console.log(`已连接ss id:${ss.id}`)
  ss.emit('join room liveing_room')
})

ss.on('msg', res => {
  data.list.push({ text: res.text })
  console.log(`msg : ${res.text}`)
})

function submit(){
  console.log(`submit : ${data.inp}`)

  // 成功发送消息回调
  ss.on('send room liveing_room ok', async function(){
    ss.off('send room liveing_room ok')

    // push自己发送的消息
    data.list.push({ text: data.inp, toux: '', user_id: ss.id })
    data.inp = ''
  })


  // 发送消息
  ss.emit('send room liveing_room', { user_id: ss.id, text: data.inp})
}



</script>

<template>
  <div id="view">
    <!-- 标题。用户名/群组名 -->
    <div class="title" v-text="data.title"></div>
    
    <!-- 聊天内容 -->
    <div class="show_chat">
      <li v-for="item in data.list" :key="item.text">
        <!-- 左 -->
        <div class="left">
          <!-- 头像 -->
          <img src="https://avatars.githubusercontent.com/u/47524168?v=4" alt="" class="toux">
        </div>
        <!-- 右 -->
        <div class="right">
          <!-- 昵称 -->
          <div class="name" v-text="item.user_id"></div>
          <!-- 消息 -->
          <div class="text" v-text="item.text"></div>
        </div>
      </li>
    </div>

    <!-- 输入框 -->
    <div class="in">
      <textarea type="text" v-model="data.inp" rows="3"/>
      <div class="submit"  @click="submit">发送</div>
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

#view{
  width: 700px;
  margin: 20px auto;
  box-shadow: 0px 0px 10px #666;
}

.title {
  background-color: #212121;
  height: 40px;
  width: 700px;
  color: #fff;
  text-align: center;
  line-height: 40px;
}

.show_chat {
  width: 700px;
  height: 400px;
  border-bottom: 1px solid #ccc;
  overflow: scroll;
}
.show_chat li{
  display: flex;
}

.show_chat .left{
  width: 60px;
  text-align: center;
  padding-top: 5px;
}

.show_chat .toux{
  width: 35px;
  height: 35px;
  border-radius: 50%;
}


.show_chat .name{
  font-size: 12px;
  margin-top: 10px;
}

.show_chat .text{
  background-color: #e5e5e5;
  padding: 10px;
  border-radius: 10px;
}

/* 输入框 */
.in{
  height: 100px;
  width: 700px;
  padding: 3px;
  position: relative;
}


.in textarea{
  width: 100%;
  resize: none;
  outline: 0;
  /* border: 1px solid #000; */
  border: 0;
  font-size: 18px;
  font-weight: 700;
}

.in .submit{
  width: 60px;
  background-color: #373737;
  color: #fff;
  text-align: center;
  font-size: 14px;
  height: 25px;
  line-height: 25px;
  position: absolute;
  right: 20px;
  bottom: 10px;
}
</style>
