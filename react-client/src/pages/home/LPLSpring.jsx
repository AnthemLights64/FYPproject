import React, {Component} from 'react';
import { Button, Card } from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';
import './style.less'

import img1 from '../../assets/images/Spring2021.jpg';
import img2 from '../../assets/images/RNGcurtain.png';
import img3 from '../../assets/images/photo2021.jpg';

export default class LPLSpring extends Component {
    render () {

        const title = (
            <span>
                <Button 
                type='link' 
                icon={<ArrowLeftOutlined style={{color: '#B49169', marginRight: 5, fontSize: 20}}/>}
                onClick={() => this.props.history.goBack()}
                >
                </Button>
                <span>LPL Spring</span>
            </span>
        );

        return (
            <>
                <Card title={title}>
                    <div className="row">
                        <div className="col-lg-10 m-auto">
                            <div style={{textAlign: 'center'}}>
                                <h5>Champion</h5>
                                <h1>A joint effort by all</h1>
                                <p>This is the third spring championship of RNG in the LPL. This time, RNG won the final championship by beating 3 players in the group of defeaters in the playoffs.</p>
                            </div>
                        </div>
                    </div>   
                    <div>
                        <div style={{textAlign: 'center', marginTop: 20}}>
                            <img style={{maxWidth: 700}} src={img1} alt=""/>
                        </div>
                        <div>
                            <div style={{textAlign: 'justify'}}>
                                <p class="p-content">CONGRATULATIONS to RNG for winning the 2021 LPL Spring Championship with a 3-1 victory over FPX! They will also represent LPL at MSI 2021!</p>
                                <p>This spring, RNG shouldered all the expectations and doubts, and rode the waves. </p><p>A season of hard work and hard work has resulted in endless surprises, and although we have been in the abyss, we have never hit rock bottom. </p><p>Today, RNG is shining, just to watch the gold fall across the sky again. </p><p>The RNG are announcing to the world that their journey is much more than that, that they are aiming for the sky and that their ambition is to go far!
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
                                This is the power of the new generation of juniors and we expect and aspire to better results.
                                </blockquote>
                        </div>
                    </div>
                </Card>
                
            </>
        );
    }
}