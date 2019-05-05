import { Component,ViewChild,ElementRef, OnInit } from '@angular/core';
import { TemplateService} from '../template.service';
import { Template} from '../model/template';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms'
//import { template } from '@angular/core/src/render3';
@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {
  @ViewChild('dataTable') table: ElementRef;
  dataTable: any;
  newForm: FormGroup;
  constructor(private templateService: TemplateService,
    private formBuilder:FormBuilder
    ) { }
  
  templates: Template[];
  getTemplates(): void {
    this.templateService.getTemplates().subscribe(temp => this.templates = temp);
  }
  add(): void {
   
    //if (!name) { return; }
    const template= new Template();
    template.name  = this.newForm.get('name').value;
    template.identifier  = this.newForm.get('identifier').value;
    template.price = this.newForm.get('price').value;
    template.photo  = this.newForm.get('photo').value;
    console.log("TEMPLATE: "+template);
    this.templateService.addTemplates(template)
      .subscribe(template => {
        this.templates.push(template);
      });
  }
  delete(template: Template): void {
    this.templates = this.templates.filter(h => h !== template);
    this.templateService.deleteTemplate(template).subscribe();
  }


  ngOnInit() {
    // this.dataTable = $(this.table.nativeElement);
    // this.dataTable.dataTable(
    //   {
    //     "columnDefs": [
    //       { targets: [-1,-2],
    //         className: 'dt-body-center' }
    //     ]
    //   }
    // );

    this.getTemplates();
    this.newForm=this.formBuilder.group({
      name: new FormControl(),
      identifier: new FormControl(),
      price: new FormControl(),
      photo: new FormControl()
    });
  }

}
