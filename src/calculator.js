//CALCULATOR.JS LIBRARY
import staticData from './iowa.json';

export function calculateViabilityThreshold(totalAttendees,precinct_id) {
    const delegates = staticData.precincts[precinct_id].delegates;
    switch(delegates) {
        case 1:
            return 'simple majority';
        case 2:
            return Math.ceil(totalAttendees/4);
        case 3:
            return Math.ceil(totalAttendees/6);
        default:
            return Math.ceil(totalAttendees/6.67);
  }
}

export function calculateViability(attendees,threshold) {
    return attendees > threshold;
}

export function calculateDelegates(attendees,precinct_id,totalAttendees) {
    //TODO: this function will calculate the delegates per candidate. 
    //The trick here is that we need info on all the candidates to do this,
	//so we will likely pass an array of all the candidate inputs and do the math here
	

	//input object:
	/*{
		total_attendees: 100,
		total_delegates: 10,
		candidates: {
			warren: {
				attendees: 10
			},
			biden: {
				attendees: 30330
			}
		}
	}


	// output object
	{
		counted_attendees: 50,
		viability_threshold: 15,
		candadites: {
			warren: {
				delegates: 5
			},
			biden: {
				delegates: 0
			}
		}
	}*/
}