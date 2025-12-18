import { STATIC_DB } from './mockData.js';

const USER_DB_KEY = 'hanny_user_v2';
const DEFAULT_USER = { id: 'u1', name: 'Student', role: 'student', score: 0, streak: 1, mistakeBook: [], avatar: 'https://ui-avatars.com/api/?name=S' };

export class StorageManager {
    constructor() { this.init(); }
    init() { if (!localStorage.getItem(USER_DB_KEY)) localStorage.setItem(USER_DB_KEY, JSON.stringify({ users: [DEFAULT_USER], progress: {}, comments: [] })); }
    getUserDB() { return JSON.parse(localStorage.getItem(USER_DB_KEY)); }
    saveUserDB(d) { localStorage.setItem(USER_DB_KEY, JSON.stringify(d)); }
    getStaticDB() { return STATIC_DB; }
    
    login(u,p) { 
        const user = this.getUserDB().users[0]; 
        sessionStorage.setItem('curr', JSON.stringify(user)); 
        return {success:true}; 
    }
    register(d) { return {success:true}; }
    logout() { sessionStorage.removeItem('curr'); window.location.reload(); }
    getCurrentUser() { return JSON.parse(sessionStorage.getItem('curr')); }
    
    getAllCourses() { return this.getStaticDB().courses; }
    getCourse(id) { return this.getStaticDB().courses.find(c=>c.id===id); }
    getCourseQuestions(cid) { return this.getStaticDB().questions.filter(q=>q.courseId===cid); }
    getRandomQuestions(n, cid) { 
        let pool = this.getStaticDB().questions;
        if(cid) pool=pool.filter(q=>q.courseId===cid);
        return pool.sort(()=>0.5-Math.random()).slice(0,n);
    }
    
    getCourseProgress(uid, cid) { return this.getUserDB().progress?.[uid]?.[cid] || []; }
    toggleUnitComplete(uid, cid, unitId) {
        const db = this.getUserDB();
        if(!db.progress) db.progress={}; if(!db.progress[uid]) db.progress[uid]={}; if(!db.progress[uid][cid]) db.progress[uid][cid]=[];
        const list = db.progress[uid][cid];
        const idx = list.indexOf(unitId);
        idx===-1 ? list.push(unitId) : list.splice(idx,1);
        this.saveUserDB(db);
    }
    
    recordQuizResult(uid, qid, isC) {
        const db = this.getUserDB();
        const u = db.users.find(x=>x.id===uid);
        if(!u.mistakeBook) u.mistakeBook=[];
        if(!isC && !u.mistakeBook.includes(qid)) u.mistakeBook.push(qid);
        else if(isC) { const i=u.mistakeBook.indexOf(qid); if(i!==-1) u.mistakeBook.splice(i,1); u.score+=10; }
        this.saveUserDB(db);
        sessionStorage.setItem('curr', JSON.stringify(u));
    }
    
    getUserMistakes(uid) {
        const u = this.getUserDB().users.find(x=>x.id===uid);
        if(!u || !u.mistakeBook) return [];
        return this.getStaticDB().questions.filter(q=>u.mistakeBook.includes(q.id));
    }
    
    getComments(cid) { return (this.getUserDB().comments||[]).filter(c=>c.cid===cid); }
    addComment(cid, uid, txt) {
        const db = this.getUserDB();
        const u = db.users.find(x=>x.id===uid);
        if(!db.comments) db.comments=[];
        db.comments.push({cid, userName:u.name, userAvatar:u.avatar, text:txt, time:new Date().toLocaleDateString()});
        this.saveUserDB(db);
    }
}

export const db = new StorageManager();
