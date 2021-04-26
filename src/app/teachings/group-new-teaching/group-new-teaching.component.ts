import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as angular from 'angular';

import { Edition } from '../../shared/edition';
import { EditionsService } from '../../shared/editions.service';
import { Group } from '../../shared/group';
import { GroupsService } from '../../shared/groups.service';
import { locationToken, routeParamsToken } from '../../ajs-upgraded-providers';
import { CoursesService } from '../../shared/courses.service';
import { Course } from '../../shared/course';
import { SubjectsService } from '../../shared/subjects.service';
import { Subject } from '../../shared/subject';
import { UsersService } from '../../shared/users.service';
import { User } from '../../shared/user';

@Component({
  selector: 'app-teachings-group-new-teaching',
  templateUrl: './group-new-teaching.component.html',
  styleUrls: ['./group-new-teaching.component.sass']
})
export class GroupNewTeachingComponent implements OnInit {

  protected courseId!: number;
  protected editionId!: number;
  protected groupId!: number;
  course!: Course;
  subjects!: Subject[];
  edition!: Edition;
  group!: Group;
  users!: User[];

  formGroup = new FormGroup({
    user: new FormControl('', [Validators.required]),
    subject: new FormControl('', [Validators.required])
  });

  saving = false;
  error?: string;

  constructor(@Inject(routeParamsToken) protected $routeParams: angular.route.IRouteParamsService,
    @Inject(locationToken) protected location: angular.ILocationService,
    protected coursesService: CoursesService,
    protected usersService: UsersService) { }

  ngOnInit(): void {
    this.courseId = parseInt(this.$routeParams.course);
    this.editionId = parseInt(this.$routeParams.edition);
    this.groupId = parseInt(this.$routeParams.group);

    this.coursesService.subscribe((courses: Course[]) => {
      if (!courses) return;

      const course = courses.find(c => c.id === this.courseId);

      if (!course) return;

      this.course = course;

      this.findEdition(course.editions);
      this.findSubjects(course.subjects);
    });

    this.usersService.subscribe((users: User[]) => {
      if (!users) return;

      this.users = users;
    });
  }

  findSubjects(subjectsService: SubjectsService) {
    subjectsService.subscribe((subjects: Subject[]) => {
      if (!subjects) return;

      this.subjects = subjects;
    });
  }

  findEdition(editionsService: EditionsService) {
    editionsService.subscribe((editions: Edition[]) => {
      if (!editions) return;

      const edition = editions.find(e => e.id === this.editionId);

      if (!edition) return;

      this.edition = edition;

      this.findGroup(edition.groups);
    });
  }

  findGroup(groupsService: GroupsService) {

    groupsService.subscribe((groups: Group[]) => {
      if (!groups) return;

      const group = groups.find(g => g.id === this.groupId);

      if (!group) return;

      this.group = group;
    });
  }

  submit() {
    console.log({ formGroup: this.formGroup.value });

    this.saving = true;

    this.group.teachings.addResource(this.formGroup.value).then((res: any) => {
        this.saving = false;

        if (200 > res.status || res.status > 299) {
            this.error = `${res.statusText}: ${res.data.toString()}`;
            return;
        }

        this.location.path(`/courses/${this.course.id}/editions/${this.edition.id}/groups/${this.group.id}/teachings`);
    }, (err: Error) => {
        this.saving = false;
        this.error = err.toString();
    });
  }

}
