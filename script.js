document.addEventListener('DOMContentLoaded', function() {
    let draggedElement;
    let startSquare;
    let previmg=null;
    let de=null;

    let tarsqr;
    let enpst=false;


    let wk=false;
    let bk=false;
    let wr1=false;
    let wr2=false;
    let br1=false;
    let br2=false;


    let wkc=false;
    let bkc=false;

    let casmove1=false;
    let casmove2=false;
    let casmove3=false;
    let casmove4=false;


    
  

    function dragStart(event) {
        draggedElement = event.target; 
        startSquare = draggedElement.parentElement;
    }

    function dragOver(event) {
        event.preventDefault();
    }
    

    function drop(event) {
        event.preventDefault();
        let targetSquare = event.target.classList.contains('wb') || event.target.classList.contains('bb') ? event.target : event.target.parentElement;
        let targetImg = targetSquare.querySelector('img');
        tarsqr=event.target;

        let rowAbove = targetSquare.parentElement.previousElementSibling;
        let rowBelow = targetSquare.parentElement.nextElementSibling;
        let squareAbove;
        let squareBelow;
        let targetCellIndex = Array.prototype.indexOf.call(targetSquare.parentElement.children, targetSquare);
        if(rowAbove){
         squareAbove = rowAbove.children[targetCellIndex];}
        if(rowBelow){
         squareBelow = rowBelow.children[targetCellIndex];}

        
       
         if (!targetImg || (draggedElement.src.includes('-w.svg') && targetImg.src.includes('-b.svg')) || (draggedElement.src.includes('-b.svg') && targetImg.src.includes('-w.svg'))){
            
            if (targetImg) {
                targetImg.parentNode.removeChild(targetImg); 
            }

            if(enpst==true){
                if(draggedElement.src.includes('pawn-w')){
                    squareBelow.removeChild(squareBelow.querySelector('img'));
                }
                else if(draggedElement.src.includes('pawn-b')){
                    squareAbove.removeChild(squareAbove.querySelector('img'));
                }
                enpst=false;

            }

            


            if (draggedElement.src.includes('pawn-w') && targetSquare.id.includes('square-r0')) {
                let userChoice = prompt("Promote to: Queen, Rook, Bishop, or Knight?");
                let newImgSrc;
                if (userChoice === null || userChoice.trim() === "") {
                    userChoice = "queen"; 
                   
               }
                switch (userChoice.toLowerCase()) {
                    case 'queen':
                        newImgSrc = 'images/queen-w.svg'; 
                        break;
                    case 'rook':
                        newImgSrc = 'images/rook-w.svg'; 
                        break;
                    case 'bishop':
                        newImgSrc = 'images/bishop-w.svg'; 
                        break;
                    case 'knight':
                        newImgSrc = 'images/knight-w.svg'; 
                        break;
                    default:
                        newImgSrc = 'images/queen-w.svg'; 
                }
                draggedElement.src = newImgSrc;
            } else if (draggedElement.src.includes('pawn-b') && targetSquare.id.includes('square-r7')) {
                let userChoice = prompt("Promote to: Queen, Rook, Bishop, or Knight?");
                let newImgSrc;
                if (userChoice === null || userChoice.trim() === "") {
                     userChoice = "queen"; 
                    
                }
                switch (userChoice.toLowerCase()) {
                    case 'queen':
                        newImgSrc = 'images/queen-b.svg'; 
                        break;
                    case 'rook':
                        newImgSrc = 'images/rook-b.svg'; 
                        break;
                    case 'bishop':
                        newImgSrc = 'images/bishop-b.svg'; 
                        break;
                    case 'knight':
                        newImgSrc = 'images/knight-b.svg';
                        break;
                    default:
                        newImgSrc = 'images/queen-b.svg'; 
                }
                draggedElement.src = newImgSrc;
            }
    

            

            if(draggedElement.id==='piece29'){
                wk=true;
            }
            else if(draggedElement.id==='piece5'){
                bk=true;
            }
            else if(draggedElement.id==='piece25'){
                wr1=true;
            }
            else if(draggedElement.id==='piece32'){
                wr2=true;
            }
            else if(draggedElement.id==='piece1'){
                br1=true;
            }
            else if(draggedElement.id==='piece8'){
                br2=true;
            }


            if (casmove1 && draggedElement.id==='piece29' && targetSquare.id==='square-r7-c6'){
                let rooksqa=document.getElementById(`square-r7-c5`);
                let rookpiece=document.getElementById('piece32');
                rooksqa.appendChild(rookpiece);
                casmove1=false;

            }

            else if (casmove2 && draggedElement.id==='piece29' && targetSquare.id==='square-r7-c2' ){
                let rooksqa=document.getElementById(`square-r7-c3`);
                let rookpiece=document.getElementById('piece25');
                rooksqa.appendChild(rookpiece);
                casmove2=false;

            }

            else if (casmove3 && draggedElement.id==='piece5' && targetSquare.id==='square-r0-c6' ){
                let rooksqa=document.getElementById(`square-r0-c5`);
                let rookpiece=document.getElementById('piece8');
                rooksqa.appendChild(rookpiece);
                casmove3=false;

            }

            else if (casmove4 && draggedElement.id==='piece5' && targetSquare.id==='square-r0-c2' ){
                let rooksqa=document.getElementById(`square-r0-c3`);
                let rookpiece=document.getElementById('piece1');
                rooksqa.appendChild(rookpiece);
                casmove4=false;

            }
            targetSquare.appendChild(draggedElement);
         

            clearHighlights() ;

            if (previmg!=null){
                previmg=de;
                de=draggedElement;
            }
            else{
                previmg='na';
                de=draggedElement;
            }
            
            
        } else {
            console.log('Invalid move');
            startSquare.appendChild(draggedElement); 
        }
    }

    

    function clearHighlights() { document.querySelectorAll('.highlight-move, .highlight-capture,.highlight-piece').forEach(square => { square.classList.remove('highlight-move', 'highlight-capture','highlight-piece'); }); }
   
    function squareattacked(row,col,color){
   
    let krow =row;
    let kcol =col;
    let checkele=[];

    if(color){
    for(let i=0;i<=8;i++){
        let ks=document.getElementById(`square-r${krow - i}-c${kcol}`);
        if(ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-b')){
            let ksimage=ks.querySelector('img');
            if(ksimage.id=='piece4' || ksimage.id=='piece1' || ksimage.id=='piece8'){
                if (!checkele.includes(ks.querySelector('img').id)) {
                    checkele.push(ks.querySelector('img').id);
                   
                }
                }
            else if(i!=0){
                break;
            }
        }
        else if(ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-w') && ! ks.querySelector('img').src.includes('king-w')){
            break;
        }
    }
    for(let i=0;i<=8;i++){
        let ks=document.getElementById(`square-r${krow +i}-c${kcol}`);
        if(ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-b')){
            let ksimage=ks.querySelector('img');
            if(ksimage.id=='piece4' || ksimage.id=='piece1' || ksimage.id=='piece8'){
                if (!checkele.includes(ks.querySelector('img').id)) {
                    checkele.push(ks.querySelector('img').id);
                  
                }
            }
            else if(i!=0){
                break;
            }
        }
        else if(ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-w')  && ! ks.querySelector('img').src.includes('king-w')){
            break;
        }

    }
    for(let i=0;i<=8;i++){
        let ks=document.getElementById(`square-r${krow}-c${kcol-i}`);
        if(ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-b')){
            let ksimage=ks.querySelector('img');
            if(ksimage.id=='piece4' || ksimage.id=='piece1' || ksimage.id=='piece8'){
                if (!checkele.includes(ks.querySelector('img').id)) {
                    checkele.push(ks.querySelector('img').id);
                  
                }
            }
            else if(i!=0){
                break;
            }
        }
        else if(ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-w')  && ! ks.querySelector('img').src.includes('king-w')){
            break;
        }

    }
    for(let i=0;i<=8;i++){
        let ks=document.getElementById(`square-r${krow}-c${kcol+i}`);
        if(ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-b')){
            let ksimage=ks.querySelector('img');
            if(ksimage.id=='piece4' || ksimage.id=='piece1' || ksimage.id=='piece8'){
                if (!checkele.includes(ks.querySelector('img').id)) {
                    checkele.push(ks.querySelector('img').id);
                   
                }
            }
            else if(i!=0){
                break;
            }
        }
        else if(ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-w')  && ! ks.querySelector('img').src.includes('king-w')){
            break;
        }}
        for(let i=0;i<=8;i++){
            let ks=document.getElementById(`square-r${krow-i}-c${kcol-i}`);
            if(ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-b')){
                let ksimage=ks.querySelector('img');
                if(i==1 && ksimage.src.includes('pawn-b') ){
                    if (!checkele.includes(ks.querySelector('img').id)) {
                        checkele.push(ks.querySelector('img').id);
                        break;
                    }
                    
                }
                if(ksimage.id=='piece4' || ksimage.id=='piece3' || ksimage.id=='piece6'){
                    if (!checkele.includes(ks.querySelector('img').id)) {
                        checkele.push(ks.querySelector('img').id);
                        
                    }
                }
                else if(i!=0){
                    break;
                }
            }
            else if(ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-w')  && ! ks.querySelector('img').src.includes('king-w')){
                break;
            }
    
        }
        for(let i=0;i<=8;i++){
            let ks=document.getElementById(`square-r${krow-i}-c${kcol+i}`);
            if(ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-b')){
                let ksimage=ks.querySelector('img');
                if(i==1 && ksimage.src.includes('pawn-b') ){
                    if (!checkele.includes(ks.querySelector('img').id)) {
                        checkele.push(ks.querySelector('img').id);
                        break;
                    }
                }
                if(ksimage.id=='piece4' || ksimage.id=='piece3' || ksimage.id=='piece6'){
                    if (!checkele.includes(ks.querySelector('img').id)) {
                        checkele.push(ks.querySelector('img').id);
                        
                    }}
                    else if(i!=0){
                        break;
                    }
            }
            else if(ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-w')  && ! ks.querySelector('img').src.includes('king-w')){
                break;
            }
    
        }
        for(let i=0;i<=8;i++){
            let ks=document.getElementById(`square-r${krow+i}-c${kcol-i}`);
            if(ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-b')){
                let ksimage=ks.querySelector('img');
                if(ksimage.id=='piece4' || ksimage.id=='piece3' || ksimage.id=='piece6'){
                    if (!checkele.includes(ks.querySelector('img').id)) {
                        checkele.push(ks.querySelector('img').id);
                        
                    }}
                    else if(i!=0){
                        break;
                    }
            }
            else if(ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-w')  && ! ks.querySelector('img').src.includes('king-w')){
                break;
            }
    
        }
        for(let i=0;i<=8;i++){
            let ks=document.getElementById(`square-r${krow+i}-c${kcol+i}`);
            if(ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-b')){
                let ksimage=ks.querySelector('img');
                if(ksimage.id=='piece4' || ksimage.id=='piece3' || ksimage.id=='piece6'){
                    if (!checkele.includes(ks.querySelector('img').id)) {
                        checkele.push(ks.querySelector('img').id);
                       
                    }}
                    else if(i!=0){
                        break;
                    }
            }
            else if(ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-w')  && ! ks.querySelector('img').src.includes('king-w')){
                break;
            }
        }

        for(let i=0;i<8;i++){
            const kms = [
                [2, 1], [2, -1], [-2, 1], [-2, -1],
                [1, 2], [1, -2], [-1, 2], [-1, -2]
            ];
            let ks=document.getElementById(`square-r${krow+(kms[i][0])}-c${kcol+(kms[i][1])}`);
            if(ks && ks.querySelector('img') && ks.querySelector('img').src.includes('knight-b')){
                
                if (!checkele.includes(ks.querySelector('img').id)) {
                    checkele.push(ks.querySelector('img').id);
                   
                }
                
            }
            
        }
        for(let i=0;i<8;i++){
            const kms = [
                [1, 0], [1, 1], [1, -1],
                [0, 1], [0, -1],
                [-1, 0], [-1, 1], [-1, -1]
            ];
            let ks=document.getElementById(`square-r${krow+(kms[i][0])}-c${kcol+(kms[i][1])}`);
            if(ks && ks.querySelector('img') && ks.querySelector('img').src.includes('king-b')){
                
                if (!checkele.includes(ks.querySelector('img').id)) {
                    checkele.push(ks.querySelector('img').id);
                    
                }
                
            }
            
        }
    }
    else if(!color){
        
        for (let i = 0; i <= 8; i++) {
            let ks = document.getElementById(`square-r${krow - i}-c${kcol}`);
            if (ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-w')) {
                let ksimage = ks.querySelector('img');
                if (ksimage.id == 'piece25' || ksimage.id == 'piece28' || ksimage.id == 'piece32') {
                    if (!checkele.includes(ks.querySelector('img').id)) {
                        checkele.push(ks.querySelector('img').id);
                        
                    }
                } else if(i!=0){
                    break;
                }
            } else if (ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-b')  && ! ks.querySelector('img').src.includes('king-b')) {
                break;
            }
        }
        for (let i = 0; i <= 8; i++) {
            let ks = document.getElementById(`square-r${krow + i}-c${kcol}`);
            if (ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-w')) {
                let ksimage = ks.querySelector('img');
                if (ksimage.id == 'piece25' || ksimage.id == 'piece28' || ksimage.id == 'piece32') {
                    if (!checkele.includes(ks.querySelector('img').id)) {
                        checkele.push(ks.querySelector('img').id);
                        
                    }
                } else if(i!=0){
                    break;
                }
            } else if (ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-b') && ! ks.querySelector('img').src.includes('king-b')) {
                break;
            }

        }
        for (let i = 0; i <= 8; i++) {
            let ks = document.getElementById(`square-r${krow}-c${kcol - i}`);
            if (ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-w')) {
                let ksimage = ks.querySelector('img');
                if (ksimage.id == 'piece25' || ksimage.id == 'piece28' || ksimage.id == 'piece32') {
                    if (!checkele.includes(ks.querySelector('img').id)) {
                        checkele.push(ks.querySelector('img').id);
                        
                    }
                } else if(i!=0){
                    break;
                }
            } else if (ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-b') && ! ks.querySelector('img').src.includes('king-b')) {
                break;
            }

        }
        for (let i = 0; i <= 8; i++) {
            let ks = document.getElementById(`square-r${krow}-c${kcol + i}`);
            if (ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-w')) {
                let ksimage = ks.querySelector('img');
                if (ksimage.id == 'piece25' || ksimage.id == 'piece28' || ksimage.id == 'piece32') {
                    if (!checkele.includes(ks.querySelector('img').id)) {
                        checkele.push(ks.querySelector('img').id);
                       
                    }
                }else if(i!=0){
                    break;
                }
            } else if (ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-b') && ! ks.querySelector('img').src.includes('king-b')) {
                break;
            }
        }
        for (let i = 0; i <= 8; i++) {
            let ks = document.getElementById(`square-r${krow - i}-c${kcol - i}`);
            if (ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-w')) {
                let ksimage = ks.querySelector('img');
               
                if (ksimage.id == 'piece28' || ksimage.id == 'piece27' || ksimage.id == 'piece30') {
                    if (!checkele.includes(ks.querySelector('img').id)) {
                        checkele.push(ks.querySelector('img').id);
                       
                    }
                } else if(i!=0){
                    break;
                }
            } else if (ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-b') && ! ks.querySelector('img').src.includes('king-b')) {
                break;
            }

        }
        for (let i = 0; i <= 8; i++) {
            let ks = document.getElementById(`square-r${krow - i}-c${kcol + i}`);
            if (ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-w')) {
                let ksimage = ks.querySelector('img');
                
                if (ksimage.id == 'piece28' || ksimage.id == 'piece27' || ksimage.id == 'piece30') {
                    if (!checkele.includes(ks.querySelector('img').id)) {
                        checkele.push(ks.querySelector('img').id);
                        
                    }
                } else if(i!=0){
                    break;
                }
            } else if (ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-b') && ! ks.querySelector('img').src.includes('king-b')) {
                break;
            }

        }
        for (let i = 0; i <= 8; i++) {
            let ks = document.getElementById(`square-r${krow + i}-c${kcol - i}`);
            if (ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-w')) {
                let ksimage = ks.querySelector('img');
                if (i == 1 && ksimage.src.includes('pawn-w')) {
                    if (!checkele.includes(ks.querySelector('img').id)) {
                        checkele.push(ks.querySelector('img').id);
                        break;
                    }
                }
                if (ksimage.id == 'piece28' || ksimage.id == 'piece27' || ksimage.id == 'piece30') {
                    if (!checkele.includes(ks.querySelector('img').id)) {
                        checkele.push(ks.querySelector('img').id);
                       
                    }
                } else if(i!=0){
                    break;
                }
            } else if (ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-b') && ! ks.querySelector('img').src.includes('king-b')) {
                break;
            }

        }
        for (let i = 0; i <= 8; i++) {
            let ks = document.getElementById(`square-r${krow + i}-c${kcol + i}`);
            if (ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-w')) {
                let ksimage = ks.querySelector('img');
                if (i == 1 && ksimage.src.includes('pawn-w')) {
                    if (!checkele.includes(ks.querySelector('img').id)) {
                        checkele.push(ks.querySelector('img').id);
                        break;
                    }
                }
                if (ksimage.id == 'piece28' || ksimage.id == 'piece27' || ksimage.id == 'piece30') {
                    if (!checkele.includes(ks.querySelector('img').id)) {
                        checkele.push(ks.querySelector('img').id);
                       
                    }
                } else if(i!=0){
                    break;
                }
            } else if (ks && ks.querySelector('img') && ks.querySelector('img').src.includes('-b') && ! ks.querySelector('img').src.includes('king-b')) {
                break;
            }
        }

        for (let i = 0; i < 8; i++) {
            const kms = [
                [2, 1], [2, -1], [-2, 1], [-2, -1],
                [1, 2], [1, -2], [-1, 2], [-1, -2]
            ];
            let ks = document.getElementById(`square-r${krow + (kms[i][0])}-c${kcol + (kms[i][1])}`);
            if (ks && ks.querySelector('img') && ks.querySelector('img').src.includes('knight-w')) {
                if (!checkele.includes(ks.querySelector('img').id)) {
                    checkele.push(ks.querySelector('img').id);
                    
                }
            }
        }

        for (let i = 0; i < 8; i++) {
            const kms = [
                [1, 0], [1, 1], [1, -1],
                [0, 1], [0, -1],
                [-1, 0], [-1, 1], [-1, -1]
            ];
            let ks = document.getElementById(`square-r${krow + (kms[i][0])}-c${kcol + (kms[i][1])}`);
            if (ks && ks.querySelector('img') && ks.querySelector('img').src.includes('king-w')) {
                if (!checkele.includes(ks.querySelector('img').id)) {
                    checkele.push(ks.querySelector('img').id);
                }
                
            }
        }

    }


      
        return checkele;

    }

    
    
    
    let image_move;

   document.querySelectorAll('.chessboard img').forEach(piece => {
           piece.addEventListener('click', function() {
           
          
          
           startBox=this.parentElement;
           startRow = Array.from(startBox.parentElement.parentElement.children).indexOf(startBox.parentElement);
           startCol = Array.from(startBox.parentElement.children).indexOf(startBox);
           if(!startBox.classList.contains('highlight-capture')){
           image_move=this;
           clearHighlights() ;
           startBox.classList.add('highlight-piece');

           
          
        if(this.src.includes("pawn-w")){
           let s1=document.getElementById(`square-r${startRow - 1}-c${startCol}`);
           let s2=document.getElementById(`square-r${startRow - 2}-c${startCol}`);
           let pcl=document.getElementById(`square-r${startRow - 1}-c${startCol-1}`);
           let pcr=document.getElementById(`square-r${startRow - 1}-c${startCol+1}`);

           let pel=document.getElementById(`square-r${startRow}-c${startCol-1}`);
           let per=document.getElementById(`square-r${startRow}-c${startCol+1}`);
          
          
           if(startRow===6){
                if(s1 && !(s1.querySelector('img'))){
                s1.classList.add('highlight-move'); }
                if(s2 && !(s1.querySelector('img'))  && (!(s2.querySelector('img')))){
                s2.classList.add('highlight-move'); }
           }
           else if(s1 && !(s1.querySelector('img'))){
                s1.classList.add('highlight-move'); 
           }


           if( pcl && pcl.querySelector('img')&&pcl.querySelector('img').src.includes('-b')){
                pcl.classList.add('highlight-capture');
           }
           if( pcr && pcr.querySelector('img')&&pcr.querySelector('img').src.includes('-b')){
            pcr.classList.add('highlight-capture');
           }

          
          
           if (startRow == 3) {
         
            if ((pel && pel.querySelector('img') && pel.querySelector('img').src.includes('pawn-b')) && 
                (startSquare.id.includes(`square-r1-c${startCol-1}`) && tarsqr.id.includes(`square-r3-c${startCol-1}`))) {
                pcl.classList.add('highlight-capture');
                enpst=true;
            }
            
            
            if ((per && per.querySelector('img') && per.querySelector('img').src.includes('pawn-b')) && 
                (startSquare.id.includes(`square-r1-c${startCol+1}`) && tarsqr.id.includes(`square-r3-c${startCol+1}`))) {
                pcr.classList.add('highlight-capture');
                enpst=true;
            }
        }
        
        

        }

        else if (this.src.includes("pawn-b")) {
            let s1 = document.getElementById(`square-r${startRow + 1}-c${startCol}`);
            let s2 = document.getElementById(`square-r${startRow + 2}-c${startCol}`);
            let pcl = document.getElementById(`square-r${startRow + 1}-c${startCol - 1}`);
            let pcr = document.getElementById(`square-r${startRow + 1}-c${startCol + 1}`);
        
            let pel = document.getElementById(`square-r${startRow}-c${startCol - 1}`);
            let per = document.getElementById(`square-r${startRow}-c${startCol + 1}`);
        
            if (startRow === 1) {
                if (s1 && !(s1.querySelector('img'))) {
                    s1.classList.add('highlight-move');
                }
                if (s2 && !(s1.querySelector('img')) && !(s2.querySelector('img'))) {
                    s2.classList.add('highlight-move');
                }
            } else if (s1 && !(s1.querySelector('img'))) {
                s1.classList.add('highlight-move');
            }
        
            if (pcl && pcl.querySelector('img') && pcl.querySelector('img').src.includes('-w')) {
                pcl.classList.add('highlight-capture');
            }
            if (pcr && pcr.querySelector('img') && pcr.querySelector('img').src.includes('-w')) {
                pcr.classList.add('highlight-capture');
            }
        
            if (startRow == 4) {
                // Check left side en passant for black pawn capturing white pawn
                if ((pel && pel.querySelector('img') && pel.querySelector('img').src.includes('pawn-w')) && 
                    (startSquare.id.includes(`square-r6-c${startCol-1}`) && tarsqr.id.includes(`square-r4-c${startCol-1}`))) {
                    pcl.classList.add('highlight-capture');
                    enpst=true;
                }
                
                // Check right side en passant for black pawn capturing white pawn
                if ((per && per.querySelector('img') && per.querySelector('img').src.includes('pawn-w')) && 
                    (startSquare.id.includes(`square-r6-c${startCol+1}`) && tarsqr.id.includes(`square-r4-c${startCol+1}`))) {
                    pcr.classList.add('highlight-capture');
                    enpst=true;
                }
            }


            
        }



        else if (this.src.includes("rook")) {
            // Up
            for (let i = 1; i <= 8; i++) {
                let up = document.getElementById(`square-r${startRow - i}-c${startCol}`);
        
                if (((this.src.includes('rook-w') && up && up.querySelector('img') && up.querySelector('img').src.includes('-b')) || 
                     (this.src.includes('rook-b') && up && up.querySelector('img') && up.querySelector('img').src.includes('-w')))) {
                    up.classList.add('highlight-capture');
                    break;
                } else if (((this.src.includes('rook-w') && up && up.querySelector('img') && up.querySelector('img').src.includes('-w')) || 
                             (this.src.includes('rook-b') && up && up.querySelector('img') && up.querySelector('img').src.includes('-b')))) {
                    break;
                }
        
                if (up) {
                    up.classList.add('highlight-move');
                }
            }
        
            // Down
            for (let i = 1; i <= 8; i++) {
                let dn = document.getElementById(`square-r${startRow + i}-c${startCol}`);
                
                if (((this.src.includes('rook-w') && dn && dn.querySelector('img') && dn.querySelector('img').src.includes('-b')) || 
                     (this.src.includes('rook-b') && dn && dn.querySelector('img') && dn.querySelector('img').src.includes('-w')))) {
                    dn.classList.add('highlight-capture');
            
                    break;
                } else if (((this.src.includes('rook-w') && dn && dn.querySelector('img') && dn.querySelector('img').src.includes('-w')) || 
                             (this.src.includes('rook-b') && dn && dn.querySelector('img') && dn.querySelector('img').src.includes('-b')))) {
                    break;
                }
        
                if (dn) {
                    dn.classList.add('highlight-move');
                }
            }
        
            // Left
            for (let i = 1; i <= 8; i++) {
                let lt = document.getElementById(`square-r${startRow}-c${startCol - i}`);
                
                if (((this.src.includes('rook-w') && lt && lt.querySelector('img') && lt.querySelector('img').src.includes('-b')) || 
                     (this.src.includes('rook-b') && lt && lt.querySelector('img') && lt.querySelector('img').src.includes('-w')))) {
                    lt.classList.add('highlight-capture');
                    
                    break;
                } else if (((this.src.includes('rook-w') && lt && lt.querySelector('img') && lt.querySelector('img').src.includes('-w')) || 
                             (this.src.includes('rook-b') && lt && lt.querySelector('img') && lt.querySelector('img').src.includes('-b')))) {
                    break;
                }
        
                if (lt) {
                    lt.classList.add('highlight-move');
                }
            }
        
            // Right
            for (let i = 1; i <= 8; i++) {
                let rt = document.getElementById(`square-r${startRow}-c${startCol + i}`);
                
                if (((this.src.includes('rook-w') && rt && rt.querySelector('img') && rt.querySelector('img').src.includes('-b')) || 
                     (this.src.includes('rook-b') && rt && rt.querySelector('img') && rt.querySelector('img').src.includes('-w')))) {
                    rt.classList.add('highlight-capture');
                    
                    break;
                } else if (((this.src.includes('rook-w') && rt && rt.querySelector('img') && rt.querySelector('img').src.includes('-w')) || 
                             (this.src.includes('rook-b') && rt && rt.querySelector('img') && rt.querySelector('img').src.includes('-b')))) {
                    break;
                }
        
                if (rt) {
                    rt.classList.add('highlight-move');
                }
            }
        }

        else if (this.src.includes("bishop")) {
            // Up-Left
            for (let i = 1; i <= 8; i++) {
                let ul = document.getElementById(`square-r${startRow - i}-c${startCol - i}`);
                if (ul && ul.querySelector('img')) {
                    if ((this.src.includes('bishop-w') && ul.querySelector('img').src.includes('-b')) || 
                        (this.src.includes('bishop-b') && ul.querySelector('img').src.includes('-w'))) {
                        ul.classList.add('highlight-capture');
                    }
                    break; 
                }
                if (ul) {
                    ul.classList.add('highlight-move');
                }
            }
        
            // Up-Right
            for (let i = 1; i <= 8; i++) {
                let ur = document.getElementById(`square-r${startRow - i}-c${startCol + i}`);
                if (ur && ur.querySelector('img')) {
                    if ((this.src.includes('bishop-w') && ur.querySelector('img').src.includes('-b')) || 
                        (this.src.includes('bishop-b') && ur.querySelector('img').src.includes('-w'))) {
                        ur.classList.add('highlight-capture');
                    }
                    break; 
                }
                if (ur) {
                    ur.classList.add('highlight-move');
                }
            }
        
            // Down-Left
            for (let i = 1; i <= 8; i++) {
                let dl = document.getElementById(`square-r${startRow + i}-c${startCol - i}`);
                if (dl && dl.querySelector('img')) {
                    if ((this.src.includes('bishop-w') && dl.querySelector('img').src.includes('-b')) || 
                        (this.src.includes('bishop-b') && dl.querySelector('img').src.includes('-w'))) {
                        dl.classList.add('highlight-capture');
                        
                    }
                    break; 
                }
                if (dl) {
                    dl.classList.add('highlight-move');
                }
            }
        
            // Down-Right
            for (let i = 1; i <= 8; i++) {
                let dr = document.getElementById(`square-r${startRow + i}-c${startCol + i}`);
                if (dr && dr.querySelector('img')) {
                    if ((this.src.includes('bishop-w') && dr.querySelector('img').src.includes('-b')) || 
                        (this.src.includes('bishop-b') && dr.querySelector('img').src.includes('-w'))) {
                        dr.classList.add('highlight-capture');
                       
                    }
                    break; 
                }
                if (dr) {
                    dr.classList.add('highlight-move');
                }
            }
        }



        else if (this.src.includes("queen")) {

            // Vertical Up
            for (let i = 1; i <= 8; i++) {
                let up = document.getElementById(`square-r${startRow + i}-c${startCol}`);
                if (up && up.querySelector('img')) {
                    if ((this.src.includes('queen-w') && up.querySelector('img').src.includes('-b')) || 
                        (this.src.includes('queen-b') && up.querySelector('img').src.includes('-w'))) {
                        up.classList.add('highlight-capture');
                       
                    }
                    break;
                }
                if (up) {
                    up.classList.add('highlight-move');
                }
            }
        
            // Vertical Down
            for (let i = 1; i <= 8; i++) {
                let down = document.getElementById(`square-r${startRow - i}-c${startCol}`);
                if (down && down.querySelector('img')) {
                    if ((this.src.includes('queen-w') && down.querySelector('img').src.includes('-b')) || 
                        (this.src.includes('queen-b') && down.querySelector('img').src.includes('-w'))) {
                        down.classList.add('highlight-capture');
                       
                    }
                    break;
                }
                if (down) {
                    down.classList.add('highlight-move');
                }
            }
        
            // Horizontal Left
            for (let i = 1; i <= 8; i++) {
                let left = document.getElementById(`square-r${startRow}-c${startCol - i}`);
                if (left && left.querySelector('img')) {
                    if ((this.src.includes('queen-w') && left.querySelector('img').src.includes('-b')) || 
                        (this.src.includes('queen-b') && left.querySelector('img').src.includes('-w'))) {
                        left.classList.add('highlight-capture');
                       
                    }
                    break;
                }
                if (left) {
                    left.classList.add('highlight-move');
                }
            }
        
            // Horizontal Right
            for (let i = 1; i <= 8; i++) {
                let right = document.getElementById(`square-r${startRow}-c${startCol + i}`);
                if (right && right.querySelector('img')) {
                    if ((this.src.includes('queen-w') && right.querySelector('img').src.includes('-b')) || 
                        (this.src.includes('queen-b') && right.querySelector('img').src.includes('-w'))) {
                        right.classList.add('highlight-capture');
                        
                    }
                    break;
                }
                if (right) {
                    right.classList.add('highlight-move');
                }
            }
        
            // Diagonal Up-Left
            for (let i = 1; i <= 8; i++) {
                let ul = document.getElementById(`square-r${startRow - i}-c${startCol - i}`);
                if (ul && ul.querySelector('img')) {
                    if ((this.src.includes('queen-w') && ul.querySelector('img').src.includes('-b')) || 
                        (this.src.includes('queen-b') && ul.querySelector('img').src.includes('-w'))) {
                        ul.classList.add('highlight-capture');
                        
                    }
                    break;
                }
                if (ul) {
                    ul.classList.add('highlight-move');
                }
            }
        
            // Diagonal Up-Right
            for (let i = 1; i <= 8; i++) {
                let ur = document.getElementById(`square-r${startRow - i}-c${startCol + i}`);
                if (ur && ur.querySelector('img')) {
                    if ((this.src.includes('queen-w') && ur.querySelector('img').src.includes('-b')) || 
                        (this.src.includes('queen-b') && ur.querySelector('img').src.includes('-w'))) {
                        ur.classList.add('highlight-capture');
                        
                    }
                    break;
                }
                if (ur) {
                    ur.classList.add('highlight-move');
                }
            }
        
            // Diagonal Down-Left
            for (let i = 1; i <= 8; i++) {
                let dl = document.getElementById(`square-r${startRow + i}-c${startCol - i}`);
                if (dl && dl.querySelector('img')) {
                    if ((this.src.includes('queen-w') && dl.querySelector('img').src.includes('-b')) || 
                        (this.src.includes('queen-b') && dl.querySelector('img').src.includes('-w'))) {
                        dl.classList.add('highlight-capture');
                       
                    }
                    break;
                }
                if (dl) {
                    dl.classList.add('highlight-move');
                }
            }
        
            // Diagonal Down-Right
            for (let i = 1; i <= 8; i++) {
                let dr = document.getElementById(`square-r${startRow + i}-c${startCol + i}`);
                if (dr && dr.querySelector('img')) {
                    if ((this.src.includes('queen-w') && dr.querySelector('img').src.includes('-b')) || 
                        (this.src.includes('queen-b') && dr.querySelector('img').src.includes('-w'))) {
                        dr.classList.add('highlight-capture');
                        
                    }
                    break;
                }
                if (dr) {
                    dr.classList.add('highlight-move');
                }
            }
        }
        



        else if (this.src.includes("knight")) {
            const knightMoves = [
                [2, 1], [2, -1], [-2, 1], [-2, -1],
                [1, 2], [1, -2], [-1, 2], [-1, -2]
            ];
        
            knightMoves.forEach(move => {
                let newRow = startRow + move[0];
                let newCol = startCol + move[1];
                let square = document.getElementById(`square-r${newRow}-c${newCol}`);
                
                if (square && !square.querySelector('img')) {
                    square.classList.add('highlight-move');
                } else if (square && square.querySelector('img')) {
                    if ((this.src.includes('knight-w') && square.querySelector('img').src.includes('-b')) ||
                        (this.src.includes('knight-b') && square.querySelector('img').src.includes('-w'))) {
                        square.classList.add('highlight-capture');
                        
                    }
                }
            });
        }
        



        else if (this.src.includes("king")) {

            if(this.src.includes("king-w")){

               
                if (!wk &&(!wr1||!wr2) ){
                   let ksqr=this.parentElement;
                   let cassqr1=document.getElementById(`square-r7-c5`);
                   let cassqr2=document.getElementById(`square-r7-c6`);
                   let cassqr3=document.getElementById(`square-r7-c3`);
                   let cassqr4=document.getElementById(`square-r7-c2`);
                   let cassqr5=document.getElementById(`square-r7-c1`);

                   let castle1=true;

                   for(let i=0;i<3;i++){
                    let casr=document.getElementById(`square-r7-c${i+4}`);
                    let row = parseInt(casr.id.split('-')[1].substring(1));
                    let col = parseInt(casr.id.split('-')[2].substring(1));
                    let cs=squareattacked(row,col,true)
                    
                    if (cs.length !== 0){
                        castle1=false;
                        break;
                    }
                   }
                   
                   if(!(cassqr1.querySelector('img')) && !(cassqr2.querySelector('img')) && !wr2 && castle1){
                    
                        cassqr1.classList.add('highlight-move');
                        cassqr2.classList.add('highlight-move');
                        casmove1=true;
                   }


                   let castle2=true;

                   for(let i=0;i<3;i++){
                    let casr=document.getElementById(`square-r7-c${4-i}`);
                    let row = parseInt(casr.id.split('-')[1].substring(1));
                    let col = parseInt(casr.id.split('-')[2].substring(1));
                    let cs=squareattacked(row,col,true)
                    
                    if (cs.length !== 0){
                        castle2=false;
                        break;
                    }
                   }

                   if(!(cassqr3.querySelector('img')) && !(cassqr4.querySelector('img')) && !(cassqr5.querySelector('img')) && !wr1 && castle2){
                    cassqr3.classList.add('highlight-move');
                    cassqr4.classList.add('highlight-move');
                    casmove2=true;
               }


                }
            }
            
            if(this.src.includes("king-b")){

            
                if (!bk &&(!br1||!br2)){
                    let cassqr1 = document.getElementById(`square-r0-c5`);
                    let cassqr2 = document.getElementById(`square-r0-c6`);
                    let cassqr3 = document.getElementById(`square-r0-c3`);
                    let cassqr4 = document.getElementById(`square-r0-c2`);
                    let cassqr5 = document.getElementById(`square-r0-c1`);

                    let castle1=true;

                   for(let i=0;i<3;i++){
                    let casr=document.getElementById(`square-r0-c${i+4}`);
                    let row = parseInt(casr.id.split('-')[1].substring(1));
                    let col = parseInt(casr.id.split('-')[2].substring(1));
                    let cs=squareattacked(row,col,false);
                    
                    if (cs.length !== 0){
                        castle1=false;
                        break;
                    }
                    
                   }
                    
                    if(!(cassqr1.querySelector('img')) && !(cassqr2.querySelector('img')) && !br2 && castle1){
                        cassqr1.classList.add('highlight-move');
                        cassqr2.classList.add('highlight-move');
                        casmove3=true;
                    }

                    let castle2=true;

                   for(let i=0;i<3;i++){
                    let casr=document.getElementById(`square-r0-c${4-i}`);
                    let row = parseInt(casr.id.split('-')[1].substring(1));
                    let col = parseInt(casr.id.split('-')[2].substring(1));
                    let cs=squareattacked(row,col,false);
                    
                    if (cs.length !== 0){
                        castle2=false;
                        break;
                    }
                   }
                   
                    if(!(cassqr3.querySelector('img')) && !(cassqr4.querySelector('img')) && !(cassqr5.querySelector('img')) && !br1 && castle2){
                        cassqr3.classList.add('highlight-move');
                        cassqr4.classList.add('highlight-move');
                        casmove4=true;
                    }
                }
            }
            


            const kingMoves = [
                [1, 0], [1, 1], [1, -1],
                [0, 1], [0, -1],
                [-1, 0], [-1, 1], [-1, -1]
            ];
        
            kingMoves.forEach(move => {
                let newRow = startRow + move[0];
                let newCol = startCol + move[1];
                let square = document.getElementById(`square-r${newRow}-c${newCol}`);
                let pik=this.id==='piece29';
                let sa=squareattacked(newRow,newCol,pik)
                
                
                
                if (square && !square.querySelector('img') && sa.length ===0) {
                    square.classList.add('highlight-move');
                } else if (square && square.querySelector('img') && (sa.length===0 ||sa.length===1 && (sa.includes(square.querySelector('img').id)))) {
                    
                    
                    
                    if ((this.src.includes('king-w') && square.querySelector('img').src.includes('-b')) || 
                        (this.src.includes('king-b') && square.querySelector('img').src.includes('-w'))) {
                        square.classList.add('highlight-capture');
                    }
                }
            });

            const hmoves=document.querySelectorAll('.highlight-move,.highlight-capture');
            if(hmoves.length===0 && squareattacked(startRow,startCol,true).length!=0){
                console.log('White got brutally checkmated')
            }
            else{
                console.log('white in game');
            }

        }
    }

    

       });
   });
   
 



  



document.querySelectorAll('.chessboard img').forEach(piece => {
    piece.addEventListener('click', function(event) {
        

        
        let parentSquare = piece.parentElement;
        if (parentSquare.classList.contains('highlight-capture')) {
         
            parentSquare.removeChild(piece);  
            parentSquare.appendChild(image_move); 
            clearHighlights();
        }
    });
});



document.querySelectorAll('.chessboard div[class*="wb"], .chessboard div[class*="bb"]').forEach(square => {
    square.addEventListener('click', function() {
        if (square.classList.contains('highlight-move')) {
            square.appendChild(image_move);
            clearHighlights();
        }
    });
});








 
    
    const pieces = document.querySelectorAll('.chessboard img');
    pieces.forEach(piece => {
        piece.addEventListener('dragstart', dragStart);
    });

   
    const squares = document.querySelectorAll('.chessboard .wb, .chessboard .bb');
    squares.forEach(square => {
        square.addEventListener('dragover', dragOver);
        square.addEventListener('drop', drop);
    });
});


(function() {
    var oldLog = console.log;
    console.log = function(message) {
        
        oldLog.apply(console, arguments);

        
        var logOutput = document.querySelector('.analzebox');
        if (logOutput) {
            var newMessage = document.createElement('div');
            newMessage.textContent = message;
            newMessage.classList.add('box1', 'left');
            logOutput.appendChild(newMessage);
        }
    };
})();





