//CALCULATOR.JS LIBRARY
import {max, min, filter, each, reduce} from 'underscore';

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
  return Math.round((caucusers * totalDelegates)/totalAttendees);
}

export function calculateSimpleMajority(candidates, totalDelegates) {
  const candidateWithMajority = multipleComp(max, candidates, "caucusers");
  each(candidateWithMajority, function(candidate) { candidate.delegates = totalDelegates}); //If it's a tie, we want to set both to 
  // We'll take care of ties and resetting the smaller groups to 0 delegates in resolveDelegates
  return candidates;
}

export function resolveDelegates(candidates, totalDelegates) {
  // Ok, you got here because you allocated too many delegates. At this point, somebody has to lose a delegate. This can happen in a few ways:
  // - TAKE ONE OFF THE TOP: Technically the smallest group can't lose its only delegate, 
  //   so if there is a group with 2 and two groups with 1, you'll end up with three groups of 1
  // - BREAK UP SMALL GROUP: If groups have equal delegate counts, the smallest group is forced to realign and give up their delegates
  // - A TIE: Two candidates tied for a delegate? There is a coin toss (you knew $ ran our democracy but you didn't know it was quarters!).
  //   We will need to detect this state (viable candidates with same caucusers count) and offer UI to help the user report the results
  while (reduce(candidates, function(memo, candidate) { return memo + candidate.delegates}, 0) > totalDelegates) {
    const candidatesWithMostDelegates = multipleComp(max, candidates, "delegates");
    console.log(candidatesWithMostDelegates);
    const viableCandidates = filter(candidates, function(candidate){ return (candidate.delegates > 0)});
    const candidatesWithMinority = multipleComp(min, viableCandidates, "caucusers");
    console.log(candidatesWithMostDelegates);

    if (candidatesWithMostDelegates.length === 1 && candidatesWithMostDelegates[0].delegates > 1) { // As long as the top group is not losing its only delegate, we can remove one.
      candidatesWithMostDelegates[0].delegates--;
      console.log("took one from candidate with most delegates");
    } else if (candidatesWithMinority.length === 1) {
      candidatesWithMinority[0].delegates--;
      console.log("took one from candidate with least caucusers");
    } else {
      //Tie, resolved in UI
      return candidates;
    }
  }
  return candidates;
}

// Helper function that returns multiple objects (ties) from comparator (min or max) function, as array
function multipleComp(comparatorFunc, obj, compare) {
  const maxOrMin = comparatorFunc(obj, function(val){ return val[compare] });
  return filter(obj, function(val){ return (val[compare] === maxOrMin[compare]) });
}