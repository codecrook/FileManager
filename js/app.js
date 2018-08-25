(function() {
    'use strict';

    let folders;
    const newButton = document.querySelector('.new-button');

    newButton.addEventListener('click', createFolder);

    function selectItem(e) {
        e.target.classList.toggle('selected-item');
    }

    function openFolder(e) {
        e.target.classList.remove('folder-closed');
        e.target.classList.add('folder-open');
    }

    function createFolder(e) {
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

    function initialize() {
        folders = document.querySelectorAll('.folder')
        folders.forEach(folder => folder.addEventListener('dblclick', openFolder));
        folders.forEach(folder => folder.addEventListener('click', selectItem));
    };

    initialize();

})();