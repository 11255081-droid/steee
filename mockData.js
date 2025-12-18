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

// ==========================================
// ★ 知識庫 (Knowledge Base) - 核心資料
// ==========================================
const KB = {
    // 英文：單字庫 (模擬 4000 單的結構)
    eng_words: [
        {w:'abandon', m:'放棄'}, {w:'absolute', m:'絕對的'}, {w:'calculate', m:'計算'}, {w:'economy', m:'經濟'},
        {w:'generate', m:'產生'}, {w:'habitat', m:'棲息地'}, {w:'identify', m:'識別'}, {w:'journal', m:'期刊'},
        {w:'keen', m:'敏銳的'}, {w:'label', m:'標籤'}, {w:'maintain', m:'維持'}, {w:'native', m:'本地的'},
        {w:'obtain', m:'獲得'}, {w:'pacify', m:'安撫'}, {w:'quality', m:'品質'}, {w:'radical', m:'激進的'},
        {w:'sacred', m:'神聖的'}, {w:'tactic', m:'策略'}, {w:'ultimate', m:'最終的'}, {w:'vacant', m:'空缺的'},
        {w:'welfare', m:'福利'}, {w:'yield', m:'產量'}, {w:'zeal', m:'熱誠'}, {w:'benefit', m:'利益'}
        // ... 透過組合生成更多
    ],
    eng_roots: ['spect (看)','struct (建)','dict (說)','fer (帶)','port (運)','mit (送)','duct (導)'],
    
    // 自然：元素與化合物
    elements: [
        {s:'H',n:'氫',wt:1}, {s:'He',n:'氦',wt:4}, {s:'C',n:'碳',wt:12}, {s:'N',n:'氮',wt:14}, {s:'O',n:'氧',wt:16},
        {s:'Na',n:'鈉',wt:23}, {s:'Mg',n:'鎂',wt:24}, {s:'Al',n:'鋁',wt:27}, {s:'S',n:'硫',wt:32}, {s:'Cl',n:'氯',wt:35.5},
        {s:'Ca',n:'鈣',wt:40}, {s:'Fe',n:'鐵',wt:56}, {s:'Cu',n:'銅',wt:63.5}, {s:'Zn',n:'鋅',wt:65}, {s:'Ag',n:'銀',wt:108}
    ],
    
    // 歷史：完整年表
    history: [
        {y:'1624', e:'荷蘭入主台灣'}, {y:'1661', e:'鄭成功攻台'}, {y:'1894', e:'甲午戰爭'}, {y:'1895', e:'馬關條約'},
        {y:'1911', e:'辛亥革命'}, {y:'1930', e:'霧社事件'}, {y:'1945', e:'二戰結束'}, {y:'1947', e:'二二八事件'},
        {y:'1971', e:'退出聯合國'}, {y:'1987', e:'解嚴'}, {y:'1789', e:'法國大革命'}, {y:'1776', e:'美國獨立'}
    ],

    // 國文：成語庫
    idioms: [
        {w:'按部就班',m:'做事依照順序',x:'按步就班'}, {w:'破釜沉舟',m:'下定決心',x:'破釜成舟'}, 
        {w:'臥薪嚐膽',m:'刻苦自勵',x:'臥薪嘗膽'}, {w:'絡繹不絕',m:'往來人多',x:'絡驛不絕'},
        {w:'別出心裁',m:'獨創一格',x:'別出新裁'}, {w:'剛愎自用',m:'固執己見',x:'剛復自用'}
    ]
};

