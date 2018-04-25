/**
 * Vuex
 * http://vuex.vuejs.org/zh-cn/intro.html
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const now = new Date();
const store = new Vuex.Store({
  state: {
    // 当前用户
    user: {
      name: 'coffce',
      img: '/static/images/1.jpg'
    },
    // 会话列表
    sessions: [
      {
        id: 1,
        user: {
          name: '测试数据',
          img: '/static/images/2.png'
        },
        messages: [
          {
            content: 'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
            type: 'text',
            date: now
          }, {
            content: 'Frok项目地址: https://github.com/coffcer/vue-chat',
            type: 'text',
            date: now
          }, {
            content: 'http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png',
            type: 'image',
            date: now
          }
        ]
      },
      {
        id: 2,
        user: {
          name: 'webpack',
          img: 'static/images/3.jpg'
        },
        messages: []
      }
    ],
    // 当前选中的会话
    currentSessionId: 1,
    // 过滤出只包含这个key的会话
    filterKey: ''
  },
  mutations: {
    INIT_DATA (state) {
      let data = localStorage.getItem('vue-chat-session');
      if (data) {
        state.sessions = JSON.parse(data);
      }
    },
    // 发送消息
    SEND_MESSAGE ({ sessions, currentSessionId }, content, type) {
      var type = type || 'text'
      let session = sessions.find(item => item.id === currentSessionId);
      session.messages.push({
        content: content,
        type: type,
        date: new Date(),
        self: true
      });
    },
    GET_MESSAGE ({ sessions, currentSessionId }, content, type) {
      var type = type || 'text'
      let session = sessions.find(item => item.id === currentSessionId);
      session.messages.push({
        content: content,
        type: type,
        date: new Date(),
        self: false
      })
    },
    // 选择会话
    SELECT_SESSION (state, id) {
      state.currentSessionId = id;
    } ,
    // 搜索
    SET_FILTER_KEY (state, value) {
      state.filterKey = value;
    }
  }
});

store.watch(
  (state) => state.sessions,
  (val) => {
    console.log('CHANGE: ', val);
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
  },
  {
    deep: true
  }
);

export default store;
export const actions = {
  initData: ({ dispatch }) => dispatch('INIT_DATA'),
  sendMessage: ({ dispatch }, content, type) => dispatch('SEND_MESSAGE', content, type),
  getMessage: ({ dispatch }, content, type) => dispatch('GET_MESSAGE', content, type),
  selectSession: ({ dispatch }, id) => dispatch('SELECT_SESSION', id),
  search: ({ dispatch }, value) => dispatch('SET_FILTER_KEY', value)
};
