import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';

@Component({
  selector: 'app-crud1read',
  templateUrl: './crud1read.component.html',
  styleUrls: ['./crud1read.component.scss'],
})
export class Crud1readComponent implements OnInit {
  private apiUrl = 'api/crud1';
  public list: Array<RegionResult>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getList();
  }

  getList(): void {
    this.http.get<RegionResult[]>(this.apiUrl)
      .subscribe(list => {
        this.list = list;
      });
  }
}
class RegionResult {
  id: number;
  regionDescription: string;
}
