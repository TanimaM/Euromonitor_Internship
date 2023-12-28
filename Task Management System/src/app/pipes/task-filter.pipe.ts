
import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'taskFilter'
})
export class TaskFilterPipe implements PipeTransform {
  transform(tasks: Task[], filterCategory: string): Task[] {
    if (!filterCategory) {
      return tasks; 
    }

    return tasks.filter(task => task.category === filterCategory);
  }
}
