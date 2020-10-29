import { Component } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import * as io from "socket.io-client";
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title:'week11lab';
  socket: SocketIOClient.Socket;
  test:"";
  pollObj={question:"",options:[]};
  vote : number;
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  colors: any[] = [{ 
    backgroundColor: [
      'lightblue',
      'red',
      'green',
      'violet',
      'yellow',
      'cyan',
      'lightgray',
      'slateblue',
      'violet',
      'gray'
    ]
  }];


  constructor() {
    this.socket = io.connect()
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    
  }

  ngOnInit(){
    this.listen2NewClinet();
    this.listen2NewVote();

  }

  listen2NewClinet(){
    this.socket.on("newClinet",data=>{
      this.setLabel(data);
      this.setData(data);
      this.pollObj=data;
    })
    
  }
  listen2NewVote(){
    this.socket.on("vote",data=>{
      this.setLabel(data);
      this.setData(data);
      this.pollObj=data;
    })

  }

  setLabel(data){
    let arr1 =[];
    for(let i in data.options){
      arr1.push(data.options[i].text)
    }
    this.pieChartLabels =  arr1;
  }
  setData(data){
    let arr2 = [];
    for(let i in data.options){
      arr2.push(data.options[i].count); 
    }
    console.log(arr2)
    this.pieChartData = arr2;
    
  }

  sendVote(){
    this.socket.emit("newVote",{vote:this.vote})
}
}
