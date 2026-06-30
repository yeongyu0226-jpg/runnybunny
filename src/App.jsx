import { useMemo, useState } from 'react';

const reactions = ['💪', '🔥', '❤️', '🌱', '🏆'];

const friends = [
  { id: 1, name: 'Mina', distance: 5.4, time: '32:18', place: '한강 잠원', note: '바람이 좋아서 조금 더 뛰었다.', ago: '14분 전', count: 11 },
  { id: 2, name: 'Joon', distance: 8.2, time: '48:05', place: '서울숲', note: '천천히, 숨 고르면서.', ago: '1시간 전', count: 8 },
  { id: 3, name: 'Ara', distance: 3.1, time: '21:44', place: '동네 트랙', note: '짧아도 완주한 날.', ago: '어제', count: 19 },
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
  { id: 'shop', label: 'Shop', icon: '▣' },
  { id: 'memory', label: 'Memory', icon: '◇' },
  { id: 'bunny', label: 'Bunny', icon: '♡' },
];

const shopCategories = [
  { id: 'head', label: '모자', icon: 'cap' },
  { id: 'body', label: '상의', icon: 'shirt' },
  { id: 'waist', label: '벨트', icon: 'belt' },
  { id: 'feet', label: '운동화', icon: 'shoe' },
  { id: 'accessory', label: '액세서리', icon: 'star' },
];

const shopItems = [
  { id: 'none-head', slot: 'head', category: 'head', name: '없음', price: 0, tag: '모자 벗기', swatch: 'blank', free: true },
  { id: 'cap', slot: 'head', category: 'head', name: '코랄 러닝모자', price: 80, tag: '햇빛 차단', swatch: 'coral' },
  { id: 'visor', slot: 'head', category: 'head', name: '민트 선바이저', price: 110, tag: '가벼운 머리띠', swatch: 'mint' },
  { id: 'beanie', slot: 'head', category: 'head', name: '노랑 비니', price: 130, tag: '찬바람 방어', swatch: 'yellow' },
  { id: 'none-body', slot: 'body', category: 'body', name: '없음', price: 0, tag: '상의 벗기', swatch: 'blank', free: true },
  { id: 'top', slot: 'body', category: 'body', name: '오렌지 러닝복', price: 180, tag: '산뜻한 착장', swatch: 'orange' },
  { id: 'hoodie', slot: 'body', category: 'body', name: '민트 후디', price: 220, tag: '쌀쌀한 아침용', swatch: 'mint' },
  { id: 'stripe-top', slot: 'body', category: 'body', name: '핑크 스트라이프', price: 210, tag: '사진 잘 받는 룩', swatch: 'pink' },
  { id: 'none-waist', slot: 'waist', category: 'waist', name: '없음', price: 0, tag: '허리 장비 벗기', swatch: 'blank', free: true },
  { id: 'belt', slot: 'waist', category: 'waist', name: '러닝벨트', price: 120, tag: '가벼운 수납', swatch: 'black' },
  { id: 'bib', slot: 'waist', category: 'waist', name: '레이스 번호표', price: 95, tag: '대회 기분', swatch: 'white' },
  { id: 'bottle-belt', slot: 'waist', category: 'waist', name: '물통 벨트', price: 170, tag: '목마름 대비', swatch: 'yellow' },
  { id: 'none-feet', slot: 'feet', category: 'feet', name: '없음', price: 0, tag: '신발 벗기', swatch: 'blank', free: true },
  { id: 'shoes', slot: 'feet', category: 'feet', name: '빨강 운동화', price: 260, tag: '발걸음 업', swatch: 'red' },
  { id: 'speed-shoes', slot: 'feet', category: 'feet', name: '파랑 스피드화', price: 340, tag: '가벼운 질주', swatch: 'blue' },
  { id: 'mint-shoes', slot: 'feet', category: 'feet', name: '민트 조깅화', price: 300, tag: '폭신한 착지', swatch: 'mint' },
  { id: 'medal', slot: 'accessory', category: 'accessory', name: '토끼 메달', price: 140, tag: '완주 기념', swatch: 'yellow' },
  { id: 'watch', slot: 'accessory', category: 'accessory', name: '러닝워치', price: 160, tag: '페이스 체크', swatch: 'black' },
  { id: 'water', slot: 'accessory', category: 'accessory', name: '물통', price: 130, tag: '수분 충전', swatch: 'blue' },
  { id: 'gel', slot: 'accessory', category: 'accessory', name: '에너지젤', price: 90, tag: '작은 보급품', swatch: 'red' },
  { id: 'star-charm', slot: 'accessory', category: 'accessory', name: '별 참', price: 125, tag: '반짝 포인트', swatch: 'purple' },
];

