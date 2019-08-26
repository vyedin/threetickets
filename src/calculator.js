//CALCULATOR.JS LIBRARY

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

export function calculateSimpleMajority(candidates) {
  return candidates;
}

export function resolveDelegates(candidates, totalDelegates) {
  // Ok, you got here because you allocated too many delegates. At this point, somebody has to lose a delegate. This can happen in a few ways:
  // - TAKE ONE OFF THE TOP: Technically the smallest group can't lose its only delegate, 
  //   so if there is a group with 2 and two groups with 1, you'll end up with three groups of 1
  // - BREAK UP SMALL GROUP: If groups have equal delegate counts, the smallest group is forced to realign and give up their delegate
  // - A TIE: Equal delegates and equal caucusers? There is a coin toss (you knew $ ran our democracy but you didn't know it was quarters!).
  //   We will need to detect this state (viable candidates with same caucusers count) and offer UI to help the user report the results
  console.log(candidates);
  return candidates;
}