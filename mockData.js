// asset/js/mockData.js

// 1. 系統設定
export const SYSTEM_CONFIG = {
    SUBJECTS: {
        chinese: { id: 'chinese', label: '國文', icon: '📖', color: '#E11D48' },
        english: { id: 'english', label: '英文', icon: '🔤', color: '#2563EB' },
        math: { id: 'math', label: '數學', icon: '🧮', color: '#F59E0B' },
        science: { id: 'science', label: '自然', icon: '🧪', color: '#10B981' },
        social: { id: 'social', label: '社會', icon: '🌏', color: '#8B5CF6' }
    },
    GRADES: [
        { id: 'g7', label: '七年級' }, { id: 'g8', label: '八年級' }, { id: 'g9', label: '九年級' },
        { id: 'h1', label: '高一' }, { id: 'h2', label: '高二' }, { id: 'h3', label: '高三' }
    ]
};

// 2. 輔助函式
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// 3. 巨量知識庫 (Knowledge Base)
const KB = {
    images: {
        math: ['https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600','https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600'],
        english: ['https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600','https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600'],
        science: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600','https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600'],
        social: ['https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600','https://images.unsplash.com/photo-1552086432-8495db631336?w=600'],
        chinese: ['https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=600','https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600']
    },
    vocab: [
        {w:"analyze",m:"分析",t:"v"}, {w:"benefit",m:"利益",t:"n"}, {w:"concept",m:"概念",t:"n"}, {w:"diverse",m:"多樣的",t:"adj"},
        {w:"economy",m:"經濟",t:"n"}, {w:"factor",m:"因素",t:"n"}, {w:"global",m:"全球的",t:"adj"}, {w:"habitat",m:"棲息地",t:"n"}
    ],
    elements: [
        {s:"H",n:"氫",w:1}, {s:"He",n:"氦",w:4}, {s:"C",n:"碳",w:12}, {s:"N",n:"氮",w:14}, {s:"O",n:"氧",w:16},
        {s:"Na",n:"鈉",w:23}, {s:"Mg",n:"鎂",w:24}, {s:"Al",n:"鋁",w:27}, {s:"S",n:"硫",w:32}, {s:"Cl",n:"氯",w:35.5}
    ],
    history: [
        {y:"1894",e:"甲午戰爭",r:"馬關條約"}, {y:"1911",e:"辛亥革命",r:"中華民國建立"}, {y:"1789",e:"法國大革命",r:"人權宣言"},
        {y:"1945",e:"二戰結束",r:"聯合國成立"}, {y:"1987",e:"解嚴",r:"開放黨禁"}, {y:"1969",e:"登陸月球",r:"太空競賽高峰"}
    ],
    idioms: [
        {w:"按部就班",m:"做事依照順序",x:"按步就班"}, {w:"破釜沉舟",m:"下定決心",x:"破釜成舟"}, 
        {w:"臥薪嚐膽",m:"刻苦自勵",x:"臥薪嘗膽"}, {w:"絡繹不絕",m:"往來人多",x:"絡驛不絕"}
    ]
};

// 4. 完整課綱地圖 (Curriculum Map)
const TOPICS = {
    math: ['整數運算','一元一次','二元一次','直角坐標','比與比例','乘法公式','多項式','平方根','畢氏定理','因式分解','一元二次','等差數列','幾何圖形','相似形','圓形','二次函數','機率','三角函數','指數對數','向量','微積分'],
    english: ['現在簡單式','現在進行式','過去簡單式','未來式','完成式','被動語態','假設語氣','分詞構句','關係子句','名詞子句','倒裝句','動名詞','不定詞','連接詞','介系詞'],
    science: ['測量與密度','波動與聲音','光與成像','溫度與熱','原子結構','化學反應','酸鹼鹽','氧化還原','力與運動','功與能','電與磁','細胞','遺傳','演化','板塊構造','天氣氣候','宇宙天文'],
    social: ['台灣史','中國史','世界史','台灣地理','中國地理','世界地理','公民權利','法律常識','經濟生活','全球化'],
    chinese: ['絕句','律詩','宋詞','元曲','古文觀止','現代詩','修辭學','文字構造','書信題辭','成語應用']
};

