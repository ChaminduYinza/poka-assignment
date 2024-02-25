import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-block-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './block-ui.component.html',
  styleUrl: './block-ui.component.scss',
})
export class BlockUiComponent {
  @Input() isBlocking: boolean = false;
  @Input() message: string = '';
}
