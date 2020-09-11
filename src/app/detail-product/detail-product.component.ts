
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CatalogueService } from '../catalogue.service';
import { Product } from '../model/product.model';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { CaddyService } from '../services/caddy.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

  timestamp: number;
  currentProduct;
  selectedFiles;
  progress: number;
  currentFileUpload: any;
   currentTime: number;
   editPhoto: boolean;
   mode: number=0;
  constructor(private router:Router, private route:ActivatedRoute,
    public catalService:CatalogueService,
    public authService:AuthenticationService,
    public caddyService:CaddyService) { }

  ngOnInit(): void {
    let url = atob(this.route.snapshot.params.url);
    this.catalService.getProduct(url).subscribe(data=>{
      this.currentProduct=data;
    })
  }

  onEditProduct(){
    this.mode=1;
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
    this.catalService.uploadPhotoProduct(this.currentFileUpload,this.currentProduct.id)
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

  onUpdateProduct(data){
    let url=this.currentProduct._links.self.href;
    this.catalService.patchResource(url,data)
      .subscribe(d=>{
        this.currentProduct=d;
        this.mode=0;
      },err=>{
        console.log(err);
      })
  }

  onAddProductToCaddy(currentProduct:Product){
    
  }

  getTS() {
    return this.currentTime;
  }

}
