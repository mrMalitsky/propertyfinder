import { Injectable } from '@angular/core';
import { IData, IDeals } from '../../interfaces/IData';
import { FilterTypes } from '../../app.constants';

@Injectable()
/**
 * Compute the shortest path between two node
 */
export class PriorityService {

  private _infinity = 1/0;
  public vertices = {};

  /**
   * Add a new vertex and related edges
   * @param {[type]} name  [description]
   * @param {[type]} edges [description]
   */
  addVertex(name:string, edges:any){
    this.vertices[name] = edges;
  }

  /**
   * Computes the shortest path from start to finish
   * @param {string} start  [description]
   * @param {string} finish [description]
   */

   /*!!!!!!!!!! @todo: create type for "types" */
  shortestPath(start:string, finish:string, type: FilterTypes = FilterTypes.cost){
      // debugger;
    let nodes = new PriorityQueue(),
      distances = {},
      previous = {},
      path = [],
      smallest,
      vertex,
      neighbor,
      alt;

    //Init the distances and queues variables
    for(vertex in this.vertices){
      if(vertex === start){
        distances[vertex] = 0;
        nodes.enqueue(0, vertex);
      }else{
        distances[vertex] = this._infinity;
        nodes.enqueue(this._infinity, vertex);
      }

      previous[vertex] = null;
    }

    //continue as long as the queue haven't been emptied.
    while(!nodes.empty()){

      smallest = nodes.dequeue();

      //we are the last node
      if(smallest === finish){

        //Compute the path
        while(previous[smallest]){
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }

      //No distance known. Skip.
      if(!smallest || distances[smallest] === this._infinity){
        continue;
      }

      //Compute the distance for each neighbor
      for(neighbor in this.vertices[smallest]){
        alt = distances[smallest] + this.vertices[smallest][neighbor].value;

        if(this.compareValues(alt, distances[neighbor])){
          distances[neighbor] = alt;
          previous[neighbor] = smallest;
          nodes.enqueue(alt, neighbor);
        }
      }
    }
    //the starting point isn't in the solution &
    //the solution is from end to start.
    return this.getCorrespondingId(path.concat(start).reverse()) ;

  }

  getCorrespondingId(values: Array<string>) {
    const res = values.map((v, i) => this.vertices[values[i]][values[i+1]]);
    res.pop();
    return res;
  }

  prepareData(data: IDeals[], by: FilterTypes = FilterTypes.cost) {
    let discount;

    data.forEach((deal, i) => {

      discount = (by === FilterTypes.duration) ? 0 : deal['discount']/100;
      const value = (by === FilterTypes.duration) ? (+deal[FilterTypes[by]].h + deal[FilterTypes[by]].m/100) :  (Math.round(deal[FilterTypes[by]] * (1 - discount)));

      this.vertices[deal.departure] = this.vertices[deal.departure] ? this.vertices[deal.departure] : {};
      if (this.vertices[deal.departure][deal.arrival] && this.compareValues(this.vertices[deal.departure][deal.arrival].value, value)) {
        return;
      }

      this.vertices[deal.departure] = Object.assign(this.vertices[deal.departure],
         {[deal.arrival]:
           {
             value: value,
             id: i
           }
         })
    });
  }

  getCountries() {
    return Object.keys(this.vertices);
  }

  compareValues(value1: any, value2: any) {
      return value1 < value2;
  }

}

//////////////////////////
/**
 * A node for priorioty linked list / stack and such
 */
class PriorityNode {
  key:number;
  priority:number;

  constructor(key: number,priority: number){
    this.key = key;
    this.priority = priority;
  }
}

/**
 * A priority queue with highest priority always on top
 * This queue is sorted by priority for each enqueue
 */
class PriorityQueue {

  nodes:PriorityNode[] = [];

  /**
   * Enqueue a new node
   * @param {[type]} priority
   * @param {[type]} key
   */
  enqueue(priority:number, key:number){
    this.nodes.push(new PriorityNode(key, priority));
    this.nodes.sort(
      function(a, b) {
        return a.priority - b.priority;
      }
    )
  }

  /**
   * Dequeue the highest priority key
   */
  dequeue():number{
    return this.nodes.shift().key;
  }

  /**
   * Checks if empty
   */
  empty():boolean{
    return !this.nodes.length;
  }
}
