import { Component, signal, computed, effect } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [NgFor],
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.scss'
})
export class SignalsComponent {
  actions = signal<string[]>([]);
  counter = signal(0);
  doubleCounter = computed(() => this.counter() * 2);

  constructor() {
    effect(() => {
      console.log(this.counter());
    });
  }

  increment() {
    this.counter.update((oldCounter) => oldCounter + 1);
    this.actions.update((oldActions) => [...oldActions, 'INCREMENT']);
  }

  decrement() {
    this.counter.update((oldCounter) => oldCounter - 1);
    this.actions.update((oldActions) => [...oldActions, 'DECREMENT']);
  }
}
