import React, { Component } from 'react';
import { LineChart } from '@opd/g2plot-react';
import { LineConfig } from '@antv/g2plot';

interface IProps {
    data?: Array<any>
}

interface IState {}

// Configuration for line chart
const config: LineConfig = {
    title: {
      visible: false,
      text: '2020 Coronavirus Pandemic - New Cases'
    },
    description: {
      visible: false,
      text:
        'Showcases the total number of new cases per day worldwide'
    },
    padding: 'auto',
    forceFit: true,
    xField: 'time',
    yField: 'cases',
    xAxis: {
      type: 'time',
      mask: 'DD-M',
      label: {
        visible: true,
        autoHide: true
      }
    },
    yAxis: {
      // eslint-disable-next-line
      // @ts-ignore
      formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)
    },
    legend: {
      visible: true
    },
    label: {
      visible: false,
      type: 'line'
    },
    animation: {
      enter: {
        animation: 'clipingWithData'
      }
    },
    smooth: true,
    height: 360
  };

export default class InteractiveChart extends Component<IProps, IState> {
    render () {
        const { data } = this.props;
        return (
            <LineChart {...config} data={data} />
        );
    }
};