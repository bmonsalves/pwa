import {Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {NotesService} from '../services/notes.service';
import {MatSnackBar} from '@angular/material';
import {AuthService} from '../services/auth.service';

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
  isLogged = false;
  user: any = {};

  constructor(private swUpdate: SwUpdate,
              private noteService: NotesService,
              private authService: AuthService,
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

    this.checkLogin();

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

  public login() {
    this.authService.loginWithFacebook().then((response) => {
      console.log(response);
      this.isLogged = true;
    });
  }

  public logout() {
    this.authService.logout().then((response) => {
      console.log(response);
      this.isLogged = false;
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
    this.note.user = this.user;
    this.noteService.createNote(this.note).then(() => {
      this.note = {};
      this.snackBar.open(`Nota creada correctamente`, `cerrar`, {
        duration: 2000,
      });
    });
  }

  private checkLogin(): void {
    this.authService.isLogged()
      .subscribe(result => {
        if (result && result.uid) {
          const { displayName, uid } = result;
          this.user.displayName = displayName;
          this.user.uid = uid;
          this.isLogged = true;
          return;
        }

        this.isLogged = false;

      }, err => {
        this.isLogged = false;
      });
  }
}