function getLevel(totalKm) {
  const current = levels.find((level) => totalKm >= level.min && totalKm < level.max) || levels.at(-1);
  const next = levels[levels.indexOf(current) + 1];
  const remaining = next ? Math.max(0, next.min - totalKm) : 0;
  const progress = current.max === Infinity ? 100 : ((totalKm - current.min) / (current.max - current.min)) * 100;
  return { current, next, remaining, progress };
}

function itemSlot(id) {
  return shopItems.find((item) => item.id === id)?.slot;
}

function BunnyFace({ mood = 'happy', compact = false, items = [] }) {
  return (
    <div className={`bunny-character bunny-2d ${mood} ${compact ? 'compact' : ''}`} aria-label={`${mood} runner bunny`}>
      <span className="bunny-shadow" />
      <span className="bunny-ear left" />
      <span className="bunny-ear right" />
      <span className="bunny-head">
        <span className="bunny-eye left" />
        <span className="bunny-eye right" />
        <span className="bunny-nose" />
        <span className="bunny-mouth" />
        <span className="bunny-cheek left" />
        <span className="bunny-cheek right" />
      </span>
      <span className="bunny-body" />
      <span className="bunny-arm left" />
      <span className="bunny-arm right" />
      <span className="bunny-leg left" />
      <span className="bunny-leg right" />
      {['cap', 'visor', 'beanie', 'belt', 'bottle-belt', 'bib', 'top', 'hoodie', 'stripe-top', 'medal', 'watch', 'water', 'gel', 'star-charm'].map((id) =>
        items.includes(id) ? <span className={`wearable ${id}`} aria-hidden="true" key={id} /> : null,
      )}
      {['shoes', 'speed-shoes', 'mint-shoes'].map((id) =>
        items.includes(id) ? [<span className={`wearable ${id} left`} aria-hidden="true" key={`${id}-left`} />, <span className={`wearable ${id} right`} aria-hidden="true" key={`${id}-right`} />] : null,
      )}
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
      <div className="run-photo">
        <div className="photo-meta"><span>{item.distance}km</span><span>{item.time}</span></div>
      </div>
      <div className="run-body">
        <div className="row"><h3>{item.name}</h3><time>{item.ago}</time></div>
        <p className="place">{item.place}</p>
        <p>{item.note}</p>
        <div className="reaction-bar" aria-label="이모지 응원">
          {reactions.map((emoji) => <button className={picked === emoji ? 'selected' : ''} key={emoji} type="button" onClick={() => setPicked(picked === emoji ? null : emoji)}>{emoji}</button>)}
          <span>{item.count + (picked ? 1 : 0)}</span>
        </div>
      </div>
    </article>
  );
}

