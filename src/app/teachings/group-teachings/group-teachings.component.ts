import { Component, Inject, OnInit } from '@angular/core';
import * as angular from 'angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { routeParamsToken } from '../../ajs-upgraded-providers';
import { Course } from '../../shared/course';
import { CoursesService } from '../../shared/courses.service';
import { Edition } from '../../shared/edition';
import { EditionsService } from '../../shared/editions.service';
import { Group } from '../../shared/group';
import { GroupsService } from '../../shared/groups.service';
import { Teaching } from '../../shared/teaching';
import { TeachingsService } from '../../shared/teachings.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-teachings-group-teachings',
  templateUrl: './group-teachings.component.html',
  styleUrls: ['./group-teachings.component.sass']
})
export class GroupTeachingsComponent implements OnInit {

  protected courseId!: number;
  protected editionId!: number;
  protected groupId!: number;
  course!: Course;
  edition!: Edition;
  group!: Group;
  teachings!: Teaching[];

  constructor(@Inject(routeParamsToken) protected $routeParams: angular.route.IRouteParamsService, 
              protected modal: NgbModal,
              protected coursesService: CoursesService) { }

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

        this.findTeachings(group.teachings);
    });
  }

  findTeachings(teachingsService: TeachingsService) {
    teachingsService.subscribe((teachings: Teaching[]) => {
      if (!teachings) return;

      this.teachings = teachings;
    });
  }

  /** Open modal window to confirm teaching deletion */
  openDeleteModal(teaching: Teaching) {
    const ref = this.modal.open(DeleteModalComponent);
    ref.componentInstance.teaching = teaching;
    ref.componentInstance.teachingsService = this.group.teachings;
  }

}
