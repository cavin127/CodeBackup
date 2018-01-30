import { Component, OnInit,Input ,ViewChild,Renderer }   from '@angular/core';
import { Personal }            from '../data/formData.model';
import { FormDataService }     from '../data/formData.service';
import { Router } from '@angular/router'


@Component ({
    selector:     'mt-wizard-work'
    ,templateUrl: 'upload.component.html'
})

export class UploadComponent implements OnInit {

  @ViewChild('formPass')
  myInputVariableformPass: any;
  @ViewChild('formDrive')
  myInputVariableformDrive: any;
  @ViewChild('fileUpload') fileUploadVar: any;

  uploadResult: any;
  error: any;
  val: any;
  fileInputVal: any;
  quoteData: any;
  quoteId: any;
  file: any;
  _loanDocs: any;
  validateDoc: any;
  dataPoco:any
  appendValue: any;
  docName: any;
  filesToUpload: Array<File>;
  selectedFileNames: string[] = [];
  sessionDoc: any;
  uploadDocData: any[];
  imageName: any;
  imageType: any;
  imagePath: any;
  uploadApiData: any;
  targetFiles: any;
  scope: any;
  // target: any;
    constructor(private formDataService: FormDataService,private router:Router,private render:Renderer) {

      
      this.filesToUpload = [];
      this.selectedFileNames = [];
      this.uploadResult = "";
      this.appendValue = "";


    }

    
    ngOnInit() {


      sessionStorage.removeItem('getUploadData');
      this.quoteData = sessionStorage.getItem('getQuoteData');
      let obj = JSON.parse(this.quoteData);

      this.quoteId = obj.quoteID;

      console.log(this.quoteId);


      if (sessionStorage.getItem('getUploadData')) {

       // alert("1");

        this.uploadApiData = JSON.parse(sessionStorage.getItem('getUploadData'));
      }

      else {
        //alert("0");
      this.formDataService.getUploadFile(this.quoteId)
        .subscribe(
        data => {
          
          this.uploadDocData = data;
          sessionStorage.setItem('getUploadData', JSON.stringify(this.uploadDocData));
          this.uploadApiData = JSON.parse(sessionStorage.getItem('getUploadData'));

        },
        error => {
          this.error = error
          //console.log(this.error);
        });

      this.uploadApiData = JSON.parse(sessionStorage.getItem('getUploadData'));

      }
      //alert(sessionStorage.getItem('getUploadData'));
     

      

      //alert(this.uploadApiData.fileName);


      //alert(this.uploadApiData);
      //let obj1 = JSON.parse(sessionStorage.getItem('getUploadData'));
      //this.imageName = obj1.loanAppDocuments[0]['fileName']; 
      //this.imageType = obj1.loanAppDocuments[0]['documentType'];
      //this.imagePath = obj1.loanAppDocuments[0]['storagePath']; 
     
     
      
}

   
    imageDownload(data: Response) {

      console.log(data);
        var blob = new Blob([data]);
        var url = window.URL.createObjectURL(blob);
        window.open(url);
      }

    

    reset(val) {

      if (val == 'formDrive') {
        this.myInputVariableformDrive.nativeElement.reset();
      }
      else {
        this.myInputVariableformPass.nativeElement.reset()
      }

     
    }

    logForm() {

      alert("Loan Application Submitted Successfully");
      //sessionStorage.removeItem('getUploadData');
      //location.reload();

      this.router.navigate(['address']);

    }


    documentProcessOcr(data) {


      var string = JSON.stringify(data);
      let validatedoc = '';
      let substring = "Passport";
      let sub = "passport";
      let substring1 = "DRIVING";
      let sub1 = "driving";

      let flag = "";
      this.docName = "";
      if ((string.includes(substring) || string.includes(sub)) || (string.includes(substring1) || string.includes(sub1))) {

        if (string.includes(substring) || string.includes(sub)) {

          //alert(this.scope + "----------------paspport");
          validatedoc = "passport ";
          //alert("passport is verified");

          this.docName = "Passport";
          if (flag == "P" && (this.appendValue.length > 0)) {
            this.appendValue = this.appendValue + " Passport and Driving License are Verified";
          }
          else {
            this.appendValue = this.appendValue + " Passport "
            //sessionStorage.setItem("docName", "PASSPORT");
            //doctype[i] = "Passport";
            // alert('inside passport');
            // alert(doctype[i]);
          }
         //return "Passport";
        }

        if (string.includes(substring1) || string.includes(sub1)) {

          //alert(this.scope + "----------------driving license");
          validatedoc = "driving license";
          flag = "D";
          this.docName = "Driving License"

          if (flag == "D" && (this.appendValue.length > 0)) {
            //alert("herererererer");
            this.appendValue = this.appendValue + " and Driving License"
          }
          else {
            this.appendValue = this.appendValue + " Driving License"
            //sessionStorage.setItem("docName", "DRIVING LICENSE");
            //doctype[i] = "Driving Licence";
            // alert('inside dl');
            //  alert(doctype[i]);
          }
          //alert("driving license is verified");
        }
        this.appendValue = this.appendValue + " is verified"
      }
      else {
        this.appendValue = this.appendValue + "Invalid Document"
        this.reset('formpass');
      }

      return this.appendValue;
    }



       
    fileChangeEvent(e, input: any) {
      let target: HTMLInputElement = e.target as HTMLInputElement;

      //let files = [].slice.call(e.target.files);
      //input.value = files.map(f => f.name).join(', ');
      
      this.appendValue = "";
      //sessionStorage.removeItem("docName");


      //alert(target.files.length);
      var doctype = new Array();
      for (var i = 0; i < target.files.length; i++) {
        //console.log(i);

        //alert(target.files.length);
        alert("outer"+i);
        
        this.scope = i;
        //alert(this.scope+"-----scope")
        this.targetFiles = target.files[this.scope];

        
       

        this.formDataService.getOcrData(target.files[i])
          .subscribe(
          data => {

            alert("inside scope"+this.scope);

              //alert(JSON.stringify(data));
            var documentType = this.documentProcessOcr(data);
            
            //let jsonstr = json.stringify(data);
              console.log('data : ' + this.scope + JSON.stringify(data));

              

          },
          error => {
            this.error = error
            //console.log(this.error);
          });
        
          
        let formData: FormData = new FormData();

        formData.append('QuoteId', this.quoteId);
        formData.append('_loanDocs[' + i + '].ContentType', target.files[i].type);
        formData.append('_loanDocs[' + i + '].DocumentData', target.files[i]);
        formData.append('_loanDocs[' + i + '].DocumentType', this.docName);
        formData.append('_loanDocs[' + i + '].FileName', target.files[i].name);

        this.formDataService.uploadFileApi(formData)
          .subscribe(
          data => {
            this.formDataService.getUploadFile(this.quoteId)
              .subscribe(
              data => {
                this.uploadDocData = data;
                sessionStorage.setItem('getUploadData', JSON.stringify(this.uploadDocData));
              },
              error => {
                this.error = error
                //console.log(this.error);
              });
            //alert(sessionStorage.getItem('getUploadData'));
            this.uploadApiData = JSON.parse(sessionStorage.getItem('getUploadData'));
            //alert("++++++++++++++"+data);
          },
          error => {
            this.error = error
            //console.log(this.error);
          });
        
        //alert('loop completeed');
      }     
      
   
    }
  
}