function Home({ carrots, checkedIn, equippedItems, onCheckIn, setActiveTab }) {
  const level = getLevel(184.6);
  return (
    <main className="screen home-screen">
      <section className="hero-panel">
        <div className="hero-copy"><p className="eyebrow">RunnyBunny</p><h1>오늘도 조금 뛰어볼까?</h1><p>Happy Bunny가 조용히 기다리는 중</p></div>
        <BunnyFace mood="happy" items={equippedItems} />
      </section>
      <section className="progress-panel">
        <div className="row"><span className="level-name">{level.current.name}</span><span>184.6km</span></div>
        <div className="progress-track"><div style={{ width: `${level.progress}%` }} /></div>
        <p>다음 등급까지 {level.remaining.toFixed(1)}km 남았어요.</p>
      </section>
      <section className="carrot-panel"><div><span>보유 당근</span><strong>{carrots}개</strong></div><button disabled={checkedIn} type="button" onClick={onCheckIn}>{checkedIn ? '출석 완료' : '출석 +20'}</button></section>
      <button className="primary-action" type="button" onClick={() => setActiveTab('record')}>오늘의 기억 남기기</button>
      <section className="section-block"><div className="section-head"><h2>친구들의 최신 러닝</h2><button type="button" onClick={() => setActiveTab('feed')}>모두 보기</button></div><div className="mini-feed">{friends.slice(0, 2).map((item) => <FeedCard item={item} key={item.id} />)}</div></section>
    </main>
  );
}

function Record({ onRecordReward }) {
  const [media, setMedia] = useState(null);
  const [mediaError, setMediaError] = useState('');
  const [captureMode, setCaptureMode] = useState('photo');
  const [form, setForm] = useState({ distance: '', time: '', place: '', note: '' });
  const canSubmit = media && form.distance && form.time && form.place && form.note;
  return (
    <main className="screen">
      <header className="page-title"><p className="eyebrow">Setlog</p><h1>방금 뛴 순간만 남겨요</h1></header>
      <div className="capture-mode" aria-label="촬영 방식"><button className={captureMode === 'photo' ? 'active' : ''} type="button" onClick={() => setCaptureMode('photo')}>사진</button><button className={captureMode === 'video' ? 'active' : ''} type="button" onClick={() => setCaptureMode('video')}>영상</button></div>
      <label className={`capture-box ${media ? 'has-media' : ''}`}>
        {media?.type === 'image' ? <img alt="방금 촬영한 러닝 미리보기" src={media.url} /> : media?.type === 'video' ? <video aria-label="방금 촬영한 러닝 영상 미리보기" controls muted playsInline src={media.url} /> : <span><strong>{captureMode === 'photo' ? '카메라로 바로 찍기' : '짧은 영상 바로 찍기'}</strong><small>갤러리보다 지금 이 순간을 남기는 Setlog</small></span>}
        <input key={captureMode} accept={captureMode === 'photo' ? 'image/*' : 'video/*'} capture="environment" type="file" onChange={(event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          const isFresh = Date.now() - file.lastModified <= 5 * 60 * 1000;
          const isExpectedType = captureMode === 'photo' ? file.type.startsWith('image/') : file.type.startsWith('video/');
          if (!isExpectedType) { setMedia(null); setMediaError('선택한 촬영 방식과 파일 형식이 맞지 않아요.'); event.target.value = ''; return; }
          if (!isFresh) { setMedia(null); setMediaError('Setlog는 방금 찍은 사진이나 영상만 올릴 수 있어요.'); event.target.value = ''; return; }
          setMediaError('');
          setMedia({ type: file.type.startsWith('video/') ? 'video' : 'image', url: URL.createObjectURL(file), name: file.name });
        }} />
      </label>
      <p className={`capture-note ${mediaError ? 'error' : ''}`}>{mediaError || (media ? '방금 촬영한 기록이 준비됐어요.' : '촬영 버튼을 누르면 카메라가 열려요.')}</p>
      <form className="record-form">
        <div className="form-grid"><label>거리<input inputMode="decimal" placeholder="5.2km" value={form.distance} onChange={(event) => setForm({ ...form, distance: event.target.value })} /></label><label>시간<input placeholder="32:10" value={form.time} onChange={(event) => setForm({ ...form, time: event.target.value })} /></label></div>
        <label>장소<input placeholder="한강 잠원" value={form.place} onChange={(event) => setForm({ ...form, place: event.target.value })} /></label>
        <label>한 줄 감상<textarea maxLength={48} placeholder="오늘의 발걸음은 어땠나요?" value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} /></label>
        <button className="primary-action" disabled={!canSubmit} type="button" onClick={() => { onRecordReward(); setMedia(null); setForm({ distance: '', time: '', place: '', note: '' }); }}>업로드</button>
      </form>
    </main>
  );
}

