import React from 'react';
import {Chart} from 'react-google-charts';
import './styles.css';
import 
{Container,
Row,
Col,
} from 'reactstrap';
const options1 = {
    hAxis: {
      title: "Percentage",
      viewWindow: { min: 0, max: 100 },
    },
    vAxis: { 
        title: "SubSkills",
    },
    legend: 'none'   
  };
  const options2 = {
    title: "Skills" 
  };
  const data1=[];
  const data2=[];   
  var courses=['java1','java2','java3','java4','java5'];
  var color;
  var percentage=[100,20,40,60,30];
  const ChartComp = () => {
      data1[0]=["Courses", "Percentage",{ role: 'style' }];
      data2[0]=["Courses", "Percentage"];
      for(var i=0;i<courses.length;i++){
          if(percentage[i]>50)
            color='red';
        else
            color='green';
          data1.push([courses[i],percentage[i],color]);
          data2.push([courses[i],percentage[i]]);
      }
   
    return (
      <div  width='100%'>
      <div id='pdfDiv' width='90%'>
      <Chart
        chartType="BarChart"
        data={data1}
        options={options1}
        width="100%"
        height="400px"
      />
      <Chart
        chartType="PieChart"
        data={data2}
        options={options2}
        width="100%"
        height="500px"      
      />

      </div>

      </div>
    );
  };
  class Legend extends React.Component{
      render(){
          return(
              <div>

                <div className="Legend" style={{backgroundColor:'yellow'}}></div>
                <span className="LegendText">Unsatisfactory</span>
                <div className="Legend" style={{backgroundColor:'green'}}></div>
                <span className="LegendText">Average</span>
                <div className="Legend" style={{backgroundColor:'blue'}}></div>
                <span className="LegendText">Good</span>
                <div className="Legend" style={{backgroundColor:'darkblue'}}></div>
                <span className="LegendText">Excellent</span>
              </div>
          )
      }
  }
  export default class ChartComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            isLoading: true,
            id: localStorage.getItem('id'),
            test: 0,
            scores:[],
          };
          this.skills=[];
          this.percent=[];
          this.data=[];
          this.option={
            hAxis: {
              title: "Percentage",
              viewWindow: { min: 0, max: 100 },
            },
            vAxis: { 
                title: "SubSkills",
            },
            legend: 'none'   
          };;
          
    }
    
    componentWillMount() {
        this.setState({ test: this.props.testId });
    }
    
    componentDidMount() {
        console.log(this.state.id);
        console.log(this.state.test);
        var userId = this.state.id;
        var testId = this.state.test
        fetch(`/api/score?user=${userId}&test=${testId}`)
        .then(response => response.json())
        .then(marks => {
            this.setState({scores: marks, isLoading: false}); 
            
    });
}
    render(){
        const {isLoading,id,test,scores} = this.state;
        if (isLoading) {
            return (
                <Container>
                    <Row>
                        <Col xs="12">No data available</Col>
                    </Row>
                </Container>
            );
        }
        var subskills=JSON.parse(scores.subskillsBreaksdown);
        subskills.map((data,i)=>{
            this.skills[i]=data.sub_topic;
            this.percent[i]=data.percentage;
        })
        this.data[0]=["Skills", "Percentage",{ role: 'style' }];
        for(var i=0;i<this.skills.length;i++){
            if(this.percent[i]<40)
              color='yellow';
            else if(this.percent[i]>40 && this.percent[i]<=60)
              color='green';
            else if(this.percent[i]>60 && this.percent[i]<=80)
              color='blue';
            else 
              color='darkblue';
            this.data.push([this.skills[i],this.percent[i],color]);
        }
        return(
            <div>
                <Container>
                    
                    <Row className="BlockTitle">
                        <Col sm="auto">SubSkill-wise analysis</Col>
                    </Row>
                    <Row>
                       <Col>
                            <Chart
                                chartType="BarChart"
                                data={this.data}
                                options={this.option}
                                width={'100%'}
                                height={400}
                            /> 
                             <Legend/>
                       </Col>                                   
                                        
                    </Row>
                </Container>
            </div>
        )
    }
}


  