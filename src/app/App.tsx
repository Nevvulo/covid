import React, { Component } from 'react';
import CountUp from 'react-countup';
import './App.scss';
import { EmbeddedVideo, Flex, InteractiveChart } from './components';
import { getTotalCases, getTotalTimeline } from './modules';
import { EmbeddedVideoLinks } from './constants';

interface IProps {}
interface IState {
  info?: CaseInformation,
  timeline?: Array<Number>
}
interface CaseInformation {
  total: number,
  recovered: number,
  deaths: number
}

// First major recorded cases at Jan 22nd
const CORONAVIRUS_EPOCH = 1579651200;

class App extends Component<IProps, IState> {
  constructor (props: IProps, state: IState) {
    super(props, state);
    this.state = {};
  }

  async componentDidMount () {
    // When this component is mounted, start requests
    this.setState({
      info: await getTotalCases(),
      timeline: await getTotalTimeline()
    });
  }

  render () {
    const { info = { total: 0, recovered: 0, deaths: 0 }, timeline } = this.state;
    const link = EmbeddedVideoLinks[Math.floor(Math.random() * EmbeddedVideoLinks.length)];
    return (
      <div className='app'>
        <section className='section main-section centered'>
          <h1 className='main-section-header'>
            Together, let's be <span className='main-section-header-covid'><a href='https://www.health.gov.au/resources/apps-and-tools/covidsafe-app'>COVIDSafe</a></span>
          </h1>
          <EmbeddedVideo src={link} />
        </section>
        <section className='section second-section centered'>
          <Flex align='center' direction='row' className='second-section-content' wrap>
            <Flex justify='center' align='center'>
              <header>Chart</header>
              <Flex className='chart-container'>
                <InteractiveChart data={timeline?.map((value, index) => {
                  const date = new Date(CORONAVIRUS_EPOCH * 1000);
                  date.setDate(date.getDate() + index);
                  return { cases: value, time: date }
                })}/>
              </Flex>
            </Flex>

            <Flex justify='space-between' align='center'>
              <header>Statistics</header>
              <Flex align='right'>
                <h4 style={{ textAlign: 'left', borderBottom: '1px solid #3f51b5', borderRadius: '4px' }}>
                  <Flex>
                    <CountUp end={info.total || 0} separator=',' delay={0.4} duration={1.6}></CountUp>
                    <span className='cases-subtext'>cases worldwide and counting</span>
                  </Flex>
                </h4>
                <Flex justify='center' align='stretch' direction='row'>
                  <h5 style={{ borderBottom: '1px solid #43a047' }}>
                    <Flex align='start'>
                      <CountUp end={info.recovered || 0} separator=',' delay={0.44} duration={1.8}></CountUp>
                      <span className='cases-subtext'>recovered</span>
                    </Flex>
                  </h5>
                  <h5 style={{ borderBottom: '1px solid #c62828' }}>
                    <Flex align='end'>
                      <CountUp end={info.deaths || 0} separator=',' delay={0.5} duration={2.1}></CountUp>
                      <span className='cases-subtext'>dead</span>
                    </Flex>
                  </h5>
                </Flex>
              </Flex>

              <div className='data-provided-tag'>Data provided by api.covid19api.com</div>
            </Flex>
          </Flex>

          <h1 className='second-section-header'>Thousands of lives are at risk</h1>
          <h6>But you could make things better by taking these steps</h6>
        </section>

        <section className='section third-section help-step-1'>
          <h1 className='main-section-header'>
            <span className='main-section-header-covid'>1</span> Social distancing
            <h2>Make sure you're at least 1.5 meters away from other people</h2>
          </h1>  
        </section>

        <section className='section third-section help-step-2'>
          <h1 className='main-section-header'>
            <span className='main-section-header-covid'>2</span> Cover your cough if you're sick
            <h2>If you are going out while sick, you should minimize contact with other people and cover your coughs and sneezes</h2>
            <h6>If you're feeling very unwell, consider getting tested to further reduce the risk of spread</h6>
          </h1>
        </section>

        <section className='section third-section help-step-3'>
          <h1 className='main-section-header'>
            <span className='main-section-header-covid'>3</span> Stay home whenever possible
            <h2>Unless you're going out for excercise, work, education or medical reasons, you should try to stay home for the best chance at keeping yourself and others safe</h2>
          </h1>
        </section>
      </div>
    );
  }
}

export default App;
