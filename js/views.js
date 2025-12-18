import { db } from './storage.js';
import { SYSTEM_CONFIG } from './mockData.js';

// 圖片防呆
const getThumb = (course) => course.thumbnail || 'https://via.placeholder.com/400x225?text=Course';

export const Navbar = () => {
    const user = db.getCurrentUser();
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? '🌙' : '☀️';
    const tBtn = `<button id="themeBtn" class="btn-outline" style="border:none;font-size:1.2rem;margin-right:10px">${theme}</button>`;
    
    if (!user) return `<nav class="navbar"><div class="nav-content"><a href="#" class="brand"><i class="fas fa-graduation-cap"></i> 漢尼雲端學院</a><div class="nav-actions">${tBtn}<button class="btn btn-primary" data-link="login">登入</button></div></div></nav>`;
    
    return `<nav class="navbar"><div class="nav-content"><a href="#" class="brand" data-link="dashboard"><i class="fas fa-graduation-cap"></i> 漢尼雲端學院</a><div class="nav-actions">${tBtn}<span style="font-weight:bold">${user.name}</span><button class="btn btn-outline" data-action="logout">登出</button></div></div></nav>`;
};

export const HomeView = {
    render: () => `<div class="container" style="text-align:center;padding:80px 20px"><h1 style="font-size:3rem;color:var(--primary);margin-bottom:20px">讓學習變得更簡單</h1><p style="font-size:1.2rem;color:var(--text-sub);margin-bottom:40px">收錄 4,000+ 核心單字、全歷史年表、數理化完整題庫。</p><button class="btn btn-primary" style="padding:12px 32px;font-size:1.2rem" data-link="dashboard">立即開始</button></div>`,
    init: () => {}
};

export const AuthView = {
    renderLogin: () => `<div style="display:flex;justify-content:center;align-items:center;height:80vh"><div style="background:white;padding:40px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.1);width:100%;max-width:400px"><h2 style="text-align:center;margin-bottom:20px;color:var(--primary)">學員登入</h2><form id="loginForm"><input type="text" name="u" class="form-input" placeholder="帳號 (student)" value="student" style="margin-bottom:15px" required><input type="password" name="p" class="form-input" placeholder="密碼 (123)" value="123" style="margin-bottom:20px" required><button class="btn btn-primary" style="width:100%">登入</button></form></div></div>`,
    renderRegister: () => `<div>註冊頁面 (略)</div>`,
    initLogin: (r) => document.getElementById('loginForm')?.addEventListener('submit', e=>{e.preventDefault(); const res=db.login(e.target.u.value,e.target.p.value); if(res.success) r.navigate('dashboard'); else alert(res.message);}),
    initRegister: () => {}
};

export const DashboardView = {
    render: (filter) => {
        const allCourses = db.getAllCourses();
        const user = db.getCurrentUser();
        let filtered = filter.grade !== 'all' ? allCourses.filter(c => c.grade === filter.grade) : allCourses;
        const subjects = Object.keys(SYSTEM_CONFIG.SUBJECTS);
        let html = '';

        subjects.forEach(sKey => {
            if(filter.subject !== 'all' && filter.subject !== sKey) return;
            const subj = SYSTEM_CONFIG.SUBJECTS[sKey];
            const courses = filtered.filter(c => c.subject === sKey).slice(0, 4);

            if (courses.length > 0) {
                html += `<div class="subject-group">
                    <div class="subject-title subj-${sKey}">${subj.icon} ${subj.label}精選課程</div>
                    <div class="course-grid">
                        ${courses.map(c => {
                            const pct = Math.round((db.getCourseProgress(user.id, c.id).length / c.units.length) * 100);
                            return `<div class="course-card" data-link="course" data-courseid="${c.id}">
                                <div class="course-thumb"><span class="course-badge">${SYSTEM_CONFIG.GRADES.find(g=>g.id===c.grade).label}</span><img src="${getThumb(c)}" loading="lazy"></div>
                                <div class="course-body"><div class="course-name">${c.title}</div><div class="course-progress"><div class="progress-bar"><div class="progress-val" style="width:${pct}%"></div></div><span>${pct}%</span></div></div>
                            </div>`;
                        }).join('')}
                    </div>
                </div>`;
            }
        });

        return `<div class="container">
            <div class="dashboard-header"><div class="dashboard-title"><h1>早安，${user.name}</h1><p>準備好開始今天的學習了嗎？</p></div><div class="dashboard-stats"><div class="stat-item"><div class="stat-num">${user.streak}</div><div class="stat-label">連續天數</div></div><div class="stat-item"><div class="stat-num">${user.score}</div><div class="stat-label">積分</div></div></div></div>
            <div class="filter-bar">
                <span style="font-weight:bold">課程篩選：</span>
                <select id="selGrade" class="filter-select"><option value="all">所有年級</option>${SYSTEM_CONFIG.GRADES.map(g=>`<option value="${g.id}" ${filter.grade===g.id?'selected':''}>${g.label}</option>`).join('')}</select>
                <select id="selSubj" class="filter-select"><option value="all">所有科目</option>${Object.keys(SYSTEM_CONFIG.SUBJECTS).map(k=>`<option value="${k}" ${filter.subject===k?'selected':''}>${SYSTEM_CONFIG.SUBJECTS[k].label}</option>`).join('')}</select>
            </div>
            ${html || '<div style="text-align:center;padding:40px;color:#999">沒有符合條件的課程</div>'}
        </div>`;
    },
    init: (r) => {
        document.getElementById('selGrade').onchange = e => { r.filter.grade = e.target.value; r.render(); };
        document.getElementById('selSubj').onchange = e => { r.filter.subject = e.target.value; r.render(); };
    }
};

