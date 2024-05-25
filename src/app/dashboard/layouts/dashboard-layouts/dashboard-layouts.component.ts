import { Component, OnInit, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service.service';

@Component({
  selector: 'app-dashboard-layouts',
  templateUrl: './dashboard-layouts.component.html',
  styleUrl: './dashboard-layouts.component.css'
})
export class DashboardLayoutsComponent implements OnInit {
  ngOnInit(): void {

  }

  private authService = inject(AuthService);

  public user = computed(() => this.authService.currentUser());

  onLogout() {

    this.authService.logout();
  }


}