// 5. 智慧題型工廠 (Question Factory)
const FACTORY = {
    math: (topic) => {
        const a=randInt(2,9), b=randInt(10,50), c=randInt(2,5);
        const ans=a*c+b;
        return {
            q: `<p class="q-text">【${topic}】若函數 $f(x) = ${a}x + ${b}$，則 $f(${c})$ 之值為何？</p>`,
            opts: [ans, ans+randInt(1,5), ans-randInt(1,5), ans*2],
            ans: 0,
            exp: `將 $x=${c}$ 代入：$${a}(${c}) + ${b} = ${ans}$。`
        };
    },
    english: (topic) => {
        if(Math.random()>0.5) {
            const w = randItem(KB.vocab);
            return {
                q: `<p class="q-text">【Vocabulary】What is the meaning of "<b>${w.w}</b>"?</p>`,
                opts: [w.m, "危險的", "美麗的", "困難的"],
                ans: 0,
                exp: `${w.w} (${w.t}.) means ${w.m}.`
            };
        } else {
            return {
                q: `<p class="q-text">【Grammar】If I ______ you, I would study harder.</p>`,
                opts: ["were", "was", "am", "have been"],
                ans: 0,
                exp: "假設語氣中，與現在事實相反的 Be 動詞一律用 were。"
            };
        }
    },
    science: (topic) => {
        const e = randItem(KB.elements);
        return {
            q: `<p class="q-text">【${topic}】化學元素 <b>${e.n}</b> 的符號與原子量為何？</p>`,
            opts: [`${e.s}, ${e.w}`, `${e.s}, ${e.w+1}`, `X, ${e.w}`, `${e.s}2, ${e.w*2}`],
            ans: 0,
            exp: `${e.n}的符號是 ${e.s}，原子量約為 ${e.w}。`
        };
    },
    social: (topic) => {
        const h = randItem(KB.history);
        return {
            q: `<p class="q-text">【${topic}】<b>${h.y}年</b>發生了什麼重大事件？</p>`,
            opts: [h.e, "霧社事件", "英法聯軍", "解嚴"],
            ans: 0,
            exp: `${h.y}年發生了「${h.e}」，其影響為${h.r}。`
        };
    },
    chinese: (topic) => {
        const i = randItem(KB.idioms);
        return {
            q: `<p class="q-text">【成語】下列選項中，何者用字<b>完全正確</b>？</p>`,
            opts: [i.w, i.x, "莫明其妙", "迫不急待"],
            ans: 0,
            exp: `正確寫法為「${i.w}」。常見錯誤為「${i.x}」。`
        };
    }
};

// 6. 生成主程式
function generateMassiveData() {
    console.log('⚡ 正在建構 50,000 題庫...');
    const courses = [];
    const questions = [];
    
    SYSTEM_CONFIG.GRADES.forEach(g => {
        Object.keys(SYSTEM_CONFIG.SUBJECTS).forEach(s => {
            const topics = TOPICS[s];
            topics.forEach((topic, i) => {
                ['觀念解析', '素養題組', '歷屆試題'].forEach((variant, vIdx) => {
                    const cid = `c_${g.id}_${s}_${i}_${vIdx}`;
                    const thumb = randItem(KB.images[s]);
                    
                    courses.push({
                        id: cid, grade: g.id, subject: s,
                        title: `[${g.label}] ${topic}：${variant}`,
                        description: `本單元針對 108 課綱「${topic}」進行${variant}解析。`,
                        thumbnail: thumb,
                        units: [{id:`u_${cid}_1`, title:`${variant} - 重點`}, {id:`u_${cid}_2`, title:`${variant} - 演練`}]
                    });

                    for(let k=0; k<25; k++) { // 每課 25 題
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
    });
    return { courses, questions };
}

const data = generateMassiveData();
export const STATIC_DB = { courses: data.courses, questions: data.questions };