function Feed() {
  return <main className="screen"><header className="page-title feed-title"><div><p className="eyebrow">Feed</p><h1>친구 러닝</h1></div><span className="quiet-pill">댓글 없음</span></header><div className="feed-list">{friends.map((item) => <FeedCard item={item} key={item.id} />)}</div></main>;
}

function Memory({ equippedItems }) {
  return <main className="screen"><header className="page-title"><p className="eyebrow">Memory</p><h1>내 러닝 타임라인</h1></header><section className="today-memory"><div><span>1년 전 오늘</span><h2>처음으로 2km를 넘긴 날</h2><p>그때의 짧은 기록이 지금의 루틴이 됐어요.</p></div><BunnyFace mood="happy" compact items={equippedItems} /></section><div className="timeline">{memories.map((memory) => <article className="timeline-item" key={memory.id}><span className="dot" /><div><time>{memory.date}</time><h3>{memory.title}</h3><p className="place">{memory.distance}</p><p>{memory.note}</p></div></article>)}</div></main>;
}

function BunnyProfile({ equippedItems }) {
  const level = getLevel(184.6);
  return <main className="screen bunny-screen"><header className="page-title centered"><p className="eyebrow">Bunny</p><h1>{level.current.name}</h1></header><section className="profile-stage"><BunnyFace mood="happy" items={equippedItems} /><span className="condition">Happy Bunny</span><p>몸이 가볍고 산책 생각이 나는 컨디션</p></section><section className="stats-grid"><Stat label="누적 거리" value="184.6km" /><Stat label="러닝 횟수" value={41} /><Stat label="연속 러닝" value="4일" /></section><section className="progress-panel"><div className="row"><span className="level-name">{level.current.name}</span><span>{level.progress.toFixed(0)}%</span></div><div className="progress-track"><div style={{ width: `${level.progress}%` }} /></div><p>{level.next ? `${level.next.name}까지 ${level.remaining.toFixed(1)}km` : '최고 등급에 도착했어요.'}</p></section></main>;
}

