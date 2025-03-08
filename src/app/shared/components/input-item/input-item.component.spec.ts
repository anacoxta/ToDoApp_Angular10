import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { InputItemComponent } from './input-item.component';
import { TasksService } from '../../services/tasks.service';

describe('InputItemComponent', () => {
  let component: InputItemComponent;
  let fixture: ComponentFixture<InputItemComponent>;
  let tasksServiceMock: any;

  beforeEach(async () => {
    tasksServiceMock = {
      setTask: jasmine.createSpy('setTask'),
      tasksSubject: {
        getValue: jasmine.createSpy('getValue').and.returnValue([]),
      },
    };

    await TestBed.configureTestingModule({
      declarations: [InputItemComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: TasksService, useValue: tasksServiceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with an empty task control', () => {
    expect(component.taskForm.get('task')?.value).toBe('');
  });

  it('should not call setTask if the form is invalid', () => {
    component.addTask();
    expect(tasksServiceMock.setTask).not.toHaveBeenCalled();
  });

  it('should call setTask with the correct data if the form is valid', () => {
    component.taskForm.get('task')?.setValue('Test Task');
    component.addTask();
    expect(tasksServiceMock.setTask).toHaveBeenCalledWith({
      task: 'Test Task',
      status: 'incomplete',
    });
  });

  it('should reset the form after adding a valid task', () => {
    component.taskForm.get('task')?.setValue('Another Task');
    component.addTask();
    fixture.detectChanges();
    expect(component.taskForm.get('task')?.value).toBe(null);
  });

  it('should mark the task control as invalid if the task is empty', () => {
    const taskControl = component.taskForm.get('task');
    taskControl?.setValue('');
    expect(taskControl?.invalid).toBe(true);
  });

  it('should mark the task control as valid if the task is not empty', () => {
    const taskControl = component.taskForm.get('task');
    taskControl?.setValue('Non-empty Task');
    expect(taskControl?.valid).toBe(true);
  });
});
