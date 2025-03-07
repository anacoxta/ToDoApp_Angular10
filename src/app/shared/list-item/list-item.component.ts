import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent implements OnInit, OnChanges {
  @Input() task!: { task: string; status: string };
  @Output() taskUpdated = new EventEmitter<{ task: string; status: string }>();
  @Output() taskDeleted = new EventEmitter<{ task: string; status: string }>();

  ngOnInit() {
    console.log('ListItemComponent initialized'); // ✅ Debugging Log
    console.log('Received task on init:', this.task); // ✅ Debugging Log
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task']) {
      console.log('Task input changed:', changes['task'].currentValue); // ✅ Debugging Log
    }
  }

  toggleStatus() {
    this.taskUpdated.emit({
      ...this.task,
      status: this.task.status === 'incomplete' ? 'complete' : 'incomplete',
    });
  }

  deleteTask() {
    this.taskDeleted.emit(this.task);
  }
}
