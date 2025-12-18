// asset/js/views.js
import { db } from './storage.js';
import { SYSTEM_CONFIG } from './mockData.js';

// --- 輔助 ---
const getThumb = (c) => c.thumbnail || 'https://via.placeholder.com/400';

// --- Navbar (正確匯出) ---
export const Navbar = () => {
    const user = db.getCurrentUser();
    const btn = user 
        ? `<div style="display:flex;align-items:center;gap:10px"><span style="font-weight:bold">${user.name}</span><button class="btn btn-outline" data-action="logout">登出</button></div>`
        : `<button class="btn btn-primary" data-link="login">登入</button>`;
    
    return `<nav class="navbar"><div class="container nav-content"><a href="#" class="brand">📚 漢尼雲端</a><div class="nav-actions">${btn}</div></div></nav>`;
};

// --- Views ---
export const HomeView = {
    render: () => `<div class="container" style="text-align:center;padding:5rem 1rem"><h1 style="font-size:3rem;margin-bottom:1rem;color:var(--primary)">學習，無極限</h1><p style="margin-bottom:2rem;color:#666">50,000+ 智能題庫，專為你打造。</p><button class="btn btn-primary" style="padding:1rem 2rem;font-size:1.2rem" data-link="dashboard">開始學習</button></div>`,
    init: () => {}
};

export const AuthView = {
    renderLogin: () => `<div style="display:flex;justify-content:center;padding-top:3rem"><div style="background:white;padding:2rem;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.1);width:100%;max-width:400px"><h2 style="text-align:center;margin-bottom:1.5rem">登入</h2><form id="lf"><input type="text" name="u" class="form-input" placeholder="帳號" value="student" style="margin-bottom:1rem" required><input type="password" name="p" class="form-input" placeholder="密碼" value="123" style="margin-bottom:1.5rem" required><button class="btn btn-primary" style="width:100%">登入</button></form></div></div>`,
    renderRegister: () => `<div>註冊頁面</div>`,
    initLogin: (r) => document.getElementById('lf')?.addEventListener('submit', e=>{e.preventDefault(); db.login('student','123'); r.navigate('dashboard');}),
    initRegister: () => {}
};

export const DashboardView = {
    render: (filter) => {
        const courses = db.getAllCourses();
        const user = db.getCurrentUser();
        // 簡單篩選 (顯示前 12 筆範例)
        const display = courses.filter(c => (filter.grade==='all'||c.grade===filter.grade) && (filter.subject==='all'||c.subject===filter.subject)).slice(0, 12);
        
        return `<div class="container" style="padding-top:2rem">
            <div class="filter-bar">
                <select id="selG" class="form-input" style="width:auto;margin:0"><option value="all">全學年</option>${SYSTEM_CONFIG.GRADES.map(g=>`<option value="${g.id}">${g.label}</option>`).join('')}</select>
                <select id="selS" class="form-input" style="width:auto;margin:0"><option value="all">全科目</option>${Object.keys(SYSTEM_CONFIG.SUBJECTS).map(k=>`<option value="${k}">${SYSTEM_CONFIG.SUBJECTS[k].label}</option>`).join('')}</select>
            </div>
            <div class="course-grid">
                ${display.map(c => {
                    const p = Math.round((db.getCourseProgress(user.id, c.id).length/c.units.length)*100);
                    return `<div class="course-card" data-link="course" data-cid="${c.id}">
                        <div class="course-thumb"><span class="course-badge">${c.grade}</span><img src="${getThumb(c)}" loading="lazy"></div>
                        <div class="course-info"><div class="course-title">${c.title}</div><div class="progress-container"><div class="progress-bar" style="width:${p}%"></div></div></div>
                    </div>`;
                }).join('')}
            </div>
        </div>`;
    },
    init: (r) => {
        document.getElementById('selG').onchange = e => { r.filter.grade=e.target.value; r.render(); };
        document.getElementById('selS').onchange = e => { r.filter.subject=e.target.value; r.render(); };
    }
};