function Shop({ carrots, ownedItems, equippedItems, onBuyItem, onToggleEquip }) {
  const [activeCategory, setActiveCategory] = useState('accessory');
  const selectedCategory = shopCategories.find((category) => category.id === activeCategory);
  const visibleItems = shopItems.filter((item) => item.category === activeCategory);
  return (
    <main className="screen creator-screen">
      <header className="creator-header"><div><h1>runnybunny</h1><p>너만의 러너버니를 꾸며봐!</p></div><div className="carrot-wallet"><span>🥕</span><strong>{carrots}</strong></div></header>
      <section className="creator-stage"><div className="scene-cloud left" /><div className="scene-cloud right" /><BunnyFace mood="happy" items={equippedItems} /><div className="scene-hill" /></section>
      <nav className="creator-tabs" aria-label="꾸미기 카테고리">{shopCategories.map((category) => <button className={activeCategory === category.id ? 'active' : ''} key={category.id} type="button" onClick={() => setActiveCategory(category.id)}><span className={`line-icon ${category.icon}`} aria-hidden="true" />{category.label}</button>)}</nav>
      <section className="creator-panel"><div className="creator-panel-head"><h2>{selectedCategory?.label}</h2><span>{activeCategory === 'accessory' ? '최대 4개' : '1개 장착'}</span></div><div className="item-strip">{visibleItems.map((item) => {
        const owned = ownedItems.includes(item.id);
        const equipped = equippedItems.includes(item.id);
        const affordable = item.free || carrots >= item.price;
        return <article className={`creator-item ${item.free ? 'free' : ''} ${owned ? 'owned' : ''} ${equipped ? 'equipped' : ''}`} key={item.id}><div className={`item-doodle item-${item.id}`} aria-hidden="true">{item.free ? <span className="none-mark">×</span> : <span className={`swatch ${item.swatch}`} />}</div><div className="creator-item-copy"><h3>{item.name}</h3><p>{item.tag}</p></div><button disabled={!item.free && !owned && !affordable} type="button" onClick={() => (item.free || owned ? onToggleEquip(item) : onBuyItem(item))}>{item.free ? '벗기' : owned ? (equipped ? '착용중' : '입기') : affordable ? `🥕 ${item.price}` : '당근 부족'}</button></article>;
      })}</div><div className="color-row" aria-label="색상 예시">{['yellow', 'silver', 'brown', 'blue', 'red', 'green', 'purple', 'pink', 'black', 'white'].map((color) => <span className={`color-dot ${color}`} key={color} />)}</div></section>
      <section className="reward-guide creator-rewards"><div><strong>출석하면 +20</strong><span>매일 앱을 열고 토끼에게 인사하기</span></div><div><strong>Setlog 업로드 +35</strong><span>방금 찍은 러닝 기록 남기기</span></div></section>
    </main>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [carrots, setCarrots] = useState(140);
  const [checkedIn, setCheckedIn] = useState(false);
  const [ownedItems, setOwnedItems] = useState(['cap']);
  const [equippedItems, setEquippedItems] = useState(['cap']);

  const screen = useMemo(() => {
    if (activeTab === 'record') return <Record onRecordReward={() => setCarrots((current) => current + 35)} />;
    if (activeTab === 'feed') return <Feed />;
    if (activeTab === 'shop') return <Shop carrots={carrots} ownedItems={ownedItems} equippedItems={equippedItems} onBuyItem={(item) => {
      if (ownedItems.includes(item.id) || carrots < item.price) return;
      setCarrots((current) => current - item.price);
      setOwnedItems((current) => [...current, item.id]);
      setEquippedItems((current) => {
        if (item.slot === 'accessory') {
          const accessories = current.filter((id) => itemSlot(id) === 'accessory');
          const rest = current.filter((id) => itemSlot(id) !== 'accessory');
          return [...rest, ...[...accessories, item.id].slice(-4)];
        }
        return [...current.filter((id) => itemSlot(id) !== item.slot), item.id];
      });
    }} onToggleEquip={(item) => {
      setEquippedItems((current) => {
        if (item.free) return current.filter((id) => itemSlot(id) !== item.slot);
        if (current.includes(item.id)) return current.filter((id) => id !== item.id);
        if (item.slot === 'accessory') {
          const accessories = current.filter((id) => itemSlot(id) === 'accessory');
          const rest = current.filter((id) => itemSlot(id) !== 'accessory');
          return [...rest, ...[...accessories, item.id].slice(-4)];
        }
        return [...current.filter((id) => itemSlot(id) !== item.slot), item.id];
      });
    }} />;
    if (activeTab === 'memory') return <Memory equippedItems={equippedItems} />;
    if (activeTab === 'bunny') return <BunnyProfile equippedItems={equippedItems} />;
    return <Home carrots={carrots} checkedIn={checkedIn} equippedItems={equippedItems} onCheckIn={() => { if (checkedIn) return; setCheckedIn(true); setCarrots((current) => current + 20); }} setActiveTab={setActiveTab} />;
  }, [activeTab, carrots, checkedIn, ownedItems, equippedItems]);

  return <div className="app-shell"><div className="phone-frame">{screen}<nav className="tab-bar" aria-label="하단 탭">{tabs.map((tab) => <button className={activeTab === tab.id ? 'active' : ''} key={tab.id} type="button" onClick={() => setActiveTab(tab.id)}><span>{tab.icon}</span>{tab.label}</button>)}</nav></div></div>;
}
