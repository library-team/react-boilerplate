import React from 'react';
import EventPage from './EventPage'
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';

class EventCategory extends React.Component {
    constructor() {
        super()

        this.state = {
            loadNumber: 3
        }

        this.loadMore = this.loadMore.bind(this);
        this.loadFewer = this.loadFewer.bind(this);
    }

    loadMore() {

        this.setState({
            loadNumber: 10
        })
    }

    loadFewer() {

        this.setState({
            loadNumber: 3
        })
    }

    shortenDescription(description) {

        const newDes = description.split(/<br\s?\/?>/)
            .filter(function(string) {
            return string !== ""
            })
            .splice(0,2).join("<br><br>");

        return newDes
    }

    render() {

        return (
        <section className="EventCategory" id={this.props.idName} >
            <h2 className={(this.props.fn.thisApp().state.renderNearbyEvents) ? 'nearby' : null } >{this.props.title}</h2>
            {this.props.events.slice(0,this.state.loadNumber).map((event) => {

                return (
                <div className="event" key={event.id}>
                    <h3>{event.title}</h3>
                    <h4>{event.date}</h4>

                        <p dangerouslySetInnerHTML={{ __html: this.shortenDescription(event.description) }}></p>

                        <ul className="links">
                            <li onClick={(e) => {
                                this.props.fn.eventPageChange(event)
                                this.props.fn.handleNavClick(e, 'event')
                                }}>
                                <Link to={`/events/${event.id}`}><i className="fas fa-info-circle"></i> Event Info</Link>
                                {/* <Route path="/events" component={EventPage} /> */}
                            </li>
                            <li><a href="#" onClick={(e)=>{this.props.fn.saveEvent(e, event)}}><i className="fas fa-bookmark"></i> Save Event</a></li>
                            <li><a href={`http://www.google.com/calendar/event?action=TEMPLATE&dates=${this.props.fn.getGoogleTime(event)}&text=${event.title}&location=Toronto+Public+Library+${event.library}&details=${event.description}`}><i className="fas fa-calendar-plus"></i> Add to Calendar</a></li>
                        </ul>

                </div>
                )
            })}
                {this.state.loadNumber === 3 ? <button className="button" href="#" onClick={this.loadMore}>See more events...</button> : <button className="button" href="#" onClick={this.loadFewer}>See fewer events...</button>}
        </section>
        )
    }

}

export default EventCategory;