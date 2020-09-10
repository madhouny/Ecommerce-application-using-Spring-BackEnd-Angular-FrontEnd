import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products;
  public editPhoto: boolean;
  public currentProduct;
  selectedFiles: any;
  progress: number;
  currentFileUpload: any;
  public timestamp = 0;
  title: string;

  constructor(public catService:CatalogueService,
    public route:ActivatedRoute,
    private router:Router,
    public authService:AuthenticationService) { 

    }

  ngOnInit(): void {
    this.router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        let url = val.url;
        let p1 = this.route.snapshot.params.p1;
        if(p1==1){
          this.title = "Product Selected";
          this.getProducts("/products/search/selectionner");
        }
        else if(p1==2){
          
          let idCat = this.route.snapshot.params.p2;
          this.title = "Product of Category " + idCat;
          this.getProducts('/categories/'+idCat+'/produits');
        }
        else if(p1==3){
          this.title = "Products on Promoion";
          this.getProducts('/products/search/promoProducts')
        }
        else if(p1==4){
          this.title = "Products Available";
          this.getProducts('/products/search/availableProducts')
        }
        else if(p1==5){
          this.title = "Products Searching";
          this.getProducts('/products/search/availableProducts')
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

  onEditPhoto(p){
    this.currentProduct = p;
    this.editPhoto = true;
  }

  OnSelectedFile(event){
    this.selectedFiles = event.target.files;
  }

  uploadPhoto(){
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.catService.uploadPhotoProduct(this.currentFileUpload,this.currentProduct.id)
    .subscribe(event=>{
      if(event.type === HttpEventType.UploadProgress){
        this.progress = Math.round(100 * event.loaded / event.total);

      }else if(event instanceof HttpResponse){
        this.timestamp = Date.now();
        
      }
    },err=>{
      
      alert("problème de chargement");
    }
      
    )
  }
   onAddProductToCaddy(p){

  }

  onProductDetails(p){

  }



}