export const CourseView = {
    render: (params) => {
        const c = db.getCourse(params.id);
        if(!c) return '<div class="container">課程不存在</div>';
        const user = db.getCurrentUser();
        const activeUid = params.activeUnit || c.units[0].id;
        const activeUnit = c.units.find(u => u.id === activeUid);
        const progress = db.getCourseProgress(user.id, c.id);

        // 題目列表
        const qs = db.getCourseQuestions(c.id);
        const quizHTML = qs.map((q,i) => `
            <div class="quiz-box" id="q-${q.id}">
                <div class="q-stem"><span style="color:var(--primary)">Q${i+1}.</span> ${q.question}</div>
                <div>${q.options.map((o,j)=>`<button class="q-opt" data-qid="${q.id}" data-idx="${j}">${o}</button>`).join('')}</div>
                <div class="q-exp" id="exp-${q.id}"></div>
            </div>`).join('');

        return `<div class="container learn-container">
            <div class="content-area">
                <div class="lesson-header"><div class="content-tag">${c.subject.toUpperCase()}</div><h1 class="lesson-title">${activeUnit.title}</h1></div>
                <div class="content-card">
                    <h3 style="margin-bottom:16px;color:var(--primary-dark)">📖 重點觀念</h3>
                    <p>${c.description}</p>
                    <div class="key-point"><div class="kp-title"><i class="fas fa-lightbulb"></i> 翰林名師點評</div>掌握本單元核心，考試無往不利。</div>
                </div>
                <h2 style="margin:30px 0 20px;font-weight:bold">📝 單元測驗 (${qs.length}題)</h2>
                ${quizHTML}
            </div>
            <div class="sidebar">
                <div class="sidebar-header">課程目錄 (${progress.length}/${c.units.length})</div>
                <div class="unit-list">
                    ${c.units.map((u,i)=>`<div class="unit-item ${u.id===activeUid?'active':''} ${progress.includes(u.id)?'done':''}" data-uid="${u.id}"><div class="unit-status">${progress.includes(u.id)?'✓':i+1}</div>${u.title}</div>`).join('')}
                </div>
            </div>
        </div>`;
    },
    init: (r) => {
        document.querySelectorAll('.unit-item').forEach(el=>el.onclick=()=>r.navigate('course',{id:r.params.id, activeUnit:el.dataset.uid}));
        document.querySelectorAll('.q-opt').forEach(btn=>{
            btn.onclick=()=>{
                const {qid, idx} = btn.dataset;
                const q = db.getStaticDB().questions.find(x=>x.id===qid);
                const isC = parseInt(idx)===q.answer;
                const box = document.getElementById(`q-${qid}`);
                box.querySelectorAll('.q-opt').forEach((b,i)=>{
                    b.disabled=true;
                    if(i===q.answer) b.classList.add('correct');
                    else if(i===parseInt(idx)) b.classList.add('wrong');
                });
                const ex = document.getElementById(`exp-${qid}`);
                ex.innerHTML = isC ? '🎉 <strong>答對了！</strong>' : `⚠️ <strong>錯誤</strong><br>${q.explanation}`;
                ex.style.display='block';
            };
        });
    }
};

export const GameView = { render:()=>'', init:()=>{} }; // 暫略
export const TeacherView = { render:()=>'', init:()=>{} };
export const EditorView = { render:()=>'', init:()=>{} };
export const MistakeView = { render:()=>'', init:()=>{} };
