import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
    characters: ''
  }

  constructor( private heroesService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router ) { }

  ngOnInit(): void {
    
    if(!this.router.url.includes('editar')){
      return;
    }

    this.activatedRoute.params
      .pipe(switchMap(({id})=>this.heroesService.getHeroePorId(id)))
      .subscribe(heroe => this.heroe = heroe);

  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0){
      return;
    }

    if(this.heroe.id){
      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe(({id}) =>{
          this.router.navigate([`/heroe/${ id }`])
        });
    } else {
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe(({id}) =>{
          console.log(id);
          this.router.navigate([`/heroe/${ id }`])
      })
    }    
  }

  eliminar(){
    this.heroesService.borrarHeroe(this.heroe.id!).subscribe(({id}) =>{
      this.router.navigate([`/heroe/listado`]);
  })
  }

}
