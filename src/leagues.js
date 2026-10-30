export const leagueData = [
 {tier:1,name:'프리미어리그',clubs:['리버풀','아스널','맨체스터 시티','첼시','맨체스터 유나이티드','토트넘','뉴캐슬 유나이티드','애스턴 빌라','브라이턴','웨스트햄 유나이티드','크리스털 팰리스','에버턴','브렌트퍼드','풀럼','울버햄프턴','본머스','노팅엄 포레스트','선덜랜드','리즈 유나이티드','번리']},
 {tier:2,name:'챔피언십',clubs:['레스터 시티','사우샘프턴','플리머스 아가일','노리치 시티','미들즈브러','웨스트 브로미치','셰필드 유나이티드','왓퍼드','코번트리 시티','브리스톨 시티','더비 카운티','스완지 시티','스토크 시티','퀸즈 파크 레인저스','밀월','프레스턴 노스 엔드','블랙번 로버스','카디프 시티','옥스퍼드 유나이티드','포츠머스','헐 시티','찰턴 애슬레틱','버밍엄 시티','셰필드 웬즈데이']},
 {tier:3,name:'리그 원',clubs:['렉섬','볼턴 원더러스','허더즈필드 타운','레딩','위건 애슬레틱','반즐리','블랙풀','링컨 시티','칼라일 유나이티드','피터버러 유나이티드','로더럼 유나이티드','맨스필드 타운','스톡포트 카운티','위컴 원더러스','레이턴 오리엔트','엑서터 시티','노샘프턴 타운','브리스톨 로버스','크롤리 타운','버턴 앨비언','케임브리지 유나이티드','슈루즈버리 타운','스티버니지','루턴 타운']},
 {tier:4,name:'리그 투',clubs:['브래드퍼드 시티','노츠 카운티','돈캐스터 로버스','윔블던','그림즈비 타운','질링엄','콜체스터 유나이티드','스윈던 타운','체스터필드','살퍼드 시티','플릿우드 타운','뉴포트 카운티','크루 알렉산드라','트랜미어 로버스','배로','애크링턴 스탠리','하로게이트 타운','모어캠','올덤 애슬레틱','브롬리','첼트넘 타운','바넷','포트 베일','체스터']},
 {tier:5,name:'내셔널리그',clubs:['요크 시티','올더숏 타운','로치데일','포리스트 그린 로버스','사우스엔드 유나이티드','하틀풀 유나이티드','게이츠헤드','탬워스','보스턴 유나이티드','솔리헐 무어스','이스트레이','올트링엄','메이든헤드 유나이티드','엡스플리트 유나이티드','웰드스톤','브레인트리 타운','서튼 유나이티드','다겐햄 앤 레드브리지','요빌 타운','워킹','파슬리 셀틱','스컨소프 유나이티드','브랙리 타운','워링턴 타운']},
 {tier:6,name:'내셔널리그 노스',clubs:['스카버러 애슬레틱','달링턴','킹스린 타운','블라이스 스파르탄스','사우스 실즈','스페니무어 타운','커즌 애슈턴','마린','벅스턴','래드클리프','매클스필드','휘트비 타운','리밍턴','헤리퍼드','알프레턴 타운','게인즈버러 트리니티','스태퍼드 레인저스','애서턴 콜리에리스','랜캐스터 시티','하이드 유나이티드','워킹턴','매틀록 타운','워링턴 라이랜즈','밤버 브리지']},
 {tier:7,name:'내셔널리그 사우스',clubs:['첼름스퍼드 시티','토키 유나이티드','웨이머스','슬라우 타운','도버 애슬레틱','톤브리지 엔젤스','메이드스톤 유나이티드','치펜햄 타운','바스 시티','세인트 앨번스 시티','햄프턴 앤 리치먼드','헨던','하번트 앤 워털루빌','이스트본 버러','웰링 유나이티드','엔필드 타운','도체스터 타운','풀 타운','판버러','웨스턴 슈퍼메어','트루로 시티','체셤 유나이티드','윙게이트 앤 핀칠리','보그너 리지스 타운']}
];
export const leagueForTier=t=>leagueData.find(x=>x.tier===t);
export const clubTier=club=>leagueData.find(l=>l.clubs.includes(club))?.tier ?? 5;
export const allClubs=leagueData.flatMap(l=>l.clubs.map(name=>({name,tier:l.tier,league:l.name})));
export function shuffled(a){const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]];}return x;}
export function roundRobin(teams){let list=[...teams];if(list.length%2)list.push('BYE');const n=list.length, rounds=[];for(let r=0;r<n-1;r++){const games=[];for(let i=0;i<n/2;i++){const a=list[i],b=list[n-1-i];if(a!=='BYE'&&b!=='BYE')games.push({home:r%2===0?a:b,away:r%2===0?b:a});}rounds.push(games);list=[list[0],list[n-1],...list.slice(1,n-1)];}return [...rounds,...rounds.map(r=>r.map(g=>({home:g.away,away:g.home})))];}
export function createSeason(tier,club,season=1){
 const l=leagueForTier(tier), teams=shuffled(l.clubs.filter(x=>x!==club).concat(club));
 const rr=roundRobin(teams), leagueFixtures=rr.flatMap((round,i)=>round.filter(g=>g.home===club||g.away===club).map(g=>({id:`L${i}-${g.home}`,type:'리그',round:i+1,day:7*(i+1),home:g.home===club,opponent:g.home===club?g.away:g.home,played:false,active:true})));
 const fixtures=[...leagueFixtures];
 if(tier<=7)fixtures.push({id:'FA1',type:'FA컵',round:1,day:45,home:Math.random()>.5,opponent:shuffled(l.clubs.filter(x=>x!==club))[0],played:false,active:true});
 if(tier<=4)fixtures.push({id:'CC1',type:'카라바오컵',round:1,day:30,home:Math.random()>.5,opponent:shuffled(l.clubs.filter(x=>x!==club))[0],played:false,active:true});
 return fixtures.sort((a,b)=>a.day-b.day||a.id.localeCompare(b.id));
}
export function freshTable(tier,club){const names=leagueForTier(tier).clubs.filter(name=>name!==club);return [...names.slice(0,23),club].map(name=>({name,p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}));}
