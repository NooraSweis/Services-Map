import React from 'react';
import './style/About.css';
import img from './image/team.jpg';

const About = () => {
    return (
        <div className='about'>
            <div className='about-image'>
                <span>Who We Are? <br /> Engineers, Programmers, Thinkers AND Collaborators</span>
            </div>
            <span className='about-paragragh'>This site is designed to showcase Tulkarm area as a services map.
            It contains many features that enable the user (who is visiting the city or even those residing in it)
            to find the services they are looking for in an easy way, according to their locations and the services closest to them.
            It also enables service providers to display their products, services, and locations to make it easier for those looking
            to find them.
            </span>
            <h2 className='about-team'>Our Team</h2>
            <div className='divMembers'>
                <div className="member">
                    <img src={img} alt="team member" className="teamMemberPhoto" />
                    <p><b>Noora Sweis </b><br /> CEO - Software Engineer</p>
                </div>
                <div className="member">
                    <img src={img} alt="team member" className="teamMemberPhoto" />
                    <p><b>Leen Odeh </b><br /> CEO - Software Engineer</p>
                </div>
                <div className="member">
                    <img src={img} alt="team member" className="teamMemberPhoto" />
                    <p><b>Ethar Samaha</b> <br /> CEO - Software Engineer</p>
                </div>
            </div>
        </div>
    );
}

export default About;

/*
This site is designed to showcase Tulkarm area as a services map.
It contains many features that enable the user
(who is visiting the city or even those residing in it)
to find the services they are looking for in an easy way,
according to their locations and the services closest to them.
It also enables service providers
to display their products, services, and locations
to make it easier for those looking to find them.
*/