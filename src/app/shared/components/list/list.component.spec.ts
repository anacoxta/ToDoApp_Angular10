import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { ListComponent } from './list.component';
import { TasksService } from '../../services/tasks.service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let tasksServiceMock: any;

  beforeEach(async () => {
    tasksServiceMock = {
      tasks$: of([]),
      filteredTasks$: of([]),
      loadTasksFromCache: jasmine.createSpy('loadTasksFromCache'),
      setFilter: jasmine.createSpy('setFilter'),
      clearCompletedTasks: jasmine.createSpy('clearCompletedTasks'),
      cacheTasks: jasmine.createSpy('cacheTasks'),
      clearCachedTasks: jasmine.createSpy('clearCachedTasks'),
    };

    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      providers: [{ provide: TasksService, useValue: tasksServiceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks from cache on init', () => {
    component.ngOnInit();
    expect(tasksServiceMock.loadTasksFromCache).toHaveBeenCalled();
  });

  it('should set filter', () => {
    const filter = 'complete';
    component.setFilter(filter);
    expect(tasksServiceMock.setFilter).toHaveBeenCalledWith(filter);
  });

  it('should clear completed tasks if confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.clearCompletedTasks();
    expect(tasksServiceMock.clearCompletedTasks).toHaveBeenCalled();
    expect(tasksServiceMock.cacheTasks).toHaveBeenCalled();
  });

  it('should not clear completed tasks if not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.clearCompletedTasks();
    expect(tasksServiceMock.clearCompletedTasks).not.toHaveBeenCalled();
    expect(tasksServiceMock.cacheTasks).not.toHaveBeenCalled();
  });

  it('should clear cached tasks', () => {
    component.clearCachedTasks();
    expect(tasksServiceMock.clearCachedTasks).toHaveBeenCalled();
  });
});
