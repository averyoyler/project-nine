import { Pipe, PipeTransform } from "@angular/core";
import { CardComponent } from '../card/card.component';

@Pipe({
  name: "duplicateName"
})
export class DuplicateNamePipe implements PipeTransform {

  constructor(private card: CardComponent) {}

  transform(value: any, ...args: any[]): any {
    const parent = args[1].parentNode;
    const playerId = args[0];
    const children = [parent.children[4], parent.children[5], parent.children[6], parent.children[7]]



    if (value) {

      // console.log('TO CHECK: ', value, playerId);
      // console.log('Player 1: ' + children[0].textContent);
      // console.log('Player 2: ' + children[1].textContent);
      // console.log('Player 3: ' + children[2].textContent);
      // console.log('Player 4: ' + children[3].textContent);
      for(let i = 0; i < children.length; i++) {
        // console.log(children[i].id, children[i].textContent)
        if(playerId != children[i].id) {
          if(value === children[i].textContent) {
            // console.log('they equal', i);
            let player = playerId + 1;
            return `Player ${player}`;
          }
        }
      }
    }
    return value;
  }
}
