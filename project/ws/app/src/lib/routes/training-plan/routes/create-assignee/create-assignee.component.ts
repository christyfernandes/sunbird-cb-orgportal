import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { TrainingPlanDataSharingService } from './../../services/training-plan-data-share.service'

@Component({
  selector: 'ws-app-create-assignee',
  templateUrl: './create-assignee.component.html',
  styleUrls: ['./create-assignee.component.scss'],
})
export class CreateAssigneeComponent implements OnInit {

  @Output() addAssigneeInvalid = new EventEmitter<any>()

  categoryData: any[] = [];
  assigneeData: any[] = [];
  selectAssigneeCount: number = 0;
  selectedAssigneeChips: any;
  constructor(private trainingPlanDataSharingService: TrainingPlanDataSharingService) { }
  from = 'assignee';
  ngOnInit() {
    this.categoryData = [
      {
        id: 1,
        name: 'Designation',
        value: 'Designation',
      },
      {
        id: 2,
        name: 'All Users',
        value: 'All Users',
      },
      {
        id: 3,
        name: 'Custom Users',
        value: 'Custom Users',
      },
    ]
  }

  handleApiData(event: any) {
    if (event) {
      console.log(this.trainingPlanDataSharingService.trainingPlanAssigneeData)
      if (this.trainingPlanDataSharingService.trainingPlanStepperData &&
        this.trainingPlanDataSharingService.trainingPlanAssigneeData.category === 'Designation' && 
        this.trainingPlanDataSharingService.trainingPlanStepperData.assignmentTypeInfo) {
        console.log('this.trainingPlanDataSharingService.trainingPlanContentData.data.content', this.trainingPlanDataSharingService.trainingPlanStepperData.assignmentTypeInfo)
        this.trainingPlanDataSharingService.trainingPlanAssigneeData.data.map((sitem: any) => {
          if (this.trainingPlanDataSharingService.trainingPlanStepperData.assignmentTypeInfo.indexOf(sitem.id) > -1) {
            sitem['selected'] = true
          }
        })
        this.assigneeData = this.trainingPlanDataSharingService.trainingPlanAssigneeData
        this.handleSelectedChips(true)
      } else  if (this.trainingPlanDataSharingService.trainingPlanStepperData &&
        this.trainingPlanDataSharingService.trainingPlanAssigneeData.category === 'Custom Users' && 
        this.trainingPlanDataSharingService.trainingPlanStepperData.assignmentTypeInfo) {
        console.log('this.trainingPlanDataSharingService.trainingPlanContentData.data.content', this.trainingPlanDataSharingService.trainingPlanStepperData.assignmentTypeInfo)
        this.trainingPlanDataSharingService.trainingPlanAssigneeData.data.content.map((sitem: any) => {
          if (this.trainingPlanDataSharingService.trainingPlanStepperData.assignmentTypeInfo.indexOf(sitem.id) > -1) {
            sitem['selected'] = true
          }
        })
        this.assigneeData = this.trainingPlanDataSharingService.trainingPlanAssigneeData
        this.handleSelectedChips(true)
      } else {
        this.assigneeData = this.trainingPlanDataSharingService.trainingPlanAssigneeData
      }

    }
  }

  handleSelectedChips(event: any) {
    console.log('event', event)
    this.selectAssigneeCount = 0
    if (event) {
      if(this.trainingPlanDataSharingService.trainingPlanAssigneeData.category === 'Designation') {
        this.selectedAssigneeChips = this.trainingPlanDataSharingService.trainingPlanAssigneeData.data
        console.log('this.selectedAssigneeChips', this.selectedAssigneeChips)
        this.selectedAssigneeChips && this.selectedAssigneeChips.map((sitem:any) => {
          if (sitem.selected) {
            this.selectAssigneeCount = this.selectAssigneeCount + 1
            console.log('this.selectContentCount', this.selectAssigneeCount)
          }
        })
      } else if (this.trainingPlanDataSharingService.trainingPlanAssigneeData.category === 'Custom Users') {
        this.selectedAssigneeChips = this.trainingPlanDataSharingService.trainingPlanAssigneeData.data.content
        console.log('this.selectedAssigneeChips', this.selectedAssigneeChips)
        this.selectedAssigneeChips && this.selectedAssigneeChips.map((sitem:any) => {
          if (sitem.selected) {
            this.selectAssigneeCount = this.selectAssigneeCount + 1
            console.log('this.selectContentCount', this.selectAssigneeCount)
          }
        })
      }
      
    }
    if (this.selectAssigneeCount <= 0) {
      this.addAssigneeInvalid.emit(true)
    } else {
      this.addAssigneeInvalid.emit(false)
    }
  }

}
