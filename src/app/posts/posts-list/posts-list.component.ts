import { ChangeDetectorRef, Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PostListInterface } from 'src/app/model/post.model';
import { PostsService } from 'src/app/shared/service/posts.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit, AfterViewInit, OnDestroy {


  destroy$ = new Subject();
  dataSource: MatTableDataSource<PostListInterface> = new MatTableDataSource();
  displayedColumns: string[ ] = ['userId','id', 'title', 'viewDetails'];
  postsList: PostListInterface[] = [];
  postsList$!: Observable<Array<PostListInterface>>;
  isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 

  constructor(
    private postsService: PostsService, 
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // this.onSearch('');
    this.onGetList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // onSearch(category: any): void {
  //   this.isLoading = true;
  //   // this.dataSource.data = category;
  //   let cat = category;
  //   if(category==='all') {
  //     cat = '';
  //   }
  //   // this.isLoading = false

  //   this.postsService.searchProduct(cat)
  //     .pipe(
  //     takeUntil(this.destroy$.asObservable())).subscribe(res=> {
        
  //       this.postsList = res;
  //       this.dataSource.data = this.postsList;
  //       this.cdr.detectChanges();
  //     },
  //     () => this.isLoading = false);
  // }

  onGetList() {
    this.isLoading = true;
    // this.postsService.getPostsList() 
    // .pipe(
    //   takeUntil(this.destroy$.asObservable())).subscribe(res=> {
    //     this.postsList = res;
    //     this.dataSource.data = this.postsList;
    //     this.cdr.detectChanges();
    //   },
    //   () => this.isLoading = false);

      this.postsService.getPostsList() 
      .pipe(
        takeUntil(this.destroy$)).subscribe({
          next: (res) => {
                  this.postsList = res;
                  this.dataSource.data = this.postsList;
                  this.cdr.detectChanges();
          },
          complete: () => this.isLoading = false
        })
        // () => this.isLoading = false);
  }

  showDetailPage(id: number) {
    this.router.navigate(['/posts',id])
  }

  sortData(sort: Sort) {
    const data = this.postsList.slice();
    let sortedData;
    if (!sort.active || sort.direction === '') {
      sortedData = data;
      return;
    }

    sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'userId':
          return this.compare(a.userId, b.userId, isAsc);
        case 'title':
          return this.compare(a.title, b.title, isAsc);
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource.data = sortedData;
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  ngOnDestroy(): void {
    this.destroy$.next(this.postsList);
    this.destroy$.complete();
  }

}
