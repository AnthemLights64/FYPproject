import React, {Component} from 'react';
import { Button, Card } from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';

import './style.less'

import img1 from '../../assets/images/2018Summer1.jpg';
import img2 from '../../assets/images/2018Summer2.jpg';
import img3 from '../../assets/images/2018Summer3.jpg';

export default class LPLSummer extends Component {
    render () {

        const title = (
            <span>
                <Button 
                type='link' 
                icon={<ArrowLeftOutlined style={{color: '#B49169', marginRight: 5, fontSize: 20}}/>}
                onClick={() => this.props.history.goBack()}
                >
                </Button>
                <span>LPL Summer</span>
            </span>
        );

        return (
            <>
                <Card title={title}>
                    <div className="row">
                        <div className="col-lg-10 m-auto">
                            <div style={{textAlign: 'center'}}>
                                <h5>2018 LPL Summer Champion</h5>
                                <h1>The second step in the writing of a legend</h1>
                                <p>It was the second title for RNG in 2018, as the RNG won the summer tournament in raging style.  It was a continuation of competitive shape and legendary storytelling.</p>
                            </div>
                        </div>
                    </div>   
                    <div>
                        <div style={{textAlign: 'center', marginTop: 20}}>
                            <img style={{maxWidth: 700}} src={img1} alt=""/>
                        </div>
                        <div>
                            <div style={{textAlign: 'center'}}>
                                <p class="p-content">RNG and iG have both secured their tickets to the Worlds. In a series of tournaments this year LPL's teams have shown their strength to all regions of the world and the competitive game is bound to compete for first place.</p>
                                <p>RNG took on IG in a BO5 five-game, three-win format. </p><p>In the first game, RNG scored a point, Uzi Kaisa played well and won the MVP.</p><p>In the second game, RNG's opening line change tactics successfully suppressed IG, Uzi was unstoppable and then cut the MVP, RNG 2-0 to get the match point.</p><p>In the third game, after NING grabbed the dragon, IG turned the tide against the wind and pulled back a city.</p><p>In the fourth game, IG took a perfect BP.</p><p>In the fifth game, RNG replaced the jungler mlxg. RNG in the middle was broken two roads, but also two incisors forced, in the final group battle in the double c perfect play against the wind flip, 3-2 victory over IG to win the LPL summer finals championship.
                                </p>
                            </div>
                        </div>
                        <div class="row" style={{textAlign: 'center'}}>
                            <div style={{flex: 10, maxWidth: 500, margin: 30}}>
                                <div class="image-v">
                                    <img src={img2} alt=""/>
                                </div>
                            </div>
                            <div style={{flex: 10, maxWidth: 500, margin: 30}}>
                                <div class="image-v">
                                    <img src={img3} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{textAlign: 'center'}}>
                                <blockquote className="blockquote">
                                2018 has been a lucky year for the RNG, and hopefully it will bring good fortune to the end.
                                </blockquote>
                        </div>
                    </div>
                </Card>
                
            </>
        );
    }
}