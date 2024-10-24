import './assets/bootstrap.min.css'
import './assets/plugins.min.css'
import './assets/fonts.min.css'
import './assets/kaiadmin.min.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ioc } from './ioc'

// import FriendsComponent from '../src/components/friends/FriendsComponent.vue'

const app = createApp(App)

app.use(router)
app.use(ioc)
app.mount('#app')
// app.component('FriendsComponent', FriendsComponent)
