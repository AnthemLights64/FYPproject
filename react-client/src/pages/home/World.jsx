import React, {Component} from 'react';
import { Button, Card } from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';

import './style.less'

import img1 from '../../assets/images/World1.jpg';
import img2 from '../../assets/images/World2.jpg';
import img3 from '../../assets/images/World3.jpg';

export default class World extends Component {
    render () {

        const title = (
            <span>
                <Button 
                type='link' 
                icon={<ArrowLeftOutlined style={{color: '#B49169', marginRight: 5, fontSize: 20}}/>}
                onClick={() => this.props.history.goBack()}
                >
                </Button>
                <span>World</span>
            </span>
        );

        return (
            <>
            <Card title={title}>
                <div className="row">
                    <div className="col-lg-10 m-auto">
                        <div>
                            <h5>Fight For World Champion 2021</h5>
                            <h1>To break the record of consecutive runners-up in Season 4 and 5</h1>
                            <p>RNG took runners-up in Seasons 4 and 5 and won all but the Worlds in a most promising 2018, but unfortunately, eventually fell in the last 8 at Worlds.</p>
                        </div>
                    </div>
                </div>   
                <div>
                    <div style={{textAlign: 'center', marginTop: 20}}>
                        <img style={{maxWidth: 700}} src={img1} alt=""/>
                    </div>
                    <div>
                        <div>
                            <p class="p-content">RNG took this year's title against KZ of the LCK division. There have been such encounters in the past, but the result was not a win and left a regret. But this year, they finally got their wish and won the MSI championship.</p>
                            <p>RNG have always been a dominant team in the LPL, taking second place in the world for two years in a row since the LPL began competing in the Worlds.</p><p>At Season 7, RNG began to give the audience confidence that they could battle the mighty LCK division, and although they lost in the quarterfinals of the Worlds, this defeat has proven that RNG was always capable of beating the strongest team at the time, SKT.</p><p>In Season 8, RNG made a comeback and won every tournament in a row with ferocity. Firstly, they won the LPL's Spring Championship, and then they were ordered to play in the mid-season championship to help the LPL win the title.</p><p>In the Asian Rivalry, RNG was seen as the unbeatable team and helped LPL hold on to the Asian Rivalry trophy with a late extra game.</p><p>In a year of great significance, RNG sent four players to the Asian Games, and another LPL powerhouse managed to get the gold medal.</p><p>In the summer tournament, RNG got the title and entered the Worlds as the number one seed with a lot of momentum.</p><p>In the final Worlds, while all the fans were expecting to see RNG take the final title, something unfortunate happened and they ended up falling in the last eight, leaving the fans with a huge gap in their emotions.</p><p>In the 2 years that followed, RNG's results were on a downward spiral and the veteran players of yesteryear retired, unable to withstand the pressure of time.</p><p>In this brand new 2021 season, the otherwise unheralded fledgling RNG took the spring championship and took on the challenge of a whole new year, hoping to do well in the final Worlds of the year.
                            </p>
                        </div>
                    </div>
                    <div class="row">
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
                    <div className="row">
                            <blockquote className="blockquote">
                            Hit the championship with a brand new attitude.
                            </blockquote>
                    </div>
                </div>
            </Card>
            
        </>
        );
    }
}