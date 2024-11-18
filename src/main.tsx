import './index.css';
import { TodoApp } from './view/TodoApp';
import { store } from '@/shell/store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <TodoApp />
    </Provider>
  </React.StrictMode>,
);