export const CourseView = {
    render: (params) => {
        const c = db.getCourse(params.id);
        if(!c) return '<div class="container">查無課程</div>';
        const user = db.getCurrentUser();
        const mode = params.mode || 'content';
        const progress = db.getCourseProgress(user.id, c.id);
        const uid = params.activeUnit || c.units[0].id;
        const unit = c.units.find(u => u.id === uid);

        const menu = c.units.map((u,i) => `<div class="unit-item ${u.id===uid?'active':''} ${progress.includes(u.id)?'done':''}" data-uid="${u.id}"><div class="unit-status">${progress.includes(u.id)?'✓':i+1}</div>${u.title}</div>`).join('');
        
        let main = '';
        if(mode==='quiz') {
            const qs = db.getCourseQuestions(c.id);
            main = qs.map((q,i)=>`<div class="quiz-block"><div class="quiz-q">Q${i+1}. ${q.question}</div><div>${q.options.map((o,j)=>`<div class="quiz-opt" data-qid="${q.id}" data-idx="${j}">${o}</div>`).join('')}</div><div class="quiz-exp" id="ex-${q.id}">${q.explanation}</div></div>`).join('');
        } else {
            main = `<div class="concept-block"><div class="concept-title">💡 重點摘要</div><p>${c.description}</p></div>`;
        }

        return `<div class="container learn-layout">
            <div class="content-area">
                <div class="lesson-header"><h1 class="lesson-title">${unit.title}</h1>
                    <div style="display:flex;gap:10px">
                        <button class="btn ${mode==='content'?'btn-primary':'btn-outline'}" id="tCon">📖 重點</button>
                        <button class="btn ${mode==='quiz'?'btn-primary':'btn-outline'}" id="tQuiz">📝 測驗</button>
                        <button class="btn ${progress.includes(uid)?'btn-primary':'btn-outline'}" id="btnFin">${progress.includes(uid)?'已完成':'標記完成'}</button>
                    </div>
                </div>
                ${main}
            </div>
            <div class="sidebar"><div class="sidebar-header">目錄</div><div class="unit-list">${menu}</div></div>
        </div>`;
    },
    init: (r) => {
        const cid = r.params.id;
        document.getElementById('tCon').onclick=()=>r.navigate('course',{id:cid,mode:'content'});
        document.getElementById('tQuiz').onclick=()=>r.navigate('course',{id:cid,mode:'quiz'});
        document.getElementById('btnFin').onclick=()=>{db.toggleUnitComplete(db.getCurrentUser().id, cid, r.params.activeUnit||db.getCourse(cid).units[0].id); r.render();};
        
        document.querySelectorAll('.unit-item').forEach(el=>el.onclick=()=>r.navigate('course',{id:cid,activeUnit:el.dataset.uid}));
        
        document.querySelectorAll('.quiz-opt').forEach(el=>el.onclick=()=>{
            const qid = el.dataset.qid;
            const q = db.getStaticDB().questions.find(x=>x.id===qid);
            const isC = parseInt(el.dataset.idx) === q.answer;
            const p = el.parentElement;
            p.querySelectorAll('.quiz-opt').forEach((b,i)=>{
                if(i===q.answer) b.classList.add('correct');
                else if(i===parseInt(el.dataset.idx)) b.classList.add('wrong');
            });
            document.getElementById(`ex-${qid}`).style.display='block';
            db.recordQuizResult(db.getCurrentUser().id, qid, isC);
        });
    }
};

// 暫存其他 Views
export const GameView = { render:()=>'', init:()=>{} };
export const MistakeView = { render:()=>`<div class="container" style="padding-top:2rem"><h1>錯題本</h1>${db.getUserMistakes(db.getCurrentUser().id).map(q=>`<div class="quiz-block"><div>${q.question}</div></div>`).join('')}</div>`, init:()=>{} };
export const TeacherView = { render:()=>'', init:()=>{} };
export const EditorView = { render:()=>'', init:()=>{} };
