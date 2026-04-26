'use client';

import { useState } from 'react';

// 题目数据
const questions = [
  {
    id: 1,
    question: '周五晚上，你突然想做点什么',
    options: [
      { text: '立刻行动，先干了再说', type: 'action' },
      { text: '想了三小时还没决定', type: 'overthink' },
      { text: '算了，躺着吧', type: 'avoid' },
      { text: '随机选一个最离谱的', type: 'chaos' }
    ]
  },
  {
    id: 2,
    question: '面对一个deadline',
    options: [
      { text: '提前完成，稳如老狗', type: 'action' },
      { text: '反复确认是不是理解错了', type: 'overthink' },
      { text: '假装没看见', type: 'avoid' },
      { text: '最后一秒交，心跳加速', type: 'chaos' }
    ]
  },
  {
    id: 3,
    question: '有人约你出去玩',
    options: [
      { text: '好啊！几点？', type: 'action' },
      { text: '他是客气还是真想约我？', type: 'overthink' },
      { text: '已读不回', type: 'avoid' },
      { text: '行，但我可能会迟到两小时', type: 'chaos' }
    ]
  },
  {
    id: 4,
    question: '遇到一个bug',
    options: [
      { text: '查文档，定位问题，解决', type: 'action' },
      { text: '是我的问题还是环境的问题？', type: 'overthink' },
      { text: '重启试试，不行就明天再说', type: 'avoid' },
      { text: '随便改改，能跑就行', type: 'chaos' }
    ]
  },
  {
    id: 5,
    question: '你的手机突然卡住了',
    options: [
      { text: '重启，清理缓存', type: 'action' },
      { text: '是不是中毒了？要不要恢复出厂？', type: 'overthink' },
      { text: '忍着用', type: 'avoid' },
      { text: '摔一下试试', type: 'chaos' }
    ]
  },
  {
    id: 6,
    question: '别人发了条模糊的消息',
    options: [
      { text: '直接问：什么意思？', type: 'action' },
      { text: '他是不是生气了？我做错什么了？', type: 'overthink' },
      { text: '不回，等他说清楚', type: 'avoid' },
      { text: '回个表情包', type: 'chaos' }
    ]
  },
  {
    id: 7,
    question: '你的计划被打乱了',
    options: [
      { text: '立刻调整，继续推进', type: 'action' },
      { text: '为什么会这样？我哪里没想到？', type: 'overthink' },
      { text: '算了，不做了', type: 'avoid' },
      { text: '那就随便搞搞吧', type: 'chaos' }
    ]
  },
  {
    id: 8,
    question: '需要做一个重要决定',
    options: [
      { text: '列出利弊，快速决策', type: 'action' },
      { text: '想了一周还在纠结', type: 'overthink' },
      { text: '拖到不得不决定为止', type: 'avoid' },
      { text: '抛硬币', type: 'chaos' }
    ]
  },
  {
    id: 9,
    question: '看到一个新技术/新事物',
    options: [
      { text: '马上试试', type: 'action' },
      { text: '先研究一下原理和风险', type: 'overthink' },
      { text: '等别人用了再说', type: 'avoid' },
      { text: '不管三七二十一，直接上手', type: 'chaos' }
    ]
  },
  {
    id: 10,
    question: '你的一天通常是',
    options: [
      { text: '按计划执行，效率拉满', type: 'action' },
      { text: '想做的事太多，结果都没做', type: 'overthink' },
      { text: '能躺就不坐', type: 'avoid' },
      { text: '每天都是新剧本', type: 'chaos' }
    ]
  }
];

