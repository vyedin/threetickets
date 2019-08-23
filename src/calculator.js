//CALCULATOR.JS LIBRARY

export function calculateViabilityThreshold(totalAttendees,totalDelegates) {
  switch(totalDelegates) {
    case 1:
        return 0; //TODO: this case should display 'simple majority', and will need some special handling
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