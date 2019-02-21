import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import InfoComponent from './InfoComponent.jsx';
import ChartComponent from './ChartComponent.jsx';
export default class PdfComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            testId: this.props.testId,
        };
    }

//     downloadPdf(){    
//         const input = document.getElementById('pdfD');
        
//         html2canvas(input,{
//             onclone:(doc)=>{
//                 doc.getElementById('pdfD').style.display='block';
//             }
//         })
//         .then((canvas) => {
            
//             var imgWidth = 210; 
//             var pageHeight = 295;  
//             var imgHeight = canvas.height * imgWidth / canvas.width;
//             var heightLeft = imgHeight;
//             var position = 0;
//             const imgData = canvas.toDataURL('image/png');
//             const pdf = new jsPDF();
//             pdf.addImage(imgData, 'PNG', 0,position, imgWidth, imgHeight);

//             heightLeft -= pageHeight;

//             while (heightLeft >= 0) {
//             position = heightLeft - imgHeight;
//             pdf.addPage();
//             pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
//             heightLeft -= pageHeight;
//             }
            
//             pdf.save("download.pdf");
//         });
        
//   }
  download(){
    const input = document.getElementsByClassName('pdfDiv');
    html2canvas(input[0],{
        onclone:(div)=>{
            div.getElementsByClassName('pdfDiv')[0].style.display='block';
        }
    })
    .then((canvas)=>{    
        console.log(canvas);
        var doc = new jsPDF(); 
        var height=doc.internal.pageSize.getHeight();
        var width=doc.internal.pageSize.getWidth();
        doc.addImage(canvas.toDataURL("image/jpeg"), 'jpeg',30,10,width,height);
        doc.save("download.pdf");
        // doc.addPage();
        // html2canvas(input[1],{
        //     onclone:(div)=>{
        //         div.getElementsByClassName('pdfDiv')[1].style.display='block';
        //     }
        // }).then(
        //     (can)=>{
        //         doc.addImage(can.toDataURL("image/jpeg"), 'jpeg', 30,10,width,height);
        //         doc.save("download.pdf");
        //     });
    });

  }
  navigate(){
    window.location.href="http://localhost:8081/index.html";
  }
    render(){
        return(
            <div>
                <div id="pdfD">
                    <div className="pdfDiv">
                        
                        <InfoComponent testId={this.state.testId} />
                        <ChartComponent testId={this.state.testId}/>
                                        

                    </div>
                    
                </div>
                
                <button onClick={()=>{this.download()}}>Download Report</button>
                <button onClick={()=>{this.navigate()}}>Go to VR</button>
            </div>
        )
    }
}