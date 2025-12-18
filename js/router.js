// asset/js/router.js
import { db } from './storage.js';
import * as Views from './views.js';

class Router {
    constructor() {
        this.app = document.getElementById('app');
        this.curr = 'home';
        this.params = {};
        this.filter = { grade:'all', subject:'all' };
        
        this.routes = {
            'home': Views.HomeView,
            'login': Views.AuthView, // 特殊處理
            'dashboard': Views.DashboardView,
            'course': Views.CourseView,
            'mistakes': Views.MistakeView
        };
    }

    navigate(page, params={}) {
        const user = db.getCurrentUser();
        if(['dashboard','course','mistakes'].includes(page) && !user) return this.navigate('login');
        this.curr = page;
        this.params = params;
        this.render();
    }

    render() {
        const view = this.routes[this.curr];
        const isAuth = this.curr === 'login';
        // AuthView 結構不同，這裡做個簡單判斷
        if(isAuth) {
            this.app.innerHTML = view.renderLogin();
            view.initLogin(this);
        } else {
            this.app.innerHTML = Views.Navbar() + `<main>${view.render(this.curr==='dashboard'?this.filter:this.params)}</main>`;
            this.bindEvents();
            if(view.init) view.init(this);
        }
    }

    bindEvents() {
        document.querySelectorAll('[data-link]').forEach(el=>el.onclick=e=>{
            e.preventDefault();
            const t = e.target.closest('[data-link]');
            const cid = t.dataset.cid;
            this.navigate(t.dataset.link, cid?{id:cid}:{});
        });
        document.querySelectorAll('[data-action="logout"]').forEach(el=>el.onclick=()=>db.logout());
    }
}

export const router = new Router();
