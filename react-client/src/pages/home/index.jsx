import React, {Component} from 'react';
import './home.less';

export default class HomePage extends Component {
    render () {
        return (
            <>
                <div className="levels">
                    <div className="level one" onClick={() => this.props.history.push('/home/LPLSpring')}>
                        <div className="title">LPL Spring</div>
                        <div className="content">Best record: Champion</div>
                    </div>
                    <div className="level two" onClick={() => this.props.history.push('/home/LPLSummer')}>
                        <div className="title">LPL Summer</div>
                        <div className="content">Best record: Champion</div>
                    </div>
                    <div className="level three" onClick={() => this.props.history.push('/home/MSI')}>
                        <div className="title">MSI</div>
                        <div className="content">Best record: Champion</div>
                    </div>
                    <div className="level four" onClick={() => this.props.history.push('/home/World')}>
                        <div className="title">World</div>
                        <div className="content">Best record: Runner-up</div>
                    </div>
                </div>
            </>
            
        );
    }
}