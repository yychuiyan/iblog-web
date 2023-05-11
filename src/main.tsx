import ReactDOM from 'react-dom/client';
import App from './App';
import 'flowbite';
import './main.css';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';
// 主入口文件
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={zh_CN}>
    <App />
  </ConfigProvider>

);
