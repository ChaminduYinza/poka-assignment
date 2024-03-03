import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderVariant } from '../../model/header-variant.enum';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() headerTitle: string | undefined = '';
  @Input() subTitle: string | undefined = '';
  @Input() naviagateBackText: string = '';
  @Input() naviagateBacRouter: string = '';
  @Input() headerVarient: HeaderVariant = HeaderVariant.Default;
  HeaderVariant = HeaderVariant;
}
