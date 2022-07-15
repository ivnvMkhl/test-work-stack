import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';
import { DatePicker } from 'ant-design-vue';

createApp(App).use(DatePicker).mount('#app');
