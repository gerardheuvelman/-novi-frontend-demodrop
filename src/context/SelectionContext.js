import React, {createContext, useEffect, useState} from 'react';

export const SelectionContext = createContext({});

function SelectionContextProvider({children}) {

    const [selection, setSelection] = useState({
        selectedUsers: [],
        selectedDemos: [],
        selectedConversations: [],
        selectedGenres: [],
        selectedAudioFiles: [],
        selectedAuthorities: [],
        selectedUserReports: [],
    });

    useEffect(() => {
        function initializeContext() {
            setSelection({
                ...selection,
                selectedUsers: [],
                selectedDemos: [],
                selectedConversations: [],
                selectedGenres: [],
                selectedAudioFiles: [],
                selectedAuthorities: [],
                selectedUserReports: [],
            })
        }

        void initializeContext();
    }, [])

    function addItemToArray (array, item) {
        return array.push(item);
    }

    function removeItemFromArray(array, item) {
        let i = 0;
        while (i < array.length) {
            if (array[i] === item) {
                array.splice(i, 1);
            } else {
                ++i;
            }
        }
        return array;
    }

    function selectUser(username) {
        const newUserSelection = addItemToArray(selection.selectedUsers, username);
        setSelection({
            ...selection,
            selectedUsers: newUserSelection
        })
    }

    function deselectUser(username) {
        const newUserSelection = removeItemFromArray(selection.selectedUsers, username);
        setSelection({
            ...selection,
            selectedUsers: newUserSelection
        });
    }

    function selectDemo(demoId) {
        const newDemoSelection = selection.selectedDemos.push(demoId);
        setSelection({
            ...selection,
            selectedDemos: newDemoSelection
        });
    }

    function deselectDemo(demoId) {
        const newDemoSelection = removeItemFromArray(selection.selectedDemos, demoId);
        setSelection({
            ...selection,
            selectedDemos: newDemoSelection
        })
    }

    function selectConversation(conversationId) {
        const newConversationSelection = selection.selectedConversations.push(conversationId);
        setSelection({
            ...selection,
            selectedConversations: newConversationSelection
        });
    }

    function deselectConversation(conversationId) {
        const newConversationSelection = removeItemFromArray(selection.selectedConversations, conversationId);
        setSelection({
            ...selection,
            selectedConversations: newConversationSelection
        })
    }

    function selectGenre(name) {
        const newGenreSelection = selection.selectedConversations.push(name);
        setSelection({
            ...selection,
            selectedGenres: newGenreSelection
        });
    }

    function deselectGenre(name) {
        const newGenreSelection = removeItemFromArray(selection.selectedGenres, name);
        setSelection({
            ...selection,
            selectedGenres: newGenreSelection
        })
    }

    function selectAudioFile(audioFileId) {
        const newAudioFileSelection = selection.selectedAudioFiles.push(audioFileId);
        setSelection({
            ...selection,
            selectedAudioFiles: newAudioFileSelection
        });
    }

    function deselectAudioFile(audioFileId) {
        const newAudioFileSelection = removeItemFromArray(selection.selectedAudioFiles, audioFileId);
        setSelection({
            ...selection,
            selectedAudioFiles: newAudioFileSelection
        })
    }

    function selectAuthority(roleName) {
        const newAuthoritySelection = selection.selectedAuthorities.push(roleName);
        setSelection({
            ...selection,
            selectedAuthorities: newAuthoritySelection
        });
    }

    function deselectAuthority(rolename) {
        const newAuthoritySelection = removeItemFromArray(selection.selectedAuthorities, rolename);
        setSelection({
            ...selection,
            selectedAuthorities: newAuthoritySelection
        })
    }

    function selectUserReport(userReportId) {
        const newUserReportSelection = selection.selectedUserReports.push(userReportId);
        setSelection({
            ...selection,
            selectedUserReports: newUserReportSelection
        });
    }

    function deselectUserReport(userReportId) {
        const newUserReportSelection = removeItemFromArray(selection.selectedUserReports, userReportId);
        setSelection({
            ...selection,
            selectedUserReports: newUserReportSelection
        })
    }

    const contextData = {
        selectedUsers: selection.selectedUsers,
        selectedDemos: selection.selectedDemos,
        selectedConversations: selection.selectedConversations,
        selectedGenres: selection.selectedGenres,
        selectedAudioFiles: selection.selectedAudioFiles,
        selectedAuthorities: selection.selectedAuthorities,
        selectedUserReport: selection.selectedUserReports,
        selectUser: selectUser,
        deselectUser: deselectUser,
        selectDemo: selectDemo,
        deselectDemo: deselectDemo,
        selectConversation: selectConversation,
        deselectConversation: deselectConversation,
        selectGenre: selectGenre,
        deselectGenre: deselectGenre,
        selectAudioFile: selectAudioFile,
        deselectAudioFile: deselectAudioFile,
        selectAuthority: selectAuthority,
        deselectAuthority: deselectAuthority,
        selectUserReport: selectUserReport,
        deselectUserReport: deselectUserReport,

    };

    return (
        <SelectionContext.Provider value={contextData}>
            {children}
        </SelectionContext.Provider>
    );
}

export default SelectionContextProvider;