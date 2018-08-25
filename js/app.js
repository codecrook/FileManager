(function() {
    'use strict';

    let folders;
    let files;
    const createNewButton = document.querySelector('.new-button');
    const createNewFileOption = document.querySelector('.create-new-file');
    const createNewFolderOption = document.querySelector('.create-new-folder');

    createNewButton.addEventListener('click', showCreateNewOption);
    createNewFolderOption.addEventListener('click', createNewFolder);
    createNewFileOption.addEventListener('click', createNewFile);

    function selectItem(e) {
        e.target.classList.toggle('selected-item');
    }

    function openFolder(e) {
        e.target.classList.remove('folder-closed');
        e.target.classList.add('folder-open');
    }

    function createNewFolder(e) {
        let mainContainer = document.querySelector('.main-container'); 
        let innerContent = mainContainer.innerHTML;
        let folderName = prompt('Folder Name:', 'untitled folder');

        if (!folderName) return; //won't create folder if cancel is clicked on the prompt
        
        let newFolderCode = `<div class="folder folder-closed">
                                <span class="folder-name">${folderName}</span>
                            </div>`;
        
        innerContent += newFolderCode;
        mainContainer.innerHTML = innerContent;

        initialize();
    }

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

    function initialize() {
        folders = document.querySelectorAll('.folder');
        files = document.querySelectorAll('.file-all');

        folders.forEach(folder => folder.addEventListener('dblclick', openFolder));
        folders.forEach(folder => folder.addEventListener('click', selectItem));
        files.forEach(file => file.addEventListener('click', selectItem));
    };

    function showCreateNewOption(e) {
        var createItemPopup = document.querySelector(".create-new-popup");
        createItemPopup.classList.toggle("show");
    }

    initialize();

})();