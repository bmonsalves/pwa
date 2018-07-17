import {Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {NotesService} from '../services/notes.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  categories: any = ['trabajo', 'personal'];
  panelOpenState = false;
  note: any = {};
  notes: any = [];

  constructor(private swUpdate: SwUpdate,
              private noteService: NotesService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe((v) => {
        if (confirm('Actualización disponible, deseas obtenerla?')) {
          window.location.reload();
        }
      });
    }

    this.noteService.getNotes().valueChanges()
      .subscribe((notes) => {
        this.notes = notes;
      });
  }


  public selectNote(note) {
    this.note = note;
    this.panelOpenState = true;
  }

  public save() {

    if (this.note.id) {
      this.editNote();
    } else {
      this.createNote();
    }

    this.panelOpenState = false;
    console.log(this.note);
  }

  public deleteNote (note) {
    this.noteService.deleteNote(note).then(() => {
      this.snackBar.open(`Nota eliminada correctamente`, `cerrar`, {
        duration: 2000,
      });
    });
  }

  private editNote () {
    this.noteService.editNote(this.note).then(() => {
      this.note = {};
      this.snackBar.open(`Nota editada correctamente`, `cerrar`, {
        duration: 2000,
      });
    });
  }

  private createNote () {
    this.noteService.createNote(this.note).then(() => {
      this.note = {};
      this.snackBar.open(`Nota creada correctamente`, `cerrar`, {
        duration: 2000,
      });
    });
  }
}
