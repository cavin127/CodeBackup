import { Component , Input , OnChanges} from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute } from '@angular/router';
import { ISession } from '../shared/event.model'

@Component({

    selector:'session-list',
    templateUrl : 'app/events/event-details/session-list.component.html'
})

export class sessionListComponent implements OnChanges{

    @Input() sessions:ISession[]
    @Input() filterBy:string;
    @Input() sortBy:string;
    visibleSessions:ISession[] = [];


    ngOnChanges(){
        if(this.sessions)
        {

            this.filterSessions(this.filterBy);
            this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVoteDesc);
        }

    }

    filterSessions(filter:string){

        if(filter === 'all')
        {
            this.visibleSessions = this.sessions.slice(0);
           
        }   
        else {

            this.visibleSessions = this.sessions.filter(session => {

                return session.level.toLocaleLowerCase() === filter
            })
        }

        // console.log(this.visibleSessions);
    }


    
}


function sortByNameAsc(s1:ISession , s2:ISession){

        if(s1.name > s2.name) return 1
        else if(s1.name === s2.name) return 0
        else return -1
    }
function sortByVoteDesc(s1:ISession , s2:ISession){

        return s2.voters.length - s1.voters.length
    }