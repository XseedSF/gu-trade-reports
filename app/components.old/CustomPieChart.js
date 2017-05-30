import React, { Component } from 'react';

import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import {QuestionTitle} from './QuestionTitle.js'
import {NoDataMatching} from './NoDataMatching.js'

const COLORS = ['#3f71b7', '#dfaa5e'];

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
  //console.log('renderCustomizedLabel', percent, index);
  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'}  dominantBaseline="central">
    {(index === 0 ? 'Si - ' : 'No - ') + `${(percent * 100).toFixed(0)}%`}
    </text>
    );
};

export default class CustomPieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: -1,
      data: this.processQuestionsForChart(this.props.filteredQuestions)
    };
  }
  componentDidMount() {
    this.setState({data: this.processQuestionsForChart(this.props.filteredQuestions)});
  }
  processQuestionsForChart(filteredQuestions) {

    //Es una torta, una opcion por yes y otra por no (checked o no checked)    
    let chartData = [{Amount: 0, name: "Si", YesNoValue: true},{Amount: 0, name: "No", YesNoValue: false}];
    filteredQuestions.forEach(q => {
      if(q.YesNoValue)
        chartData[0].Amount += 1;
      else 
        chartData[1].Amount += 1;           
    }
    );

    return chartData;
  }
  checkCleanFilters(nextProps) {    
    if(nextProps.filters.length === 0)
      this.setState({ activeIndex: -1 });
  }
  handleClick(data, index) {
    let newIndex = -1;
    if(this.state.activeIndex !== index) {
      newIndex = index;
    }
    
    this.setState({
      activeIndex: newIndex
    });

    this.props.handleFilter(this.props.question, this.state.data[index].YesNoValue);
  }
  componentWillReceiveProps(nextProps) {

    let updateChart = true;
    if(this.props.filteredQuestions.length === nextProps.filteredQuestions.length) {
      nextProps.filters.forEach(f => {
        if(f.questionId === this.props.question.Id)
          updateChart = false;
      });
    }

    if(updateChart)
      this.setState({data: this.processQuestionsForChart(nextProps.filteredQuestions)});

    this.checkCleanFilters(nextProps);
  }   
  render () {
    let dataForChart = this.state.data;
    //console.log(this.props.filteredQuestions);
    return (
      <div className='question-chart-container'>
      <QuestionTitle question={this.props.question} />
      {
        this.props.filteredQuestions.length > 0 ? 
        <PieChart className='chart-centered' width={300} height={300} onClick={this.handleClick.bind(this)}>

        <Pie 
        activeIndex={this.state.activeIndex}
        isAnimationActive={true} 
        data={dataForChart} 
        cx={150} 
        cy={150} 
        outerRadius={115} 
        fill="#8884d8" 
        paddingAngle={0}
        valueKey="Amount"
        label={renderCustomizedLabel}
        labelLine={false}>            
        {              
          dataForChart.map((entry, index) => 
            <Cell stroke={index === this.state.activeIndex ? '#3e3d44' : '#00FFFFFF'} 
            strokeWidth={index === this.state.activeIndex ? 3 : 1}
            fill={index === this.state.activeIndex ? '#69bb76' : COLORS[index % COLORS.length]}
            key={`cell-${index}`} />
            )
        }
        </Pie>   
        <Tooltip/>     
        </PieChart> 
        : <NoDataMatching /> 
      }        
      </div>
      );
  }
};

CustomPieChart.propTypes = {
  question: React.PropTypes.object.isRequired,
  filteredQuestions: React.PropTypes.array.isRequired,
  filters: React.PropTypes.array.isRequired,
  handleFilter: React.PropTypes.func.isRequired
}