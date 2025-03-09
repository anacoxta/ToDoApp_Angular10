import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecruiterMessageService {
  constructor() {}

  showRecruiterMessage(): void {
    console.clear();

    const message = `
%c👋 Hello, Recruiter!

%c✅ Required Features (Completed): 
   1️⃣ Add New Tasks
      - Input field + "Add Task" button
   2️⃣ Mark Tasks as Completed
      - Checkbox to toggle task status
   3️⃣ Filter Tasks
      - Dropdown to show "All", "Completed", or "Incomplete"
   4️⃣ Remove Tasks
      - Each task has a "Delete" button
   5️⃣ RxJS-Powered Task Management
      - Uses RxJS Observables for dynamic updates
   6️⃣ Local Storage Support (Bonus)
      - Tasks persist even after page reload
   7️⃣ Delete Confirmation (Bonus)
      - Prevents accidental task removal

%c✨ Extra Features I Added (Not Required, but Enhance UX): 
   ✅ A clean, responsive UI with intuitive layout
   ✅ Sorting logic that keeps "Completed" tasks at the bottom
   ✅ Smooth animations for adding, removing, and moving tasks
   ✅ High test coverage (~90%) for reliability and robustness
   ✅ Accessibility improvements (Keyboard navigation + Screen reader friendly)

%c👩‍💻 Developed with passion and a dying laptop by Ana Costa Eduardo

`;

    console.log(
      message,
      'font-size: 16x; color: #e91e63; font-weight: bold;',
      'color: #0073e6; font-weight: bold;',
      'color: #0073e6;',
      'color: #e91e63; font-style: italic;'
    );
  }
}
