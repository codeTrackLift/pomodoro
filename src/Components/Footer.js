import React from 'react';
import '../Styles/Footer.css';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentYear: new Date().getFullYear()
        };
    }

    render(){

        return (
            <footer>
                <p>Copyright © {this.state.currentYear}
                    <a href="https://www.codebypete.com" target="_blank" rel='noreferrer'>
                        <img src="https://codetracklift.github.io/codeTrackLift/logos/pharma2code_icon.gif" style={{height:'2rem',padding:'0 0.25rem'}}
                            alt="codeByPete Logo."/>
                        <span style={{color:"white"}}>code</span><span style={{color:"#00857c"}}>By</span><span
                            style={{color:"lime"}}>Pete</span>
                    </a>
                </p>
                <div>
                    <a href="https://github.com/codeTrackLift/markdown-previewer" target="_blank" rel='noreferrer'>
                        <img className="socialLogo" src="https://codetracklift.github.io/codeTrackLift/logos/GitHub-Mark-Light-64px.png" alt="GitHub Icon"/>
                    </a>
                    <a href="https://twitter.com/codetracklift" target="_blank" rel='noreferrer'>
                        <img className="socialLogo" src="https://codetracklift.github.io/codeTrackLift/logos/Twitter_social_icons-circle-white.png" alt="Twitter Icon"/>
                    </a>
                    <a href="https://www.linkedin.com/in/codebypete/" target="_blank" rel='noreferrer'>
                        <img className="socialLogo" src="https://codetracklift.github.io/codeTrackLift/logos/linkedin_white.png" alt="LinkedIn Icon"/>
                    </a>
                </div>
            </footer>
        )
    }
}