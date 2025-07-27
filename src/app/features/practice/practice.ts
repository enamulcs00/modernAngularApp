import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-practice',
 imports: [FormsModule],
  standalone: true,
  templateUrl: './practice.html',
  styleUrl: './practice.css'
})
export class PracticeComponent {
 counter = signal(0);
 Increment() {
   this.counter.update(value => value + 1);
   console.log(this.counter());
 }
  Decrement() {
    this.counter.update(value => value - 1);
    console.log(this.counter());
  }
  Reset() {
    this.counter.set(0);
    console.log(this.counter());
    console.log("Start");

setTimeout(() => {
  console.log("Inside setTimeout");
}, 1000);

console.log("End");

  }
    firstName = signal('');
  lastName = signal('');

  // ✅ Computed signal for full name
  fullName = computed(() => {
    return `Hello, ${this.firstName()} ${this.lastName()}`.trim();
  });
}
