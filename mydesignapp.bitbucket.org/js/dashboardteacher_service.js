/**

Dashboard Service Layer handles our bussiness logic such as accessing data from the DAO and our computational needs
NO MODIFICATIONS TO THE DOM IS PERMITTED THROUGH THIS FILE

For a list of static data items, object definitions, datastructures, and global variable definitions, please reference the dashboard_static_variables.js file

**/

//#################################### Document On Ready ####################################//
$(document).ready(function () { 
    //Event Listeners for the PDF viewer

    $("body").on('click', '#pdf_prev', function (e) {
        prevPDF();
    });

    $("body").on('click', '#pdf_next', function (e) {
        nextPDF();
    });

    $("body").on('click', '#pdf_zoomin', function (e) {
        zoomInPDF();
    });

    $("body").on('click', '#pdf_zoomout', function (e) {
        zoomOutPDF();
    });

    $("body").on('change', '#zoom_slider', function (e) {
        zoomSlider();
    });

});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                      PDF viewer                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Supporting variables for the PDF viewer
pdfPage = 1;
pdf_maxPages = 1;
pdf_file = null;
scale = 1;

/*
* Displays the PDF in the PDF viewer module
*/
function renderPDF(pdf_file_in){
    pdf_file = pdf_file_in
    PDFJS.getDocument(pdf_file).then(function(pdf) {
      // Using promise to fetch the page
    pdf.getPage(1).then(function(page) {
        console.log(page)
        console.log(page.pageInfo.view[2])
        console.log(page.pageInfo.view[3])
        var scale = 1; 
        var viewport = page.getViewport(scale);
        pdf_maxPages = pdf.numPages;
        document.getElementById("pdf_page_number").innerHTML = 1 + "/" + pdf_maxPages;
        // Prepare canvas using PDF page dimensions
        var canvas = document.getElementById('pdf_canvas');
        var context = canvas.getContext('2d');
    
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };

        page.render(renderContext);

      });
    });
}

//Dispalys the previous page of the PDF
function prevPDF(){    
    if(pdfPage > 1){
        PDFJS.getDocument(pdf_file).then(function(pdf) {
        pdf.getPage(--pdfPage).then(function(page) {
            document.getElementById("pdf_page_number").innerHTML = pdfPage + "/" + pdf_maxPages;
            var scale = 1;
            var viewport = page.getViewport(scale);
            var canvas = document.getElementById('pdf_canvas');
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            var renderContext = {
              canvasContext: context,
              viewport: viewport
            };
            page.render(renderContext);
          });
        });
    }
}

//Dispalys the Next page of the PDF
function nextPDF(){
    console.log(pdfPage)
    if(pdfPage < pdf_maxPages){
        PDFJS.getDocument(pdf_file).then(function(pdf) {
        pdf.getPage(++pdfPage).then(function(page) {
            document.getElementById("pdf_page_number").innerHTML = pdfPage + "/" + pdf_maxPages;
            var scale = 1;
            var viewport = page.getViewport(scale);
            var canvas = document.getElementById('pdf_canvas');
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            var renderContext = {
              canvasContext: context,
              viewport: viewport
            };
            page.render(renderContext);
          });
        });
    }
}

function zoomInPDF(){
    scale *= 1.2
    document.getElementById("pdf_page_zoom").innerHTML = Math.round(scale*100);
    document.getElementById("zoom_slider").value = Math.round(scale*100);
    PDFJS.getDocument(pdf_file).then(function(pdf) {
        pdf.getPage(pdfPage).then(function(page) {
            var viewport = page.getViewport(scale);
            var canvas = document.getElementById('pdf_canvas');
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            var renderContext = {
              canvasContext: context,
              viewport: viewport
            };
            page.render(renderContext);
          });
    });
}

function zoomOutPDF(){
    scale *= 0.8
    document.getElementById("pdf_page_zoom").innerHTML = Math.round(scale*100);
    document.getElementById("zoom_slider").value = Math.round(scale*100);
    PDFJS.getDocument(pdf_file).then(function(pdf) {
        pdf.getPage(pdfPage).then(function(page) {
            var viewport = page.getViewport(scale);
            var canvas = document.getElementById('pdf_canvas');
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            var renderContext = {
              canvasContext: context,
              viewport: viewport
            };
            page.render(renderContext);
          });
    });
}

function zoomSlider(){
    scale = document.getElementById("zoom_slider").value/100;
    document.getElementById("pdf_page_zoom").innerHTML = Math.round(scale*100);
    PDFJS.getDocument(pdf_file).then(function(pdf) {
        pdf.getPage(pdfPage).then(function(page) {
            var viewport = page.getViewport(scale);
            var canvas = document.getElementById('pdf_canvas');
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            var renderContext = {
              canvasContext: context,
              viewport: viewport
            };
            page.render(renderContext);
          });
    });
}



