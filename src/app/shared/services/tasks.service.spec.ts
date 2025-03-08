import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';
import { BehaviorSubject } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load tasks from cache', () => {
    const tasks = [{ task: 'Test Task', status: 'incomplete' }];
    localStorage.setItem('yourTasks', JSON.stringify(tasks));
    service.loadTasksFromCache();
    expect(service.tasksSubject.getValue()).toEqual(tasks);
  });

  it('should set a new task', () => {
    const task = { task: 'New Task', status: 'incomplete' };
    service.setTask(task);
    expect(service.tasksSubject.getValue()).toContain(task);
  });

  it('should clear completed tasks', () => {
    const tasks = [
      { task: 'Task 1', status: 'complete' },
      { task: 'Task 2', status: 'incomplete' },
    ];
    service.tasksSubject = new BehaviorSubject(tasks);
    service.clearCompletedTasks();
    expect(service.tasksSubject.getValue()).toEqual([
      { task: 'Task 2', status: 'incomplete' },
    ]);
  });

  it('should cache tasks', () => {
    const tasks = [{ task: 'Cached Task', status: 'incomplete' }];
    service.tasksSubject = new BehaviorSubject(tasks);
    service.cacheTasks();
    expect(localStorage.getItem('yourTasks')).toEqual(JSON.stringify(tasks));
  });

  it('should clear cached tasks', () => {
    localStorage.setItem(
      'yourTasks',
      JSON.stringify([{ task: 'Task to Clear', status: 'incomplete' }])
    );
    service.clearCachedTasks();
    expect(localStorage.getItem('yourTasks')).toBeNull();
  });

  it('should set filter', () => {
    service.setFilter('complete');
    service.getFilter().subscribe((filter) => {
      expect(filter).toBe('complete');
    });
  });

  it('should get filtered tasks', fakeAsync(() => {
    const tasks = [
      { task: 'Task 1', status: 'complete' },
      { task: 'Task 2', status: 'incomplete' },
    ];

    service.tasksSubject.next(tasks); // Ensure tasks are set
    service.setFilter('complete'); // Ensure filter is set

    let filteredTasks: { task: string; status: string }[] = [];
    service.filteredTasks$.subscribe((tasks) => {
      filteredTasks = tasks;
    });

    tick(); // Simulate async execution
    expect(filteredTasks).toEqual([{ task: 'Task 1', status: 'complete' }]);
  }));

  it('should return all tasks when filter is "all"', fakeAsync(() => {
    const tasks = [
      { task: 'Task 1', status: 'complete' },
      { task: 'Task 2', status: 'incomplete' },
    ];

    service.tasksSubject.next(tasks); // Ensure tasks are set
    service.setFilter('all'); // Ensure filter is set

    let filteredTasks: { task: string; status: string }[] = [];
    service.filteredTasks$.subscribe((tasks) => {
      filteredTasks = tasks;
    });

    tick(); // Simulate async execution
    expect(filteredTasks).toEqual(tasks);
  }));

  it('should handle empty cache gracefully', () => {
    localStorage.removeItem('yourTasks');
    service.loadTasksFromCache();
    expect(service.tasksSubject.getValue()).toEqual([]);
  });
});
