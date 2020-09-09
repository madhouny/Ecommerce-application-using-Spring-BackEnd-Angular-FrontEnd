import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products;

  constructor(public catService:CatalogueService,
    public route:ActivatedRoute,
    private router:Router) { 

    }

  ngOnInit(): void {
    this.router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        let url = val.url;
        let p1 = this.route.snapshot.params.p1;
        if(p1==1){
          this.getProducts("/products/search/selectionner");
        }
        else if(p1==2){
          let idCat = this.route.snapshot.params.p2;
          this.getProducts('/categories/'+idCat+'/produits');
        }
      }
    });
    let p1 = this.route.snapshot.params.p1;
    if(p1==1){
      this.getProducts("/products/search/selectionner");
    }
    
  }
  getProducts(url) {
    this.catService.getResource(url)
    .subscribe(data=>{
      this.products=data;
    },err=>{
      console.log(err);
    })
  }



}
