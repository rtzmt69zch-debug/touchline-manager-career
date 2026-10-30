import assert from 'node:assert/strict';
import {leagueData,roundRobin,createSeason,freshTable} from '../src/leagues.js';
import {createManager,acceptOffer,beginLiveMatch,advanceLiveMatch,closeSeason,resolvePlayoff,buyItem,shopItems} from '../src/engine.js';

assert.equal(leagueData[0].clubs.length,20,'Premier League has 20 clubs');
for(const l of leagueData.slice(1)) assert.equal(l.clubs.length,24,`${l.name} has 24 clubs`);
assert.equal(roundRobin(leagueData[0].clubs).length,38,'20-team double round robin has 38 rounds');
assert.equal(roundRobin(leagueData[1].clubs).length,46,'24-team double round robin has 46 rounds');

for(const route of ['legend','youth','license','unknown']){
  const initial=createManager(route,'게겐프레싱');
  assert.ok(initial.offers.length>=3&&initial.offers.length<=5,'3–5 manager offers');
  const gm=acceptOffer(initial,initial.offers[0].id);
  assert.ok(gm.club&&gm.salary>0&&gm.fixtures.length>=38,'offer acceptance initializes career');
  assert.equal(gm.table.length,gm.tier===1?20:24,'league table matches division size');
}

const manager=createManager('unknown','게겐프레싱');
let gm=acceptOffer(manager,manager.offers[0].id);
let matches=0;
while(matches<2){
 const started=beginLiveMatch(gm,{rotation:'부분 로테이션',press:'높은 압박',line:'높은 수비라인',tempo:'빠른 템포'});
 assert.ok(started.match,'live match starts');
 let live=started.match,done=null,guard=0;
 while(!done&&guard++<30){
   const step=advanceLiveMatch(gm,live);
   if(step.result){done=step;break;}
   live=step.match;
   if(live.prompt){const decision=advanceLiveMatch(gm,live,live.prompt.options[0]);live=decision.match;}
 }
 assert.ok(done,'match reaches full time');gm=done.gm;matches++;
}
assert.equal(gm.played,2,'league appearances update');
const itemResult=buyItem(gm,shopItems[0]);
assert.ok(itemResult.gm||itemResult.error,'shop purchase returns valid state');
console.log('Smoke tests passed: league sizes, fixture rounds, manager offers, career initialization, live match flow and shop.');
