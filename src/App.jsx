import { useMemo, useState } from 'react';

const reactions = ['💪', '🔥', '❤️', '🌱', '🏆'];

const friends = [
  {
    id: 1,
    name: 'Mina',
    distance: 5.4,
    time: '32:18',
    place: '한강 잠원',
    note: '바람이 좋아서 조금 더 뛰었다.',
    photo:
      'linear-gradient(135deg, rgba(168,230,207,.96), rgba(255,253,247,.7)), url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 600 600%27%3E%3Cpath fill=%27%236BC7A7%27 d=%27M0 390c88-64 151-72 239-30 118 57 199 18 361-118v358H0z%27/%3E%3Ccircle cx=%27460%27 cy=%27124%27 r=%2754%27 fill=%27%23FFB347%27/%3E%3Cpath fill=%27none%27 stroke=%27%23222%27 stroke-opacity=%27.18%27 stroke-width=%2716%27 d=%27M74 334c81-51 144-54 221-17 91 43 163 23 247-45%27/%3E%3C/svg%3E")',
    ago: '14분 전',
    count: 11,
  },
  {
    id: 2,
    name: 'Joon',
    distance: 8.2,
    time: '48:05',
    place: '서울숲',
    note: '천천히, 숨 고르면서.',
    photo:
      'linear-gradient(135deg, rgba(255,179,71,.58), rgba(255,253,247,.78)), url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 600 600%27%3E%3Crect fill=%27%23FFFDF7%27 width=%27600%27 height=%27600%27/%3E%3Cpath fill=%27%23A8E6CF%27 d=%27M0 360c90 30 180 30 270-12s176-40 330 23v229H0z%27/%3E%3Cpath fill=%27none%27 stroke=%27%236BC7A7%27 stroke-width=%2718%27 stroke-linecap=%27round%27 d=%27M80 428c112-45 203-44 328 4%27/%3E%3Ccircle fill=%27%23FFB347%27 cx=%27124%27 cy=%27124%27 r=%2738%27/%3E%3C/svg%3E")',
    ago: '1시간 전',
    count: 8,
  },
  {
    id: 3,
    name: 'Ara',
    distance: 3.1,
    time: '21:44',
    place: '동네 트랙',
    note: '짧아도 완주한 날.',
    photo:
      'linear-gradient(135deg, rgba(34,34,34,.06), rgba(168,230,207,.78)), url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 600 600%27%3E%3Crect fill=%27%23FFFDF7%27 width=%27600%27 height=%27600%27/%3E%3Cpath fill=%27%236BC7A7%27 fill-opacity=%27.45%27 d=%27M82 472c54-102 114-143 188-123 106 29 142-75 248-60 36 5 61 28 82 57v254H0v-74c28-10 55-27 82-54z%27/%3E%3Cpath fill=%27none%27 stroke=%27%23222%27 stroke-opacity=%27.2%27 stroke-width=%2714%27 d=%27M95 492c91-47 190-60 315-33%27/%3E%3C/svg%3E")',
    ago: '어제',
    count: 19,
  },
];

const memories = [
  { id: 1, date: '2026.06.03', title: '비 온 뒤 첫 러닝', distance: '4.8km', note: '공기가 깨끗해서 발걸음도 가벼웠다.' },
  { id: 2, date: '2026.05.26', title: '크루 저녁런', distance: '7.0km', note: '말없이 같이 뛰는 시간이 좋았다.' },
  { id: 3, date: '2025.06.07', title: '1년 전 오늘', distance: '2.4km', note: '시작은 아주 작았지만 아직 이어지고 있다.' },
];

const levels = [
  { name: 'Beginner Bunny', min: 0, max: 50 },
  { name: 'Runner Bunny', min: 50, max: 300 },
  { name: 'Advanced Bunny', min: 300, max: 1000 },
  { name: 'Marathon Bunny', min: 1000, max: 3000 },
  { name: 'Legend Bunny', min: 3000, max: Infinity },
];

const tabs = [
  { id: 'home', label: 'Home', icon: '⌂' },
  { id: 'record', label: 'Record', icon: '+' },
  { id: 'feed', label: 'Feed', icon: '◐' },
  { id: 'memory', label: 'Memory', icon: '◇' },
  { id: 'bunny', label: 'Bunny', icon: '♡' },
];

