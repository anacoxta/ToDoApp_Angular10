import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ListItemComponent } from './list-item.component';
import { TasksService } from '../../services/tasks.service';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;
  let tasksServiceMock: any;

  beforeEach(async () => {
    tasksServiceMock = {
      tasksSubject: {
        getValue: jasmine.createSpy('getValue').and.returnValue([]),
        next: jasmine.createSpy('next'),
      },
      cacheTasks: jasmine.createSpy('cacheTasks'),
    };

    await TestBed.configureTestingModule({
      declarations: [ListItemComponent],
      providers: [{ provide: TasksService, useValue: tasksServiceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    component.task = { task: 'Test Task', status: 'incomplete' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle task status to complete', () => {
    tasksServiceMock.tasksSubject.getValue.and.returnValue([
      { task: 'Test Task', status: 'incomplete' },
    ]);
    component.toggleTaskStatus();
    expect(tasksServiceMock.tasksSubject.next).toHaveBeenCalledWith([
      { task: 'Test Task', status: 'complete' },
    ]);
    expect(tasksServiceMock.cacheTasks).toHaveBeenCalled();
  });

  it('should toggle task status to incomplete', () => {
    component.task.status = 'complete';
    tasksServiceMock.tasksSubject.getValue.and.returnValue([
      { task: 'Test Task', status: 'complete' },
    ]);
    component.toggleTaskStatus();
    expect(tasksServiceMock.tasksSubject.next).toHaveBeenCalledWith([
      { task: 'Test Task', status: 'incomplete' },
    ]);
    expect(tasksServiceMock.cacheTasks).toHaveBeenCalled();
  });

  it('should delete task if confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.deleteTask();
    expect(tasksServiceMock.tasksSubject.next).toHaveBeenCalled();
    expect(tasksServiceMock.cacheTasks).toHaveBeenCalled();
  });

  it('should not delete task if not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.deleteTask();
    expect(tasksServiceMock.tasksSubject.next).not.toHaveBeenCalled();
    expect(tasksServiceMock.cacheTasks).not.toHaveBeenCalled();
  });
});