// ==========================================
// ★ 智慧工廠 (Question Factory)
// ==========================================
const FACTORY = {
    // 數學：無限運算題
    math: (topic) => {
        const a = randInt(2, 10), b = randInt(1, 50), c = randInt(1, 5);
        const ans = a * c + b;
        return {
            q: `若函數 $f(x) = ${a}x + ${b}$，則 $f(${c})$ 之值為何？`,
            opts: [ans, ans+randInt(1,5), ans-randInt(1,5), ans*2],
            ans: 0,
            exp: `將 $x=${c}$ 代入：$${a}(${c}) + ${b} = ${ans}$。<br><strong>📌 小技巧：</strong> 先乘除後加減，注意正負號。`
        };
    },
    // 英文：單字與文法
    english: (topic) => {
        if(Math.random()>0.5) {
            const w = randItem(KB.eng_words);
            return {
                q: `Select the word that means "<b>${w.m}</b>".`,
                opts: [w.w, randItem(KB.eng_words).w, randItem(KB.eng_words).w, randItem(KB.eng_words).w],
                ans: 0,
                exp: `The word "<b>${w.w}</b>" means ${w.m}.`
            };
        } else {
            return {
                q: `If I ______ you, I would study harder.`,
                opts: ["were", "was", "am", "have been"],
                ans: 0,
                exp: `<strong>假設語氣 (Subjunctive Mood)：</strong> 與現在事實相反，Be 動詞一律用 were。<br><strong>📌 Tip:</strong> If + S + were ..., S + would/could + V.`
            };
        }
    },
    // 自然：化學計算
    science: (topic) => {
        if(topic.includes('化學') || Math.random()>0.5) {
            const e1 = randItem(KB.elements);
            const e2 = randItem(KB.elements);
            // 隨機組合成虛擬化合物計算分子量
            const n1 = randInt(1,3), n2 = randInt(1,3);
            const mw = e1.wt*n1 + e2.wt*n2;
            const formula = `${e1.s}${n1>1?n1:''}${e2.s}${n2>1?n2:''}`;
            return {
                q: `已知 ${e1.n}(${e1.s})原子量=${e1.wt}，${e2.n}(${e2.s})原子量=${e2.wt}。請問 <b>${formula}</b> 的分子量為何？`,
                opts: [mw, mw+10, mw-5, mw*2],
                ans: 0,
                exp: `分子量 = (${e1.wt}×${n1}) + (${e2.wt}×${n2}) = ${mw}。<br><strong>📌 觀念：</strong> 分子量為組成分子之所有原子的原子量總和。`
            };
        } else {
            return {
                q: `關於「粒線體」的功能，下列敘述何者正確？`,
                opts: ["細胞的能量工廠 (產生 ATP)", "進行光合作用", "控制物質進出細胞", "合成蛋白質"],
                ans: 0,
                exp: `粒線體負責進行呼吸作用，產生能量(ATP)，故被稱為能量工廠。<br><strong>📌 對照：</strong> 葉綠體才是進行光合作用的場所。`
            };
        }
    },
    // 社會：歷史與地理
    social: (topic) => {
        const h = randItem(KB.history);
        return {
            q: `<b>${h.y}年</b>發生了下列哪一件重大歷史事件？`,
            opts: [h.e, "霧社事件", "英法聯軍", "解嚴"],
            ans: 0,
            exp: `${h.y}年發生了「${h.e}」。<br><strong>📌 記憶法：</strong> 結合年代與當時的國際局勢一同記憶。`
        };
    },
    // 國文：成語與字音字形
    chinese: (topic) => {
        const i = randItem(KB.idioms);
        return {
            q: `下列選項中，何者用字<b>完全正確</b>？`,
            opts: [i.w, i.x, "莫明其妙", "迫不急待"],
            ans: 0,
            exp: `正確寫法為「${i.w}」，意思是${i.m}。其他常見錯誤如：${i.x}。`
        };
    }
};

// ==========================================
// 4. 生成與導出 (Generation)
// ==========================================
function generateMassiveData() {
    console.time("GEN");
    const courses = [];
    const questions = [];
    
    // 簡易課綱對照
    const TOPICS = {
        math: ['整數運算','一元一次','二元一次','直角坐標','比與比例','乘法公式','多項式','平方根','畢氏定理','因式分解','一元二次','等差數列','幾何圖形','相似形','圓形','二次函數','機率','三角函數','指數對數','向量','微積分'],
        english: ['現在簡單式','現在進行式','過去簡單式','未來式','完成式','被動語態','假設語氣','分詞構句','關係子句','名詞子句','倒裝句','動名詞','不定詞','連接詞','介系詞'],
        science: ['測量與密度','波動與聲音','光與成像','溫度與熱','原子結構','化學反應','酸鹼鹽','氧化還原','力與運動','功與能','電與磁','細胞','遺傳','演化','板塊構造','天氣氣候','宇宙天文'],
        social: ['台灣史','中國史','世界史','台灣地理','中國地理','世界地理','公民權利','法律常識','經濟生活','全球化'],
        chinese: ['絕句','律詩','宋詞','元曲','古文觀止','現代詩','修辭學','文字構造','書信題辭','成語應用']
    };

    SYSTEM_CONFIG.GRADES.forEach(g => {
        Object.keys(SYSTEM_CONFIG.SUBJECTS).forEach(s => {
            const topicList = TOPICS[s];
            topicList.forEach((topic, i) => {
                // 每個主題生成 2 堂課 (基礎/進階)
                ['核心觀念', '進階素養'].forEach((variant, vIdx) => {
                    const cid = `c_${g.id}_${s}_${i}_${vIdx}`;
                    courses.push({
                        id: cid,
                        grade: g.id,
                        subject: s,
                        title: `[${g.label}] ${topic}：${variant}`,
                        description: `本單元針對${topic}進行深度解析，適合${g.label}學生。內容涵蓋${variant}與解題技巧。`,
                        thumbnail: randItem(COVER_IMAGES[s]),
                        units: [{id:`u_${cid}_1`, title:`${variant} - 重點`}, {id:`u_${cid}_2`, title:`${variant} - 演練`}]
                    });

                    // 每堂課生成 30 題 -> 總計 50,000+
                    for(let k=0; k<30; k++) {
                        const qData = FACTORY[s](topic);
                        const finalOpts = [...qData.opts];
                        const correctVal = finalOpts[qData.ans];
                        finalOpts.sort(() => 0.5 - Math.random());
                        const newAnsIdx = finalOpts.indexOf(correctVal);

                        questions.push({
                            id: `q_${cid}_${k}`,
                            courseId: cid,
                            grade: g.id,
                            subject: s,
                            type: 'choice',
                            question: qData.q,
                            options: finalOpts,
                            answer: newAnsIdx,
                            explanation: qData.exp
                        });
                    }
                });
            });
        });
    });
    
    console.log(`✅ 資料庫建置完成：${courses.length} 課程, ${questions.length} 題目`);
    console.timeEnd("GEN");
    return { courses, questions };
}

const data = generateMassiveData();
export const STATIC_DB = { courses: data.courses, questions: data.questions };