function getLevel(totalKm) {
  const current = levels.find((level) => totalKm >= level.min && totalKm < level.max) || levels.at(-1);
  const next = levels[levels.indexOf(current) + 1];
  const remaining = next ? Math.max(0, next.min - totalKm) : 0;
  const progress = current.max === Infinity ? 100 : ((totalKm - current.min) / (current.max - current.min)) * 100;

  return { current, next, remaining, progress };
}

function BunnyFace({ mood = 'happy', compact = false }) {
  return (
    <div className={`bunny-face ${mood} ${compact ? 'compact' : ''}`} aria-label={`${mood} bunny`}>
      <div className="ear left" />
      <div className="ear right" />
      <div className="head">
        <span className="eye left" />
        <span className="eye right" />
        <span className="cheek left" />
        <span className="cheek right" />
        <span className="mouth" />
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function FeedCard({ item }) {
  const [picked, setPicked] = useState(null);

  return (
    <article className="run-card">
      <div className="run-photo" style={{ backgroundImage: item.photo }}>
        <div className="photo-meta">
          <span>{item.distance}km</span>
          <span>{item.time}</span>
        </div>
      </div>
      <div className="run-body">
        <div>
          <div className="row">
            <h3>{item.name}</h3>
            <time>{item.ago}</time>
          </div>
          <p className="place">{item.place}</p>
          <p>{item.note}</p>
        </div>
        <div className="reaction-bar" aria-label="이모지 응원">
          {reactions.map((emoji) => (
            <button
              className={picked === emoji ? 'selected' : ''}
              key={emoji}
              type="button"
              onClick={() => setPicked(picked === emoji ? null : emoji)}
            >
              {emoji}
            </button>
          ))}
          <span>{item.count + (picked ? 1 : 0)}</span>
        </div>
      </div>
    </article>
  );
}

function Home({ setActiveTab }) {
  const totalKm = 184.6;
  const level = getLevel(totalKm);

  return (
    <main className="screen home-screen">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">RunnyBunny</p>
          <h1>오늘도 조금 뛰어볼까?</h1>
          <p>Happy Bunny가 조용히 기다리는 중</p>
        </div>
        <BunnyFace mood="happy" />
      </section>

      <section className="progress-panel">
        <div className="row">
          <span className="level-name">{level.current.name}</span>
          <span>{totalKm}km</span>
        </div>
        <div className="progress-track">
          <div style={{ width: `${level.progress}%` }} />
        </div>
        <p>다음 등급까지 {level.remaining.toFixed(1)}km 남았어요.</p>
      </section>

      <button className="primary-action" type="button" onClick={() => setActiveTab('record')}>
        오늘의 기억 남기기
      </button>

      <section className="section-block">
        <div className="section-head">
          <h2>친구들의 최신 러닝</h2>
          <button type="button" onClick={() => setActiveTab('feed')}>
            모두 보기
          </button>
        </div>
        <div className="mini-feed">
          {friends.slice(0, 2).map((item) => (
            <FeedCard item={item} key={item.id} />
          ))}
        </div>
      </section>
    </main>
  );
}

function Record() {
  const [preview, setPreview] = useState('');
  const [form, setForm] = useState({ distance: '', time: '', place: '', note: '' });

  const canSubmit = form.distance && form.time && form.place && form.note;

  return (
    <main className="screen">
      <header className="page-title">
        <p className="eyebrow">Record</p>
        <h1>오늘의 러닝을 남겨요</h1>
      </header>

      <label className="capture-box">
        {preview ? (
          <img alt="업로드 미리보기" src={preview} />
        ) : (
          <span>
            <strong>사진 또는 짧은 영상</strong>
            <small>방금 찍은 러닝의 온도를 담아주세요</small>
          </span>
        )}
        <input
          accept="image/*,video/*"
          capture="environment"
          type="file"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file?.type.startsWith('image/')) {
              setPreview(URL.createObjectURL(file));
            }
          }}
        />
      </label>

      <form className="record-form">
        <div className="form-grid">
          <label>
            거리
            <input
              inputMode="decimal"
              placeholder="5.2km"
              value={form.distance}
              onChange={(event) => setForm({ ...form, distance: event.target.value })}
            />
          </label>
          <label>
            시간
            <input
              placeholder="32:10"
              value={form.time}
              onChange={(event) => setForm({ ...form, time: event.target.value })}
            />
          </label>
        </div>
        <label>
          장소
          <input
            placeholder="한강 잠원"
            value={form.place}
            onChange={(event) => setForm({ ...form, place: event.target.value })}
          />
        </label>
        <label>
          한 줄 감상
          <textarea
            maxLength={48}
            placeholder="오늘의 발걸음은 어땠나요?"
            value={form.note}
            onChange={(event) => setForm({ ...form, note: event.target.value })}
          />
        </label>
        <button className="primary-action" disabled={!canSubmit} type="button">
          업로드
        </button>
      </form>
    </main>
  );
}

