import React, { Component } from 'react';
import './EmbeddedVideo.scss';

interface IProps {
    src?: any
}

interface IState {
    style?: any
}

interface EmbeddedVideo {
    element?: any
}

class EmbeddedVideo extends Component<IProps, IState> {
    constructor (props: IProps, state: IState) {
        super(props, state);
        this.state = {};
        this.element = React.createRef();
    }

    // Handles the animation for the mouse hover
    mouseMoved (event: any) {
        const box = this.element.current.getBoundingClientRect();
        const xVal = event.nativeEvent.layerX;
        const yVal = event.nativeEvent.layerY;
        const yRotation = 20 * ((xVal - box.width / 2) / box.width);
        const xRotation = -20 * ((yVal - box.height / 2) / box.height);

        this.setState({
            style: {
                transform: `perspective(500px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`
            }
        })
    }

    // When the mouse leaves the area, reset style to default
    mouseOut (event: any) {
        this.setState({
            style: {
                transform: `perspective(500px) scale(1) rotateX(0deg) rotateY(0deg)`
            }
        })
    }

    render () {
        const { style } = this.state;
        const { src } = this.props;
        return (
            <div onMouseOut={(e) => this.mouseOut(e)} onMouseMove={(e) => this.mouseMoved(e)} ref={this.element} className='centered video-container'>
                <iframe style={style} allowFullScreen src={src} className='video centered'></iframe>
            </div>
        );
    }
}

export default EmbeddedVideo;
