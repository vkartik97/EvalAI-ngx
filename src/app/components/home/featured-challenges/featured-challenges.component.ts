import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { AuthService } from '../../../services/auth.service';
import { EndpointsService } from '../../../services/endpoints.service';
import { ApiService } from '../../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * Component Class
 */
@Component({
  selector: 'app-featured-challenges',
  templateUrl: './featured-challenges.component.html',
  styleUrls: ['./featured-challenges.component.scss']
})
export class FeaturedChallengesComponent implements OnInit {

  /**
   * Show section flag
   */
  show_featured_challenges = false;
  

  /**
   * Featured Challenges
   */
  featured_callenges: any = [];


  /**
   * Constructor.
   * @param endpointsService  EndpointService Injection.
   * @param route  ActivatedRoute Injection.
   * @param router  Router Injection.
   * @param globalService  GlobalService Injection.
   * @param apiService  ApiService Injection.
   * @param authService  AuthService Injection.
   */
  constructor(private apiService: ApiService,
              private authService: AuthService,
              private globalService: GlobalService,
              private router: Router,
              private route: ActivatedRoute,
              private endpointsService: EndpointsService) { }

  /**
   * Component on initialized
   */
  ngOnInit() {
  	this.fetchCurrentChallenges();
  }

  /**
   * Fetching present challenges
   */
  fetchCurrentChallenges() {
  	const API_PATH = this.endpointsService.allChallengesURL('present');
  	const SELF = this;
    SELF.apiService.getUrl(API_PATH).subscribe(
      data => {
        let challengeCount = data.count;
        if (challengeCount === 0) {
            SELF.show_featured_challenges = false;
        } else {
        	SELF.show_featured_challenges = true;
            SELF.featured_callenges = data.results.slice(0, 3);
            console.log(SELF.featured_callenges);
        }
      },
      err => {
        SELF.globalService.handleApiError(err);
      },
      () => console.log('Present-Featured challenges fetched!')
    );
  }

}
