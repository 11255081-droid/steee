// asset/js/mockData.js

export const SYSTEM_CONFIG = {
    SUBJECTS: {
        chinese: { id: 'chinese', label: '國文', icon: '📖', color: '#D84315' },
        english: { id: 'english', label: '英文', icon: '🔤', color: '#1565C0' },
        math: { id: 'math', label: '數學', icon: '🧮', color: '#F9A825' },
        science: { id: 'science', label: '自然', icon: '🧪', color: '#2E7D32' },
        social: { id: 'social', label: '社會', icon: '🌏', color: '#6A1B9A' }
    },
    GRADES: [
        { id: 'g7', label: '七年級' }, { id: 'g8', label: '八年級' }, { id: 'g9', label: '九年級' },
        { id: 'h1', label: '高一' }, { id: 'h2', label: '高二' }, { id: 'h3', label: '高三' }
    ]
};

const COVER_IMAGES = {
    math: ['https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600', 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600'],
    english: ['https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600'],
    science: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600', 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600'],
    social: ['https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600', 'https://images.unsplash.com/photo-1552086432-8495db631336?w=600'],
    chinese: ['https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=600', 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600']
};

function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// ★ 修復重點：統一屬性名稱，避免 undefined 錯誤
const KB = {
    eng_words: [
        {w:'abandon', m:'放棄'}, {w:'absolute', m:'絕對的'}, {w:'calculate', m:'計算'}, {w:'economy', m:'經濟'},
        {w:'generate', m:'產生'}, {w:'habitat', m:'棲息地'}, {w:'identify', m:'識別'}, {w:'journal', m:'期刊'},
        {w:'keen', m:'敏銳的'}, {w:'label', m:'標籤'}, {w:'maintain', m:'維持'}, {w:'native', m:'本地的'},
        {w:'obtain', m:'獲得'}, {w:'pacify', m:'安撫'}, {w:'quality', m:'品質'}, {w:'radical', m:'激進的'},
        {w:'sacred', m:'神聖的'}, {w:'tactic', m:'策略'}, {w:'ultimate', m:'最終的'}, {w:'vacant', m:'空缺的'}
    ],
    // 統一使用 wt (weight) 代表原子量
    elements: [
        {s:'H',n:'氫',wt:1}, {s:'He',n:'氦',wt:4}, {s:'Li',n:'鋰',wt:7}, {s:'Be',n:'鈹',wt:9}, {s:'B',n:'硼',wt:11},
        {s:'C',n:'碳',wt:12}, {s:'N',n:'氮',wt:14}, {s:'O',n:'氧',wt:16}, {s:'F',n:'氟',wt:19}, {s:'Ne',n:'氖',wt:20},
        {s:'Na',n:'鈉',wt:23}, {s:'Mg',n:'鎂',wt:24}, {s:'Al',n:'鋁',wt:27}, {s:'Si',n:'矽',wt:28}, {s:'P',n:'磷',wt:31},
        {s:'S',n:'硫',wt:32}, {s:'Cl',n:'氯',wt:35.5}, {s:'K',n:'鉀',wt:39}, {s:'Ca',n:'鈣',wt:40}, {s:'Fe',n:'鐵',wt:56},
        {s:'Cu',n:'銅',wt:63.5}, {s:'Zn',n:'鋅',wt:65}, {s:'Ag',n:'銀',wt:108}, {s:'Au',n:'金',wt:197}, {s:'Hg',n:'汞',wt:200}
    ],
    compounds: [
        {f:'H2O',n:'水'}, {f:'CO2',n:'二氧化碳'}, {f:'NaCl',n:'氯化鈉'}, {f:'HCl',n:'鹽酸'}, {f:'H2SO4',n:'硫酸'},
        {f:'NaOH',n:'氫氧化鈉'}, {f:'CaCO3',n:'碳酸鈣'}, {f:'C6H12O6',n:'葡萄糖'}, {f:'NH3',n:'氨'}, {f:'CH4',n:'甲烷'}
    ],
    history: [
        {y:'1624', e:'荷蘭入主台灣'}, {y:'1661', e:'鄭成功攻台'}, {y:'1894', e:'甲午戰爭'}, {y:'1895', e:'馬關條約'},
        {y:'1911', e:'辛亥革命'}, {y:'1930', e:'霧社事件'}, {y:'1945', e:'二戰結束'}, {y:'1947', e:'二二八事件'},
        {y:'1987', e:'解除戒嚴'}, {y:'1789', e:'法國大革命'}, {y:'1776', e:'美國獨立'}
    ],
    idioms: [
        {w:'按部就班',m:'做事依照順序',x:'按步就班'}, {w:'破釜沉舟',m:'下定決心',x:'破釜成舟'}, 
        {w:'臥薪嚐膽',m:'刻苦自勵',x:'臥薪嘗膽'}, {w:'絡繹不絕',m:'往來人多',x:'絡驛不絕'},
        {w:'別出心裁',m:'獨創一格',x:'別出新裁'}, {w:'剛愎自用',m:'固執己見',x:'剛復自用'}
    ],
    topics: {
        math: ['整數運算','一元一次','二元一次','直角坐標','比與比例','乘法公式','多項式','平方根','畢氏定理','因式分解','一元二次','等差數列','幾何圖形','相似形','圓形','二次函數','機率','三角函數','指數對數','向量','微積分'],
        english: ['現在簡單式','現在進行式','過去簡單式','未來式','完成式','被動語態','假設語氣','分詞構句','關係子句','名詞子句','倒裝句','動名詞','不定詞','連接詞','介系詞'],
        science: ['測量與密度','波動與聲音','光與成像','溫度與熱','原子結構','化學反應','酸鹼鹽','氧化還原','力與運動','功與能','電與磁','細胞','遺傳','演化','板塊構造','天氣氣候'],
        social: ['台灣史','中國史','世界史','台灣地理','中國地理','世界地理','公民權利','法律常識','經濟生活','全球化'],
        chinese: ['絕句','律詩','宋詞','元曲','古文觀止','現代詩','修辭學','文字構造','書信題辭','成語應用']
    }
};

const FACTORY = {
    math: (topic) => {
        const a = randInt(2, 9), b = randInt(10, 50), c = randInt(2, 5);
        const ans = a * c + b;
        return {
            q: `<p class="q-text">【${topic}】若函數 $f(x) = ${a}x + ${b}$，則 $f(${c})$ 之值為何？</p>`,
            opts: [ans, ans+randInt(1,5), ans-randInt(1,5), ans*2],
            ans: 0,
            exp: `將 $x=${c}$ 代入：$${a}(${c}) + ${b} = ${ans}$。`
        };
    },
    english: (topic) => {
        if(Math.random()>0.5) {
            const w = randItem(KB.eng_words);
            return {
                q: `<p class="q-text">【單字】Choose the meaning of "<b>${w.w}</b>".</p>`,
                opts: [w.m, "危險的", "美麗的", "困難的"],
                ans: 0,
                exp: `${w.w} 的意思是「${w.m}」。`
            };
        } else {
            return {
                q: `<p class="q-text">【文法】If I ______ you, I would go.</p>`,
                opts: ["were", "was", "am", "have been"],
                ans: 0,
                exp: "假設語氣與現在事實相反，Be 動詞用 were。"
            };
        }
    },
    science: (topic) => {
        if (topic.includes('化學') || topic.includes('原子') || Math.random()>0.5) {
            const e1 = randItem(KB.elements);
            const e2 = randItem(KB.elements);
            const n1 = randInt(1,2), n2 = randInt(1,3);
            const mw = (e1.wt * n1) + (e2.wt * n2); // 這裡之前可能因為 wt 不存在而出錯
            const formula = `${e1.s}${n1>1?n1:''}${e2.s}${n2>1?n2:''}`;
            return {
                q: `<p class="q-text">【${topic}】已知 ${e1.n}(${e1.wt})、${e2.n}(${e2.wt})，則 <b>${formula}</b> 的分子量為何？</p>`,
                opts: [mw, mw+10, mw-5, mw*2],
                ans: 0,
                exp: `分子量 = (${e1.wt}×${n1}) + (${e2.wt}×${n2}) = ${mw}。`
            };
        } else {
            return {
                q: `<p class="q-text">【${topic}】關於粒線體的功能，下列何者正確？</p>`,
                opts: ["產生能量 (ATP)", "進行光合作用", "控制物質進出", "合成蛋白質"],
                ans: 0,
                exp: "粒線體是細胞的能量工廠。"
            };
        }
    },
    social: (topic) => {
        const h = randItem(KB.history);
        return {
            q: `<p class="q-text">【${topic}】<b>${h.y}年</b>發生了什麼事？</p>`,
            opts: [h.e, "霧社事件", "解嚴", "冷戰結束"],
            ans: 0,
            exp: `${h.y}年發生了「${h.e}」。`
        };
    },
    chinese: (topic) => {
        const i = randItem(KB.idioms);
        return {
            q: `<p class="q-text">【成語】下列何者用字<b>正確</b>？</p>`,
            opts: [i.w, i.x, "莫明其妙", "迫不急待"],
            ans: 0,
            exp: `正確為「${i.w}」。(${i.m})`
        };
    }
};

function generateMassiveData() {
    console.time("GEN");
    const courses = [];
    const questions = [];
    let qGlobalId = 0;

    SYSTEM_CONFIG.GRADES.forEach(g => {
        Object.keys(SYSTEM_CONFIG.SUBJECTS).forEach(s => {
            const topics = KB.topics[s] || ['綜合練習'];
            topics.forEach((topic, i) => {
                const cid = `c_${g.id}_${s}_${i}`;
                const thumb = randItem(COVER_IMAGES[s]);
                
                courses.push({
                    id: cid, grade: g.id, subject: s, title: `[${g.label}] ${topic}`,
                    description: `本單元針對${topic}進行解析。`,
                    thumbnail: thumb,
                    units: [{id:`u_${cid}_1`, title:`${topic} - 重點`}, {id:`u_${cid}_2`, title:`${topic} - 演練`}]
                });

                // 每堂課 20 題，總共約 40,000+ 題
                for(let k=0; k<20; k++) {
                    qGlobalId++;
                    const qData = FACTORY[s](topic);
                    const finalOpts = [...qData.opts];
                    const correctVal = finalOpts[qData.ans];
                    finalOpts.sort(() => 0.5 - Math.random());
                    const newAnsIdx = finalOpts.indexOf(correctVal);

                    questions.push({
                        id: `q_${cid}_${k}`, courseId: cid, grade: g.id, subject: s, type: 'choice',
                        question: qData.q, options: finalOpts, answer: newAnsIdx, explanation: qData.exp
                    });
                }
            });
        });
    });
    console.timeEnd("GEN");
    return { courses, questions };
}

const data = generateMassiveData();
export const STATIC_DB = { courses: data.courses, questions: data.questions };