// 结果数据
const results = {
  'action-overthink': {
    name: 'DDL祭司',
    summary: '行动力与焦虑并存的矛盾体',
    keywords: ['执行力MAX', '事前焦虑', '事后复盘狂魔'],
    副本: '「deadline前的最后冲刺」',
    技能: '能在压力下爆发超常战斗力',
    建议: '少想多做，你比你以为的更靠谱',
    分享: '我是DDL祭司，行动力与焦虑并存的矛盾体。我的副本是「deadline前的最后冲刺」，隐藏技能是能在压力下爆发超常战斗力。'
  },
  'action-avoid': {
    name: '临时抱佛脚战神',
    summary: '能拖就拖，但关键时刻从不掉链子',
    keywords: ['选择性勤奋', '压线完成', '奇迹制造机'],
    副本: '「最后一秒的逆袭」',
    技能: 'deadline前一小时完成一周的工作量',
    建议: '偶尔提前一点，你会发现生活更轻松',
    分享: '我是临时抱佛脚战神，能拖就拖，但关键时刻从不掉链子。我的副本是「最后一秒的逆袭」，隐藏技能是deadline前一小时完成一周的工作量。'
  },
  'action-chaos': {
    name: '精神内耗法师',
    summary: '想得多，做得快，但方向可能是错的',
    keywords: ['行动派', '路径混乱', '结果随缘'],
    副本: '「高速运转的迷宫」',
    技能: '用最快的速度走最弯的路',
    建议: '慢一点，方向比速度重要',
    分享: '我是精神内耗法师，想得多，做得快，但方向可能是错的。我的副本是「高速运转的迷宫」，隐藏技能是用最快的速度走最弯的路。'
  },
  'overthink-avoid': {
    name: '装死型选手',
    summary: '想太多，做太少，最后选择躺平',
    keywords: ['思维过载', '行动瘫痪', '佛系人生'],
    副本: '「思考者的坟墓」',
    技能: '能把任何事情想到放弃',
    建议: '先做再想，完成比完美重要',
    分享: '我是装死型选手，想太多，做太少，最后选择躺平。我的副本是「思考者的坟墓」，隐藏技能是能把任何事情想到放弃。'
  },
  'overthink-chaos': {
    name: '关系脑补师',
    summary: '脑内小剧场导演，现实随机播放',
    keywords: ['过度解读', '行为迷惑', '自我感动'],
    副本: '「平行世界的自己」',
    技能: '一句话能脑补出八集连续剧',
    建议: '别人没你想的那么复杂',
    分享: '我是关系脑补师，脑内小剧场导演，现实随机播放。我的副本是「平行世界的自己」，隐藏技能是一句话能脑补出八集连续剧。'
  },
  'avoid-chaos': {
    name: '赛博咸鱼',
    summary: '能躺就不坐，偶尔抽风乱动',
    keywords: ['低功耗模式', '随机爆发', '不可预测'],
    副本: '「待机与暴走的循环」',
    技能: '在最不该动的时候突然行动',
    建议: '找到自己的节奏，不用跟别人比',
    分享: '我是赛博咸鱼，能躺就不坐，偶尔抽风乱动。我的副本是「待机与暴走的循环」，隐藏技能是在最不该动的时候突然行动。'
  },
  'action': {
    name: '情绪耗电王',
    summary: '永动机人格，但需要定期充电',
    keywords: ['执行力爆表', '偶尔宕机', '恢复力强'],
    副本: '「全速前进的列车」',
    技能: '能在短时间内完成大量任务',
    建议: '记得休息，你不是真的机器人',
    分享: '我是情绪耗电王，永动机人格，但需要定期充电。我的副本是「全速前进的列车」，隐藏技能是能在短时间内完成大量任务。'
  },
  'overthink': {
    name: '表面正常型混乱生物',
    summary: '外表稳定，内心已经演了一百遍',
    keywords: ['思维过载', '表面淡定', '内心狂飙'],
    副本: '「精神分裂的日常」',
    技能: '能在脑内同时运行十个想法',
    建议: '不是所有问题都需要答案',
    分享: '我是表面正常型混乱生物，外表稳定，内心已经演了一百遍。我的副本是「精神分裂的日常」，隐藏技能是能在脑内同时运行十个想法。'
  },
  'avoid': {
    name: '装死型选手',
    summary: '能躺就不坐，拖延是一种生活方式',
    keywords: ['佛系', '低欲望', '省电模式'],
    副本: '「永恒的待机状态」',
    技能: '把所有事情拖到自然消失',
    建议: '有些事情不做真的会出问题',
    分享: '我是装死型选手，能躺就不坐，拖延是一种生活方式。我的副本是「永恒的待机状态」，隐藏技能是把所有事情拖到自然消失。'
  },
  'chaos': {
    name: '赛博混乱体',
    summary: '随机行动，不可预测的存在',
    keywords: ['混乱中立', '即兴发挥', '惊喜制造机'],
    副本: '「量子态的人生」',
    技能: '在最不合理的时候做最离谱的事',
    建议: '偶尔按常理出牌也不错',
    分享: '我是赛博混乱体，随机行动，不可预测的存在。我的副本是「量子态的人生」，隐藏技能是在最不合理的时候做最离谱的事。'
  }
};

