import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-printing-contract',
  templateUrl: './printing-contract.component.html',
  styleUrls: ['./printing-contract.component.css']
})
export class PrintingContractComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  print() {
    let printContents, popupWin;
    printContents = document.getElementById("print").innerHTML.toString();
    printContents = (<string>printContents + "").replace("col-sm", "col-xs");
    popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title></title>
          <meta name="viewport" content="width=10000, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
          <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
        
        </head>
        <body onload="window.print();">
          ${printContents}
        </body>
      </html>`);
    /* window.close(); */
    popupWin.document.close();
  }

}
