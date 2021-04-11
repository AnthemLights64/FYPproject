import React, {Component} from 'react';
import './home.less';

export default class Home extends Component {
    render () {
        return (
            <>
                <div className="levels">
                    <div className="level one">
                        <div className="title">LPL Spring</div>
                        <div className="content">Best record: Champion</div>
                    </div>
                    <div className="level two">
                        <div className="title">LPL Summer</div>
                        <div className="content">Best record: Champion</div>
                    </div>
                    <div className="level three">
                        <div className="title">MSI</div>
                        <div className="content">Best record: Champion</div>
                    </div>
                    <div className="level four">
                        <div className="title">World</div>
                        <div className="content">Best record: Runner-up</div>
                    </div>
                </div>
            </>
            
        );
    }
}