function Feed() {
  return (
    <main className="screen">
      <header className="page-title feed-title">
        <div>
          <p className="eyebrow">Feed</p>
          <h1>친구 러닝</h1>
        </div>
        <span className="quiet-pill">댓글 없음</span>
      </header>
      <div className="feed-list">
        {friends.map((item) => (
          <FeedCard item={item} key={item.id} />
        ))}
      </div>
    </main>
  );
}

function Memory() {
  return (
    <main className="screen">
      <header className="page-title">
        <p className="eyebrow">Memory</p>
        <h1>내 러닝 타임라인</h1>
      </header>

      <section className="today-memory">
        <div>
          <span>1년 전 오늘</span>
          <h2>처음으로 2km를 넘긴 날</h2>
          <p>그때의 짧은 기록이 지금의 루틴이 됐어요.</p>
        </div>
        <BunnyFace mood="happy" compact />
      </section>

      <div className="timeline">
        {memories.map((memory) => (
          <article className="timeline-item" key={memory.id}>
            <span className="dot" />
            <div>
              <time>{memory.date}</time>
              <h3>{memory.title}</h3>
              <p className="place">{memory.distance}</p>
              <p>{memory.note}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

function BunnyProfile() {
  const totalKm = 184.6;
  const totalRuns = 41;
  const streak = 4;
  const daysSinceRun = 1;
  const mood = daysSinceRun >= 3 ? 'sleepy' : 'happy';
  const level = getLevel(totalKm);

  return (
    <main className="screen bunny-screen">
      <header className="page-title centered">
        <p className="eyebrow">Bunny</p>
        <h1>{level.current.name}</h1>
      </header>

      <section className="profile-stage">
        <BunnyFace mood={mood} />
        <span className="condition">{mood === 'happy' ? 'Happy Bunny' : 'Sleepy Bunny'}</span>
        <p>{mood === 'happy' ? '몸이 가볍고 산책 생각이 나는 컨디션' : '포근히 쉬면서 다음 러닝을 기다리는 중'}</p>
      </section>

      <section className="stats-grid">
        <Stat label="누적 거리" value={`${totalKm}km`} />
        <Stat label="러닝 횟수" value={totalRuns} />
        <Stat label="연속 러닝" value={`${streak}일`} />
      </section>

      <section className="progress-panel">
        <div className="row">
          <span className="level-name">{level.current.name}</span>
          <span>{level.progress.toFixed(0)}%</span>
        </div>
        <div className="progress-track">
          <div style={{ width: `${level.progress}%` }} />
        </div>
        <p>{level.next ? `${level.next.name}까지 ${level.remaining.toFixed(1)}km` : '최고 등급에 도착했어요.'}</p>
      </section>
    </main>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const screen = useMemo(() => {
    if (activeTab === 'record') return <Record />;
    if (activeTab === 'feed') return <Feed />;
    if (activeTab === 'memory') return <Memory />;
    if (activeTab === 'bunny') return <BunnyProfile />;
    return <Home setActiveTab={setActiveTab} />;
  }, [activeTab]);

  return (
    <div className="app-shell">
      <div className="phone-frame">
        {screen}
        <nav className="tab-bar" aria-label="하단 탭">
          {tabs.map((tab) => (
            <button
              className={activeTab === tab.id ? 'active' : ''}
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
