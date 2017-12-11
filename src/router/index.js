import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Like from '@/components/Like'
import HomePage from '@/components/HomePage'
import Note from '@/components/Note'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/like',
      name: 'Like',
      component: Like
    },
    {
      path: '/home/:id',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/note',
      name: 'Note',
      component: Note
    }
  ]
})
