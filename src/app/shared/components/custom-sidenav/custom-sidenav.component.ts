import { Component, Input, computed, inject, signal } from '@angular/core';
import { MenuItem } from '../../interfaces/menu-item.interface';
import { AuthService } from '../../../auth/services/auth-service.service';

@Component({
  selector: 'app-custom-sidenav',
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css'
})

export class CustomSidenavComponent {

  sideNavCollapsed = signal(false); 
  @Input() set collapsed(val:boolean){
    this.sideNavCollapsed.set(val)
  }
  menuItems = signal<MenuItem[]>([
    { "icon":"dashboard","label":"Dashboard","route":"/dashboard"},
    { "icon":"apartment","label":"Companies","route":"/companies/list"},
    { "icon":"category","label":"Categories","route":"/categories"},
    { "icon":"videogame_asset","label":"Video Consoles","route":"/video-consoles"},
  ])

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' :'100')

  private authService = inject(AuthService);

  public user = computed(() => this.authService.currentUser());
}
