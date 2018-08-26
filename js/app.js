(function() {
    'use strict';

    let folders;
    let files;
    const selectedCountDisplay = document.querySelector('.selected-file-display');
    const createNewButton = document.querySelector('.new-button');
    const createNewFileOption = document.querySelector('.create-new-file');
    const createNewFolderOption = document.querySelector('.create-new-folder');

    createNewButton.addEventListener('click', showCreateNewOption);
    createNewFolderOption.addEventListener('click', createNewFolder);
    createNewFileOption.addEventListener('click', createNewFile);

    //to execute delete functionality when 'delete' button is pressed on the keyboard
    window.addEventListener('keydown', (e) => { if (e.keyCode == 46) { deleteItem(); } });

    function initialize() {
        folders = document.querySelectorAll('.folder');
        files = document.querySelectorAll('.file-all');

        folders.forEach(folder => folder.addEventListener('dblclick', openFolder));
        folders.forEach(folder => folder.addEventListener('click', selectItem));
        files.forEach(file => file.addEventListener('click', selectItem));
    };
    
    /*function to show options to create new items
     *shows popup to create new file/folder
     */
    function showCreateNewOption(e) {
        var createItemPopup = document.querySelector(".create-new-popup");
        createItemPopup.classList.toggle("show");
    }

    /*function to create new folder
     *shows prompt to give a folder name or cancel folder creation
     */
    function createNewFolder(e) {
        let mainContainer = document.querySelector('.main-container'); 
        let innerContent = mainContainer.innerHTML;
        let folderName = prompt('Folder Name:', 'untitled folder');

        if (!folderName) return; //won't create folder if cancel is clicked on the prompt or folder name is empty
        
        let newFolderCode = `<div class="folder folder-closed">
                                <span class="folder-name">${folderName}</span>
                            </div>`;
        
        innerContent += newFolderCode;
        mainContainer.innerHTML = innerContent;

        initialize();
    }

    /*function to create new file
     *shows pompt to give a filename or cancel file creation
     *assigns file icons depending upon the file extension
     */
    function createNewFile(e) {
        let mainContainer = document.querySelector('.main-container'); 
        let innerContent = mainContainer.innerHTML;
        let fileName = prompt('File Name:', 'new file');

        let fileArray = fileName.split('.');
        let fileExtension = fileArray[fileArray.length - 1];
        let fileType = 'new';

        if (fileExtension == '') {
            fileType = 'new';
        }else if (fileExtension == 'mp3' || fileExtension == 'wav') {
            fileType = 'audio';
        } else if (fileExtension == 'mp4' || fileExtension == '3gp' || fileExtension == 'mov' || fileExtension == 'avi') {
            fileType = 'video';
        } else if (fileExtension == 'txt') {
            fileType = 'text';
        } else if (fileExtension == 'doc' || fileExtension == 'docx' || fileExtension == 'odt') {
            fileType = 'docs';
        } else if (fileExtension == 'pdf') {
            fileType = 'pdf';
        } else if (fileExtension == 'xls' || fileExtension == 'xlsx' || fileExtension == 'xlsb' || fileExtension == 'xlsm' ) {
            fileType = 'sheet';
        } else if (fileExtension == 'ppt' || fileExtension == 'pptx') {
            fileType = 'ppt';
        } else if (fileExtension == 'jpg' || fileExtension == 'jpeg' || fileExtension == 'png' || fileExtension == 'svg' ) {
            fileType = 'image';
        } else {
            fileType = 'unknown';
        }

        if (!fileName) return; //won't create file if cancel is clicked on the prompt or filename is empty
        
        let newFileCode = `<div class="file-all file-${fileType}">
                                <span class="folder-name">${fileName}</span>
                            </div>`;
        
        innerContent += newFileCode;
        mainContainer.innerHTML = innerContent;

        initialize();
    }

    /*function to open folder
     *changes the closed folder icon to a open folder icon
     */
    function openFolder(e) {
        e.target.classList.remove('folder-closed');
        e.target.classList.add('folder-open');
    }

    /*function to select an items
     *changes the background of an item indicating selection
     */
    function selectItem(e) {
        e.target.classList.toggle('selected-item');
        showSelectedItems();
    }

    /*function to show number of items selected
     *shows number of items selected in a small info window in the bottom left corner
     */
    function showSelectedItems() {
        let selectedItemsCount = document.querySelectorAll('.selected-item').length;
        if (selectedItemsCount == 0) {
            selectedCountDisplay.style.visibility = "hidden";
        } else {
            selectedCountDisplay.innerHTML = `${selectedItemsCount} item(s) selected`;
            selectedCountDisplay.style.visibility = "visible";
        }
    }

    /*function to show delete (an) item(s)
     *deletes selected item(s)
     *shows number of item(s) deleted in a info window in the bottom left corner for 1 sec
     */
    function deleteItem() {
        let selectedItems = document.querySelectorAll('.selected-item');
        selectedItems.forEach(item => { item.outerHTML = ''; item.innerHTML = '' });
        
        selectedCountDisplay.innerHTML = `${selectedItems.length} item(s) deleted!`;
        setTimeout(() => selectedCountDisplay.style.visibility = "hidden", 1000);
    }

    initialize();

})();