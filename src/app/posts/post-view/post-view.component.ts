import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Subject, Observable, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { PostsService } from 'src/app/shared/service/posts.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  idSubscription!: Subscription;
  id!: number;
  isLoading: boolean = false;
  postDetail$!: Observable<any>;
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private cdr: ChangeDetectorRef,
    private location: Location,
  ) {

   }

  ngOnInit(): void {
    this.idSubscription = this.route.paramMap.subscribe(params =>{
      this.id = Number( params.get('id'));
      this.getPostDetailByID(this.id);
    })
  }

  getPostDetailByID(id: number) {
    this.isLoading = true;
    // this.productService.getProductByID(id)
    //   .pipe(
    //   takeUntil(this.destroy$.asObservable())).subscribe(res=> {
    //     console.log(res);
        
    //     this.cdr.detectChanges();
    //   },
    //   () => this.isLoading = false);

    this.postDetail$ = this.postsService.getPostsByID(id);
   
    this.isLoading = false;
  }

  back() {

    this.location.back();
  }
}
