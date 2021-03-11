import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Entry } from 'src/app/models/entry';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-stadistic',
  templateUrl: './stadistic.component.html',
  styleUrls: ['./stadistic.component.css']
})
export class StadisticComponent implements OnInit {

  in = 0;
  out = 0;
  totalIn = 0;
  totalOut = 0;

  public doughnutChartLabels: Label[] = ['Egresos', 'Ingresos'];
  public doughnutChartData: MultiDataSet = [];

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('entry').subscribe(({ items }) => {
      this.doStadistic(items);
    })
  }

  doStadistic(items: Entry[]) {
    this.in = 0;
    this.out = 0;
    this.totalIn = 0;
    this.totalOut = 0;

    for (const item of items) {
      if (item.type === 'Ingreso') {
        this.totalIn += item.value;
        this.in++;
      } else {
        this.totalOut += item.value;
        this.out++;
      }
    }

    this.doughnutChartData = [[this.totalOut, this.totalIn]]
  }

}
