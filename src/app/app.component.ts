import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'team-generator';
  newMemberName = "";
  members: string[] = [];
  errorMessage = "";
  numberOfTeams: number | "" = "";
  teams: string[][] = [];


  addMember() {

    if (!this.newMemberName) {
      this.errorMessage = "Name can't be empty";
      return;
    }

    this.members.push(this.newMemberName);
    this.newMemberName = "";
    this.errorMessage = "";
  }

  onInput(member: string) {
    this.newMemberName = member;
  }

  onGenerateTeamsInput(value: string) {
    this.numberOfTeams = Number(value);
  }

  generateTeams() {

    this.teams = [];

    if (!this.numberOfTeams || this.numberOfTeams <= 0) {
      this.errorMessage = "Invalid number of teams"
      return;
    }
    this.errorMessage = "";

    if (this.members.length < this.numberOfTeams) {
      this.errorMessage = "Not enough members";
      return;
    }
    this.errorMessage = "";

    const allMembers = [...this.members];

    while (allMembers.length) {
      for (let index = 0; index < this.numberOfTeams; index++) {
        const randomIndex = Math.floor(Math.random() * allMembers.length);
        const member = allMembers.splice(randomIndex, 1)[0];

        if (!member) break;

        if (this.teams[index]) {
          this.teams[index].push(member)
        } else {
          this.teams[index] = [member];
        }
      }
    }
    this.members = [];
    this.numberOfTeams = "";

  }

}
