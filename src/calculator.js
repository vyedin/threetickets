//CALCULATOR.JS LIBRARY
import {max, min, filter, each, reduce, chain} from 'underscore';

export function calculateViabilityThreshold(totalAttendees,totalDelegates) {
  switch(totalDelegates) {
    case 1:
        return 0; //This is a simple majority case, so there is no threshold, just chaos
    case 2:
        return Math.ceil(totalAttendees/4);
    case 3:
        return Math.ceil(totalAttendees/6);
    default:
        return Math.ceil(totalAttendees/6.67);
  }
}

export function calculateDelegates(totalAttendees, totalDelegates, caucusers) {
  const viabilityThreshold = calculateViabilityThreshold(totalAttendees, totalDelegates);
  return (caucusers >= viabilityThreshold) ? Math.round((caucusers * totalDelegates)/totalAttendees): 0;
}

// Modify the candidates object according to the special case rules
export function calculateSimpleMajority(candidates, totalDelegates) {
  const candidatesWithMajority = multipleComp(max, candidates, "caucusers");
  each(candidatesWithMajority, (candidate) => candidate.delegates = totalDelegates); //If it's a tie, we want to set both
  // We'll take care of ties and resetting the smaller groups to 0 delegates in resolveDelegates
  return candidates;
}

// Modify the candidates object according to the special case rules
export function resolveDelegates(candidates, totalDelegates) {
  // Ok, you got here because you allocated too many delegates. At this point, somebody has to lose a delegate. This can happen in a few ways:
  // - TAKE ONE OFF THE TOP: Technically the smallest group can't lose its only delegate, 
  //   so if there is a group with 2 and two groups with 1, you'll end up with three groups of 1
  // - BREAK UP SMALL GROUP: If groups have equal delegate counts, the smallest group is forced to realign and give up their delegates
  // - A TIE: Two candidates tied for a delegate? There is a coin toss (you knew $ ran our democracy but you didn't know it was quarters!).
  //   We will need to detect this state (viable candidates with same caucusers count) and offer UI to help the user report the results
  while (sum (candidates, "delegates") > totalDelegates) {
    const candidatesWithMostDelegates = multipleComp(max, candidates, "delegates");
    const viableCandidates = filter(candidates, (candidate) => candidate.delegates > 0);
    const candidatesWithMinority = multipleComp(min, viableCandidates, "caucusers");

    // As long as the top group is not losing its only delegate, we can remove one
    if (candidatesWithMostDelegates.length === 1 && candidatesWithMostDelegates[0].delegates > 1) { 
      candidatesWithMostDelegates[0].delegates--;
      console.log("took one from candidate with most delegates");
    
    // If the sum of all delegates allotted MINUS the delegates allotted to the viable candidate with the fewest
    // caucusers is greater than or equal to the total delegates for the precinct, we can safely drop the delegates
    // from the lowest performing candidate(s). This will drop the candidate with the least caucusers, and multiples
    // if there is a tie (of 2 - n candidates)
    } else if (sum (candidates, "delegates") - sum (candidatesWithMinority, "delegates") >= totalDelegates) {
      each(candidatesWithMinority, (candidate) => candidate.delegates-- );
      console.log("took one from candidates with least caucusers");
    } else {
      // Tie, resolved in UI
      // For each viable candidate, if another candidate has the same number of caucusers, add that candidate's ID to the
      // candidate.ties array. Now we know who is tied with whom!
      chain(viableCandidates)
      each(viableCandidates, function(candidate) {
        candidate.tie = chain(viableCandidates)
          .filter((newCandidate) => newCandidate.caucusers === candidate.caucusers)
          .map((candidate) => candidate.candidateId)
          .value();
      });
      console.log(candidates);
      return candidates;
    }
  }
  return candidates;
}

export function sum(obj, prop) {
  return reduce(obj, function(memo, val) { return memo + val[prop] }, 0);
}

// Helper function that returns multiple objects (ties) from comparator (min or max) function, as array
function multipleComp(comparatorFunc, obj, compare) {
  const maxOrMin = comparatorFunc(obj, function(val){ return val[compare] });
  return filter(obj, function(val){ return (val[compare] === maxOrMin[compare]) });
}