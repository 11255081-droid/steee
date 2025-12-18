import { router } from './router.js';
import { db } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('🚀 系統啟動中...');
        
        // 嘗試初始化
        db.init();
        
        // 嘗試渲染路由
        router.render();
        
        console.log('✅ 啟動成功');
    } catch (e) {
        // ★ 如果有錯誤，直接顯示在畫面上，不要只顯示 Loading
        console.error(e);
        const app = document.getElementById('app');
        if (app) {
            app.innerHTML = `
                <div style="padding: 2rem; color: red; text-align: center;">
                    <h1>⚠️ 系統發生錯誤</h1>
                    <p>${e.message}</p>
                    <pre style="text-align: left; background: #eee; padding: 1rem; overflow: auto;">${e.stack}</pre>
                    <button onclick="localStorage.clear();location.reload()" style="padding:10px 20px; background:#333; color:white; border:none; border-radius:4px; cursor:pointer;">清除快取並重試</button>
                </div>
            `;
        }
    }
});
