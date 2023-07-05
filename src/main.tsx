import ReactDOM from 'react-dom/client';
import App from './App';
import 'flowbite';
import './main.css';
import { ConfigProvider, message } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';
message.config({
  top: 60
})
// 主入口
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={zh_CN}>
    <App />
  </ConfigProvider>

);
