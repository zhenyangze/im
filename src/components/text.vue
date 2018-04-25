<script>
import { actions } from '../store';

export default {
  vuex: {
    actions: actions
  },
  data () {
    return {
      content: ''
    };
  },
  methods: {
    onKeyup (e) {
      if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
        this.sendMessage(this.content);
        // this.sendMessage('http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png', 'image')
        this.content = '';
      }
    }
  }
};
</script>

<template>
  <div class="text">
    <textarea placeholder="按 Ctrl + Enter 发送" v-model="content" @keyup="onKeyup"></textarea>
  </div>
</template>

<style lang="less" scoped>
.text {
  height: 160px;
  border-top: solid 1px #ddd;

  textarea {
    padding: 10px;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    font-family: "Micrsofot Yahei";
    resize: none;
  }
}
</style>