type PageType = 'home' | 'test' | 'result';

export default function Home() {
  const [page, setPage] = useState<PageType>('home');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ action: 0, overthink: 0, avoid: 0, chaos: 0 });
  const [result, setResult] = useState<keyof typeof results | null>(null);

  const startTest = () => {
    setPage('test');
    setCurrentQuestion(0);
    setScores({ action: 0, overthink: 0, avoid: 0, chaos: 0 });
  };

  const selectOption = (type: string) => {
    const newScores = { ...scores, [type]: scores[type as keyof typeof scores] + 1 };
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores: typeof scores) => {
    const sorted = Object.entries(finalScores).sort((a, b) => b[1] - a[1]);
    const first = sorted[0][0];
    const second = sorted[1][0];

    let resultKey: keyof typeof results;
    if (sorted[0][1] === sorted[1][1]) {
      resultKey = first as keyof typeof results;
    } else if (sorted[0][1] - sorted[1][1] >= 3) {
      resultKey = first as keyof typeof results;
    } else {
      resultKey = `${first}-${second}` as keyof typeof results;
    }

    if (!results[resultKey]) {
      resultKey = first as keyof typeof results;
    }

    setResult(resultKey);
    setPage('result');
  };

  const copyShare = () => {
    if (result) {
      navigator.clipboard.writeText(results[result].分享);
      alert('已复制到剪贴板！');
    }
  };

  if (page === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              人生副本人格测试
            </h1>
            <p className="text-xl text-purple-200">
              不是MBTI，不是算命，是你的赛博精神状态说明书
            </p>
          </div>

          <button
            onClick={startTest}
            className="px-12 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/50"
          >
            开始测试
          </button>

          <p className="text-sm text-purple-300 mt-12">
            本测试仅供娱乐和自我反思，不构成任何专业建议
          </p>
        </div>
      </div>
    );
  }

  if (page === 'test') {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const q = questions[currentQuestion];

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center space-y-4">
            <div className="text-purple-300 text-lg">
              {currentQuestion + 1} / {questions.length}
            </div>
            <div className="w-full bg-purple-950 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-8 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
              {q.question}
            </h2>

            <div className="space-y-4">
              {q.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectOption(option.type)}
                  className="w-full p-4 bg-purple-900/30 border border-purple-500/50 rounded-2xl text-white text-lg hover:bg-purple-800/50 hover:border-purple-400 transition-all transform hover:scale-102"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (page === 'result' && result) {
    const r = results[result];

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-6">
          <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-8 space-y-6">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                {r.name}
              </h1>
              <p className="text-xl text-purple-200">{r.summary}</p>
            </div>

            <div className="space-y-4 text-white">
              <div className="flex flex-wrap gap-2 justify-center">
                {r.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-purple-800/50 border border-purple-500/50 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              <div className="space-y-3 bg-purple-950/30 rounded-2xl p-6">
                <div>
                  <span className="text-purple-300">当前副本：</span>
                  <span className="text-white ml-2">{r.副本}</span>
                </div>
                <div>
                  <span className="text-purple-300">隐藏技能：</span>
                  <span className="text-white ml-2">{r.技能}</span>
                </div>
                <div>
                  <span className="text-purple-300">今日建议：</span>
                  <span className="text-white ml-2">{r.建议}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={copyShare}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                复制分享文案
              </button>
              <button
                onClick={startTest}
                className="flex-1 px-6 py-3 bg-purple-900/50 border border-purple-500/50 text-white font-bold rounded-full hover:bg-purple-800/50 transition-all"
              >
                重新测试
              </button>
            </div>
          </div>

          <p className="text-sm text-purple-300 text-center">
            本测试仅供娱乐和自我反思，不构成任何专业建议
          </p>
        </div>
      </div>
    );
  }

  return null;
}
