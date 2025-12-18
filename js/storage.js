// asset/js/storage.js
import { STATIC_DB } from './mockData.js';

const USER_DB_KEY = 'hanny_user_v2';
const DEFAULT_USER = { 
    id: 'u1', name: '王小明', role: 'student', score: 0, badges: [], streak: 1, mistakeBook: [], 
    avatar: 'https://ui-avatars.com/api/?name=王&background=random' 
};

export class StorageManager {
    constructor() { this.init(); }

    init() {
        if (!localStorage.getItem(USER_DB_KEY)) {
            const initData = { users: [DEFAULT_USER], progress: {}, comments: [] };
            localStorage.setItem(USER_DB_KEY, JSON.stringify(initData));
        }
    }

    getUserDB() { return JSON.parse(localStorage.getItem(USER_DB_KEY)); }
    saveUserDB(data) { localStorage.setItem(USER_DB_KEY, JSON.stringify(data)); }
    getStaticDB() { return STATIC_DB; }

    login(u, p) {
        // 簡易登入：只要有輸入就過
        const user = this.getUserDB().users[0]; 
        sessionStorage.setItem('currUser', JSON.stringify(user));
        return { success: true, user };
    }
    
    register(data) {
        // 簡易註冊：直接覆蓋預設用戶
        const db = this.getUserDB();
        const user = { ...DEFAULT_USER, ...data };
        db.users = [user];
        this.saveUserDB(db);
        sessionStorage.setItem('currUser', JSON.stringify(user));
        return { success: true };
    }

    logout() { sessionStorage.removeItem('currUser'); window.location.reload(); }
    getCurrentUser() { return JSON.parse(sessionStorage.getItem('currUser')); }

    // 讀取資料介面
    getAllCourses() { return this.getStaticDB().courses; }
    getCourse(id) { return this.getStaticDB().courses.find(c => c.id === id); }
    getCourseQuestions(cid) { return this.getStaticDB().questions.filter(q => q.courseId === cid); }
    
    // 隨機題目
    getRandomQuestions(count, cid) {
        let pool = this.getStaticDB().questions;
        if(cid) pool = pool.filter(q => q.courseId === cid);
        return pool.sort(()=>0.5-Math.random()).slice(0, count);
    }

    // 進度與互動
    getCourseProgress(uid, cid) { return this.getUserDB().progress?.[uid]?.[cid] || []; }
    
    toggleUnitComplete(uid, cid, unitId) {
        const db = this.getUserDB();
        if(!db.progress) db.progress = {};
        if(!db.progress[uid]) db.progress[uid] = {};
        if(!db.progress[uid][cid]) db.progress[uid][cid] = [];
        
        const list = db.progress[uid][cid];
        const idx = list.indexOf(unitId);
        idx === -1 ? list.push(unitId) : list.splice(idx, 1);
        this.saveUserDB(db);
    }

    recordQuizResult(uid, qid, isCorrect) {
        const db = this.getUserDB();
        const user = db.users.find(u=>u.id===uid);
        if(!user.mistakeBook) user.mistakeBook=[];
        if(!isCorrect && !user.mistakeBook.includes(qid)) user.mistakeBook.push(qid);
        else if(isCorrect) {
            const idx = user.mistakeBook.indexOf(qid);
            if(idx!==-1) user.mistakeBook.splice(idx,1);
            user.score += 10;
        }
        this.saveUserDB(db);
        sessionStorage.setItem('currUser', JSON.stringify(user));
    }

    getUserMistakes(uid) {
        const db = this.getUserDB();
        const user = db.users.find(u=>u.id===uid);
        if(!user || !user.mistakeBook) return [];
        return this.getStaticDB().questions.filter(q => user.mistakeBook.includes(q.id));
    }

    addComment(cid, uid, txt) {
        const db = this.getUserDB();
        const user = db.users.find(u=>u.id===uid);
        if(!db.comments) db.comments=[];
        db.comments.push({ cid, user: user.name, avatar: user.avatar, txt, time: new Date().toLocaleDateString() });
        this.saveUserDB(db);
    }
    getComments(cid) { return (this.getUserDB().comments||[]).filter(c=>c.cid===cid); }
}

export const db = new StorageManager();
