import React, {Component} from 'react';
import { Button, Card } from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';

import './style.less'

import img1 from '../../assets/images/MSI1.jpg';
import img2 from '../../assets/images/MSI2.jpg';
import img3 from '../../assets/images/MSI3.jpg';

export default class MSI extends Component {
    render () {

        const title = (
            <span>
                <Button 
                type='link' 
                icon={<ArrowLeftOutlined style={{color: '#B49169', marginRight: 5, fontSize: 20}}/>}
                onClick={() => this.props.history.goBack()}
                >
                </Button>
                <span>Mid-Season Invitational</span>
            </span>
        );

        return (
            <>
                <Card title={title}>
                    <div className="row">
                        <div className="col-lg-10 m-auto">
                            <div style={{textAlign: 'center'}}>
                                <h5>First MSI Champion</h5>
                                <h1>The first World Championship title for RNG</h1>
                                <p>After so many years, the LPL once again defeated a South Korean team that was as good as it gets at the Worlds, and the RNG's year really grew the LPL.</p>
                            </div>
                        </div>
                    </div>   
                    <div>
                        <div style={{textAlign: 'center', marginTop: 20}}>
                            <img style={{maxWidth: 700}} src={img1} alt=""/>
                        </div>
                        <div>
                            <div style={{textAlign: 'justify'}}>
                                <p class="p-content">RNG took this year's title against KZ of the LCK division. There have been such encounters in the past, but the result was not a win and left a regret. But this year, they finally got their wish and won the MSI championship.</p>
                                <p>After RNG got the match point, that is, in the fourth game, when UZI's Kasha died in the dragon pit, it gave people a chill, because such a scene has been seen before.</p><p>The next wave, letme's Aoun released a big move, followed by Xiaohu's big live KZ's auxiliary Luo, and letme's big move at this time also knocked two people away, creating favorable conditions for Uzi's harvest, this wave of the group battle the other side's double C died, and RNG ended the game in one wave.</p><p>When RNG was about to wave, commentator Miller mentioned something in it, saying that a famous top single had said a sentence, four Chinese can't win, but five Chinese can definitely win. There was somehow a heartbreak when hearing this, but RNG's victory this time was a relief. And after the win, UZI and Xiaohu got up and hugged each other at the same time, that image was really touching.</p><p>And the other is in small enough to touch the trophy, RNG's wilderness karsa, after helping the puppy, after that one action he cried, possibly for RNG to take this not easy championship, but also possibly for UZI this six years to finally realize their wish, but also may be to their own persistence has been rewarded.</p><p>When the RNG got the trophy to leave, the spicy pot in the resistance to the trophy they won, strutting down, just like when harvesting the crops when the big harvest, but also let us see the RNG persistence.
                                </p>
                            </div>
                        </div>
                        <div className="row image2">
                            <div className="wrapper">
                                <div class="image-v">
                                    <img src={img2} alt=""/>
                                </div>
                            </div>
                            <div className="wrapper">
                                <div class="image-v">
                                    <img src={img3} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div style={{textAlign: 'center'}}>
                                <blockquote className="blockquote">
                                This is a landmark championship and a dynasty is being built.
                                </blockquote>
                        </div>
                    </div>
                </Card>
                
            </>
        );
    }
}